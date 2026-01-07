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
} from '../components';
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
            <p className="text-text-secondary mb-8">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <Button variant="primary" onClick={() => onNavigate('home')}>
              Back to Home
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      <section className="section-spacing">
        <div className="container-wide">
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
              <p className="text-text-secondary text-lg mb-8">
                Have questions about our services? Want to explore how AI can
                transform your business? We'd love to hear from you.
              </p>

              <div className="space-y-6">
                <Card elevation="subtle" className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-radiance-gold/10 text-radiance-gold flex items-center justify-center flex-shrink-0">
                      <MailIcon size={20} />
                    </div>
                    <div>
                      <h3 className="text-text-primary font-semibold mb-1">
                        Email Us
                      </h3>
                      <a
                        href="mailto:hello@lightbrandconsulting.com"
                        className="text-radiance-gold hover:text-radiance-amber transition-colors"
                      >
                        hello@lightbrandconsulting.com
                      </a>
                    </div>
                  </div>
                </Card>

                <div className="p-6 bg-depth-elevated rounded-brand-card border border-depth-border">
                  <h3 className="text-text-primary font-semibold mb-2">
                    Response Time
                  </h3>
                  <p className="text-text-secondary text-sm">
                    We typically respond within 24 hours during business days.
                    For urgent matters, please mention it in your message.
                  </p>
                </div>

                <div className="p-6 bg-depth-elevated rounded-brand-card border border-depth-border">
                  <h3 className="text-text-primary font-semibold mb-2">
                    Ready to Book?
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    If you're ready to get started, you can book directly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate('book')}
                  >
                    Book a Session
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <Card elevation="elevated" className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-text-primary mb-6">
                  Send a Message
                </h2>

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
                    placeholder="Tell us about your goals and how we can help..."
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    error={errors.message}
                    rows={5}
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
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
