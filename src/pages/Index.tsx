import { useState } from "react";
import { questions } from "@/data/quizData";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import ExplanationPanel from "@/components/quiz/ExplanationPanel";
import ResultsScreen from "@/components/quiz/ResultsScreen";
import Icon from "@/components/ui/icon";

type Screen = "start" | "quiz" | "results";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleStart = () => {
    setScreen("quiz");
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setScore(0);
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    const isCorrect = index === currentQuestion.correctIndex;
    setAnswers((prev) => [...prev, index]);
    if (isCorrect) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (isLast) {
      setScreen("results");
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
    }
  };

  if (screen === "results") {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="py-5 px-6 flex items-center justify-center border-b" style={{ borderColor: "rgba(201,168,76,0.15)" }}>
          <span className="font-display text-xl gold-text tracking-wide">Результаты</span>
        </header>
        <main className="flex-1 px-4 py-8">
          <ResultsScreen
            score={score}
            total={questions.length}
            answers={answers}
            questions={questions}
            onRestart={handleStart}
          />
        </main>
      </div>
    );
  }

  if (screen === "quiz") {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="py-4 px-6 flex items-center justify-between border-b" style={{ borderColor: "rgba(201,168,76,0.15)" }}>
          <button
            onClick={() => setScreen("start")}
            className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
            style={{ color: "var(--gold-dim)" }}
          >
            <Icon name="ChevronLeft" size={16} />
            Выйти
          </button>
          <span className="font-display text-xl gold-text tracking-wide">Викторина</span>
          <div className="flex items-center gap-1.5">
            <Icon name="Star" size={14} style={{ color: "var(--gold)" } as React.CSSProperties} />
            <span className="text-sm font-mono" style={{ color: "var(--gold)" }}>{score}</span>
          </div>
        </header>

        <main className="flex-1 px-4 py-8">
          <QuizQuestion
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={selectedAnswer}
            onAnswer={handleAnswer}
          />
          {selectedAnswer !== null && (
            <ExplanationPanel
              explanation={currentQuestion.explanation}
              isCorrect={selectedAnswer === currentQuestion.correctIndex}
              onNext={handleNext}
              isLast={isLast}
            />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center animate-scale-in">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 gold-glow"
          style={{ background: "linear-gradient(135deg, var(--dark-card), var(--dark-card2))", border: "2px solid var(--gold-dim)" }}
        >
          <Icon name="Brain" size={38} style={{ color: "var(--gold)" } as React.CSSProperties} />
        </div>

        <h1 className="font-display text-5xl md:text-6xl mb-3 gold-text">
          Викторина
        </h1>
        <p className="text-lg mb-2" style={{ color: "hsl(45, 30%, 60%)" }}>
          Проверь свои знания
        </p>

        <div className="divider-gold my-8" />

        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: "HelpCircle", label: "Вопросов", value: questions.length },
            { icon: "BookOpen", label: "Тем", value: "10" },
            { icon: "Trophy", label: "Звёзд", value: "3" },
          ].map((stat) => (
            <div key={stat.label} className="card-dark2 rounded-xl py-4 px-2">
              <Icon
                name={stat.icon as "HelpCircle"}
                size={20}
                className="mx-auto mb-2"
                style={{ color: "var(--gold)" } as React.CSSProperties}
              />
              <div className="font-display text-2xl gold-bright-text">{stat.value}</div>
              <div className="text-xs mt-1" style={{ color: "var(--gold-dim)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="card-dark2 rounded-xl p-5 mb-8 text-left">
          <h3
            className="text-xs uppercase tracking-widest mb-3 flex items-center gap-2"
            style={{ color: "var(--gold-dim)" }}
          >
            <Icon name="Info" size={13} />
            Как играть
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: "hsl(45, 40%, 70%)" }}>
            <li className="flex items-center gap-2">
              <Icon name="ChevronRight" size={14} style={{ color: "var(--gold)" } as React.CSSProperties} />
              Выбери один из четырёх вариантов ответа
            </li>
            <li className="flex items-center gap-2">
              <Icon name="ChevronRight" size={14} style={{ color: "var(--gold)" } as React.CSSProperties} />
              После ответа читай подробное объяснение
            </li>
            <li className="flex items-center gap-2">
              <Icon name="ChevronRight" size={14} style={{ color: "var(--gold)" } as React.CSSProperties} />
              Набери как можно больше очков и получи звёзды
            </li>
          </ul>
        </div>

        <button
          onClick={handleStart}
          className="btn-gold w-full rounded-xl py-5 text-base flex items-center justify-center gap-3"
        >
          <Icon name="Play" size={20} />
          Начать викторину
        </button>
      </div>
    </div>
  );
};

export default Index;
