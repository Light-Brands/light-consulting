/**
 * Contact Page
 * Light Brand Consulting
 */

import React, { useState } from 'react';
import {
  ContactHeroVisual,
  ContactFormVisual,
  ContactInfoVisual,
  ContactFAQVisual,
  ContactWaysVisual,
  ContactSuccessVisual,
  ContactNextVisual,
} from '../components';
import { Container, Section } from '../components/ui';
import { IMAGE_CONFIG } from '../lib/constants';
import { ContactFormData, PageKey } from '../types';
import { isValidEmail } from '../lib/utils';

interface ContactPageProps {
  onNavigate: (page: PageKey) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-24 md:pt-32">
        <Section spacing="lg" className="relative overflow-hidden">
          {/* Background atmosphere */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

          <Container size="narrow">
            <div className="relative z-10">
              <ContactSuccessVisual
                onHomeClick={() => onNavigate('home')}
                onInsightsClick={() => onNavigate('insights')}
              />
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  const faqs = [
    {
      q: 'Is this the right first step?',
      a: 'If you have questions, yes. If you\'re ready to book, go directly to our booking page. It\'s faster.',
    },
    {
      q: 'Do you build and implement solutions?',
      a: 'Yes, for aligned partners. Brand Development and implementation are available after completing an AI Acceleration Blueprint and being accepted through our Stewardship Council. We partner deeply with the right brands rather than working broadly with everyone.',
    },
    {
      q: 'Will you try to sell me?',
      a: 'No. We\'ll answer your questions honestly. If we\'re not the right fit, we\'ll tell you that too. We believe those meant to work with us will come forward naturally.',
    },
    {
      q: 'What if I\'m not sure AI is right for my business?',
      a: 'That\'s exactly what an Illumination Session is for. But feel free to ask questions first. We\'re happy to help you figure that out.',
    },
  ];

  const nextSteps = [
    'We read your message and consider how we can best help',
    'Within 24 hours, you\'ll get a personal response',
    'If booking makes sense, we\'ll share available times',
    'If we\'re not the right fit, we\'ll tell you honestly',
  ];

  const contactWays = [
    {
      title: 'Speaking & Workshops',
      description: 'Looking for an AI speaker for your conference, leadership team, or board meeting?',
      note: 'Mention "speaking inquiry" in your message',
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
        </svg>
      ),
    },
    {
      title: 'Media & Press',
      description: 'Journalists and podcasters: we\'re happy to share insights on AI strategy for business.',
      note: 'Mention "media inquiry" in your message',
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v4.5H6v-4.5z" />
        </svg>
      ),
    },
    {
      title: 'Partnerships',
      description: 'Are you an implementation partner, agency, or complementary service? Let\'s explore working together.',
      note: 'Mention "partnership inquiry" in your message',
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.645-5.963-1.75A9.06 9.06 0 016 18.72m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Hero with Background */}
      <Section
        spacing="lg"
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url(${IMAGE_CONFIG.heroes.contact.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-depth-base/85" />

        {/* Bottom fade gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[20%] pointer-events-none z-[1]"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(15, 14, 13, 0.5) 50%, rgba(15, 14, 13, 1) 100%)',
          }}
        />

        <Container size="wide" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Info */}
            <div>
              <ContactHeroVisual
                title="Let's Start a"
                titleHighlight="Conversation"
                subtitle="Contact"
                description="Have questions about our services? Want to explore how AI can transform your business? We'd love to hear from you."
                subDescription="We read every message personally. No auto-responders, no sales bots. Just honest conversation about whether and how we can help."
              />

              <div className="mt-8">
                <ContactInfoVisual onBookClick={() => onNavigate('book')} />
              </div>

              <ContactFAQVisual faqs={faqs} />
            </div>

            {/* Right Column - Form */}
            <div className="space-y-6">
              <ContactFormVisual
                formData={formData}
                errors={errors}
                isSubmitting={isSubmitting}
                onFieldChange={updateField}
                onSubmit={handleSubmit}
              />

              <ContactNextVisual steps={nextSteps} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Additional Context Section */}
      <Section spacing="lg" background="elevated" className="relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="relative z-10">
            <ContactWaysVisual ways={contactWays} />
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default ContactPage;
