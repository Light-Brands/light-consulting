/**
 * Contact Page
 * Light Brand Consulting
 */

import React, { useState } from 'react';
import {
  Button,
  Card,
  Input,
  Textarea,
  Tag,
  CheckIcon,
  MailIcon,
  ClockIcon,
  IconPlaceholder,
} from '../components';
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
        <div className="container-narrow py-16">
          <Card elevation="elevated" className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-success/20 text-success mx-auto mb-6 flex items-center justify-center">
              <CheckIcon size={32} />
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-4">
              Message Sent!
            </h1>
            <p className="text-text-secondary mb-4">
              Thank you for reaching out. We read every message personally.
            </p>
            <p className="text-text-muted text-sm mb-8">
              Expect a response within 24 hours during business days. If your inquiry is about booking,
              we'll include next steps and availability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" onClick={() => onNavigate('home')}>
                Back to Home
              </Button>
              <Button variant="ghost" onClick={() => onNavigate('insights')}>
                Read Our Insights
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Hero with Background */}
      <section 
        className="section-spacing relative"
        style={{
          backgroundImage: `url(${IMAGE_CONFIG.heroes.contact.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-depth-base/85" />

        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Info */}
            <div>
              <Tag variant="premium" className="mb-4">
                Contact
              </Tag>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                Let's Start a{' '}
                <span className="text-radiance-gold">Conversation</span>
              </h1>
              <p className="text-text-secondary text-lg mb-4">
                Have questions about our services? Want to explore how AI can
                transform your business? We'd love to hear from you.
              </p>
              <p className="text-text-muted mb-8">
                We read every message personally. No auto-responders, no sales bots.
                Just honest conversation about whether and how we can help.
              </p>

              <div className="space-y-6">
                <Card elevation="subtle" className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-radiance-gold/10 text-radiance-gold flex items-center justify-center flex-shrink-0">
                      <MailIcon size={20} />
                    </div>
                    <div>
                      <h3 className="text-text-primary font-semibold mb-1">
                        Email Us Directly
                      </h3>
                      <a
                        href="mailto:hello@lightbrandconsulting.com"
                        className="text-radiance-gold hover:text-radiance-amber transition-colors"
                      >
                        hello@lightbrandconsulting.com
                      </a>
                      <p className="text-text-muted text-xs mt-1">
                        Prefer email? Skip the form and write directly.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card elevation="subtle" className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-radiance-amber/10 text-radiance-amber flex items-center justify-center flex-shrink-0">
                      <ClockIcon size={20} />
                    </div>
                    <div>
                      <h3 className="text-text-primary font-semibold mb-1">
                        Response Time
                      </h3>
                      <p className="text-text-secondary text-sm">
                        We respond within 24 hours during business days.
                      </p>
                      <p className="text-text-muted text-xs mt-1">
                        Urgent? Mention it in your message and we'll prioritize.
                      </p>
                    </div>
                  </div>
                </Card>

                <div className="p-6 bg-depth-elevated rounded-brand-card border border-depth-border">
                  <h3 className="text-text-primary font-semibold mb-3">
                    Ready to Book?
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    If you already know you want to work with us, skip the contact form and book directly.
                    You'll get instant access to our calendar.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onNavigate('book')}
                  >
                    Book a Session
                  </Button>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mt-12">
                <h3 className="text-lg font-bold text-text-primary mb-6">
                  Common Questions Before Reaching Out
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      q: 'Is this the right first step?',
                      a: 'If you have questions, yes. If you\'re ready to book, go directly to our booking page—it\'s faster.',
                    },
                    {
                      q: 'What should I include in my message?',
                      a: 'Tell us about your business, what you\'re hoping AI might help with, and any specific questions. The more context, the better we can help.',
                    },
                    {
                      q: 'Will you try to sell me?',
                      a: 'No. We\'ll answer your questions honestly. If we\'re not the right fit, we\'ll tell you that too.',
                    },
                    {
                      q: 'What if I\'m not sure AI is right for my business?',
                      a: 'That\'s exactly what an Illumination Session is for. But feel free to ask questions first—we\'re happy to help you figure that out.',
                    },
                  ].map((item, index) => (
                    <div key={index}>
                      <h4 className="text-text-primary font-medium text-sm mb-1">{item.q}</h4>
                      <p className="text-text-muted text-sm">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <Card elevation="elevated" className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-text-primary mb-2">
                  Send a Message
                </h2>
                <p className="text-text-muted text-sm mb-6">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Your Name"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    error={errors.name}
                    required
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    error={errors.email}
                    required
                  />

                  <Input
                    label="Company (Optional)"
                    placeholder="Acme Inc"
                    value={formData.company}
                    onChange={(e) => updateField('company', e.target.value)}
                  />

                  <Textarea
                    label="Your Message"
                    placeholder="Tell us about your business, what you're hoping AI might help with, and any questions you have..."
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    error={errors.message}
                    rows={6}
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={isSubmitting}
                  >
                    Send Message
                  </Button>

                  <p className="text-text-muted text-xs text-center">
                    We read every message personally. Your information stays private.
                  </p>
                </form>
              </Card>

              {/* What Happens Next */}
              <Card elevation="subtle" className="mt-6 p-6">
                <h3 className="text-text-primary font-semibold mb-4">
                  What Happens After You Send
                </h3>
                <ol className="space-y-3">
                  {[
                    'We read your message and consider how we can best help',
                    'Within 24 hours, you\'ll get a personal response',
                    'If booking makes sense, we\'ll share available times',
                    'If we\'re not the right fit, we\'ll tell you honestly',
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="text-text-secondary text-sm">{step}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Context Section */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Other Ways We Can Help
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card elevation="subtle" className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <IconPlaceholder
                  src={IMAGE_CONFIG.contact.speaking.src}
                  alt={IMAGE_CONFIG.contact.speaking.alt}
                  size={80}
                  color="gold"
                />
              </div>
              <h3 className="text-text-primary font-semibold mb-2">
                Speaking & Workshops
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Looking for an AI speaker for your conference, leadership team, or board meeting?
              </p>
              <p className="text-text-muted text-xs">
                Mention "speaking inquiry" in your message
              </p>
            </Card>

            <Card elevation="subtle" className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <IconPlaceholder
                  src={IMAGE_CONFIG.contact.media.src}
                  alt={IMAGE_CONFIG.contact.media.alt}
                  size={80}
                  color="amber"
                />
              </div>
              <h3 className="text-text-primary font-semibold mb-2">
                Media & Press
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Journalists and podcasters: we're happy to share insights on AI strategy for business.
              </p>
              <p className="text-text-muted text-xs">
                Mention "media inquiry" in your message
              </p>
            </Card>

            <Card elevation="subtle" className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <IconPlaceholder
                  src={IMAGE_CONFIG.contact.partnerships.src}
                  alt={IMAGE_CONFIG.contact.partnerships.alt}
                  size={80}
                  color="cream"
                />
              </div>
              <h3 className="text-text-primary font-semibold mb-2">
                Partnerships
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Are you an implementation partner, agency, or complementary service? Let's explore working together.
              </p>
              <p className="text-text-muted text-xs">
                Mention "partnership inquiry" in your message
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
