'use client';

/**
 * Case Study: Iboga Life Change
 * From Basic Website to AI-Powered Healing Platform
 * Light Brand Consulting
 */

import { useState } from 'react';
import Image from 'next/image';

// Transformation metrics
const METRICS = [
  { label: 'Design Overhaul', value: '100%', description: 'Complete visual transformation' },
  { label: 'Pages Redesigned', value: '6+', description: 'Unique, purposeful pages' },
  { label: 'User Experience', value: '10x', description: 'Improved navigation & flow' },
  { label: 'Brand Elevation', value: 'Premium', description: 'From basic to world-class' },
];

// Key transformations
const TRANSFORMATIONS = [
  {
    title: 'Visual Identity Revolution',
    description:
      'Replaced the generic dark template with a sophisticated, earth-toned design that honors the sacred nature of Iboga healing. The new palette features rich forest greens, warm golds, and organic textures.',
    before: 'Generic black background with basic text',
    after: 'Immersive, atmospheric design with layered imagery and gradient overlays',
  },
  {
    title: 'Typography & Brand Voice',
    description:
      'Elevated from standard web fonts to carefully curated typography that conveys both wisdom and warmth. Headlines now carry weight and authority while remaining approachable.',
    before: 'Standard system fonts with no hierarchy',
    after: 'Custom serif headings with elegant sans-serif body text',
  },
  {
    title: 'Navigation & User Journey',
    description:
      'Completely restructured the information architecture. Visitors now experience a clear, intentional journey from discovery to connection.',
    before: 'Cluttered dropdown menus with unclear organization',
    after: 'Clean, intuitive navigation with purposeful CTAs',
  },
  {
    title: 'Content Strategy',
    description:
      'Developed comprehensive, authentic content that educates visitors while building trust. Each page tells a story and guides users toward transformation.',
    before: 'Sparse, incomplete content across pages',
    after: 'Rich, engaging content with clear value propositions',
  },
  {
    title: 'Interactive Elements',
    description:
      'Added modern UI components like accordion FAQs, smooth animations, and responsive design that works beautifully across all devices.',
    before: 'Static pages with minimal interactivity',
    after: 'Dynamic, engaging user experience with micro-interactions',
  },
  {
    title: 'Conversion Optimization',
    description:
      'Strategic placement of calls-to-action, contact forms, and booking pathways to convert interested visitors into retreat participants.',
    before: 'No clear conversion funnel',
    after: 'Multiple touchpoints guiding users to take action',
  },
];

// All Gallery Screenshots
const GALLERY = {
  before: [
    {
      src: '/images/case-studies/iboga/old-site-home.png',
      alt: 'Original Iboga Life Change Homepage',
      caption: 'Original Homepage',
      description: 'The original homepage with basic dark template and limited visual appeal.',
    },
    {
      src: '/images/case-studies/iboga/old-site-retreats.png',
      alt: 'Original Retreats Page',
      caption: 'Retreats Page',
      description: 'The retreats page lacked detail and engaging content.',
    },
    {
      src: '/images/case-studies/iboga/old-site-about.png',
      alt: 'Original About Page',
      caption: 'About Page',
      description: 'The about section with minimal storytelling.',
    },
    {
      src: '/images/case-studies/iboga/old-site-contact.png',
      alt: 'Original Contact Page',
      caption: 'Contact Page',
      description: 'Basic contact page without clear conversion paths.',
    },
  ],
  after: [
    {
      src: '/images/case-studies/iboga/new-site-home-full.png',
      alt: 'New Iboga Life Change Homepage',
      caption: 'Transformed Homepage',
      description: 'Immersive hero section with compelling headline and clear CTAs.',
    },
    {
      src: '/images/case-studies/iboga/new-site-about.png',
      alt: 'New About Jay Page',
      caption: 'About Jay Nzingo',
      description: 'Powerful storytelling that builds trust and authority.',
    },
    {
      src: '/images/case-studies/iboga/new-site-iboga-healing.png',
      alt: 'New Iboga & Healing Page',
      caption: 'Iboga & Healing',
      description: 'Dedicated education section about the sacred medicine.',
    },
    {
      src: '/images/case-studies/iboga/new-site-journey.png',
      alt: 'New Journey Page',
      caption: 'The Journey',
      description: 'Beautiful journey page with accordion sections.',
    },
    {
      src: '/images/case-studies/iboga/new-site-contact-form.png',
      alt: 'New Contact & Begin Journey Page',
      caption: 'Begin Your Journey',
      description: 'Conversion-optimized contact experience with clear next steps.',
    },
  ],
};

