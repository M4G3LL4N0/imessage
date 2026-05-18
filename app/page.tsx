"use client";

import { FormEvent, useMemo, useState } from "react";
import { HeroProductPanel } from "@/components/HeroProductPanel";
import { MarketingGraphicsStack } from "@/components/MarketingGraphicsStack";
import { TrustStrip } from "@/components/TrustStrip";

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
    <main className="container">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <TrustStrip />
        </div>

      <section className="card">
        <h1>Photon iMessage Sender</h1>
        <p className="description">
          Send iMessages via a secure server-side route backed by Photon Codes.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="phone">Phone Number</label>
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
            placeholder="Write your iMessage..."
            required
          />

          <button type="submit" disabled={!canSubmit}>
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </form>

        {normalizedPhonePreview && (
          <p className="helper">Normalized: {normalizedPhonePreview}</p>
        )}

        {status && (
          <p className={status.type === "success" ? "feedback success" : "feedback error"}>
            {status.text}
          </p>
        )}
      </section>
    <MarketingGraphicsStack />
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
        <div />
        <HeroProductPanel />
      </section>
    </main>
  );
}
