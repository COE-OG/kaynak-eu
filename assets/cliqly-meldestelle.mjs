export const PUBLIC_NOTICE_ENDPOINT =
  "https://szwhywxaycqqfzovaedc.supabase.co/functions/v1/public-content-notice";

const SUPPORTED_LANGUAGES = new Set(["de", "en", "fr"]);
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const ACCESS_CODE_PATTERN = /^[A-Za-z0-9_-]{43}$/;
const CHALLENGE_PATTERN = /^[A-Za-z0-9_.-]{16,2048}$/;

const COPY = {
  de: {
    pageTitle: "Cliqly Meldestelle – Kaynak UG (haftungsbeschränkt)",
    metaDescription:
      "Strukturierte Meldestelle für mutmaßlich rechtswidrige Inhalte in Cliqly – ohne Cliqly-Konto nutzbar.",
    skip: "Zum Inhalt springen",
    homeAria: "Kaynak UG (haftungsbeschränkt) Startseite",
    kicker: "Cliqly · Sicherheit",
    title: "Formelle Inhaltsmeldung",
    intro:
      "Melde mutmaßlich rechtswidrige Inhalte präzise – auch ohne Cliqly-Konto.",
    trustAccount: "Kein Konto erforderlich",
    trustHuman: "Menschliche Prüfung",
    trustMinimal: "Datensparsam",
    submitTitle: "Inhalt genau bezeichnen",
    submitIntro:
      "Die Pflichtfelder helfen uns, den konkreten Inhalt zuverlässig zu finden und zu prüfen.",
    subjectType: "Art des Inhalts",
    reason: "Grund",
    reference: "Eindeutige Inhaltsreferenz",
    referenceHelp:
      "Zum Beispiel Nutzername, Eventtitel, Nachrichtenzeit oder sichtbare Kartenangabe.",
    location: "Exakter Fundort",
    locationHelp:
      "Füge eine öffentliche URL oder den genauen Weg in der App ein.",
    explanation: "Warum hältst du den Inhalt für rechtswidrig?",
    explanationHelp:
      "Beschreibe die konkreten Tatsachen und den Zusammenhang nachvollziehbar.",
    legalReference: "Rechtsgrundlage",
    optional: "optional",
    contactTitle: "Kontakt für Eingangs- und Entscheidungsmitteilungen",
    contactIntro:
      "Wir verwenden diese Angaben ausschließlich für die Bearbeitung der Meldung und rechtlich erforderliche Mitteilungen.",
    name: "Name",
    email: "E-Mail-Adresse",
    identityException:
      "Ich beanspruche die enge gesetzliche Identitätsausnahme für einen Hinweis zu sexuellem Missbrauch von Kindern.",
    identityExceptionHelp:
      "Diese Ausnahme gilt nicht für gewöhnliche Meldungen sexueller Inhalte. Kontaktangaben sind sonst erforderlich.",
    goodFaith:
      "Ich bestätige nach bestem Wissen, dass die Angaben richtig und vollständig sind.",
    privacyAcknowledgement: "Ich habe die",
    privacyLink: "Datenschutzhinweise",
    privacySuffix: "zur Verarbeitung dieser Meldung gelesen.",
    submit: "Meldung sicher absenden",
    retry: "Unverändert erneut senden",
    receiptTitle: "Meldung eingegangen",
    receiptText:
      "Bewahre Vorgangsnummer und Zugangscode getrennt und sicher auf. Beides wird für den Statusabruf benötigt.",
    caseNumber: "Vorgangsnummer",
    accessCode: "Zugangscode",
    receiptSafety:
      "Der Zugangscode wird von uns nicht im Klartext gespeichert. Diese Seite speichert ihn ebenfalls nicht im Browser.",
    newNotice: "Neue Meldung beginnen",
    statusTitle: "Bearbeitungsstand abrufen",
    statusIntro:
      "Der Abruf benötigt nur die Vorgangsnummer und den getrennten Zugangscode.",
    checkStatus: "Status sicher abrufen",
    statusLabel: "Status",
    decision: "Entscheidung",
    otherChannelsTitle: "Weitere Wege",
    otherChannelsCopy:
      "Für Notfälle wende dich an die zuständigen örtlichen Behörden. Datenschutzanfragen und Beschwerden gegen Entscheidungen erreichst du unter",
    terms: "Nutzungsbedingungen",
    legalNotice: "Impressum",
    preparing: "Sichere Verbindung wird vorbereitet.",
    sending: "Meldung wird sicher übermittelt.",
    checking: "Bearbeitungsstand wird sicher abgerufen.",
    successTitle: "Eingang bestätigt",
    successCopy:
      "Die Vorgangsnummer und der Zugangscode werden jetzt einmalig angezeigt.",
    retryTitle: "Übermittlung nicht bestätigt",
    retryCopy:
      "Die Meldung bleibt für einen identischen, sicheren Wiederholungsversuch gesperrt. Verändere die Angaben nicht und versuche es später erneut.",
    validationTitle: "Angaben prüfen",
    validationCopy:
      "Die Meldung konnte mit diesen Angaben nicht angenommen werden. Prüfe die markierten Pflichtfelder.",
    rateTitle: "Bitte später erneut versuchen",
    rateCopy:
      "Der Meldeweg wurde vorübergehend begrenzt. Bei akuter Gefahr wende dich an die zuständigen Behörden.",
    unavailableTitle: "Meldeweg vorübergehend nicht erreichbar",
    unavailableCopy:
      "Bitte versuche es später erneut. Bei dringenden Anliegen erreichst du support@kaynak.eu.",
    notFoundTitle: "Dossier nicht gefunden",
    notFoundCopy:
      "Vorgangsnummer und Zugangscode konnten nicht gemeinsam bestätigt werden.",
    conflictTitle: "Sicherer Wiederholungsversuch erforderlich",
    conflictCopy:
      "Die Angaben konnten nicht eindeutig derselben Meldung zugeordnet werden. Bitte ändere nichts und kontaktiere support@kaynak.eu.",
    statusOpen: "Eingegangen",
    statusReviewing: "In Prüfung",
    statusResolved: "Entschieden",
    statusDismissed: "Kein Verstoß festgestellt",
  },
  en: {
    pageTitle: "Cliqly notice portal – Kaynak UG (haftungsbeschränkt)",
    metaDescription:
      "Structured notice portal for allegedly illegal content in Cliqly, available without a Cliqly account.",
    skip: "Skip to content",
    homeAria: "Kaynak UG (haftungsbeschränkt) home page",
    kicker: "Cliqly · Safety",
    title: "Formal content notice",
    intro:
      "Report allegedly illegal content precisely, without needing a Cliqly account.",
    trustAccount: "No account required",
    trustHuman: "Human review",
    trustMinimal: "Data minimised",
    submitTitle: "Identify the content precisely",
    submitIntro:
      "The required fields help us locate and assess the specific content reliably.",
    subjectType: "Content type",
    reason: "Reason",
    reference: "Unique content reference",
    referenceHelp:
      "For example, a username, event title, message time or visible card detail.",
    location: "Exact location",
    locationHelp: "Provide a public URL or the exact path inside the app.",
    explanation: "Why do you consider the content illegal?",
    explanationHelp:
      "Describe the specific facts and context in a way that can be assessed.",
    legalReference: "Legal basis",
    optional: "optional",
    contactTitle: "Contact for receipt and decision communications",
    contactIntro:
      "We use these details only to process the notice and send legally required communications.",
    name: "Name",
    email: "Email address",
    identityException:
      "I claim the narrow statutory identity exception for a report concerning child sexual abuse.",
    identityExceptionHelp:
      "This exception does not cover ordinary reports of sexual content. Contact details are otherwise required.",
    goodFaith:
      "To the best of my knowledge, I confirm that the information is accurate and complete.",
    privacyAcknowledgement: "I have read the",
    privacyLink: "privacy information",
    privacySuffix: "for processing this notice.",
    submit: "Submit notice securely",
    retry: "Retry unchanged",
    receiptTitle: "Notice received",
    receiptText:
      "Keep the case number and access code separate and safe. Both are required to retrieve the status.",
    caseNumber: "Case number",
    accessCode: "Access code",
    receiptSafety:
      "We do not store the access code in plain text. This page does not store it in your browser either.",
    newNotice: "Start a new notice",
    statusTitle: "Check case status",
    statusIntro:
      "Status retrieval requires only the case number and separate access code.",
    checkStatus: "Check status securely",
    statusLabel: "Status",
    decision: "Decision",
    otherChannelsTitle: "Other channels",
    otherChannelsCopy:
      "For emergencies, contact the relevant local authorities. Privacy requests and appeals against decisions can be sent to",
    terms: "Terms of use",
    legalNotice: "Legal notice",
    preparing: "Preparing a secure connection.",
    sending: "Submitting the notice securely.",
    checking: "Retrieving the case status securely.",
    successTitle: "Receipt confirmed",
    successCopy:
      "The case number and access code are displayed once on this page.",
    retryTitle: "Submission not confirmed",
    retryCopy:
      "The notice is locked for an identical, safe retry. Do not change the information and try again later.",
    validationTitle: "Check the information",
    validationCopy:
      "The notice could not be accepted with these details. Review the required fields.",
    rateTitle: "Please try again later",
    rateCopy:
      "The notice channel has been temporarily limited. Contact the relevant authorities in an immediate danger situation.",
    unavailableTitle: "Notice channel temporarily unavailable",
    unavailableCopy:
      "Please try again later. For urgent matters, contact support@kaynak.eu.",
    notFoundTitle: "Case not found",
    notFoundCopy:
      "The case number and access code could not be confirmed together.",
    conflictTitle: "Secure retry required",
    conflictCopy:
      "The information could not be matched unambiguously to the same notice. Do not change it and contact support@kaynak.eu.",
    statusOpen: "Received",
    statusReviewing: "Under review",
    statusResolved: "Decided",
    statusDismissed: "No violation found",
  },
  fr: {
    pageTitle: "Portail de signalement Cliqly – Kaynak UG (haftungsbeschränkt)",
    metaDescription:
      "Portail structuré pour signaler un contenu présumé illicite dans Cliqly, sans compte Cliqly.",
    skip: "Aller au contenu",
    homeAria: "Accueil de Kaynak UG (haftungsbeschränkt)",
    kicker: "Cliqly · Sécurité",
    title: "Signalement formel de contenu",
    intro:
      "Signalez précisément un contenu présumé illicite, sans compte Cliqly.",
    trustAccount: "Aucun compte requis",
    trustHuman: "Examen humain",
    trustMinimal: "Données minimisées",
    submitTitle: "Identifier précisément le contenu",
    submitIntro:
      "Les champs obligatoires nous aident à retrouver et examiner le contenu concerné de manière fiable.",
    subjectType: "Type de contenu",
    reason: "Motif",
    reference: "Référence unique du contenu",
    referenceHelp:
      "Par exemple un nom d’utilisateur, un titre d’événement, l’heure d’un message ou une indication visible sur une carte.",
    location: "Emplacement exact",
    locationHelp:
      "Indiquez une URL publique ou le chemin exact dans l’application.",
    explanation: "Pourquoi considérez-vous ce contenu comme illicite ?",
    explanationHelp:
      "Décrivez les faits concrets et le contexte de façon suffisamment précise.",
    legalReference: "Fondement juridique",
    optional: "facultatif",
    contactTitle: "Contact pour les communications de réception et de décision",
    contactIntro:
      "Nous utilisons ces coordonnées uniquement pour traiter le signalement et envoyer les communications légalement requises.",
    name: "Nom",
    email: "Adresse e-mail",
    identityException:
      "J’invoque l’exception légale d’identité limitée à un signalement concernant des abus sexuels sur mineurs.",
    identityExceptionHelp:
      "Cette exception ne s’applique pas aux signalements ordinaires de contenu sexuel. Les coordonnées sont autrement requises.",
    goodFaith:
      "Je confirme de bonne foi que les informations sont exactes et complètes.",
    privacyAcknowledgement: "J’ai lu les",
    privacyLink: "informations de confidentialité",
    privacySuffix: "relatives au traitement de ce signalement.",
    submit: "Envoyer le signalement en sécurité",
    retry: "Renvoyer sans modification",
    receiptTitle: "Signalement reçu",
    receiptText:
      "Conservez séparément et en sécurité le numéro de dossier et le code d’accès. Les deux sont requis pour consulter l’état.",
    caseNumber: "Numéro de dossier",
    accessCode: "Code d’accès",
    receiptSafety:
      "Nous ne conservons pas le code d’accès en clair. Cette page ne le stocke pas non plus dans votre navigateur.",
    newNotice: "Commencer un nouveau signalement",
    statusTitle: "Consulter l’état du dossier",
    statusIntro:
      "La consultation requiert uniquement le numéro de dossier et le code d’accès distinct.",
    checkStatus: "Consulter l’état en sécurité",
    statusLabel: "État",
    decision: "Décision",
    otherChannelsTitle: "Autres voies",
    otherChannelsCopy:
      "En cas d’urgence, contactez les autorités locales compétentes. Les demandes de confidentialité et recours contre une décision peuvent être adressés à",
    terms: "Conditions d’utilisation",
    legalNotice: "Mentions légales",
    preparing: "Préparation de la connexion sécurisée.",
    sending: "Transmission sécurisée du signalement.",
    checking: "Consultation sécurisée de l’état du dossier.",
    successTitle: "Réception confirmée",
    successCopy:
      "Le numéro de dossier et le code d’accès sont affichés une seule fois sur cette page.",
    retryTitle: "Transmission non confirmée",
    retryCopy:
      "Le signalement est verrouillé pour une nouvelle tentative identique et sûre. Ne modifiez pas les informations et réessayez plus tard.",
    validationTitle: "Vérifier les informations",
    validationCopy:
      "Le signalement n’a pas pu être accepté avec ces informations. Vérifiez les champs obligatoires.",
    rateTitle: "Réessayer ultérieurement",
    rateCopy:
      "Le canal de signalement a été temporairement limité. En cas de danger immédiat, contactez les autorités compétentes.",
    unavailableTitle: "Canal temporairement indisponible",
    unavailableCopy:
      "Veuillez réessayer plus tard. Pour une demande urgente, contactez support@kaynak.eu.",
    notFoundTitle: "Dossier introuvable",
    notFoundCopy:
      "Le numéro de dossier et le code d’accès n’ont pas pu être confirmés ensemble.",
    conflictTitle: "Nouvelle tentative sécurisée requise",
    conflictCopy:
      "Les informations n’ont pas pu être rattachées sans ambiguïté au même signalement. Ne les modifiez pas et contactez support@kaynak.eu.",
    statusOpen: "Reçu",
    statusReviewing: "En examen",
    statusResolved: "Décidé",
    statusDismissed: "Aucune violation constatée",
  },
};