// Lightbox Modal Component
function Lightbox({
  image,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  image: { src: string; alt: string; caption: string; description: string };
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-depth-base/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-depth-elevated border border-depth-border text-text-muted hover:text-text-primary hover:border-radiance-gold/50 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous button */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-depth-elevated border border-depth-border text-text-muted hover:text-radiance-gold hover:border-radiance-gold/50 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-depth-elevated border border-depth-border text-text-muted hover:text-radiance-gold hover:border-radiance-gold/50 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Image container */}
      <div
        className="relative max-w-6xl max-h-[90vh] w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[70vh] bg-depth-elevated rounded-xl overflow-hidden border border-depth-border">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="mt-4 text-center">
          <h4 className="text-xl font-bold text-text-primary mb-2">{image.caption}</h4>
          <p className="text-text-muted">{image.description}</p>
        </div>
      </div>
    </div>
  );
}

// Gallery Grid Component
function GalleryGrid({
  images,
  type,
  onImageClick,
}: {
  images: typeof GALLERY.before;
  type: 'before' | 'after';
  onImageClick: (index: number) => void;
}) {
  const borderColor = type === 'before' ? 'border-error/30' : 'border-radiance-gold/30';
  const hoverBorder = type === 'before' ? 'hover:border-error/50' : 'hover:border-radiance-gold/50';

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => onImageClick(index)}
          className={`group relative rounded-xl overflow-hidden border ${borderColor} ${hoverBorder} bg-depth-surface transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer text-left`}
        >
          <div className="aspect-[4/3] relative">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay with zoom icon */}
            <div className="absolute inset-0 bg-depth-base/0 group-hover:bg-depth-base/40 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity p-3 rounded-full bg-radiance-gold text-depth-base">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-3 bg-depth-base/90 backdrop-blur-sm">
            <p className="text-text-primary text-sm font-medium truncate">{image.caption}</p>
            <p className="text-text-muted text-xs mt-1">Click to enlarge</p>
          </div>
        </button>
      ))}
    </div>
  );
}

