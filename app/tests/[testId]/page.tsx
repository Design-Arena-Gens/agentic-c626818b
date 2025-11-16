import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import TestInstructions from '@/components/TestInstructions';
import { getMockTestById } from '@/data/tests';

type Params = {
  testId: string;
};

export async function generateStaticParams() {
  const { mockTests } = await import('@/data/tests');
  return mockTests.map((test) => ({ testId: test.id }));
}

const TestBlueprintPage = async ({ params }: { params: Params }) => {
  const test = getMockTestById(params.testId);

  if (!test) {
    notFound();
  }

  return (
    <main className="section">
      <div className="container" style={{ display: 'grid', gap: '2rem' }}>
        <header className="test-header">
          <div>
            <div className="pill neutral">Mock Blueprint</div>
            <h1 style={{ margin: '0.4rem 0', color: '#0f172a' }}>{test.title}</h1>
            <p style={{ color: '#475569', maxWidth: '720px' }}>{test.description}</p>
          </div>
          <div className="control-group">
            <Link className="btn outline" href="/">
              Back to library
            </Link>
            <Link className="btn primary" href={`/tests/${test.id}/take`}>
              Start mock
            </Link>
          </div>
        </header>

        <div className="grid" style={{ gap: '1.75rem' }}>
          <TestInstructions test={test} />
          <article className="card">
            <div className="pill neutral">What to expect</div>
            <h3 style={{ margin: '0.8rem 0 0.5rem 0', color: '#0f172a' }}>Performance benchmarks</h3>
            <p style={{ color: '#475569' }}>
              This mock mirrors past-year exam difficulty. A score above 72% consistently correlates with a 90+ percentile in the actual exam.
            </p>
            <div className="metric-list" style={{ marginTop: '1.4rem' }}>
              <div className="metric">
                <span>Historical attempts</span>
                <span>{test.stats.attempts.toLocaleString()}</span>
              </div>
              <div className="metric">
                <span>Median percentile</span>
                <span>{Math.min(99, test.stats.successRate + 25)}</span>
              </div>
              <div className="metric">
                <span>Best prep tip</span>
                <span>Stagger attempts 5 days apart for retention.</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
};

export default TestBlueprintPage;
