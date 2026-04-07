import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

interface CardDeckProps {
  onDrawCard: () => void;
  onShuffle: () => void;
}

const CARD_BACK_URL =
  "https://zfxcdfwxgsuezkyauuux.supabase.co/storage/v1/object/public/oracle-cards/card_back.png";

const SHUFFLE_DURATION = 900;

type StackLayer = { x: number; y: number; r: number; z: number };

export default function CardDeck({ onDrawCard, onShuffle }: CardDeckProps) {
  const [isShuffling, setIsShuffling] = useState(false);

  // Stable layered offsets (deck stack). Keep these as the "resting" pose.
  const stack = useMemo<StackLayer[]>(
    () =>
      [...Array(5)].map((_, i) => ({
        x: i * 3,
        y: i * 3,
        r: i * 2,
        z: 10 - i,
      })),
    []
  );

  const handleDraw = () => {
    if (isShuffling) return;

    setIsShuffling(true);
    onShuffle();

    window.setTimeout(() => {
      onDrawCard();
      setIsShuffling(false);
    }, SHUFFLE_DURATION);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
      {/* Local-only keyframes for LOWER cards (tighten in, then back out) */}
      <style>{`
        .deck-layer {
          transform: translate(var(--tx), var(--ty)) rotate(var(--rot));
        }

        @keyframes deck-tighten {
          0%   { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); }
          40%  { transform: translate(0px, 0px) rotate(0deg); }
          100% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); }
        }

        .deck-tighten-anim {
          animation: deck-tighten ${SHUFFLE_DURATION}ms ease-in-out both;
        }
      `}</style>

      <div className="flex flex-col items-center text-center w-full max-w-2xl">
        {/* Card deck */}
        <div className="relative w-64 h-96 mb-8 select-none">
          {/* Shadow beneath deck */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[92%] -translate-x-1/2 -translate-y-1/2 w-[82%] h-[18%] rounded-full blur-2xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 70%)",
            }}
          />

          {/* Stacked cards */}
          {stack.map((s, i) => {
            const isTop = i === 0;
            const shouldTighten = isShuffling && !isTop;

            return (
              <div
                key={i}
                className={[
                  "absolute inset-0",
                  "deck-layer",
                  shouldTighten ? "deck-tighten-anim" : "",
                ].join(" ")}
                style={
                  {
                    ["--tx" as any]: `${s.x}px`,
                    ["--ty" as any]: `${s.y}px`,
                    ["--rot" as any]: `${s.r}deg`,
                    zIndex: s.z,
                  } as React.CSSProperties
                }
              >
                {/* ✅ IMPORTANT: shake the WHOLE top card container, not the inner image */}
                <div
                  className={[
                    "w-full h-full rounded-2xl border-4 border-accent/30 overflow-hidden shadow-2xl",
                    isShuffling && isTop ? "animate-shuffle-jitter" : "",
                  ].join(" ")}
                  style={
                    isShuffling && isTop
                      ? { animationDuration: `${SHUFFLE_DURATION}ms` }
                      : undefined
                  }
                >
                  <img
                    src={CARD_BACK_URL}
                    alt=""
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}

          {/* Glow */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ boxShadow: "0 0 60px rgba(253, 224, 71, 0.35)" }}
          />
        </div>

        {/* Do not change copy */}
        <p className="text-white/85 text-sm sm:text-base mt-6 mb-6">
          Press the button, and let the Oracle do the rest ✨
        </p>

        <Button
          onClick={handleDraw}
          disabled={isShuffling}
          size="lg"
          className="bg-white text-primary px-8 py-6 text-lg
                     hover:bg-[#F6D76F] hover:text-primary
                     hover:shadow-[0_0_30px_rgba(246,215,111,0.5)]
                     transition-all duration-300"
        >
          Draw Your Card
        </Button>
      </div>
    </div>
  );
}