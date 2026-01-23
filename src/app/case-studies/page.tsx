/**
 * Case Studies Index Page
 * Light Brand Consulting
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Case Studies | Light Brand Consulting',
  description:
    'Explore our portfolio of transformational AI and digital projects. See how Light Brand Consulting helps businesses achieve breakthrough results.',
  keywords:
    'AI case studies, digital transformation, business automation, Light Brand Consulting portfolio',
  openGraph: {
    title: 'Case Studies | Light Brand Consulting',
    description:
      'Explore our portfolio of transformational AI and digital projects. See how Light Brand Consulting helps businesses achieve breakthrough results.',
    type: 'website',
    url: 'https://lightbrandconsulting.com/case-studies',
    images: [
      {
        url: '/graph-image.webp',
        width: 1200,
        height: 630,
        alt: 'Case Studies | Light Brand Consulting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies | Light Brand Consulting',
    description: 'Explore our portfolio of transformational AI and digital projects.',
  },
};

const CASE_STUDIES = [
  {
    slug: 'growth-mastery',
    title: 'Growth Mastery',
    subtitle: 'From Zero Code to 370,000 Lines in Months',
    description:
      'How a non-developer with zero coding experience built an enterprise-grade platform that would take a traditional dev team years to complete—using our AI-powered systems and guidance.',
    image: '/images/case-studies/growth-mastery/hero.png',
    industry: 'Technology / SaaS',
    results: ['370K+ Lines of Code', 'Zero Prior Experience', 'Months Not Years'],
    featured: true,
  },
  {
    slug: 'iboga-life-change',
    title: 'Iboga Life Change',
    subtitle: 'From Basic Website to AI-Powered Healing Platform',
    description:
      'Complete digital transformation of a sacred healing practice, elevating from a basic template to a world-class platform that honors tradition while optimizing conversions.',
    image: '/images/case-studies/iboga/new-site-home-full.png',
    industry: 'Sacred Healing & Wellness',
    results: ['100% Design Overhaul', '10x UX Improvement', 'Premium Brand Elevation'],
    featured: false,
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-depth-base via-depth-elevated to-depth-base" />
        <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/5 to-transparent" />

        <div className="container-wide relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-radiance-gold/10 border border-radiance-gold/30 text-radiance-gold text-sm font-medium">
              Our Work
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-text-primary mb-6">
            Case <span className="text-gradient-illumination">Studies</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-text-secondary text-center max-w-3xl mx-auto">
            Real transformations. Real results. Explore how we&apos;ve helped businesses evolve into
            AI-powered enterprises that dominate their industries.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="grid gap-8 max-w-5xl mx-auto">
            {CASE_STUDIES.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="group block"
              >
                <article className="bg-depth-elevated rounded-2xl border border-depth-border overflow-hidden hover:border-radiance-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-radiance-gold/5">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative aspect-video md:aspect-auto">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Featured badge */}
                      {study.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-radiance-gold text-depth-base text-xs font-bold rounded-full">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      {/* Industry */}
                      <div className="text-radiance-gold text-sm font-medium mb-2">
                        {study.industry}
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2 group-hover:text-radiance-gold transition-colors">
                        {study.title}
                      </h2>

                      {/* Subtitle */}
                      <p className="text-text-secondary text-lg mb-4">{study.subtitle}</p>

                      {/* Description */}
                      <p className="text-text-muted mb-6">{study.description}</p>

                      {/* Results */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {study.results.map((result, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-depth-base rounded-full text-text-muted text-sm border border-depth-border"
                          >
                            {result}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-radiance-gold font-semibold group-hover:gap-4 transition-all">
                        Read Case Study
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* More Coming Soon */}
          <div className="text-center mt-16">
            <p className="text-text-muted mb-6">More case studies coming soon...</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-radiance-gold/30 text-radiance-gold rounded-lg hover:bg-radiance-gold/10 transition-colors"
            >
              Want to be our next success story?
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