const OPTIONS = {
  subject: {
    profile: ["Profil", "Profile", "Profil"],
    event: ["Event", "Event", "Événement"],
    event_photo: ["Event-Foto", "Event photo", "Photo d’événement"],
    message: ["Chat-Nachricht", "Chat message", "Message de chat"],
    crew: ["Crew", "Crew", "Crew"],
    crew_message: ["Crew-Nachricht", "Crew message", "Message de Crew"],
    other: ["Sonstiger Inhalt", "Other content", "Autre contenu"],
  },
  reason: {
    illegal_content: [
      "Mutmaßlich rechtswidriger Inhalt",
      "Allegedly illegal content",
      "Contenu présumé illicite",
    ],
    hate: ["Hassrede", "Hate speech", "Discours haineux"],
    violence: ["Gewalt oder Drohung", "Violence or threat", "Violence ou menace"],
    sexual_content: [
      "Sexueller Inhalt / Schutz Minderjähriger",
      "Sexual content / child safety",
      "Contenu sexuel / protection des mineurs",
    ],
    privacy: ["Privatsphäre", "Privacy", "Vie privée"],
    impersonation: [
      "Identitätsmissbrauch",
      "Impersonation",
      "Usurpation d’identité",
    ],
    fraud: ["Betrug", "Fraud", "Fraude"],
    harassment: ["Belästigung", "Harassment", "Harcèlement"],
    dangerous_activity: [
      "Gefährliche Aktivität",
      "Dangerous activity",
      "Activité dangereuse",
    ],
    unsafe_location: ["Unsicherer Ort", "Unsafe location", "Lieu dangereux"],
    media_issue: ["Medieninhalt", "Media content", "Contenu média"],
    spam: ["Spam", "Spam", "Spam"],
    other: ["Anderer Grund", "Other reason", "Autre motif"],
  },
};

