import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Study: Growth Mastery | Light Brand Consulting',
  description:
    'How a non-developer built a 370,000+ line enterprise platform in months instead of years. Discover how AI-powered development and Light Consulting guidance made the impossible possible.',
  keywords:
    'AI development, rapid development, case study, enterprise platform, digital transformation, Light Brand Consulting, no-code to code, accelerated development',
  openGraph: {
    title: 'Case Study: Growth Mastery | Light Brand Consulting',
    description:
      'From zero coding experience to 370,000 lines of production code in months. The future of software development.',
    type: 'article',
    url: 'https://lightbrandconsulting.com/case-studies/growth-mastery',
    images: [
      {
        url: '/graph-image.webp',
        width: 1200,
        height: 630,
        alt: 'Case Study: Growth Mastery | Light Brand Consulting',
      },
    ],
  },
};

export default function GrowthMasteryCaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
