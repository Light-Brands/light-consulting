/**
 * Admin Edit Project Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { AdminHeader, ImageUpload } from '@/components/admin';
import { Container } from '@/components/ui';
import Button from '@/components/Button';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { Project, ProjectUpdate } from '@/types/database';

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

// Brand categories
const BRAND_CATEGORIES = [
  { id: 'ai-technology', name: 'AI & Technology' },
  { id: 'hospitality', name: 'Hospitality' },
  { id: 'healthcare-wellness', name: 'Healthcare & Wellness' },
  { id: 'tourism-travel', name: 'Tourism & Travel' },
  { id: 'real-estate-energy', name: 'Real Estate & Energy' },
  { id: 'creative-professional', name: 'Creative & Professional' },
  { id: 'community-social', name: 'Community & Social' },
];

interface ProjectFormData extends Omit<ProjectUpdate, 'tags' | 'tech_stack'> {
  tags: string[];
  tech_stack_frontend?: string;
  tech_stack_backend?: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

// Array Input Component
function ArrayInput({
  label,
  items,
  onAdd,
  onRemove,
  placeholder,
  helpText,
}: {
  label: string;
  items: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
  helpText?: string;
}) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-2">
        {label}
      </label>
      {helpText && (
        <p className="text-text-muted text-xs mb-2">{helpText}</p>
      )}
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent text-sm"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 bg-radiance-gold text-depth-base rounded-lg hover:bg-radiance-gold/90 transition-colors text-sm font-medium"
        >
          Add
        </button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-depth-elevated border border-depth-border rounded-full text-sm text-text-primary"
            >
              {item}
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="text-text-muted hover:text-red-400 transition-colors ml-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function EditProjectPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Image upload state
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Array field states
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [keyFeatures, setKeyFeatures] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);

  const { authFetch } = useAuthFetch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>();

  // Fetch project data
  const fetchProject = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await authFetch(`/api/projects/${id}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const projectData = data.data;
      setProject(projectData);
      setSelectedTags(projectData?.tags || []);
      setImageUrl(projectData?.image_url || null);

      // Set array field states
      setGalleryImages(projectData?.gallery_images || []);
      setServices(projectData?.services || []);
      setKeyFeatures(projectData?.key_features || []);
      setResults(projectData?.results || []);

      reset({
        title: projectData?.title || '',
        description: projectData?.description || '',
        image_url: projectData?.image_url || '',
        case_study_url: projectData?.case_study_url || '',
        client_name: projectData?.client_name || '',
        industry: projectData?.industry || '',
        featured: projectData?.featured || false,
        status: projectData?.status || 'draft',
        sort_order: projectData?.sort_order || 0,
        // Enhanced fields
        brand_id: projectData?.brand_id || '',
        challenge: projectData?.challenge || '',
        solution: projectData?.solution || '',
        origin: projectData?.origin || '',
        project_type: projectData?.project_type || '',
        preview_enabled: projectData?.preview_enabled ?? true,
        tech_stack_frontend: projectData?.tech_stack?.frontend || '',
        tech_stack_backend: projectData?.tech_stack?.backend || '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load project');
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, id, reset]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Build tech_stack object
      const tech_stack = (data.tech_stack_frontend || data.tech_stack_backend) ? {
        frontend: data.tech_stack_frontend || undefined,
        backend: data.tech_stack_backend || undefined,
      } : undefined;

      const projectData: ProjectUpdate = {
        title: data.title,
        description: data.description,
        tags: selectedTags,
        image_url: imageUrl,
        case_study_url: data.case_study_url || null,
        client_name: data.client_name || null,
        industry: data.industry || null,
        featured: data.featured,
        status: data.status,
        sort_order: data.sort_order,
        // Enhanced fields
        brand_id: data.brand_id || null,
        gallery_images: galleryImages.length > 0 ? galleryImages : undefined,
        services: services.length > 0 ? services : undefined,
        key_features: keyFeatures.length > 0 ? keyFeatures : undefined,
        challenge: data.challenge || null,
        solution: data.solution || null,
        results: results.length > 0 ? results : undefined,
        tech_stack,
        origin: data.origin || null,
        project_type: data.project_type || null,
        preview_enabled: data.preview_enabled,
      };

      const response = await authFetch(`/api/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(projectData),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Failed to update project');
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

  // Array field handlers
  const addGalleryImage = (url: string) => setGalleryImages((prev) => [...prev, url]);
  const removeGalleryImage = (index: number) => setGalleryImages((prev) => prev.filter((_, i) => i !== index));

  const addService = (service: string) => setServices((prev) => [...prev, service]);
  const removeService = (index: number) => setServices((prev) => prev.filter((_, i) => i !== index));

  const addKeyFeature = (feature: string) => setKeyFeatures((prev) => [...prev, feature]);
  const removeKeyFeature = (index: number) => setKeyFeatures((prev) => prev.filter((_, i) => i !== index));

  const addResult = (result: string) => setResults((prev) => [...prev, result]);
  const removeResult = (index: number) => setResults((prev) => prev.filter((_, i) => i !== index));

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <AdminHeader title="Edit Project" subtitle="Loading..." />
        <Container size="wide">
          <div className="py-8 md:py-12 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-radiance-gold border-t-transparent" />
          </div>
        </Container>
      </div>
    );
  }

  if (!project && !isLoading) {
    return (
      <div className="min-h-screen">
        <AdminHeader title="Edit Project" subtitle="Project not found" />
        <Container size="wide">
          <div className="py-8 md:py-12">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
              <p className="text-red-400 mb-4">Project not found or could not be loaded.</p>
              <Button variant="primary" onClick={() => router.push('/admin/projects')}>
                Back to Projects
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Edit Project"
        subtitle={project?.title}
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

              {/* Cover Image Upload */}
              <ImageUpload
                value={imageUrl}
                onChange={setImageUrl}
                folder="covers"
                label="Cover Image"
                helpText="Drop, paste, or click to upload a cover image for this project"
              />

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

          {/* Brand & Classification */}
              <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-6">
                  Brand & Classification
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Brand Category */}
                  <div>
                    <label htmlFor="brand_id" className="block text-sm font-medium text-text-primary mb-2">
                      Brand Category
                    </label>
                    <select
                      id="brand_id"
                      {...register('brand_id')}
                      className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      {BRAND_CATEGORIES.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label htmlFor="project_type" className="block text-sm font-medium text-text-primary mb-2">
                      Project Type
                    </label>
                    <input
                      id="project_type"
                      type="text"
                      {...register('project_type')}
                      className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                      placeholder="e.g., Consulting / Landing site"
                    />
                  </div>

                  {/* Origin */}
                  <div>
                    <label htmlFor="origin" className="block text-sm font-medium text-text-primary mb-2">
                      Origin / Region
                    </label>
                    <input
                      id="origin"
                      type="text"
                      {...register('origin')}
                      className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                      placeholder="e.g., US, UK, Global"
                    />
                  </div>
                </div>
              </div>

          {/* Project Details - Challenge & Solution */}
              <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-6">
                  Project Details
                </h2>

                <div className="space-y-6">
                  {/* Challenge */}
                  <div>
                    <label htmlFor="challenge" className="block text-sm font-medium text-text-primary mb-2">
                      Challenge
                    </label>
                    <textarea
                      id="challenge"
                      {...register('challenge')}
                      rows={3}
                      className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent resize-none"
                      placeholder="Describe the business challenge or problem this project addressed..."
                    />
                  </div>

                  {/* Solution */}
                  <div>
                    <label htmlFor="solution" className="block text-sm font-medium text-text-primary mb-2">
                      Solution
                    </label>
                    <textarea
                      id="solution"
                      {...register('solution')}
                      rows={3}
                      className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent resize-none"
                      placeholder="Describe the solution implemented..."
                    />
                  </div>
                </div>
              </div>

          {/* Services & Features */}
              <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-6">
                  Services & Features
                </h2>

                <div className="space-y-6">
                  {/* Services */}
                  <ArrayInput
                    label="Services"
                    items={services}
                    onAdd={addService}
                    onRemove={removeService}
                    placeholder="Add a service (e.g., AI Diagnostics)"
                    helpText="Services offered in this project"
                  />

                  {/* Key Features */}
                  <ArrayInput
                    label="Key Features"
                    items={keyFeatures}
                    onAdd={addKeyFeature}
                    onRemove={removeKeyFeature}
                    placeholder="Add a key feature"
                    helpText="Notable features of the project"
                  />
                </div>
              </div>

          {/* Results */}
              <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-6">
                  Results & Outcomes
                </h2>

                <ArrayInput
                  label="Results"
                  items={results}
                  onAdd={addResult}
                  onRemove={removeResult}
                  placeholder="Add a result (e.g., 95% client satisfaction)"
                  helpText="Quantified results and outcomes from the project"
                />
              </div>

          {/* Tech Stack */}
              <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-6">
                  Tech Stack
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Frontend */}
                  <div>
                    <label htmlFor="tech_stack_frontend" className="block text-sm font-medium text-text-primary mb-2">
                      Frontend
                    </label>
                    <input
                      id="tech_stack_frontend"
                      type="text"
                      {...register('tech_stack_frontend')}
                      className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                      placeholder="e.g., Next.js / React"
                    />
                  </div>

                  {/* Backend */}
                  <div>
                    <label htmlFor="tech_stack_backend" className="block text-sm font-medium text-text-primary mb-2">
                      Backend
                    </label>
                    <input
                      id="tech_stack_backend"
                      type="text"
                      {...register('tech_stack_backend')}
                      className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                      placeholder="e.g., Node.js / Supabase"
                    />
                  </div>
                </div>
              </div>

          {/* Gallery Images */}
              <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-6">
                  Gallery Images
                </h2>

                <ArrayInput
                  label="Image URLs"
                  items={galleryImages}
                  onAdd={addGalleryImage}
                  onRemove={removeGalleryImage}
                  placeholder="Add image URL (e.g., /images/portfolio/project-2.jpg)"
                  helpText="Additional images for the project gallery"
                />
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

            {/* Preview Enabled */}
            <div className="mt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('preview_enabled')}
                  className="w-5 h-5 rounded border-depth-border bg-depth-elevated text-radiance-gold focus:ring-radiance-gold focus:ring-offset-depth-base"
                />
                <span className="text-text-primary font-medium">Live Preview Enabled</span>
              </label>
              <p className="text-text-muted text-sm mt-1 ml-8">
                Enable live iframe preview for this project on the portfolio page
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
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}
