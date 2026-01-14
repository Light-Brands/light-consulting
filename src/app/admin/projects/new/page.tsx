/**
 * Admin New Project Page
 * Light Brand Consulting
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { AdminHeader } from '@/components/admin';
import { Container } from '@/components/ui';
import Button from '@/components/Button';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { ProjectInsert } from '@/types/database';

// Available tags
const AVAILABLE_TAGS = [
  'AI',
  'Automation',
  'Sales',
  'Marketing',
  'Analytics',
  'Healthcare',
  'Finance',
  'E-commerce',
  'Manufacturing',
  'Content',
  'Workflow',
  'Machine Learning',
  'Computer Vision',
  'NLP',
  'Prediction',
  'Integration',
];

// Available industries
const INDUSTRIES = [
  'Healthcare & Life Sciences',
  'Financial Services',
  'E-commerce & Retail',
  'Professional Services',
  'Manufacturing & Logistics',
  'Media & Entertainment',
  'Education & EdTech',
  'Real Estate & PropTech',
];

interface ProjectFormData extends Omit<ProjectInsert, 'tags'> {
  tags: string[];
}

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { authFetch } = useAuthFetch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: '',
      description: '',
      image_url: '',
      case_study_url: '',
      client_name: '',
      industry: '',
      featured: false,
      status: 'draft',
      sort_order: 0,
      tags: [],
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const projectData: ProjectInsert = {
        ...data,
        tags: selectedTags,
        image_url: data.image_url || null,
        case_study_url: data.case_study_url || null,
        client_name: data.client_name || null,
        industry: data.industry || null,
      };

      const response = await authFetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify(projectData),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Failed to create project');
      }

      router.push('/admin/projects');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="New Project"
        subtitle="Create a new portfolio project"
      />

      <div className="py-8 md:py-12">
        <Container size="wide">
          <div className="max-w-4xl mx-auto">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-6">
              Basic Information
            </h2>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-2">
                  Title *
                </label>
                <input
                  id="title"
                  type="text"
                  {...register('title', { required: 'Title is required' })}
                  className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                  placeholder="Enter project title"
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-400">{errors.title.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  {...register('description', { required: 'Description is required' })}
                  rows={4}
                  className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent resize-none"
                  placeholder="Describe the project..."
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-400">{errors.description.message}</p>
                )}
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="image_url" className="block text-sm font-medium text-text-primary mb-2">
                  Image URL
                </label>
                <input
                  id="image_url"
                  type="text"
                  {...register('image_url')}
                  className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                  placeholder="/images/portfolio/project-name.jpg"
                />
              </div>

              {/* Case Study URL */}
              <div>
                <label htmlFor="case_study_url" className="block text-sm font-medium text-text-primary mb-2">
                  Case Study URL
                </label>
                <input
                  id="case_study_url"
                  type="text"
                  {...register('case_study_url')}
                  className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                  placeholder="/insights/case-study-name"
                />
              </div>
            </div>
          </div>

          {/* Client & Industry */}
              <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-6">
                  Client & Industry
                </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Client Name */}
              <div>
                <label htmlFor="client_name" className="block text-sm font-medium text-text-primary mb-2">
                  Client Name
                </label>
                <input
                  id="client_name"
                  type="text"
                  {...register('client_name')}
                  className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                  placeholder="Enter client name"
                />
              </div>

              {/* Industry */}
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-text-primary mb-2">
                  Industry
                </label>
                <select
                  id="industry"
                  {...register('industry')}
                  className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                >
                  <option value="">Select an industry</option>
                  {INDUSTRIES.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tags */}
              <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-2">Tags</h2>
            <p className="text-text-muted text-sm mb-4">
              Select relevant tags for this project
            </p>

            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-radiance-gold text-depth-base'
                      : 'bg-depth-elevated text-text-secondary hover:text-text-primary border border-depth-border'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {selectedTags.length > 0 && (
              <p className="mt-4 text-sm text-text-muted">
                Selected: {selectedTags.join(', ')}
              </p>
            )}
          </div>

          {/* Status & Options */}
              <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-6">
                  Status & Options
                </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-text-primary mb-2">
                  Status
                </label>
                <select
                  id="status"
                  {...register('status')}
                  className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label htmlFor="sort_order" className="block text-sm font-medium text-text-primary mb-2">
                  Sort Order
                </label>
                <input
                  id="sort_order"
                  type="number"
                  {...register('sort_order', { valueAsNumber: true })}
                  className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Featured */}
            <div className="mt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('featured')}
                  className="w-5 h-5 rounded border-depth-border bg-depth-elevated text-radiance-gold focus:ring-radiance-gold focus:ring-offset-depth-base"
                />
                <span className="text-text-primary font-medium">Featured Project</span>
              </label>
              <p className="text-text-muted text-sm mt-1 ml-8">
                Featured projects will be highlighted on the portfolio page
              </p>
            </div>
          </div>

              {/* Actions */}
              <div className="flex gap-4 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => router.push('/admin/projects')}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" isLoading={isSubmitting}>
                  Create Project
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}
