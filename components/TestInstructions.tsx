import React from 'react';
import type { MockTest } from '@/data/tests';

type Props = {
  test: MockTest;
};

export const TestInstructions: React.FC<Props> = ({ test }) => {
  return (
    <section className="card" aria-labelledby="instruction-heading">
      <div className="pill">Exam Blueprint</div>
      <h2 id="instruction-heading" style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>
        Before you begin
      </h2>
      <p style={{ color: '#475569', lineHeight: 1.6 }}>{test.description}</p>

      <div className="metric-list" style={{ marginTop: '1.6rem' }}>
        <div className="metric">
          <span>Duration</span>
          <span>{test.durationMinutes} minutes</span>
        </div>
        <div className="metric">
          <span>Total Questions</span>
          <span>{test.questions.length}</span>
        </div>
        <div className="metric">
          <span>Average Success Rate</span>
          <span>{test.stats.successRate}%</span>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ margin: '0 0 0.75rem 0', color: '#0f172a' }}>Syllabus focus</h3>
        <div className="tag-list">
          {test.syllabusCoverage.map((item) => (
            <span className="tag" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ margin: '0 0 0.75rem 0', color: '#0f172a' }}>Instructions</h3>
        <ol style={{ paddingLeft: '1.2rem', color: '#475569', lineHeight: 1.6 }}>
          <li>Each correct answer awards positive marks mentioned per question.</li>
          <li>Marked questions are saved and can be revisited from the navigator.</li>
          <li>Timer auto-submits when it reaches zero, so pace yourself.</li>
          <li>Use the review sheet post submission for conceptual clarity.</li>
        </ol>
      </div>
    </section>
  );
};

export default TestInstructions;
