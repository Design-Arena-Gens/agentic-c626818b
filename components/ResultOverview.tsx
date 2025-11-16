import React from 'react';
import type { MockTest } from '@/data/tests';
import type { TestResult } from '@/lib/scoring';
import { formatDuration } from '@/lib/scoring';

type Props = {
  test: MockTest;
  result: TestResult;
  onRetake: () => void;
};

const percentage = (value: number): string => `${Math.round(value * 100)}%`;

export const ResultOverview: React.FC<Props> = ({ test, result, onRetake }) => {
  const normalizedScore = Math.max(0, Math.round((result.obtainedMarks / result.totalMarks) * 100));

  return (
    <section className="question-shell" aria-labelledby="result-heading">
      <header className="test-header">
        <div>
          <div className="pill success">Attempt Complete</div>
          <h2 id="result-heading" style={{ margin: '0.5rem 0', color: '#0f172a' }}>
            {test.title} — Performance report
          </h2>
          <p style={{ color: '#475569' }}>
            Detailed analytics for your latest mock attempt. Use the insights below to
            target revisions for the next session.
          </p>
        </div>
        <div className="control-group">
          <button className="btn outline" type="button" onClick={onRetake}>
            Retake mock
          </button>
        </div>
      </header>

      <div className="grid cards-3">
        <article className="card analytics-card">
          <h3 style={{ margin: 0, color: '#0f172a' }}>Overall score</h3>
          <div
            className="score-gauge"
            style={{
              margin: '0 auto',
              ['--score' as string]: `${normalizedScore}`
            }}
            data-label={`${normalizedScore}%`}
            aria-label={`Overall score ${normalizedScore} percent`}
          />
          <div className="metric-list">
            <div className="metric">
              <span>Correct</span>
              <span>
                {result.correct} / {result.totalQuestions}
              </span>
            </div>
            <div className="metric">
              <span>Accuracy</span>
              <span>{percentage(result.accuracy)}</span>
            </div>
            <div className="metric">
              <span>Percentile (mock)</span>
              <span>{result.percentile}</span>
            </div>
          </div>
        </article>

        <article className="card analytics-card">
          <h3 style={{ margin: 0, color: '#0f172a' }}>Time intelligence</h3>
          <div className="metric-list">
            <div className="metric">
              <span>Total time</span>
              <span>{formatDuration(result.durationSeconds)}</span>
            </div>
            <div className="metric">
              <span>Avg / question</span>
              <span>{formatDuration(Math.round(result.averageTimePerQuestion))}</span>
            </div>
            <div className="metric">
              <span>Attempted</span>
              <span>
                {result.attempted} attempted · {result.skipped} skipped
              </span>
            </div>
          </div>
          <div>
            <p style={{ color: '#475569', lineHeight: 1.5 }}>
              Keep a buffer of at least 6 minutes for review. Focus on high-mark
              questions with lower time spent to lift your percentile.
            </p>
          </div>
        </article>

        <article className="card analytics-card">
          <h3 style={{ margin: 0, color: '#0f172a' }}>Improvement playbook</h3>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.7 }}>
            {result.byTopic.slice(0, 3).map((slice) => (
              <li key={slice.id}>
                {slice.label}: {slice.correct}/{slice.totalQuestions} correct —{' '}
                {percentage(slice.accuracy)} accuracy
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="grid" style={{ marginTop: '2rem', gap: '2rem' }}>
        <article className="card">
          <h3 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>Topic mastery</h3>
          <div className="grid" style={{ gap: '1rem' }}>
            {result.byTopic.map((slice) => (
              <div key={slice.id} style={{ display: 'grid', gap: '0.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ color: '#0f172a' }}>{slice.label}</strong>
                  <span style={{ color: '#475569' }}>
                    {slice.correct}/{slice.totalQuestions} correct
                  </span>
                </div>
                <div className="progress-bar" role="progressbar" aria-valuenow={slice.accuracy * 100} aria-valuemin={0} aria-valuemax={100}>
                  <span style={{ width: `${slice.accuracy * 100}%` }} />
                </div>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  Avg time {formatDuration(Math.round(slice.avgTimeSeconds))}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="card">
          <h3 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>Difficulty curve</h3>
          <div className="grid" style={{ gap: '1rem' }}>
            {result.byDifficulty.map((slice) => (
              <div key={slice.id} style={{ display: 'grid', gap: '0.35rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#0f172a', textTransform: 'capitalize' }}>
                    {slice.label}
                  </span>
                  <span style={{ color: '#475569' }}>
                    {slice.correct}/{slice.totalQuestions}
                  </span>
                </div>
                <div className="progress-bar" role="progressbar" aria-valuenow={slice.accuracy * 100} aria-valuemin={0} aria-valuemax={100}>
                  <span style={{ width: `${slice.accuracy * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>Question review</h3>
        <div className="review-panel">
          {result.questionBreakdown.map((entry, index) => {
            const question = test.questions[index];
            const selected = entry.selectedChoiceId
              ? question.choices.find((choice) => choice.id === entry.selectedChoiceId)?.text
              : 'Not answered';
            const correct = question.choices.find((choice) => choice.id === entry.answerId)?.text;

            return (
              <div
                key={entry.questionId}
                className="review-item"
                aria-label={`Review question ${index + 1}`}
              >
                <h4>Q{index + 1}: {question.prompt}</h4>
                <p><strong>Your answer:</strong> {selected}</p>
                <p><strong>Correct answer:</strong> {correct}</p>
                <p style={{ color: '#475569' }}>
                  {entry.isCorrect ? 'Great job!' : question.explanation}
                </p>
              </div>
            );
          })}
        </div>
      </article>
    </section>
  );
};

export default ResultOverview;
