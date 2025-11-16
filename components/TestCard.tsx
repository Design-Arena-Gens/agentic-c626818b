import Link from 'next/link';
import React from 'react';
import type { MockTest } from '@/data/tests';

type Props = {
  test: MockTest;
};

const difficultyCopy: Record<MockTest['difficulty'], string> = {
  foundation: 'Foundation Level',
  advanced: 'Advanced Level',
  expert: 'Expert Level'
};

export const TestCard: React.FC<Props> = ({ test }) => {
  return (
    <article className="card floating-card" data-testid={`test-card-${test.id}`}>
      <div className="pill neutral">{difficultyCopy[test.difficulty]}</div>
      <div>
        <h3 style={{ margin: '0 0 0.65rem 0', color: '#0f172a' }}>{test.title}</h3>
        <p style={{ color: '#475569', marginBottom: '1.25rem' }}>{test.description}</p>
      </div>

      <div className="metric-list" aria-label="Test metrics">
        <div className="metric">
          <span>Duration</span>
          <span>{test.durationMinutes} mins</span>
        </div>
        <div className="metric">
          <span>Avg. Score</span>
          <span>{test.stats.avgScore}%</span>
        </div>
        <div className="metric">
          <span>Attempted</span>
          <span>{test.stats.attempts.toLocaleString()}</span>
        </div>
      </div>

      <div className="tag-list" role="list" aria-label="Syllabus coverage">
        {test.tags.map((tag) => (
          <span className="tag" key={tag} role="listitem">
            {tag}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Link className="btn primary" href={`/tests/${test.id}`}>
          View blueprint
        </Link>
        <Link className="btn outline" href={`/tests/${test.id}/take`}>
          Start mock test
        </Link>
      </div>
    </article>
  );
};

export default TestCard;