export default function IbogaLifeChangeCaseStudy() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState<'before' | 'after'>('before');
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (gallery: 'before' | 'after', index: number) => {
    setCurrentGallery(gallery);
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const currentImages = currentGallery === 'before' ? GALLERY.before : GALLERY.after;

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < currentImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Lightbox Modal */}
      {lightboxOpen && currentImages[currentIndex] && (
        <Lightbox
          image={currentImages[currentIndex]}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < currentImages.length - 1}
        />
      )}

      {/* Hero Section */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-depth-base via-depth-elevated to-depth-base" />
        <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/5 to-transparent" />

        <div className="container-wide relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-radiance-gold/10 border border-radiance-gold/30 text-radiance-gold text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Case Study
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-text-primary mb-6">
            From Basic Website to
            <br />
            <span className="text-gradient-illumination">AI-Powered Healing Platform</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-text-secondary text-center max-w-3xl mx-auto mb-8">
            How we transformed Iboga Life Change from a generic template into a world-class digital
            experience that honors the sacred tradition while converting visitors into retreat
            participants.
          </p>

          {/* Client Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-text-muted">
            <div className="flex items-center gap-2">
              <span className="text-radiance-gold">Client:</span>
              <span>Jay Nzingo, Iboga Life Change</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-depth-border" />
            <div className="flex items-center gap-2">
              <span className="text-radiance-gold">Industry:</span>
              <span>Sacred Healing & Wellness</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-depth-border" />
            <div className="flex items-center gap-2">
              <span className="text-radiance-gold">Timeline:</span>
              <span>Complete Transformation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-depth-elevated border-y border-depth-border">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {METRICS.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-radiance-gold mb-2">
                  {metric.value}
                </div>
                <div className="text-text-primary font-semibold mb-1">{metric.label}</div>
                <div className="text-text-muted text-sm">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              The <span className="text-radiance-gold">Challenge</span>
            </h2>
            <div className="prose prose-invert prose-lg">
              <p className="text-text-secondary leading-relaxed mb-6">
                Jay Nzingo, a traditionally trained Iboga Bwiti provider initiated under 10th-generation
                Shaman Moughenda Mikala in Gabon, Africa, needed a digital presence that matched the
                profound transformational work he offers.
              </p>
              <p className="text-text-secondary leading-relaxed mb-6">
                The original website at <strong className="text-radiance-gold">ibogalifechange.com</strong>{' '}
                was built on a basic template with:
              </p>
              <ul className="space-y-3 text-text-secondary mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-error mt-1.5">✗</span>
                  <span>Generic dark design that didn&apos;t reflect the sacred nature of the work</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-error mt-1.5">✗</span>
                  <span>Incomplete pages with placeholder content across multiple sections</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-error mt-1.5">✗</span>
                  <span>Cluttered navigation with confusing dropdown menus</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-error mt-1.5">✗</span>
                  <span>No clear user journey or conversion optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-error mt-1.5">✗</span>
                  <span>Missing trust signals and social proof</span>
                </li>
              </ul>
              <p className="text-text-secondary leading-relaxed">
                The site failed to communicate the depth and authenticity of Jay&apos;s offering, potentially
                turning away seekers who could genuinely benefit from this sacred medicine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before Gallery Section */}
      <section className="py-16 bg-depth-elevated">
        <div className="container-wide">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              <span className="text-error">Before:</span> The Original Website
            </h3>
            <p className="text-text-muted">Click any image to view full size</p>
          </div>
          <GalleryGrid
            images={GALLERY.before}
            type="before"
            onImageClick={(index) => openLightbox('before', index)}
          />
        </div>
      </section>

      {/* The Solution Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              The <span className="text-radiance-gold">Transformation</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-12">
              Light Brand Consulting delivered a complete digital transformation, creating a new
              website at <strong className="text-radiance-gold">ibogalifechange.ca</strong> that
              embodies the sacred, transformational nature of Iboga healing while optimizing for
              visitor conversion.
            </p>

            {/* Transformation Grid */}
            <div className="space-y-8">
              {TRANSFORMATIONS.map((item, index) => (
                <div
                  key={index}
                  className="bg-depth-elevated rounded-2xl border border-depth-border p-6 md:p-8 hover:border-radiance-gold/30 transition-colors"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-radiance-gold/10 border border-radiance-gold/30 flex items-center justify-center text-radiance-gold font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-text-primary pt-1">{item.title}</h3>
                  </div>
                  <p className="text-text-secondary mb-6 ml-14">{item.description}</p>
                  <div className="grid md:grid-cols-2 gap-4 ml-14">
                    <div className="bg-depth-base rounded-lg p-4 border border-error/20">
                      <div className="text-error text-xs font-semibold uppercase tracking-wider mb-2">
                        Before
                      </div>
                      <p className="text-text-muted text-sm">{item.before}</p>
                    </div>
                    <div className="bg-depth-base rounded-lg p-4 border border-success/20">
                      <div className="text-success text-xs font-semibold uppercase tracking-wider mb-2">
                        After
                      </div>
                      <p className="text-text-muted text-sm">{item.after}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* After Gallery Section */}
      <section className="py-16 bg-depth-elevated">
        <div className="container-wide">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              <span className="text-success">After:</span> The Transformed Platform
            </h3>
            <p className="text-text-muted">Click any image to view full size</p>
          </div>
          <GalleryGrid
            images={GALLERY.after}
            type="after"
            onImageClick={(index) => openLightbox('after', index)}
          />
        </div>
      </section>

      {/* Key Features Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Key <span className="text-radiance-gold">Features</span> Delivered
            </h2>
            <p className="text-text-secondary text-lg">
              Every element was designed with intention to honor the sacred tradition while
              providing a modern, conversion-optimized experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: '🎨',
                title: 'Immersive Visual Design',
                description:
                  'Earth-toned palette with sacred imagery, atmospheric backgrounds, and elegant typography that honors the Bwiti tradition.',
              },
              {
                icon: '📱',
                title: 'Responsive Experience',
                description:
                  'Beautiful and functional across all devices, from desktop to mobile, ensuring no visitor is left behind.',
              },
              {
                icon: '🧭',
                title: 'Intuitive Navigation',
                description:
                  'Clear, purposeful navigation that guides visitors through a journey of discovery and connection.',
              },
              {
                icon: '✍️',
                title: 'Compelling Storytelling',
                description:
                  'Rich, authentic content that educates about Iboga and Bwiti while building trust and authority.',
              },
              {
                icon: '🔄',
                title: 'Conversion Optimization',
                description:
                  'Strategic CTAs, contact forms, and booking pathways designed to convert interested visitors.',
              },
              {
                icon: '⚡',
                title: 'Performance & SEO',
                description:
                  'Fast-loading, search-optimized pages that help seekers discover Jay\'s transformational work.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-depth-elevated rounded-xl border border-depth-border p-6 hover:border-radiance-gold/30 transition-colors"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-text-muted text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-depth-elevated border-y border-depth-border relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/5 to-transparent" />

        <div className="container-wide relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <svg
              className="w-12 h-12 text-radiance-gold/30 mx-auto mb-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-2xl md:text-3xl text-text-primary font-medium leading-relaxed mb-6">
              &ldquo;The transformation from a basic template to this sophisticated platform represents
              exactly what we mean by AI-powered brand elevation. Every element now serves the
              sacred mission of connecting seekers with transformational healing.&rdquo;
            </blockquote>
            <div className="text-radiance-gold font-semibold">Light Brand Consulting</div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 text-center">
              The <span className="text-radiance-gold">Results</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-depth-elevated rounded-xl border border-depth-border p-8">
                <h3 className="text-xl font-bold text-text-primary mb-4">Brand Perception</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-success mt-1">✓</span>
                    <span className="text-text-secondary">
                      Elevated from amateur to world-class appearance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success mt-1">✓</span>
                    <span className="text-text-secondary">
                      Design that honors sacred traditions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success mt-1">✓</span>
                    <span className="text-text-secondary">
                      Trust and authority established visually
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-depth-elevated rounded-xl border border-depth-border p-8">
                <h3 className="text-xl font-bold text-text-primary mb-4">User Experience</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-success mt-1">✓</span>
                    <span className="text-text-secondary">
                      Clear navigation and user journey
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success mt-1">✓</span>
                    <span className="text-text-secondary">
                      Multiple conversion touchpoints
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success mt-1">✓</span>
                    <span className="text-text-secondary">
                      Seamless mobile experience
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-depth-elevated border-t border-depth-border">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Ready for Your <span className="text-radiance-gold">Transformation</span>?
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Whether you&apos;re looking to elevate your existing website or build something entirely
              new, Light Brand Consulting can help you create a digital presence that truly
              represents your brand&apos;s potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-radiance-gold text-depth-base font-semibold rounded-lg hover:bg-radiance-amber transition-colors"
              >
                Book a Consultation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-radiance-gold/50 text-radiance-gold font-semibold rounded-lg hover:bg-radiance-gold/10 transition-colors"
              >
                View More Work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Visit the Live Sites */}
      <section className="py-12 border-t border-depth-border">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-center md:text-left">
              <div className="text-text-muted text-sm uppercase tracking-wider mb-2">
                See the Transformation Live
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://ibogalifechange.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text-secondary transition-colors"
                >
                  Original: ibogalifechange.com →
                </a>
                <a
                  href="https://www.ibogalifechange.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-radiance-gold hover:text-radiance-amber transition-colors"
                >
                  Transformed: ibogalifechange.ca →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
