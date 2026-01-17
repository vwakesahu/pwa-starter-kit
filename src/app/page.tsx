'use client';

import { siteConfig } from '@/lib/constants';
import { PageWrapper } from '@/components/page-wrapper';

export default function Page() {
  return (
    <PageWrapper className="py-4 safe-area-px">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{siteConfig.name}</h1>
      </div>
    </PageWrapper>
  );
}