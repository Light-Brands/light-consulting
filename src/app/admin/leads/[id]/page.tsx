/**
 * Admin Lead Detail Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { LeadSubmission, LeadStatus } from '@/types/proposals';

const SERVICE_LABELS: Record<string, string> = {
  diagnostic: 'Diagnostic',
  'command-center': 'Command Center',
  'authority-engine': 'Authority Engine',
  ascension: 'Ascension',
};

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  proposal_sent: 'Proposal Sent',
  converted: 'Converted',
  archived: 'Archived',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminLeadDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [lead, setLead] = useState<LeadSubmission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { authFetch } = useAuthFetch();

  const fetchLead = useCallback(async () => {
    try {
      const response = await authFetch(`/api/leads/${id}`);
      const data = await response.json();

      if (data.data) {
        setLead(data.data);
        setNotes(data.data.notes || '');
      }
    } catch (error) {
      console.error('Error fetching lead:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, id]);

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  const handleStatusChange = async (newStatus: LeadStatus) => {
    if (!lead) return;

    try {
      const response = await authFetch(`/api/leads/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const data = await response.json();
        setLead(data.data);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSaveNotes = async () => {
    if (!lead) return;

    setIsSaving(true);
    try {
      const response = await authFetch(`/api/leads/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ notes }),
      });

      if (response.ok) {
        const data = await response.json();
        setLead(data.data);
      }
    } catch (error) {
      console.error('Error saving notes:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <AdminHeader title="Loading..." subtitle="Please wait" />
        <Container size="wide" className="py-12">
          <div className="text-center text-text-muted">Loading lead details...</div>
        </Container>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen">
        <AdminHeader title="Lead Not Found" subtitle="The requested lead could not be found" />
        <Container size="wide" className="py-12">
          <Link href="/admin/leads" className="text-radiance-gold hover:text-radiance-amber">
            Back to Leads
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AdminHeader
        title={lead.name}
        subtitle={`Lead from ${SERVICE_LABELS[lead.service] || lead.service}`}
      />

      <div className="py-8 md:py-12 relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          {/* Back Link */}
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Leads
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.015] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <div className="relative z-10">
                  <div className="p-6 border-b border-depth-border">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                      <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                        Lead::Contact_Info
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-text-primary">
                      Contact Information
                    </h2>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-text-muted text-sm block mb-1">Name</label>
                      <p className="text-text-primary font-medium">{lead.name}</p>
                    </div>
                    <div>
                      <label className="text-text-muted text-sm block mb-1">Email</label>
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-radiance-gold hover:text-radiance-amber transition-colors"
                      >
                        {lead.email}
                      </a>
                    </div>
                    {lead.company && (
                      <div>
                        <label className="text-text-muted text-sm block mb-1">Company</label>
                        <p className="text-text-primary">{lead.company}</p>
                      </div>
                    )}
                    {lead.phone && (
                      <div>
                        <label className="text-text-muted text-sm block mb-1">Phone</label>
                        <a
                          href={`tel:${lead.phone}`}
                          className="text-radiance-gold hover:text-radiance-amber transition-colors"
                        >
                          {lead.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Website & Tech Stack */}
              {lead.website_url && (
                <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.015] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }}
                  />
                  <div className="relative z-10">
                    <div className="p-6 border-b border-depth-border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                        <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                          Diagnostic::Website_Analysis
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-text-primary">
                        Website & Technology Stack
                      </h2>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <label className="text-text-muted text-sm block mb-1">Website URL</label>
                        <a
                          href={lead.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-radiance-gold hover:text-radiance-amber transition-colors break-all"
                        >
                          {lead.website_url}
                        </a>
                      </div>
                      {lead.tech_stack && (
                        <div>
                          <label className="text-text-muted text-sm block mb-2">Detected Tech Stack</label>
                          <div className="flex flex-wrap gap-2">
                            {lead.tech_stack.platform && (
                              <span className="px-3 py-1 bg-radiance-gold/20 text-radiance-gold rounded-lg text-sm font-medium">
                                {lead.tech_stack.platform}
                              </span>
                            )}
                            {Array.isArray(lead.tech_stack.frameworks) && lead.tech_stack.frameworks.map((fw: string) => (
                              <span
                                key={fw}
                                className="px-3 py-1 bg-wisdom-violet/20 text-wisdom-violet rounded-lg text-sm"
                              >
                                {fw}
                              </span>
                            ))}
                            {lead.tech_stack.hosting && (
                              <span className="px-3 py-1 bg-depth-elevated text-text-secondary rounded-lg text-sm">
                                {lead.tech_stack.hosting}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      {lead.website_story && (
                        <div>
                          <label className="text-text-muted text-sm block mb-1">Business Story</label>
                          <p className="text-text-primary whitespace-pre-wrap text-sm">{lead.website_story}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* AI Readiness Assessment */}
              {lead.readiness_score !== null && (
                <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.015] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }}
                  />
                  <div className="relative z-10">
                    <div className="p-6 border-b border-depth-border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-wisdom-violet/50" />
                        <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                          Diagnostic::AI_Readiness
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-text-primary">
                          AI Readiness Assessment
                        </h2>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-radiance-gold">
                            {lead.readiness_score}
                          </div>
                          <div className="text-xs text-text-muted">/ 100</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      {lead.readiness_brief && (
                        <div>
                          <label className="text-text-muted text-sm block mb-1">Readiness Brief</label>
                          <p className="text-text-primary whitespace-pre-wrap">{lead.readiness_brief}</p>
                        </div>
                      )}
                      {lead.capacity_gap_analysis && (
                        <div>
                          <label className="text-text-muted text-sm block mb-1">Capacity Gap Analysis</label>
                          <p className="text-text-primary whitespace-pre-wrap">{lead.capacity_gap_analysis}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Full Readiness Report */}
              {lead.full_readiness_report && (
                <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.015] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }}
                  />
                  <div className="relative z-10">
                    <div className="p-6 border-b border-depth-border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                        <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                          Diagnostic::Full_Report
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-text-primary">
                        Full AI Readiness Report
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="prose prose-invert max-w-none">
                        <div className="text-text-primary whitespace-pre-wrap text-sm">
                          {lead.full_readiness_report}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* System Demo Links */}
              {lead.system_demo_links && Array.isArray(lead.system_demo_links) && lead.system_demo_links.length > 0 && (
                <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.015] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }}
                  />
                  <div className="relative z-10">
                    <div className="p-6 border-b border-depth-border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-wisdom-violet/50" />
                        <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                          Diagnostic::System_Demos
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-text-primary">
                        System Demo Links
                      </h2>
                    </div>
                    <div className="p-6 space-y-3">
                      {lead.system_demo_links.map((demo: { name: string; url: string }, index: number) => (
                        <a
                          key={index}
                          href={demo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 bg-depth-base border border-depth-border rounded-lg hover:border-radiance-gold transition-colors"
                        >
                          <div className="font-medium text-text-primary">{demo.name}</div>
                          <div className="text-sm text-text-muted mt-1">{demo.url}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Booking Information */}
              {lead.booking_calendly_link && (
                <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.015] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }}
                  />
                  <div className="relative z-10">
                    <div className="p-6 border-b border-depth-border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                        <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                          Booking::Call_Scheduled
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-text-primary">
                        Booking Information
                      </h2>
                    </div>
                    <div className="p-6 space-y-3">
                      <a
                        href={lead.booking_calendly_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-radiance-gold hover:text-radiance-amber transition-colors break-all"
                      >
                        {lead.booking_calendly_link}
                      </a>
                      {lead.booked_at && (
                        <div>
                          <label className="text-text-muted text-sm block mb-1">Booked At</label>
                          <p className="text-text-primary">{formatDate(lead.booked_at)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Intake Responses */}
              {lead.intake_data && Object.keys(lead.intake_data).length > 0 && (
                <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.015] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }}
                  />
                  <div className="relative z-10">
                    <div className="p-6 border-b border-depth-border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-wisdom-violet/50" />
                        <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                          Lead::Intake_Responses
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-text-primary">
                        Intake Responses
                      </h2>
                    </div>
                    <div className="p-6 space-y-6">
                      {Object.entries(lead.intake_data).map(([question, answer]) => (
                        <div key={question}>
                          <label className="text-text-muted text-sm block mb-1 capitalize">
                            {question.replace(/_/g, ' ')}
                          </label>
                          <p className="text-text-primary whitespace-pre-wrap">{answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.015] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <div className="relative z-10">
                  <div className="p-6 border-b border-depth-border">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                      <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                        Lead::Internal_Notes
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-text-primary">
                      Internal Notes
                    </h2>
                  </div>
                  <div className="p-6">
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add internal notes about this lead..."
                      rows={4}
                      className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted/50 focus:border-radiance-gold focus:outline-none resize-none"
                    />
                    <div className="mt-4 flex justify-end">
                      <Button
                        onClick={handleSaveNotes}
                        isLoading={isSaving}
                        disabled={notes === (lead.notes || '')}
                      >
                        Save Notes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Card */}
              <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.015] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <div className="relative z-10 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                    <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                      Status
                    </span>
                  </div>
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
                    className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary focus:border-radiance-gold focus:outline-none"
                  >
                    {Object.entries(STATUS_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Service Card */}
              <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.015] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <div className="relative z-10 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-wisdom-violet/50" />
                    <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                      Service Interest
                    </span>
                  </div>
                  <p className="text-text-primary font-semibold text-lg">
                    {SERVICE_LABELS[lead.service] || lead.service}
                  </p>
                </div>
              </div>

              {/* Timestamps */}
              <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.015] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <div className="relative z-10 p-6 space-y-4">
                  <div>
                    <label className="text-text-muted text-sm block mb-1">Created</label>
                    <p className="text-text-primary">{formatDate(lead.created_at)}</p>
                  </div>
                  <div>
                    <label className="text-text-muted text-sm block mb-1">Last Updated</label>
                    <p className="text-text-primary">{formatDate(lead.updated_at)}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link href={`/admin/proposals/new?lead=${lead.id}`} className="block">
                  <Button variant="primary" fullWidth>
                    Create Proposal
                  </Button>
                </Link>
                <a href={`mailto:${lead.email}`} className="block">
                  <Button variant="outline" fullWidth>
                    Send Email
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
