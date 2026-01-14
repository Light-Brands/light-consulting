import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iboga Life Change: From Weeks to One Day | Case Study | Light Brand Consulting',
  description:
    'See how AI-powered development transformed Iboga Life Change\'s website from a weeks-long traditional build to a soul-filled modern experience completed in just 24 hours.',
  keywords:
    'AI web development, case study, rapid development, website transformation, Light Brand Consulting, Iboga Life Change',
  openGraph: {
    title: 'From Weeks to One Day | Iboga Life Change Case Study',
    description:
      'How AI transformed a healing practice\'s digital presence—built in 1 day, 10x better results.',
    type: 'article',
    url: 'https://lightbrandconsulting.com/case-studies/iboga-life-change',
    images: [
      {
        url: '/images/case-studies/iboga-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Iboga Life Change Before and After Transformation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Weeks to One Day | AI Development Case Study',
    description:
      'How AI transformed a healing practice\'s website in just 24 hours.',
  },
};

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
