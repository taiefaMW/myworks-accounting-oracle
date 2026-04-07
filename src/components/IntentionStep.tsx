import { Button } from "./ui/button";

export type IntentionValue =
  | "Reconciliation Rhythm"
  | "Cash Flow Clarity"
  | "Month-end Calm"
  | "Inventory Accuracy";

interface IntentionStepProps {
  value: IntentionValue | null;
  onChange: (next: IntentionValue) => void;
  onContinue: () => void;
  disabled?: boolean;
}

const INTENTIONS: IntentionValue[] = [
  "Reconciliation Rhythm",
  "Cash Flow Clarity",
  "Month-end Calm",
  "Inventory Accuracy",
];

const IntentionStep = ({
  value,
  onChange,
  onContinue,
  disabled = false,
}: IntentionStepProps) => {
  return (
    <div className="w-full max-w-2xl text-center">
      <h2 className="text-white/90 text-lg sm:text-xl md:text-2xl font-medium mb-6">
        What are you hoping to transform in 2026?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {INTENTIONS.map((label) => {
          const selected = value === label;
          return (
            <Button
              key={label}
              type="button"
              onClick={() => onChange(label)}
              variant="outline"
              className={[
                "justify-center py-6 text-base md:text-lg border-2",
                selected
                  ? "bg-white text-primary border-white shadow-[0_0_30px_rgba(246,215,111,0.25)]"
                  : "bg-transparent text-white/90 border-white/20 hover:border-white/50 hover:bg-white/10",
              ].join(" ")}
            >
              {label}
            </Button>
          );
        })}
      </div>

      <p className="mt-5 text-white/80">
        Set your intention — the Oracle will meet you there 🪄
      </p>

      <div className="mt-6">
        <Button
          onClick={onContinue}
          disabled={disabled}
          size="lg"
          className={[
            "text-base md:text-lg px-8 py-6 transition-all duration-300",
            disabled
              ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
              : "bg-white text-primary hover:bg-[#F6D76F] hover:text-primary hover:shadow-[0_0_30px_rgba(246,215,111,0.5)] hover:scale-105",
          ].join(" ")}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default IntentionStep;