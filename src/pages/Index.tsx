import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import HomePage from "@/components/HomePage";
import CardDeck from "@/components/CardDeck";
import FortuneCard from "@/components/FortuneCard";

import magicSpell from "@/assets/magic-spell.mp3";
import cardMixing from "@/assets/card-mixing.mp3";

import { trackDraw, attachOracleDebugHelpers } from "@/lib/oracleTracking";

type ViewState = "home" | "deck" | "card";

const TOTAL_CARDS = 39;

function toCardNumber(n: number | null): number | null {
  if (!n) return null;
  if (n < 1 || n > TOTAL_CARDS) return null;
  return n;
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function Index() {
  attachOracleDebugHelpers();

  const navigate = useNavigate();
  const location = useLocation();

  // Parse card number from pathname manually:
  // Supports /oracle and /oracle/card-36
  const resolvedCard = useMemo(() => {
    const match = location.pathname.match(/\/oracle\/card-(\d+)/);
    if (!match) return null;
    return toCardNumber(Number(match[1]));
  }, [location.pathname]);

  const [view, setView] = useState<ViewState>(resolvedCard ? "card" : "home");
  const [selectedCard, setSelectedCard] = useState<number>(resolvedCard ?? 1);

  const audioRef = useRef<HTMLAudioElement>(null);
  const shuffleAudioRef = useRef<HTMLAudioElement>(null);

  // Keep UI state in sync with URL
  useEffect(() => {
    if (resolvedCard) {
      setSelectedCard(resolvedCard);
      setView("card");
      return;
    }

    // No card in URL: ensure we’re not stuck in card view
    setView((prev) => (prev === "card" ? "home" : prev));
  }, [resolvedCard]);

  const handleRevealFortune = () => setView("deck");

  const handleShuffle = () => {
    shuffleAudioRef.current?.play().catch(() => {});
  };

  const handleDrawCard = () => {
    const randomCard = Math.floor(Math.random() * TOTAL_CARDS) + 1;

    setSelectedCard(randomCard);
    trackDraw(randomCard);

    // Canonical share URL format
    navigate(`/oracle/card-${pad2(randomCard)}`, { replace: true });

    audioRef.current?.play().catch(() => {});

    setView("card");
  };

  const handleReset = () => {
    // Back to deck with clean URL
    navigate(`/oracle`, { replace: true });
    setView("deck");
  };

  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <PersistentBackground />

      <div className="relative z-10">
        {view === "home" && (
          <HomePage onRevealFortune={handleRevealFortune} isCardVisible={false} />
        )}

        {view === "deck" && (
          <CardDeck onDrawCard={handleDrawCard} onShuffle={handleShuffle} />
        )}

        {view === "card" && (
          <FortuneCard cardNumber={selectedCard} onReset={handleReset} />
        )}
      </div>

      <audio ref={audioRef} src={magicSpell} preload="auto" />
      <audio ref={shuffleAudioRef} src={cardMixing} preload="auto" />
    </main>
  );
}

/**
 * Background: FULL original version (includes floating stars + shooting stars).
 * Taken from your uploaded Index.tsx. :contentReference[oaicite:1]{index=1}
 */
function PersistentBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-visible">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('https://myworks.software/oracle/assets/oracle-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "url('https://myworks.software/oracle/assets/bg-stars.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute left-0 right-0 bottom-0 h-72 opacity-30"
        style={{
          backgroundImage: "url('https://myworks.software/oracle/assets/bg-smoke.png')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          mixBlendMode: "screen",
          animation: "smoke-drift 20s ease-in-out infinite",
        }}
      />

      <div className="absolute inset-0 overflow-visible">
        <div className="floating-star" style={{ top: "10%", left: "15%" }} />
        <div className="floating-star" style={{ top: "20%", left: "80%" }} />
        <div className="floating-star" style={{ top: "40%", left: "10%" }} />
        <div className="floating-star" style={{ top: "60%", left: "85%" }} />
        <div className="floating-star" style={{ top: "70%", left: "25%" }} />
        <div className="floating-star" style={{ top: "85%", left: "70%" }} />
        <div className="floating-star" style={{ top: "15%", left: "45%" }} />
        <div className="floating-star" style={{ top: "50%", left: "60%" }} />
        <div className="floating-star" style={{ top: "30%", left: "35%" }} />
        <div className="floating-star" style={{ top: "75%", left: "50%" }} />
        <div className="floating-star" style={{ top: "25%", left: "90%" }} />
        <div className="floating-star" style={{ top: "55%", left: "20%" }} />

        <div
          className="shooting-star left-to-right"
          style={{ bottom: "10%", left: "20%", animation: "shoot-upleft-right 3s ease-in infinite", animationDelay: "2s" }}
        />
        <div
          className="shooting-star right-to-left"
          style={{ bottom: "15%", right: "15%", animation: "shoot-upright-left 2.5s ease-in infinite", animationDelay: "5s" }}
        />
        <div
          className="shooting-star steep-left"
          style={{ bottom: "25%", left: "10%", animation: "shoot-steep-left 3.5s ease-in infinite", animationDelay: "8s" }}
        />
        <div
          className="shooting-star shallow-right"
          style={{ bottom: "20%", right: "25%", animation: "shoot-shallow-right 3s ease-in infinite", animationDelay: "11s" }}
        />
        <div
          className="shooting-star left-to-right"
          style={{ bottom: "30%", left: "40%", animation: "shoot-upleft-right 2.8s ease-in infinite", animationDelay: "4s" }}
        />
        <div
          className="shooting-star steep-right"
          style={{ bottom: "12%", right: "35%", animation: "shoot-steep-right 3.2s ease-in infinite", animationDelay: "14s" }}
        />
        <div
          className="shooting-star shallow-left"
          style={{ bottom: "18%", left: "60%", animation: "shoot-shallow-left 2.7s ease-in infinite", animationDelay: "7s" }}
        />
        <div
          className="shooting-star right-to-left"
          style={{ bottom: "28%", right: "10%", animation: "shoot-upright-left 3.3s ease-in infinite", animationDelay: "10s" }}
        />
      </div>

      <style>{`
        @keyframes smoke-drift { 0%,100% { transform: translateX(0) } 50% { transform: translateX(20px) } }
        .floating-star { position:absolute; width:4px; height:4px; background:#fff; border-radius:50%;
          opacity:.85; box-shadow:0 0 10px rgba(255,255,255,.85); }
        .shooting-star{ position:absolute; width:2px; height:2px; background:#fff; border-radius:50%;
          box-shadow:0 0 10px 2px rgba(255,255,255,.8); opacity:0; }
        .shooting-star::after{ content:''; position:absolute; top:0; left:0; width:80px; height:2px;
          background:linear-gradient(to left, white, transparent); transform-origin:right center; }

        .shooting-star.left-to-right::after  { transform: rotate(-63deg); }
        .shooting-star.right-to-left::after  { transform: rotate(-120deg); }
        .shooting-star.steep-left::after     { transform: rotate(-72deg); }
        .shooting-star.steep-right::after    { transform: rotate(-113deg); }
        .shooting-star.shallow-left::after   { transform: rotate(-49deg); }
        .shooting-star.shallow-right::after  { transform: rotate(-135deg); }

        @keyframes shoot-upleft-right { 0%{ transform:translate(0,0); opacity:0 } 10%{ opacity:1 }
          90%{ opacity:.5 } 100%{ transform:translate(200px,-400px); opacity:0 } }
        @keyframes shoot-upright-left { 0%{ transform:translate(0,0); opacity:0 } 10%{ opacity:1 }
          90%{ opacity:.5 } 100%{ transform:translate(-220px,-380px); opacity:0 } }
        @keyframes shoot-steep-left { 0%{ transform:translate(0,0); opacity:0 } 10%{ opacity:1 }
          90%{ opacity:.5 } 100%{ transform:translate(150px,-450px); opacity:0 } }
        @keyframes shoot-steep-right { 0%{ transform:translate(0,0); opacity:0 } 10%{ opacity:1 }
          90%{ opacity:.5 } 100%{ transform:translate(-180px,-420px); opacity:0 } }
        @keyframes shoot-shallow-left { 0%{ transform:translate(0,0); opacity:0 } 10%{ opacity:1 }
          90%{ opacity:.5 } 100%{ transform:translate(280px,-320px); opacity:0 } }
        @keyframes shoot-shallow-right { 0%{ transform:translate(0,0); opacity:0 } 10%{ opacity:1 }
          90%{ opacity:.5 } 100%{ transform:translate(-300px,-300px); opacity:0 } }
      `}</style>
    </div>
  );
}