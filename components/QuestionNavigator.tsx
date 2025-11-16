import React from 'react';
import type { Question } from '@/data/tests';
import type { AnswerSheet } from '@/lib/scoring';

type Props = {
  questions: Question[];
  answers: AnswerSheet;
  currentIndex: number;
  onJump: (index: number) => void;
};

export const QuestionNavigator: React.FC<Props> = ({
  questions,
  answers,
  currentIndex,
  onJump
}) => {
  return (
    <aside className="card" aria-label="Question navigator">
      <div className="pill neutral">Navigate</div>
      <h3 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>Question index</h3>
      <div className="legend" style={{ marginBottom: '1rem' }}>
        <span style={{ color: '#2563eb' }}>Current</span>
        <span style={{ color: '#15803d' }}>Answered</span>
        <span style={{ color: '#c2410c' }}>Marked</span>
      </div>
      <div className="navigator">
        {questions.map((question, index) => {
          const answer = answers[question.id];
          const isCurrent = index === currentIndex;
          const wasAnswered = Boolean(answer?.selectedChoiceId);
          const marked = Boolean(answer?.markedForReview);

          const classNames = [
            'nav-item',
            isCurrent ? 'current' : '',
            marked ? 'marked' : '',
            !marked && wasAnswered ? 'answered' : ''
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={question.id}
              type="button"
              className={classNames}
              onClick={() => onJump(index)}
              aria-label={`Question ${index + 1}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default QuestionNavigator;
