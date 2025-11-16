import { notFound } from 'next/navigation';
import React from 'react';
import TestRunner from '@/components/TestRunner';
import { getMockTestById } from '@/data/tests';

type Params = {
  testId: string;
};

const TakeTestPage = async ({ params }: { params: Params }) => {
  const test = getMockTestById(params.testId);

  if (!test) {
    notFound();
  }

  return (
    <main className="section">
      <div className="container">
        <TestRunner test={test} />
      </div>
    </main>
  );
};

export default TakeTestPage;

export async function generateStaticParams() {
  const { mockTests } = await import('@/data/tests');
  return mockTests.map((test) => ({ testId: test.id }));
}
