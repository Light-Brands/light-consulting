import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies | AI Transformation Stories | Light Brand Consulting',
  description:
    'Explore real AI transformation stories. See how businesses achieved remarkable results with AI-powered development—faster timelines, better outcomes.',
  keywords:
    'AI case studies, web development transformation, AI success stories, rapid development, Light Brand Consulting',
  openGraph: {
    title: 'Case Studies | Light Brand Consulting',
    description:
      'Real AI transformation stories with remarkable results.',
    type: 'website',
    url: 'https://lightbrandconsulting.com/case-studies',
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