const LEGAL_LINKS = {
  de: {
    privacy: "/cliqly/datenschutz/",
    terms: "/cliqly/nutzungsbedingungen/",
    legal: "/impressum/",
  },
  en: {
    privacy: "/en/cliqly/privacy/",
    terms: "/en/cliqly/terms/",
    legal: "/en/legal-notice/",
  },
  fr: {
    privacy: "/fr/cliqly/confidentialite/",
    terms: "/fr/cliqly/conditions/",
    legal: "/impressum/",
  },
};

export function selectLanguage(search = "", browserLanguage = "de") {
  const requested = new URLSearchParams(search).get("lang")?.toLowerCase();
  if (requested && SUPPORTED_LANGUAGES.has(requested)) return requested;
  const preferred = browserLanguage.slice(0, 2).toLowerCase();
  return SUPPORTED_LANGUAGES.has(preferred) ? preferred : "de";
}

export function buildSubmitPayload(fields, challenge, language) {
  const payload = {
    action: "submit",
    challenge,
    subject_type: clean(fields.subject_type),
    subject_reference: clean(fields.subject_reference),
    content_location: clean(fields.content_location),
    reason_code: clean(fields.reason_code),
    explanation: clean(fields.explanation),
    good_faith_confirmed: Boolean(fields.good_faith_confirmed),
    language_code: language,
    identity_exception_claimed: Boolean(fields.identity_exception_claimed),
    privacy_acknowledged: Boolean(fields.privacy_acknowledged),
    fax_number: clean(fields.fax_number),
  };
  const legalReference = clean(fields.legal_reference);
  const contactName = clean(fields.contact_name);
  const contactEmail = clean(fields.contact_email);
  if (legalReference) payload.legal_reference = legalReference;
  if (contactName) payload.contact_name = contactName;
  if (contactEmail) payload.contact_email = contactEmail;
  return payload;
}

