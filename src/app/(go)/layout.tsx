import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Light Brands | AI-Powered Growth for 7 & 8-Figure Businesses',
  description:
    'Scale your business with AI — without hiring a team. Apply for an AI Readiness Call.',
  openGraph: {
    title: 'Light Brands | AI-Powered Growth',
    description:
      'Scale your business with AI — without hiring a team. Apply for an AI Readiness Call.',
    type: 'website',
    url: 'https://go.lightbrands.ai',
  },
};

export default function GoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
