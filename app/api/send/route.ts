import { SDK } from "@photon-ai/advanced-imessage-kit";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const sendPayloadSchema = z.object({
  phone: z.string().trim().min(1, "Phone number is required."),
  message: z.string().trim().min(1, "Message is required."),
});

function normalizePhone(input: string) {
  const trimmed = input.trim();
  const plusPrefix = trimmed.startsWith("+") ? "+" : "";
  const withoutPunctuation = trimmed.replace(/[()\-\s]/g, "");
  const digitsOnly = withoutPunctuation.replace(/\D/g, "");
  const normalized = `${plusPrefix}${digitsOnly}`;

  if (!/^\+?\d{8,15}$/.test(normalized)) {
    throw new Error("Phone number must contain 8 to 15 digits.");
  }

  return normalized;
}

export async function POST(request: Request) {
  const serverUrl = process.env.PHOTON_SERVER_URL;
  const apiKey = process.env.PHOTON_API_KEY;

  if (!serverUrl || !apiKey) {
    return NextResponse.json(
      {
        ok: false,
        message: "Server configuration missing.",
        details: "PHOTON_SERVER_URL and PHOTON_API_KEY are required on the server.",
      },
      { status: 500 },
    );
  }

  let sdk: ReturnType<typeof SDK> | undefined;

  try {
    const json = await request.json();
    const parsed = sendPayloadSchema.parse(json);
    const normalizedPhone = normalizePhone(parsed.phone);
    const trimmedMessage = parsed.message.trim();
    const chatGuid = `iMessage;-;${normalizedPhone}`;

    sdk = SDK({ serverUrl, apiKey });
    await sdk.connect();

    await sdk.messages.sendMessage({
      chatGuid,
      message: trimmedMessage,
    });

    return NextResponse.json({
      ok: true,
      message: `Message sent to ${normalizedPhone}.`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid input.",
          details: error.issues[0]?.message ?? "Request body is invalid.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to send iMessage.",
        details: error instanceof Error ? error.message : "Unknown server error.",
      },
      { status: 500 },
    );
  } finally {
    if (sdk) {
      await sdk.close().catch(() => undefined);
    }
  }
}