export function buildStatusPayload(fields, challenge, language) {
  return {
    action: "status",
    challenge,
    notice_id: clean(fields.notice_id).toLowerCase(),
    access_code: clean(fields.access_code),
    language_code: language,
  };
}

export function neutralErrorKey(status, context = "submit") {
  if (status === 404 && context === "status") return "notFound";
  if (status === 409) return "conflict";
  if (status === 429) return "rate";
  if ([400, 413, 415, 422].includes(status)) return "validation";
  return "unavailable";
}

export function validChallengeResponse(value, now = Date.now()) {
  if (!plainObject(value) || value.success !== true) return null;
  if (typeof value.challenge !== "string" || !CHALLENGE_PATTERN.test(value.challenge)) {
    return null;
  }
  if (typeof value.expires_at !== "string") return null;
  const expiresAt = Date.parse(value.expires_at);
  if (!Number.isFinite(expiresAt) || expiresAt <= now + 10_000) return null;
  if (expiresAt > now + 35 * 60 * 1000) return null;
  return { token: value.challenge, expiresAt };
}

export function validReceiptResponse(value) {
  if (!plainObject(value) || value.success !== true) return null;
  const noticeID = typeof value.notice_id === "string"
    ? value.notice_id.toLowerCase()
    : "";
  const accessCode = typeof value.access_code === "string" ? value.access_code : "";
  if (!UUID_PATTERN.test(noticeID) || !ACCESS_CODE_PATTERN.test(accessCode)) return null;
  return { noticeID, accessCode };
}

