import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import "./FortuneCard.css";

import { getCardName, trackReveal, trackShare } from "@/lib/oracleTracking";

interface FortuneCardProps {
  cardNumber: number;
  onReset: () => void;
}

const CARD_BACK_URL =
  "https://zfxcdfwxgsuezkyauuux.supabase.co/storage/v1/object/public/oracle-cards/card_back.png";

// Reveal copy (emoji kept separate so it never wraps)
const POST_REVEAL_SETS = [
  { title: "The Oracle Has Spoken", emoji: "✨", message: "Your 2026 path begins with clarity." },
  { title: "The Signs Are Clear", emoji: "🔅", message: "In 2026, the answer you seek begins to take shape." },
  { title: "The Veil Has Lifted", emoji: "☁️", message: "What unfolds in 2026 is guided by focus and flow." },
  { title: "Clarity Reveals Itself", emoji: "🪄", message: "In 2026, steady progress replaces uncertainty." },
];

const CTA_VARIANTS = [
  "Share your fortune for good luck 🍀",
  "Share this 2026 blessing ✨",
  "Share this forecast with your workflow 🔮",
];

const SOCIAL_SHARE_VARIANTS: Array<(cardName: string, shareUrl: string) => string> = [
  (cardName, shareUrl) => `My 2026 Accounting Oracle card:  ${cardName}  🔮✨

${shareUrl}

@MyWorks`,
];

function pickOne<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildShareUrl(cardNumber: number) {
  const id = String(cardNumber).padStart(2, "0");

  // Always resolves to the live domain in production
  // and localhost in dev (which is fine)
  const base = window.location.origin;

  const url = new URL(`${base}/oracle/card-${id}`);

  return url.toString();
}

function openLinkedIn(shareUrl: string) {
  window.open(
    "https://www.linkedin.com/sharing/share-offsite/?url=" +
      encodeURIComponent(shareUrl),
    "_blank",
    "noopener,noreferrer"
  );
}

export default function FortuneCard({ cardNumber, onReset }: FortuneCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showMagic, setShowMagic] = useState(false);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareText, setShareText] = useState("");

  const autoCloseRef = useRef<number | null>(null);

  const cardImageUrl = useMemo(
    () =>
      `https://zfxcdfwxgsuezkyauuux.supabase.co/storage/v1/object/public/oracle-cards/card-${cardNumber}.png`,
    [cardNumber]
  );

  const revealCopy = useMemo(() => pickOne(POST_REVEAL_SETS), []);
  const ctaCopy = useMemo(() => pickOne(CTA_VARIANTS), []);

  // Reveal timing
  useEffect(() => {
    const t1 = setTimeout(() => setShowMagic(true), 350);
    const t2 = setTimeout(() => setIsRevealed(true), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Track reveal once
  useEffect(() => {
    if (isRevealed) trackReveal(cardNumber);
  }, [isRevealed, cardNumber]);

  // Auto-close share modal
  useEffect(() => {
    if (!isShareModalOpen) return;
    autoCloseRef.current = window.setTimeout(() => setIsShareModalOpen(false), 5000);
    return () => {
      if (autoCloseRef.current) clearTimeout(autoCloseRef.current);
      autoCloseRef.current = null;
    };
  }, [isShareModalOpen]);

  const handleShare = async () => {
    const shareUrl = buildShareUrl(cardNumber);
    const cardName = getCardName(cardNumber);
    const text = pickOne(SOCIAL_SHARE_VARIANTS)(cardName, shareUrl);

    setShareText(text);
    setIsShareModalOpen(true);

    try {
      await navigator.clipboard.writeText(text);
      trackShare(cardNumber, "clipboard");
    } catch {
      trackShare(cardNumber, "manual");
    }
  };

  const handleOpenLinkedIn = () => {
    openLinkedIn(buildShareUrl(cardNumber));
    trackShare(cardNumber, "linkedin");
  };

  return (
    <div className="min-h-[100svh] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-16">
        {/* Card */}
        <div className="scale-[1.12] transition-transform">
          <div
            className={`card-container ${showMagic && !isRevealed ? "glowing" : ""} ${
              isRevealed ? "flipped" : ""
            }`}
          >
            <div className="card-face card-back">
              <img src={CARD_BACK_URL} alt="" />
            </div>
            <div className="card-face card-front">
              <img src={cardImageUrl} alt="" />
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div
  className={`w-full max-w-xl transition-opacity duration-700 ${
    isRevealed ? "opacity-100" : "opacity-0"
  }`}
>
  <div className="flex flex-col items-center text-center">
    <h2 className="fortune-heading text-2xl sm:text-3xl md:text-4xl leading-tight">
      {revealCopy.title}
    </h2>

    <p className="fortune-subcopy italic mt-2 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
      {revealCopy.message}
    </p>
  </div>

  <div className="mt-10 flex flex-col gap-3 items-center">
    <Button
      onClick={handleShare}
      size="lg"
      className="bg-white text-primary hover:bg-[#F6D76F] hover:text-primary w-full"
    >
      {ctaCopy}
    </Button>

    <button
      onClick={onReset}
      className="text-white/80 underline underline-offset-4"
    >
      Draw another card
    </button>
  </div>
</div>
      </div>

      {/* Share modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsShareModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-slate-900">
              Ready to share on LinkedIn ✨
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              ✅ Copied to clipboard
            </p>

            <div className="mt-4 grid min-w-0 grid-cols-1 sm:grid-cols-[120px_1fr] gap-4">
              {/* Card preview */}
              <div className="hidden sm:block">
                <img
                  src={cardImageUrl}
                  alt="Card preview"
                  className="rounded-lg border"
                />
              </div>

              <pre className="min-w-0 rounded-xl border bg-slate-50 p-4 text-sm whitespace-pre-wrap break-words overflow-auto max-h-60">
                {shareText}
              </pre>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                onClick={handleOpenLinkedIn}
                className="bg-[#6D28D9] text-white hover:bg-[#F6D76F] hover:text-primary"
              >
                Open LinkedIn
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}