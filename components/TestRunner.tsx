'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { MockTest, Question } from '@/data/tests';
import type { AnswerSheet, TestResult } from '@/lib/scoring';
import { calculateTestResult, formatDuration } from '@/lib/scoring';
import QuestionNavigator from './QuestionNavigator';
import ResultOverview from './ResultOverview';

type Toast = {
  id: number;
  message: string;
  tone: 'success' | 'info';
};

type Props = {
  test: MockTest;
};

type FlowState = 'active' | 'submitted';

const buildInitialAnswers = (questions: Question[]): AnswerSheet => {
  const sheet: AnswerSheet = {};
  questions.forEach((question) => {
    sheet[question.id] = {
      selectedChoiceId: undefined,
      markedForReview: false,
      timeSpentSeconds: 0
    };
  });
  return sheet;
};

export const TestRunner: React.FC<Props> = ({ test }) => {
  const router = useRouter();
  const [state, setState] = useState<FlowState>('active');
  const [answers, setAnswers] = useState<AnswerSheet>(() => buildInitialAnswers(test.questions));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(test.durationMinutes * 60);
  const [questionStart, setQuestionStart] = useState(() => Date.now());
  const [result, setResult] = useState<TestResult | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const currentQuestion = test.questions[currentIndex];

  const pushToast = (message: string, tone: Toast['tone'] = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2600);
  };

  const commitTimeForCurrent = (): AnswerSheet => {
    const now = Date.now();
    const elapsedSeconds = Math.max(0, Math.round((now - questionStart) / 1000));
    const questionId = currentQuestion.id;
    let snapshot: AnswerSheet = answers;

    setAnswers((prev) => {
      const next: AnswerSheet = {
        ...prev,
        [questionId]: {
          ...prev[questionId],
          timeSpentSeconds: (prev[questionId]?.timeSpentSeconds ?? 0) + elapsedSeconds
        }
      };
      snapshot = next;
      return next;
    });
    setQuestionStart(now);
    return snapshot;
  };

  useEffect(() => {
    if (state !== 'active') {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleSelectChoice = (choiceId: string) => {
    const questionId = currentQuestion.id;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        selectedChoiceId: choiceId
      }
    }));
  };

  const handleToggleMark = () => {
    const questionId = currentQuestion.id;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        markedForReview: !prev[questionId]?.markedForReview
      }
    }));
    pushToast('Marked for later review', 'info');
  };

  const handleJump = (index: number) => {
    if (index === currentIndex) {
      return;
    }
    commitTimeForCurrent();
    setCurrentIndex(index);
    pushToast(`Moved to question ${index + 1}`, 'info');
  };

  const handleNext = () => {
    if (currentIndex === test.questions.length - 1) {
      pushToast('You are on the last question');
      return;
    }
    commitTimeForCurrent();
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentIndex === 0) {
      pushToast('Already at the first question');
      return;
    }
    commitTimeForCurrent();
    setCurrentIndex((prev) => prev - 1);
  };

  const handleSubmit = (forced = false) => {
    if (state === 'submitted') {
      return;
    }
    const updatedSheet = commitTimeForCurrent();
    const sheet = Object.keys(updatedSheet).length ? updatedSheet : answers;
    const computedResult = calculateTestResult(
      test,
      sheet,
      test.durationMinutes * 60 - timeRemaining
    );
    setResult(computedResult);
    setState('submitted');
    if (forced) {
      pushToast('Time is up! Submitting test.', 'success');
    } else {
      pushToast('Mock test submitted successfully.', 'success');
    }
  };

  const resetTest = () => {
    setAnswers(buildInitialAnswers(test.questions));
    setCurrentIndex(0);
    setTimeRemaining(test.durationMinutes * 60);
    setQuestionStart(Date.now());
    setState('active');
    setResult(null);
    pushToast('New attempt started. Good luck!', 'success');
  };

  const answeredCount = useMemo(
    () =>
      Object.values(answers).filter((entry) => Boolean(entry.selectedChoiceId)).length,
    [answers]
  );

  if (state === 'submitted' && result) {
    return (
      <>
        <ResultOverview
          test={test}
          result={result}
          onRetake={resetTest}
        />
        <div id="toast-root">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`toast ${toast.tone === 'success' ? 'success' : ''}`}
              role="status"
            >
              {toast.message}
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <section className="question-shell">
      <header className="test-header">
        <div>
          <div className="pill neutral">Live Mock Test</div>
          <h1 style={{ margin: '0.4rem 0', color: '#0f172a' }}>{test.title}</h1>
          <p style={{ color: '#475569' }}>{test.description}</p>
        </div>
        <div className="test-meta">
          <div className="pill">
            Time left: {formatDuration(timeRemaining)}
          </div>
          <div className="pill">
            Attempted: {answeredCount}/{test.questions.length}
          </div>
          <button className="btn outline" type="button" onClick={() => router.push(`/tests/${test.id}`)}>
            View blueprint
          </button>
        </div>
      </header>

      <div className="grid" style={{ gap: '1.75rem' }}>
        <article className="question-card">
          <div className="pill neutral" style={{ marginBottom: '1rem' }}>
            Question {currentIndex + 1} · {currentQuestion.topic}
          </div>
          <h3>{currentQuestion.prompt}</h3>
          <div className="option-list">
            {currentQuestion.choices.map((choice, choiceIndex) => {
              const isSelected = answers[currentQuestion.id]?.selectedChoiceId === choice.id;
              const optionLabel = String.fromCharCode(65 + choiceIndex);
              return (
                <button
                  type="button"
                  key={choice.id}
                  className={`option ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectChoice(choice.id)}
                >
                  <span style={{ fontWeight: 600 }}>{optionLabel}</span>
                  <span>{choice.text}</span>
                </button>
              );
            })}
          </div>

          <footer className="question-controls" style={{ marginTop: '1.5rem' }}>
            <div className="control-group">
              <button className="btn" type="button" onClick={handlePrevious}>
                Previous
              </button>
              <button className="btn" type="button" onClick={handleNext}>
                Next
              </button>
            </div>
            <div className="control-group">
              <button className="btn outline" type="button" onClick={handleToggleMark}>
                Mark for review
              </button>
              <button className="btn primary" type="button" onClick={() => handleSubmit(false)}>
                Submit mock
              </button>
            </div>
          </footer>
        </article>

        <QuestionNavigator
          questions={test.questions}
          answers={answers}
          currentIndex={currentIndex}
          onJump={handleJump}
        />
      </div>

      <div id="toast-root">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast ${toast.tone === 'success' ? 'success' : ''}`}
            role="status"
          >
            {toast.message}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestRunner;
