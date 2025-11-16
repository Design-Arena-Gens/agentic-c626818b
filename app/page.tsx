import Link from 'next/link';
import React from 'react';
import TestCard from '@/components/TestCard';
import { mockTests } from '@/data/tests';

const Page: React.FC = () => {
  return (
    <main>
      <div className="container hero">
        <div className="hero-card">
          <div className="pill">AcePrep Mock Tests</div>
          <h1>Simulate the exam. Amplify your score.</h1>
          <p>
            Adaptive mock tests engineered by exam experts. Experience real exam pressure,
            discover blind spots instantly, and follow a hyper-personalised improvement map.
          </p>
          <div className="hero-cta">
            <Link className="primary" href="#tests">
              Explore mock library
            </Link>
            <Link className="secondary" href="#why-aceprep">
              Why AcePrep works
            </Link>
          </div>
        </div>

        <div className="hero-illustration">
          <div className="badge-grid">
            <div className="badge">
              <span className="label">Intelligent pacing</span>
              <strong>Dynamic timer with auto submit</strong>
              <span>Matches real exam conditions down to the second.</span>
            </div>
            <div className="badge">
              <span className="label">Deep analytics</span>
              <strong>Topic-level mastery heatmaps</strong>
              <span>Every attempt converts into an actionable revision plan.</span>
            </div>
            <div className="badge">
              <span className="label">Adaptive ladder</span>
              <strong>3,000+ curated questions</strong>
              <span>Benchmark against the top 5% of test takers.</span>
            </div>
          </div>
        </div>
      </div>

      <section id="tests" className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Mock test library</h2>
              <p>Pick a mock tailored to your stage and prep goals. Each mock has smart analytics baked in.</p>
            </div>
            <Link className="btn outline" href="/tests/quantitative-aptitude-pro">
              Start popular mock
            </Link>
          </div>

          <div className="grid cards-3">
            {mockTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </div>
      </section>

      <section id="why-aceprep" className="section" style={{ paddingTop: '0' }}>
        <div className="container grid cards-3">
          <article className="card">
            <div className="pill neutral">Smart diagnostics</div>
            <h3 style={{ margin: '0.75rem 0 0.5rem 0', color: '#0f172a' }}>AI-assisted feedback</h3>
            <p style={{ color: '#475569' }}>
              Each attempt benchmarks against past performance. Receive micro-feedback per topic and per difficulty band within seconds.
            </p>
          </article>
          <article className="card">
            <div className="pill neutral">Powerful analytics</div>
            <h3 style={{ margin: '0.75rem 0 0.5rem 0', color: '#0f172a' }}>Time-on-task tracking</h3>
            <p style={{ color: '#475569' }}>
              Track time spent per question and recalibrate your pacing strategy with heatmaps and percentile projections.
            </p>
          </article>
          <article className="card">
            <div className="pill neutral">Revision ready</div>
            <h3 style={{ margin: '0.75rem 0 0.5rem 0', color: '#0f172a' }}>One-click review mode</h3>
            <p style={{ color: '#475569' }}>
              Quickly revisit mistakes with rich explanations, ensuring every mock translates into measurable progress.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-footer">
            <div style={{ maxWidth: '460px' }}>
              <h2 style={{ margin: '0 0 0.8rem 0' }}>Ready to outpace the competition?</h2>
              <p style={{ margin: 0 }}>
                Join thousands of aspirants who practice with AcePrep and consistently score above the 90th percentile in competitive exams.
              </p>
            </div>
            <Link href="/tests/logical-reasoning-elite/take">Attempt elite mock now</Link>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} AcePrep Mock Labs</span>
          <span>Made with focus for ambitious learners.</span>
        </div>
      </footer>
    </main>
  );
};

export default Page;