export function validStatusResponse(value, expectedNoticeID) {
  if (!plainObject(value) || value.success !== true) return null;
  const noticeID = typeof value.notice_id === "string"
    ? value.notice_id.toLowerCase()
    : "";
  if (!UUID_PATTERN.test(noticeID) || noticeID !== expectedNoticeID.toLowerCase()) {
    return null;
  }
  const status = typeof value.status === "string" && /^[a-z_]{2,40}$/.test(value.status)
    ? value.status
    : "unknown";
  let decision = null;
  if (plainObject(value.decision)) {
    const statement = boundedText(value.decision.reason_statement, 5000);
    const outcome = boundedText(value.decision.outcome, 120);
    decision = statement || outcome || null;
  }
  return { noticeID, status, decision };
}

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function boundedText(value, maximum) {
  if (typeof value !== "string") return "";
  return value.slice(0, maximum).trim();
}

function plainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

if (typeof document !== "undefined") {
  initialiseNoticePage();
}

function initialiseNoticePage() {
  const language = selectLanguage(window.location.search, navigator.language);
  const copy = COPY[language];
  const state = {
    language,
    challenge: null,
    challengeExpiresAt: 0,
    submissionSnapshot: null,
  };
  const noticeForm = document.querySelector("#notice-form");
  const statusForm = document.querySelector("#status-form");
  if (!(noticeForm instanceof HTMLFormElement) || !(statusForm instanceof HTMLFormElement)) {
    return;
  }

  applyLanguage(language);
  syncIdentityException(noticeForm);
  updateExplanationCount(noticeForm);

  noticeForm.querySelector("#reason-code")?.addEventListener("change", () => {
    syncIdentityException(noticeForm);
  });
  noticeForm.elements.namedItem("identity_exception_claimed")?.addEventListener(
    "change",
    () => syncContactRequirements(noticeForm),
  );
  noticeForm.elements.namedItem("explanation")?.addEventListener(
    "input",
    () => updateExplanationCount(noticeForm),
  );

  noticeForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!noticeForm.reportValidity()) return;
    await submitNotice(noticeForm, state, false);
  });

  document.querySelector("#retry-button")?.addEventListener("click", async () => {
    await submitNotice(noticeForm, state, true);
  });

  document.querySelector("#new-notice-button")?.addEventListener("click", async () => {
    state.submissionSnapshot = null;
    state.challenge = null;
    state.challengeExpiresAt = 0;
    noticeForm.reset();
    setNoticeLocked(noticeForm, false, false);
    syncIdentityException(noticeForm);
    updateExplanationCount(noticeForm);
    hideElement("#receipt-panel");
    showElement("#notice-submit-panel");
    clearMessage();
    window.scrollTo({ top: 0, behavior: "smooth" });
    await prepareChallenge(state);
  });

  statusForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!statusForm.reportValidity()) return;
    await checkStatus(statusForm, state);
  });

  prepareChallenge(state);

  function applyLanguage(nextLanguage) {
    document.documentElement.lang = nextLanguage;
    document.title = copy.pageTitle;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", copy.metaDescription);
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (key && Object.hasOwn(copy, key)) node.textContent = copy[key];
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
      const key = node.getAttribute("data-i18n-aria-label");
      if (key && Object.hasOwn(copy, key)) node.setAttribute("aria-label", copy[key]);
    });
    document.querySelectorAll("[data-language-link]").forEach((link) => {
      if (link.getAttribute("data-language-link") === nextLanguage) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    const languageIndex = nextLanguage === "de" ? 0 : nextLanguage === "en" ? 1 : 2;
    document.querySelectorAll("[data-option-kind]").forEach((option) => {
      const kind = option.getAttribute("data-option-kind");
      const value = option.getAttribute("data-option-value");
      const label = kind && value ? OPTIONS[kind]?.[value]?.[languageIndex] : null;
      if (label) option.textContent = label;
    });
    const links = LEGAL_LINKS[nextLanguage];
    setLink("#privacy-link", links.privacy);
    setLink("#footer-privacy-link", links.privacy);
    setLink("#footer-terms-link", links.terms);
    setLink("#footer-legal-link", links.legal);
  }

  async function prepareChallenge(currentState) {
    showMessage("info", copy.preparing, "");
    try {
      await ensureChallenge(currentState, true);
      clearMessage();
    } catch {
      showNeutralError("unavailable");
    }
  }

  async function submitNotice(form, currentState, isRetry) {
    if (isRetry && !currentState.submissionSnapshot) return;
    let payload = currentState.submissionSnapshot;
    if (!payload) {
      try {
        const challenge = await ensureChallenge(currentState);
        payload = buildSubmitPayload(readNoticeFields(form), challenge, language);
        currentState.submissionSnapshot = Object.freeze({ ...payload });
      } catch {
        showNeutralError("unavailable");
        return;
      }
    }

    setNoticeLocked(form, true, false);
    showMessage("info", copy.sending, "");
    try {
      const result = await requestJSON(PUBLIC_NOTICE_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (result.response.status === 201) {
        const receipt = validReceiptResponse(result.body);
        if (!receipt) throw new Error("invalid receipt");
        renderReceipt(receipt, statusForm);
        currentState.submissionSnapshot = null;
        currentState.challenge = null;
        currentState.challengeExpiresAt = 0;
        hideElement("#notice-submit-panel");
        showElement("#receipt-panel");
        showMessage("success", copy.successTitle, copy.successCopy);
        document.querySelector("#receipt-panel")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }

      const errorKey = neutralErrorKey(result.response.status, "submit");
      if (errorKey === "validation") {
        currentState.submissionSnapshot = null;
        setNoticeLocked(form, false, false);
      } else {
        setNoticeLocked(form, true, true);
      }
      showNeutralError(errorKey);
    } catch {
      setNoticeLocked(form, true, true);
      showMessage("error", copy.retryTitle, copy.retryCopy);
    }
  }

  async function checkStatus(form, currentState) {
    setButtonBusy("#status-button", true, copy.checking);
    hideElement("#status-result");
    try {
      const challenge = await ensureChallenge(currentState);
      const fields = Object.fromEntries(new FormData(form));
      const payload = buildStatusPayload(fields, challenge, language);
      const result = await requestJSON(PUBLIC_NOTICE_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (result.response.status !== 200) {
        showNeutralError(neutralErrorKey(result.response.status, "status"));
        return;
      }
      const status = validStatusResponse(result.body, payload.notice_id);
      if (!status) throw new Error("invalid status");
      renderStatus(status);
      clearMessage();
      showElement("#status-result");
    } catch {
      showNeutralError("unavailable");
    } finally {
      setButtonBusy("#status-button", false, copy.checkStatus);
    }
  }

  async function ensureChallenge(currentState, force = false) {
    if (
      !force &&
      currentState.challenge &&
      currentState.challengeExpiresAt > Date.now() + 30_000
    ) {
      return currentState.challenge;
    }
    const url = `${PUBLIC_NOTICE_ENDPOINT}?lang=${encodeURIComponent(language)}`;
    const result = await requestJSON(url, { method: "GET" });
    if (result.response.status !== 200) throw new Error("challenge unavailable");
    const challenge = validChallengeResponse(result.body);
    if (!challenge) throw new Error("invalid challenge");
    currentState.challenge = challenge.token;
    currentState.challengeExpiresAt = challenge.expiresAt;
    return challenge.token;
  }

  function showNeutralError(key) {
    const values = {
      validation: [copy.validationTitle, copy.validationCopy],
      rate: [copy.rateTitle, copy.rateCopy],
      unavailable: [copy.unavailableTitle, copy.unavailableCopy],
      notFound: [copy.notFoundTitle, copy.notFoundCopy],
      conflict: [copy.conflictTitle, copy.conflictCopy],
    };
    const [title, message] = values[key] ?? values.unavailable;
    showMessage("error", title, message);
  }

  function showMessage(tone, title, message) {
    const container = document.querySelector("#service-message");
    if (!(container instanceof HTMLElement)) return;
    container.dataset.tone = tone;
    container.hidden = false;
    setText("#service-message-title", title);
    setText("#service-message-copy", message);
  }

  function clearMessage() {
    const container = document.querySelector("#service-message");
    if (container instanceof HTMLElement) container.hidden = true;
    setText("#service-message-title", "");
    setText("#service-message-copy", "");
  }

  function renderReceipt(receipt, form) {
    setText("#receipt-notice-id", receipt.noticeID);
    setText("#receipt-access-code", receipt.accessCode);
    const noticeID = form.elements.namedItem("notice_id");
    const accessCode = form.elements.namedItem("access_code");
    if (noticeID instanceof HTMLInputElement) noticeID.value = receipt.noticeID;
    if (accessCode instanceof HTMLInputElement) accessCode.value = receipt.accessCode;
  }

  function renderStatus(result) {
    const statusLabels = {
      open: copy.statusOpen,
      reviewing: copy.statusReviewing,
      resolved: copy.statusResolved,
      dismissed: copy.statusDismissed,
    };
    setText("#case-status", statusLabels[result.status] ?? copy.statusReviewing);
    const decisionRow = document.querySelector("#decision-row");
    if (decisionRow instanceof HTMLElement) decisionRow.hidden = !result.decision;
    setText("#case-decision", result.decision ?? "");
  }
}

function readNoticeFields(form) {
  const fields = Object.fromEntries(new FormData(form));
  fields.good_faith_confirmed = checked(form, "good_faith_confirmed");
  fields.privacy_acknowledged = checked(form, "privacy_acknowledged");
  fields.identity_exception_claimed = checked(form, "identity_exception_claimed");
  return fields;
}

function checked(form, name) {
  const control = form.elements.namedItem(name);
  return control instanceof HTMLInputElement && control.checked;
}

function syncIdentityException(form) {
  const reason = form.elements.namedItem("reason_code");
  const wrapper = document.querySelector("#identity-exception");
  const checkbox = form.elements.namedItem("identity_exception_claimed");
  const applicable = reason instanceof HTMLSelectElement && reason.value === "sexual_content";
  if (wrapper instanceof HTMLElement) wrapper.hidden = !applicable;
  if (!applicable && checkbox instanceof HTMLInputElement) checkbox.checked = false;
  syncContactRequirements(form);
}

function syncContactRequirements(form) {
  const exceptionClaimed = checked(form, "identity_exception_claimed");
  for (const name of ["contact_name", "contact_email"]) {
    const control = form.elements.namedItem(name);
    if (control instanceof HTMLInputElement) control.required = !exceptionClaimed;
  }
}

function updateExplanationCount(form) {
  const explanation = form.elements.namedItem("explanation");
  if (explanation instanceof HTMLTextAreaElement) {
    setText("#explanation-count", `${explanation.value.length} / 5000`);
  }
}

function setNoticeLocked(form, locked, allowRetry) {
  form.querySelectorAll("input, select, textarea").forEach((control) => {
    control.disabled = locked;
  });
  const submit = document.querySelector("#submit-button");
  if (submit instanceof HTMLButtonElement) {
    submit.disabled = locked;
    submit.hidden = allowRetry;
  }
  const retry = document.querySelector("#retry-button");
  if (retry instanceof HTMLButtonElement) {
    retry.hidden = !allowRetry;
    retry.disabled = !allowRetry;
  }
  if (!locked) syncContactRequirements(form);
}

function setButtonBusy(selector, busy, label) {
  const button = document.querySelector(selector);
  if (!(button instanceof HTMLButtonElement)) return;
  button.disabled = busy;
  button.textContent = label;
}

async function requestJSON(url, options) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await fetch(url, {
      method: options.method,
      body: options.body,
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      redirect: "error",
      referrerPolicy: "no-referrer",
      headers: {
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
      },
      signal: controller.signal,
    });
    const text = await response.text();
    let body = null;
    if (text.length <= 30_000) {
      try {
        body = JSON.parse(text);
      } catch {
        body = null;
      }
    }
    return { response, body };
  } finally {
    window.clearTimeout(timeout);
  }
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function setLink(selector, href) {
  const element = document.querySelector(selector);
  if (element instanceof HTMLAnchorElement) element.href = href;
}

function hideElement(selector) {
  const element = document.querySelector(selector);
  if (element instanceof HTMLElement) element.hidden = true;
}

function showElement(selector) {
  const element = document.querySelector(selector);
  if (element instanceof HTMLElement) element.hidden = false;
}
