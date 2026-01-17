import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Study: Iboga Life Change | Light Brand Consulting',
  description:
    'How Light Brand Consulting transformed a basic website into a sophisticated AI-powered platform for sacred healing. From ibogalifechange.com to ibogalifechange.ca.',
  keywords:
    'AI transformation, website redesign, case study, healing platform, digital transformation, Light Brand Consulting',
  openGraph: {
    title: 'Case Study: Iboga Life Change | Light Brand Consulting',
    description:
      'How Light Brand Consulting transformed a basic website into a sophisticated AI-powered platform.',
    type: 'article',
    url: 'https://lightbrandconsulting.com/case-studies/iboga-life-change',
  },
};

export default function IbogaCaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
