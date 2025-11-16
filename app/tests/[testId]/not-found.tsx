import Link from 'next/link';
import React from 'react';

const TestNotFound = () => {
  return (
    <main className="section">
      <div className="container" style={{ display: 'grid', gap: '1.5rem' }}>
        <div className="card">
          <div className="pill warning">Mock unavailable</div>
          <h1 style={{ margin: '0.8rem 0 0.5rem 0', color: '#0f172a' }}>Test not found</h1>
          <p style={{ color: '#475569' }}>
            The mock test you are looking for has been moved or is not available yet.
            Explore the library to pick another mock and keep the momentum going.
          </p>
          <Link className="btn primary" href="/">
            Browse mock library
          </Link>
        </div>
      </div>
    </main>
  );
};

export default TestNotFound;
