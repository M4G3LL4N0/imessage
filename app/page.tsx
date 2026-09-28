"use client";

import { FormEvent, useMemo, useState } from "react";

type SendResponse = {
  ok: boolean;
  message?: string;
  details?: string;
};

function sanitizePhone(rawPhone: string) {
  const trimmed = rawPhone.trim();
  const plusPrefix = trimmed.startsWith("+") ? "+" : "";
  const withoutPunctuation = trimmed.replace(/[()\-\s]/g, "");
  const digitsOnly = withoutPunctuation.replace(/\D/g, "");
  return `${plusPrefix}${digitsOnly}`;
}

export default function Home() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(
    null,
  );

  const normalizedPhonePreview = useMemo(() => sanitizePhone(phone), [phone]);
  const canSubmit = !isSending && phone.trim().length > 0 && message.trim().length > 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setIsSending(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, message }),
      });
      const payload = (await response.json()) as SendResponse;
      if (!response.ok || !payload.ok) {
        throw new Error(payload.details ?? payload.message ?? "Failed to send message.");
      }
      setStatus({ type: "success", text: payload.message ?? "Message sent successfully." });
      setMessage("");
    } catch (error) {
      setStatus({
        type: "error",
        text: error instanceof Error ? error.message : "An unexpected error occurred.",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="imsg-page">
      <header className="imsg-mast">
        <div>
          <p className="imsg-brand">Photon iMessage</p>
          <p className="imsg-kicker">One message · one number you choose</p>
        </div>
        <p className="imsg-mast-note">Early single-message form</p>
      </header>

      <main className="imsg-main">
        <section className="card">
          <h1>Send one iMessage</h1>
          <p className="description">
            Type one body and one phone number, then send. There is no contact
            list, no scrape, no import, and no bulk campaign tool on this page.
          </p>

          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+14155551234"
              autoComplete="tel"
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write one iMessage…"
              required
            />

            <button type="submit" disabled={!canSubmit}>
              {isSending ? "Sending…" : "Send this message"}
            </button>
          </form>

          {normalizedPhonePreview ? (
            <p className="helper">Normalized: {normalizedPhonePreview}</p>
          ) : null}

          {status ? (
            <p className={status.type === "success" ? "feedback success" : "feedback error"}>
              {status.text}
            </p>
          ) : null}
        </section>

        <aside className="imsg-note">
          <h2>What this is not</h2>
          <ul>
            <li>Not a blast or drip tool</li>
            <li>Not a contact importer</li>
            <li>Not a consumer product with claimed delivery rates</li>
          </ul>
          <p>
            Sending only works when the server has Photon credentials. If those
            are missing, the form reports a configuration error instead of
            pretending the message went out.
          </p>
        </aside>
      </main>
    </div>
  );
}
