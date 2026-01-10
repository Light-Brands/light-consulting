/**
 * Portfolio Page - Next.js Page
 * Light Brand Consulting
 */

import { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Portfolio | Light Brand Consulting',
  description:
    'Explore our transformative AI projects. See how we have helped businesses achieve unprecedented efficiency and growth through intelligent automation and AI integration.',
  keywords:
    'AI portfolio, AI projects, case studies, AI transformation, business automation, Light Brand Consulting',
  openGraph: {
    title: 'Portfolio | Light Brand Consulting',
    description:
      'Explore our transformative AI projects and case studies.',
    type: 'website',
    url: 'https://lightbrandconsulting.com/portfolio',
    images: [
      {
        url: '/images/og/portfolio-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Light Brand Consulting Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Light Brand Consulting',
    description:
      'Explore our transformative AI projects and case studies.',
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
