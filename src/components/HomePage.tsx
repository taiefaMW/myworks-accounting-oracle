import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import oracleTitle from "@/assets/oracle-title.png";
import crystalBall from "@/assets/crystal-ball.png";
import FortuneCard from "@/components/FortuneCard";
import mysticalSound from "@/assets/mystical-sound.mp3";

interface HomePageProps {
  onRevealFortune: () => void;
  isCardVisible: boolean; // true => show reveal screen
}

const SLIDE_DURATION_MS = 1150; // smoother, matches CSS timing

const HomePage = ({ onRevealFortune, isCardVisible }: HomePageProps) => {
  const [isRevealing, setIsRevealing] = useState(false);

  const mysticalAudioRef = useRef<HTMLAudioElement | null>(null);

  // (optional) tiny cursor sparkles; comment out if not desired
  useEffect(() => {
    const starInterval = 80;
    let last = 0;
    function add(x: number, y: number) {
      const s = document.createElement("div");
      s.className = "cursor-star";
      s.style.left = x + "px";
      s.style.top = y + "px";
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1500);
    }
    function onMove(e: MouseEvent) {
      const t = Date.now();
      if (t - last > starInterval) {
        add(e.clientX, e.clientY);
        last = t;
      }
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleRevealClick = () => {
    // 🔮 Play mystical transition sound
if (mysticalAudioRef.current) {
  mysticalAudioRef.current.currentTime = 0;
  mysticalAudioRef.current.play().catch((err) => {
    console.log("Mystical sound play failed:", err);
  });
}
    // Slide the ball DOWN & fade hero; switch screen after the animation ends
    setIsRevealing(true);
    setTimeout(() => onRevealFortune(), SLIDE_DURATION_MS);
  };

  return (
    <div
      className="relative flex flex-col items-center min-h-[100svh] w-full px-4 overflow-x-hidden overflow-y-visible"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      {/* Background is ALWAYS mounted so stars continue on every screen */}
      <BackgroundCanvas />

      {/* Screen 1 (hero) – fade during reveal for a smoother transition */}
      {!isCardVisible && (
        <div
          className={[
            "relative z-10 flex flex-col items-center text-center max-w-4xl pt-16",
            "transition-opacity duration-[1150ms] ease-in-out",
            isRevealing ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl mb-3 text-white/90">
            Welcome To The
          </h1>

          <img
            src={oracleTitle}
            alt="Accounting Oracle"
            className="w-full max-w-[780px] mb-6 drop-shadow-[0_0_30px_rgba(253,224,71,0.35)]"
          />

          <p className="text-base sm:text-lg md:text-xl mb-10 text-white/90 max-w-2xl">
            What does 2026 hold for your ecommerce accounting journey? 🔮
          </p>

          <Button
            onClick={handleRevealClick}
            size="lg"
            className="text-lg px-8 py-6 bg-white text-primary hover:bg-[#F6D76F]
                       hover:text-primary transition-all duration-300
                       hover:shadow-[0_0_30px_rgba(253,224,71,0.5)] hover:scale-105"
          >
            Reveal My Fortune
          </Button>
        </div>
      )}

      {/* Screen 3 – the fortune/reveal view; background still runs behind */}
      {isCardVisible && (
        <div className="relative z-10 w-full flex items-center justify-center">
          <FortuneCard cardNumber={1} onReset={() => {}} />
        </div>
      )}

      {/* Crystal Ball — bigger (+20%), a bit lower, soft float, screen blend, slides DOWN to fade */}
      <div
        className={[
          "pointer-events-none fixed left-1/2 -translate-x-1/2 z-[5]",
          "transition-transform duration-[1150ms] ease-in-out",
          isRevealing ? "translate-y-[255%]" : "translate-y-[72%]", // lower start, further down on reveal
        ].join(" ")}
        style={{
          bottom: 0,
          width: "min(210vw, 1600px)", // ~20% bigger than last version
          filter: "drop-shadow(0 60px 80px rgba(125,211,252,.55))",
        }}
      >
        <img
          src={crystalBall}
          alt="Crystal Ball"
          className={[
            "w-full h-auto select-none transition-opacity duration-[1150ms]",
            "animate-oracle-float",
            isRevealing ? "opacity-0" : "opacity-100",
          ].join(" ")}
          style={{ mixBlendMode: "screen" }} // true screen blend
        />
      </div>
      {/* 🔮 Mystical transition sound */}
      <audio ref={mysticalAudioRef} src={mysticalSound} preload="auto" />
    </div>
  );
};

/* ---------------- Background (static stars + smoke + shooting stars) ---------------- */
function BackgroundCanvas() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-visible">
        {/* STATIC background (no twinkle) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://myworks.software/oracle/assets/oracle-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Stars texture (static) */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "url('https://myworks.software/oracle/assets/bg-stars.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Smoke drift (subtle, screen blend) */}
        <div
          className="absolute left-0 right-0 bottom-0 h-72 opacity-30"
          style={{
            backgroundImage:
              "url('https://myworks.software/oracle/assets/bg-smoke.png')",
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "screen",
            animation: "smoke-drift 20s ease-in-out infinite",
          }}
        />
      </div>

      {/* Floating pin stars + SHOOTING STARS (persist across screens) */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-visible">
        {/* Pin stars */}
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

        {/* SHOOTING STARS — paths/orientation from your reference */}
        <div className="shooting-star left-to-right"  style={{ bottom:"10%", left:"20%", animation:"shoot-upleft-right 3s ease-in infinite",  animationDelay:"2s" }} />
        <div className="shooting-star right-to-left"  style={{ bottom:"15%", right:"15%", animation:"shoot-upright-left 2.5s ease-in infinite", animationDelay:"5s" }} />
        <div className="shooting-star steep-left"     style={{ bottom:"25%", left:"10%", animation:"shoot-steep-left 3.5s ease-in infinite",  animationDelay:"8s" }} />
        <div className="shooting-star shallow-right"  style={{ bottom:"20%", right:"25%", animation:"shoot-shallow-right 3s ease-in infinite", animationDelay:"11s" }} />
        <div className="shooting-star left-to-right"  style={{ bottom:"30%", left:"40%", animation:"shoot-upleft-right 2.8s ease-in infinite", animationDelay:"4s" }} />
        <div className="shooting-star steep-right"    style={{ bottom:"12%", right:"35%", animation:"shoot-steep-right 3.2s ease-in infinite", animationDelay:"14s" }} />
        <div className="shooting-star shallow-left"   style={{ bottom:"18%", left:"60%", animation:"shoot-shallow-left 2.7s ease-in infinite", animationDelay:"7s" }} />
        <div className="shooting-star right-to-left"  style={{ bottom:"28%", right:"10%", animation:"shoot-upright-left 3.3s ease-in infinite",  animationDelay:"10s" }} />
      </div>

      <style>{`
        /* Soft floating for the ball */
        @keyframes oracle-float { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-12px) } }
        .animate-oracle-float { animation: oracle-float 4s ease-in-out infinite; }

        /* Smoke */
        @keyframes smoke-drift { 0%,100% { transform: translateX(0) } 50% { transform: translateX(20px) } }

        /* Pin stars */
        .floating-star { position:absolute; width:4px; height:4px; background:#fff; border-radius:50%;
          opacity:.85; box-shadow:0 0 10px rgba(255,255,255,.85); }

        /* SHOOTING STARS (exact orientation) */
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

        /* Cursor trailing stars (optional) */
        .cursor-star{ position:fixed; width:3px; height:3px; background:#fff; border-radius:50%;
          pointer-events:none; opacity:0; box-shadow:0 0 8px rgba(255,255,255,.8);
          z-index:9999; animation:fade-out 1.5s ease-out forwards; }
        @keyframes fade-out{ 0%{ opacity:1; transform:scale(1) } 100%{ opacity:0; transform:scale(.3) } }

        /* Deck instruction (apply this class on the deck screen element) */
        .deck-instruction { font-family:'DM Sans',sans-serif; font-size: clamp(.8rem,1.6vh,1rem); color: rgba(255,255,255,.9); }
      `}</style>
    </>
  );
}

export default HomePage;