import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  buildStatusPayload,
  buildSubmitPayload,
  neutralErrorKey,
  PUBLIC_NOTICE_ENDPOINT,
  selectLanguage,
  validChallengeResponse,
  validReceiptResponse,
  validStatusResponse,
} from "../assets/cliqly-meldestelle.mjs";

const expectedEndpoint =
  "https://szwhywxaycqqfzovaedc.supabase.co/functions/v1/public-content-notice";
const noticeID = "29000000-0000-4000-8000-000000000001";
const accessCode = "a".repeat(43);

test("language selection is explicit and bounded", () => {
  assert.equal(selectLanguage("?lang=fr", "de-DE"), "fr");
  assert.equal(selectLanguage("?lang=unknown", "en-GB"), "en");
  assert.equal(selectLanguage("", "it-IT"), "de");
});

test("submit payload is an explicit, trimmed allowlist", () => {
  const payload = buildSubmitPayload(
    {
      subject_type: " event ",
      subject_reference: " Event: CLQ-42 ",
      content_location: " Cliqly > Event > Details ",
      reason_code: " illegal_content ",
      explanation:
        " This concrete explanation is deliberately longer than fifty characters for review. ",
      legal_reference: " ",
      contact_name: " Example Person ",
      contact_email: " example@invalid.test ",
      good_faith_confirmed: true,
      privacy_acknowledged: true,
      identity_exception_claimed: false,
      fax_number: "",
      auth_user_id: "must-never-cross-the-public-boundary",
      target_user_id: "must-never-cross-the-public-boundary",
    },
    "signed.challenge",
    "en",
  );

  assert.deepEqual(Object.keys(payload).sort(), [
    "action",
    "challenge",
    "contact_email",
    "contact_name",
    "content_location",
    "explanation",
    "fax_number",
    "good_faith_confirmed",
    "identity_exception_claimed",
    "language_code",
    "privacy_acknowledged",
    "reason_code",
    "subject_reference",
    "subject_type",
  ]);
  assert.equal(payload.subject_type, "event");
  assert.equal(payload.contact_email, "example@invalid.test");
  assert.equal("auth_user_id" in payload, false);
  assert.equal("target_user_id" in payload, false);
});

test("status payload contains only opaque case credentials", () => {
  assert.deepEqual(
    buildStatusPayload(
      { notice_id: ` ${noticeID.toUpperCase()} `, access_code: ` ${accessCode} ` },
      "signed.challenge",
      "de",
    ),
    {
      action: "status",
      challenge: "signed.challenge",
      notice_id: noticeID,
      access_code: accessCode,
      language_code: "de",
    },
  );
});

test("API error classification ignores remote error text", () => {
  assert.equal(neutralErrorKey(422, "submit"), "validation");
  assert.equal(neutralErrorKey(404, "status"), "notFound");
  assert.equal(neutralErrorKey(429, "submit"), "rate");
  assert.equal(neutralErrorKey(503, "submit"), "unavailable");
});

test("challenge, receipt and status responses are fail-closed", () => {
  const now = Date.now();
  assert.deepEqual(
    validChallengeResponse(
      {
        success: true,
        challenge: "header.payload.signature",
        expires_at: new Date(now + 30 * 60 * 1000).toISOString(),
      },
      now,
    ),
    {
      token: "header.payload.signature",
      expiresAt: Date.parse(new Date(now + 30 * 60 * 1000).toISOString()),
    },
  );
  assert.equal(
    validChallengeResponse(
      {
        success: true,
        challenge: "header.payload.signature",
        expires_at: new Date(now + 60 * 60 * 1000).toISOString(),
      },
      now,
    ),
    null,
  );
  assert.deepEqual(
    validReceiptResponse({ success: true, notice_id: noticeID, access_code: accessCode }),
    { noticeID, accessCode },
  );
  assert.equal(
    validReceiptResponse({ success: true, notice_id: noticeID, access_code: "short" }),
    null,
  );
  assert.deepEqual(
    validStatusResponse(
      {
        success: true,
        notice_id: noticeID,
        status: "resolved",
        decision: { reason_statement: "Human decision with an individual reason." },
      },
      noticeID,
    ),
    {
      noticeID,
      status: "resolved",
      decision: "Human decision with an individual reason.",
    },
  );
  assert.equal(
    validStatusResponse(
      { success: true, notice_id: "39000000-0000-4000-8000-000000000001" },
      noticeID,
    ),
    null,
  );
});

test("static page has a strict local-asset and JSON-only boundary", async () => {
  const html = await readFile(new URL("../cliqly/meldestelle/index.html", import.meta.url), "utf8");
  const script = await readFile(
    new URL("../assets/cliqly-meldestelle.mjs", import.meta.url),
    "utf8",
  );

  assert.equal(PUBLIC_NOTICE_ENDPOINT, expectedEndpoint);
  assert.match(html, /connect-src https:\/\/szwhywxaycqqfzovaedc\.supabase\.co/);
  assert.match(html, /form-action 'none'/);
  assert.doesNotMatch(html, /script-src[^;]*(?:unsafe-inline|unsafe-eval)/);
  assert.doesNotMatch(script, /\b(?:innerHTML|outerHTML|insertAdjacentHTML|eval)\b/);
  assert.doesNotMatch(script, /\b(?:localStorage|sessionStorage|document\.cookie)\b/);
  assert.doesNotMatch(script, /Authorization/i);
  assert.match(script, /credentials:\s*"omit"/);
  assert.match(script, /referrerPolicy:\s*"no-referrer"/);
  assert.match(script, /"Content-Type":\s*"application\/json"/);

  for (const match of html.matchAll(/<(?:script|img)\b[^>]*\bsrc="([^"]+)"/g)) {
    assert.match(match[1], /^\//, `non-local executable asset: ${match[1]}`);
  }
  for (const match of html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)) {
    assert.match(match[1], /^\//, `non-local stylesheet: ${match[1]}`);
  }
});

test("all eight Cliqly legal pages link to the localised website portal", async () => {
  const pages = new Map([
    ["cliqly/datenschutz/index.html", "de"],
    ["cliqly/nutzungsbedingungen/index.html", "de"],
    ["impressum/index.html", "de"],
    ["en/cliqly/privacy/index.html", "en"],
    ["en/cliqly/terms/index.html", "en"],
    ["en/legal-notice/index.html", "en"],
    ["fr/cliqly/confidentialite/index.html", "fr"],
    ["fr/cliqly/conditions/index.html", "fr"],
  ]);

  for (const [path, language] of pages) {
    const html = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
    assert.match(
      html,
      new RegExp(`/cliqly/meldestelle/\\?lang=${language}`),
      `${path} does not link to its localised portal`,
    );
    assert.doesNotMatch(
      html,
      /supabase\.co\/functions\/v1\/public-content-notice/,
      `${path} still exposes the unusable direct Function page`,
    );
  }
});
