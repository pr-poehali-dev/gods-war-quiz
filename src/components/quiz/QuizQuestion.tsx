import { Question } from "@/data/quizData";
import Icon from "@/components/ui/icon";

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
}

const LETTERS = ["A", "B", "C", "D"];

const QuizQuestion = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswer,
}: QuizQuestionProps) => {
  const progress = ((questionNumber - 1) / totalQuestions) * 100;

  const getAnswerClass = (index: number) => {
    if (selectedAnswer === null) return "answer-btn";
    if (index === question.correctIndex) return "answer-btn answer-correct";
    if (index === selectedAnswer) return "answer-btn answer-wrong";
    return "answer-btn answer-neutral";
  };

  return (
    <div className="animate-fade-slide w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-widest" style={{ color: "var(--gold-dim)" }}>
          {question.category}
        </span>
        <span className="text-xs font-mono" style={{ color: "var(--gold-dim)" }}>
          {questionNumber} / {totalQuestions}
        </span>
      </div>

      <div className="progress-track h-1 mb-8">
        <div
          className="progress-fill h-1"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="card-dark rounded-xl p-6 md:p-8 mb-6 gold-glow-sm">
        <h2 className="font-display text-2xl md:text-3xl leading-snug text-center"
          style={{ color: "hsl(45, 60%, 92%)" }}>
          {question.question}
        </h2>
      </div>

      <div className="grid gap-3">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => selectedAnswer === null && onAnswer(index)}
            disabled={selectedAnswer !== null}
            className={`${getAnswerClass(index)} w-full rounded-lg px-5 py-4 flex items-center gap-4 text-base font-medium cursor-pointer`}
          >
            <span
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border"
              style={{
                borderColor:
                  selectedAnswer !== null && index === question.correctIndex
                    ? "#22c55e"
                    : selectedAnswer !== null && index === selectedAnswer
                    ? "#ef4444"
                    : "var(--gold-dim)",
                color:
                  selectedAnswer !== null && index === question.correctIndex
                    ? "#22c55e"
                    : selectedAnswer !== null && index === selectedAnswer
                    ? "#ef4444"
                    : "var(--gold)",
              }}
            >
              {selectedAnswer !== null && index === question.correctIndex ? (
                <Icon name="Check" size={14} />
              ) : selectedAnswer !== null && index === selectedAnswer ? (
                <Icon name="X" size={14} />
              ) : (
                LETTERS[index]
              )}
            </span>
            <span>{answer}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
