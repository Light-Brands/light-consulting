'use client';

import { Suspense } from 'react';
import { GoBookPage } from '@/page-components/go/GoBookPage';

export default function GoBook() {
  return (
    <Suspense>
      <GoBookPage />
    </Suspense>
  );
}
