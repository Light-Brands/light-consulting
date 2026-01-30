/**
 * Offer Playbook Page
 * Grand Slam Offer Positioning & Sales Framework
 * Light Brand Consulting
 */

import { promises as fs } from 'fs';
import path from 'path';
import { AdminHeader } from '@/components/admin';
import { Container } from '@/components/ui/Container';
import { OfferPlaybookViewer } from './OfferPlaybookViewer';

export default async function OfferPlaybookPage() {
  const filePath = path.join(process.cwd(), 'docs', 'GRAND-SLAM-OFFER-POSITIONING.md');
  const content = await fs.readFile(filePath, 'utf-8');

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Offer Playbook"
        subtitle="Grand Slam Offer Positioning & Sales Framework"
      />

      <div className="py-4 md:py-8 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          <OfferPlaybookViewer content={content} />
        </Container>
      </div>
    </div>
  );
}
