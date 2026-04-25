import Icon from "@/components/ui/icon";

interface ExplanationPanelProps {
  explanation: string;
  isCorrect: boolean;
  onNext: () => void;
  isLast: boolean;
}

const ExplanationPanel = ({
  explanation,
  isCorrect,
  onNext,
  isLast,
}: ExplanationPanelProps) => {
  return (
    <div className="explanation-panel w-full max-w-2xl mx-auto mt-6">
      <div
        className="rounded-xl p-5 md:p-6 mb-4"
        style={{
          background: isCorrect
            ? "rgba(34, 197, 94, 0.07)"
            : "rgba(239, 68, 68, 0.07)",
          border: `1px solid ${isCorrect ? "rgba(34, 197, 94, 0.35)" : "rgba(239, 68, 68, 0.35)"}`,
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Icon
            name={isCorrect ? "CheckCircle2" : "XCircle"}
            size={20}
            className={isCorrect ? "text-green-400" : "text-red-400"}
          />
          <span
            className="font-semibold text-sm uppercase tracking-wider"
            style={{ color: isCorrect ? "#4ade80" : "#f87171" }}
          >
            {isCorrect ? "Правильно!" : "Неверно"}
          </span>
        </div>
        <div className="divider-gold mb-4" />
        <div className="flex gap-3">
          <Icon
            name="BookOpen"
            size={18}
            className="flex-shrink-0 mt-0.5"
            style={{ color: "var(--gold)" } as React.CSSProperties}
          />
          <p className="text-sm leading-relaxed" style={{ color: "hsl(45, 55%, 80%)" }}>
            {explanation}
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="btn-gold w-full rounded-lg py-4 text-sm flex items-center justify-center gap-2"
      >
        {isLast ? (
          <>
            <Icon name="Trophy" size={18} />
            Посмотреть результаты
          </>
        ) : (
          <>
            Следующий вопрос
            <Icon name="ArrowRight" size={18} />
          </>
        )}
      </button>
    </div>
  );
};

export default ExplanationPanel;
