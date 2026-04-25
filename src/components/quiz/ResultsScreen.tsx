import Icon from "@/components/ui/icon";
import { Question } from "@/data/quizData";

interface ResultsScreenProps {
  score: number;
  total: number;
  answers: (number | null)[];
  questions: Question[];
  onRestart: () => void;
}

const getStars = (percent: number) => {
  if (percent >= 90) return 3;
  if (percent >= 60) return 2;
  if (percent >= 30) return 1;
  return 0;
};

const getRank = (percent: number) => {
  if (percent === 100) return { title: "Легендарный знаток", color: "var(--gold-bright)" };
  if (percent >= 90) return { title: "Гроссмейстер", color: "var(--gold)" };
  if (percent >= 70) return { title: "Знаток", color: "#a78bfa" };
  if (percent >= 50) return { title: "Исследователь", color: "#60a5fa" };
  if (percent >= 30) return { title: "Ученик", color: "#94a3b8" };
  return { title: "Новичок", color: "#64748b" };
};

const ResultsScreen = ({
  score,
  total,
  answers,
  questions,
  onRestart,
}: ResultsScreenProps) => {
  const percent = Math.round((score / total) * 100);
  const stars = getStars(percent);
  const rank = getRank(percent);

  return (
    <div className="animate-fade-slide w-full max-w-2xl mx-auto">
      <div className="card-dark rounded-2xl p-8 text-center mb-6 gold-glow">
        <div className="star-rating flex justify-center gap-2 mb-5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                fontSize: 36,
                color: i < stars ? "var(--gold-bright)" : "var(--gold-dim)",
                filter: i < stars ? "drop-shadow(0 0 8px var(--gold))" : "none",
                animationDelay: `${i * 0.15}s`,
              }}
            >
              ★
            </span>
          ))}
        </div>

        <h2
          className="font-display text-3xl md:text-4xl mb-1"
          style={{ color: rank.color }}
        >
          {rank.title}
        </h2>

        <div className="divider-gold my-5" />

        <div className="flex items-end justify-center gap-2 mb-1">
          <span
            className="font-display text-6xl font-bold"
            style={{ color: "var(--gold-bright)" }}
          >
            {score}
          </span>
          <span
            className="text-2xl mb-2"
            style={{ color: "var(--gold-dim)" }}
          >
            / {total}
          </span>
        </div>
        <p className="text-sm" style={{ color: "hsl(45, 30%, 55%)" }}>
          правильных ответов — {percent}%
        </p>
      </div>

      <div className="card-dark2 rounded-xl p-5 mb-6">
        <h3
          className="text-xs uppercase tracking-widest mb-4 flex items-center gap-2"
          style={{ color: "var(--gold-dim)" }}
        >
          <Icon name="ListChecks" size={14} />
          Разбор ответов
        </h3>
        <div className="space-y-2">
          {questions.map((q, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === q.correctIndex;
            return (
              <div
                key={q.id}
                className="flex items-start gap-3 py-3 border-b"
                style={{ borderColor: "rgba(201,168,76,0.1)" }}
              >
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                  style={{
                    background: isCorrect
                      ? "rgba(34,197,94,0.15)"
                      : "rgba(239,68,68,0.15)",
                  }}
                >
                  <Icon
                    name={isCorrect ? "Check" : "X"}
                    size={12}
                    className={isCorrect ? "text-green-400" : "text-red-400"}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium leading-snug mb-1"
                    style={{ color: "hsl(45, 55%, 85%)" }}
                  >
                    {q.question}
                  </p>
                  {!isCorrect && (
                    <p className="text-xs" style={{ color: "#4ade80" }}>
                      Правильно: {q.answers[q.correctIndex]}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="btn-gold w-full rounded-lg py-4 text-sm flex items-center justify-center gap-2"
      >
        <Icon name="RotateCcw" size={18} />
        Пройти снова
      </button>
    </div>
  );
};

export default ResultsScreen;
