// src/lib/oracleTracking.ts

export type ShareMethod = "native" | "clipboard" | "linkedin";

const DRAW_COUNTS_KEY = "oracle_draw_counts";
const ORACLE_EVENTS_KEY = "oracle_events";

// Full card-name map (1 = card-1, 2 = card-2, etc)
// NOTE: "Tax Deadline Dynamo" appears twice (cards 5 and 15) — intentionally kept.
const CARD_NAME_MAP: Record<number, string> = {
  1: "Reconciliation Sage",
  2: "Cashflow Crystal Ball",
  3: "Staffing Star",
  4: "Invoice Illumination",
  5: "Tax Deadline Dynamo",
  6: "Value Vanguard",
  7: "Error Exorcist",
  8: "Advisory Ace",
  9: "Cyber Shield Charm",
  10: "Tech Troubles Tonic",
  11: "Concept Translator",
  12: "Documentation Djinn",
  13: "Refund Reality Ranger",
  14: "Regulation Reveler",
  15: "Tax Deadline Dynamo",
  16: "Knowledge Nectar",
  17: "Burnout Banisher Boon",
  18: "Cloud Conjurer",
  19: "Last-Minute Lifesaver",
  20: "Relationship Compass",
  21: "Creative Ledger Luminary",
  22: "Privacy Portal Pendant",
  23: "Onboarding Oracle",
  24: "Transfer Pricing Talisman",
  25: "Governance Guardian",
  26: "Skeptic Slayer",
  27: "Continuity Crown",
  28: "Cashflow Constellation",
  29: "Pricing Prophet",
  30: "Knowledge Keeper",
  31: "Learning Luminary",
  32: "Regulation Rune",
  33: "Data Harmony Harp",
  34: "AI Ally Amulet",
  35: "Risk Navigator Rocket",
  36: "Insurance Insight Iris",
  37: "Incentive Illuminator",
  38: "Celestial Ledger",
  39: "2026 Ultra Blessing",
};

export function getCardName(cardId: number): string {
  return CARD_NAME_MAP[cardId] ?? `Card #${cardId}`;
}

/** Internal: append an event to localStorage (never breaks UX). */
function trackEvent(eventName: string, payload: Record<string, any>) {
  try {
    const raw = localStorage.getItem(ORACLE_EVENTS_KEY);
    const arr: any[] = raw ? JSON.parse(raw) : [];
    arr.push({ eventName, ...payload, ts: new Date().toISOString() });
    localStorage.setItem(ORACLE_EVENTS_KEY, JSON.stringify(arr.slice(-500)));
  } catch {
    // no-op
  }
}

/** Track: when a card is drawn (counts + event log). */
export function trackDraw(cardId: number) {
  try {
    const countsRaw = localStorage.getItem(DRAW_COUNTS_KEY);
    const counts: Record<string, number> = countsRaw ? JSON.parse(countsRaw) : {};
    const id = String(cardId);
    counts[id] = (counts[id] || 0) + 1;
    localStorage.setItem(DRAW_COUNTS_KEY, JSON.stringify(counts));
  } catch {
    // no-op
  }

  trackEvent("draw", { cardId, cardName: getCardName(cardId) });
}

/** Track: when the card reveal happens (flip shown). */
export function trackReveal(cardId: number) {
  trackEvent("reveal", { cardId, cardName: getCardName(cardId) });
}

/** Track: when share is initiated (modal open / share click). */
export function trackShare(cardId: number, method: ShareMethod) {
  trackEvent("share", { cardId, cardName: getCardName(cardId), method });
}

/**
 * Debug helpers for QA + “top cards” insights.
 * Call once at app start: attachOracleDebugHelpers()
 */
export function attachOracleDebugHelpers() {
  try {
    // @ts-ignore
    if (window.__oracleDebugAttached) return;
    // @ts-ignore
    window.__oracleDebugAttached = true;

    const api = {
      getCounts(): Record<string, number> {
        try {
          return JSON.parse(localStorage.getItem(DRAW_COUNTS_KEY) || "{}");
        } catch {
          return {};
        }
      },
      getEvents(): any[] {
        try {
          return JSON.parse(localStorage.getItem(ORACLE_EVENTS_KEY) || "[]");
        } catch {
          return [];
        }
      },
      clearAll(): void {
        localStorage.removeItem(DRAW_COUNTS_KEY);
        localStorage.removeItem(ORACLE_EVENTS_KEY);
      },
      top(n = 10): Array<{ cardId: number; name: string; draws: number }> {
        const counts = api.getCounts();
        return Object.entries(counts)
          .map(([k, v]) => ({ cardId: Number(k), name: getCardName(Number(k)), draws: v }))
          .sort((a, b) => b.draws - a.draws)
          .slice(0, n);
      },
    };

    // @ts-ignore
    window.__oracleDebug = api;
  } catch {
    // no-op
  }
}