import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

type ModerationResult = {
  action: "allow" | "needs_review" | "block";
  reason: string;
  risk_score: number;
};

const localChecks = [
  { pattern: /\b\d{2,4}-\d{2,4}-\d{3,4}\b/, action: "block", reason: "phone_number" },
  { pattern: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, action: "block", reason: "email_address" },
  { pattern: /(line\s*id|ライン\s*id|instagram|インスタ|住所|顔写真|晒し)/i, action: "block", reason: "personal_information" },
  { pattern: /(死ね|消えろ|殺す|犯罪者|詐欺師|ブス|きもい)/i, action: "block", reason: "abuse_or_threat" },
  { pattern: /(本名|学籍番号|電話番号|家どこ|住所教えて)/i, action: "needs_review", reason: "possible_doxxing" },
] as const;

function localModerate(text: string): ModerationResult {
  const hit = localChecks.find((check) => check.pattern.test(text));
  if (!hit) {
    return { action: "allow", reason: "local_checks_passed", risk_score: 0.05 };
  }
  return {
    action: hit.action,
    reason: hit.reason,
    risk_score: hit.action === "block" ? 0.95 : 0.65,
  };
}

serve(async (request) => {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  const { text = "" } = await request.json().catch(() => ({}));
  if (typeof text !== "string" || text.trim().length < 2) {
    return new Response(JSON.stringify({ action: "block", reason: "empty_text", risk_score: 1 }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const result = localModerate(text);

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
});
