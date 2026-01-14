/**
 * Admin New Proposal Page with AI Generation
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminHeader } from '@/components/admin';
import { BusinessIntelligenceSummary } from '@/components/admin/BusinessIntelligenceSummary';
import { Container, Button, Input, Textarea } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { LeadSubmission, Deliverable } from '@/types/proposals';
import type { BusinessIntelligence } from '@/types/business-intelligence';

interface PhaseFormData {
  phase_name: string;
  description: string;
  timeline: string;
  amount: string;
  deliverables: Deliverable[];
  objectives: string[];
  goals: string[];
  visible_in_portal: boolean;
}

interface MilestoneFormData {
  milestone_name: string;
  description: string;
  amount: string;
  due_date: string;
  phase_index: number;
}

const SERVICE_OPTIONS = [
  { id: 'diagnostic', name: 'AI Readiness Diagnostic', price: '$2,500', description: 'Comprehensive AI readiness assessment' },
  { id: 'command-center', name: 'AI Command Center', price: '$15,000', description: 'Custom AI-powered dashboard system' },
  { id: 'authority-engine', name: 'Authority Engine', price: '$12,000', description: 'AI content generation system' },
  { id: 'ascension', name: 'Ascension Program', price: '$35,000', description: 'Complete AI transformation' },
];

const DEFAULT_AGREEMENT_TEXT = `# Consulting Services Agreement

This Consulting Services Agreement ("Agreement") is entered into by and between Light Brand Consulting ("Consultant") and the Client identified in the associated proposal.

## 1. Services

Consultant agrees to provide the services described in the proposal attached hereto. The services will be performed in a professional and workmanlike manner.

## 2. Compensation

Client agrees to pay Consultant the fees set forth in the proposal according to the milestone schedule provided.

## 3. Term

This Agreement shall commence on the start date indicated in the proposal and continue until all services are completed, unless earlier terminated.

## 4. Confidentiality

Both parties agree to maintain the confidentiality of proprietary information shared during the engagement.

## 5. Intellectual Property

Upon full payment, all deliverables created specifically for Client shall become Client's property. Consultant retains rights to general methodologies and pre-existing materials.

## 6. Limitation of Liability

Consultant's liability shall be limited to the total fees paid under this Agreement.

## 7. Termination

Either party may terminate this Agreement with 30 days written notice. Client shall pay for all services rendered through the termination date.

## 8. General Provisions

This Agreement constitutes the entire agreement between the parties and supersedes all prior discussions and agreements.

By signing below, both parties agree to the terms and conditions set forth in this Agreement.`;

function NewProposalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const leadId = searchParams.get('lead');
  const { authFetch } = useAuthFetch();

  const [lead, setLead] = useState<LeadSubmission | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'phases' | 'milestones' | 'agreement'>('details');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [customRequirements, setCustomRequirements] = useState('');
  const [showBusinessIntel, setShowBusinessIntel] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_company: '',
    client_phone: '',
    project_name: '',
    project_overview: '',
    project_scope: '',
    total_timeline: '',
    start_date: '',
    estimated_completion_date: '',
    discount_percentage: '0',
  });

  const [phases, setPhases] = useState<PhaseFormData[]>([
    {
      phase_name: '',
      description: '',
      timeline: '',
      amount: '',
      deliverables: [],
      objectives: [],
      goals: [],
      visible_in_portal: true,
    },
  ]);

  const [milestones, setMilestones] = useState<MilestoneFormData[]>([
    {
      milestone_name: '',
      description: '',
      amount: '',
      due_date: '',
      phase_index: 0,
    },
  ]);

  const [agreementText, setAgreementText] = useState(DEFAULT_AGREEMENT_TEXT);

  const fetchLead = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const response = await authFetch(`/api/leads/${id}`);
      const data = await response.json();

      if (data.data) {
        const leadData = data.data as LeadSubmission;
        setLead(leadData);
        setFormData((prev) => ({
          ...prev,
          client_name: leadData.name,
          client_email: leadData.email,
          client_company: leadData.company || '',
          client_phone: leadData.phone || '',
        }));

        // If lead has service, pre-select it
        if (leadData.service) {
          setSelectedServices([leadData.service]);
        }
      }
    } catch (error) {
      console.error('Error fetching lead:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch]);

  // Fetch lead data if lead ID provided
  useEffect(() => {
    if (leadId) {
      fetchLead(leadId);
    }
  }, [leadId, fetchLead]);

  const handleGenerateWithAI = async () => {
    if (!lead || selectedServices.length === 0) {
      alert('Please select at least one service.');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await authFetch('/api/generate-proposal', {
        method: 'POST',
        body: JSON.stringify({
          leadId: lead.id,
          businessIntelligence: lead.business_intelligence || null,
          selectedServices,
          customRequirements,
          readinessScore: lead.readiness_score || 50,
          websiteStory: lead.website_story || '',
          clientName: lead.name,
          clientCompany: lead.company || '',
        }),
      });

      const result = await response.json();

      if (result.success && result.proposal) {
        const proposal = result.proposal;

        // Populate form with generated content
        setFormData((prev) => ({
          ...prev,
          project_name: proposal.project_name,
          project_overview: proposal.project_overview,
          project_scope: proposal.project_scope,
          total_timeline: proposal.total_timeline,
        }));

        // Populate phases
        if (proposal.phases && proposal.phases.length > 0) {
          setPhases(proposal.phases.map((phase: {
            phase_number: number;
            phase_name: string;
            description: string;
            timeline: string;
            deliverables: { id: string; name: string; description: string }[];
            objectives: string[];
            amount: number;
          }) => ({
            phase_name: phase.phase_name,
            description: phase.description,
            timeline: phase.timeline,
            amount: phase.amount.toString(),
            deliverables: phase.deliverables.map((d: { id: string; name: string; description: string }) => ({
              id: d.id,
              name: d.name,
              description: d.description,
            })),
            objectives: phase.objectives,
            goals: [],
            visible_in_portal: true,
          })));
        }

        // Populate milestones
        if (proposal.milestones && proposal.milestones.length > 0) {
          setMilestones(proposal.milestones.map((m: {
            milestone_name: string;
            description: string;
            amount: number;
            phase_number: number;
          }) => ({
            milestone_name: m.milestone_name,
            description: m.description || '',
            amount: m.amount.toString(),
            due_date: '',
            phase_index: m.phase_number - 1,
          })));
        }

        // Switch to phases tab to show generated content
        setActiveTab('phases');
      } else {
        alert('Error generating proposal: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error generating proposal:', error);
      alert('Error generating proposal. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((s) => s !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotalAmount = () => {
    return phases.reduce((sum, phase) => sum + (parseFloat(phase.amount) || 0), 0);
  };

  const calculateFinalAmount = () => {
    const total = calculateTotalAmount();
    const discount = parseFloat(formData.discount_percentage) || 0;
    return total - (total * discount / 100);
  };

  const updatePhase = (index: number, field: keyof PhaseFormData, value: PhaseFormData[keyof PhaseFormData]) => {
    const newPhases = [...phases];
    newPhases[index] = { ...newPhases[index], [field]: value };
    setPhases(newPhases);
  };

  const addPhase = () => {
    setPhases([
      ...phases,
      {
        phase_name: '',
        description: '',
        timeline: '',
        amount: '',
        deliverables: [],
        objectives: [],
        goals: [],
        visible_in_portal: true,
      },
    ]);
  };

  const removePhase = (index: number) => {
    if (phases.length > 1) {
      setPhases(phases.filter((_, i) => i !== index));
      setMilestones(milestones.map((m) => ({
        ...m,
        phase_index: m.phase_index === index ? 0 : m.phase_index > index ? m.phase_index - 1 : m.phase_index,
      })));
    }
  };

  const updateMilestone = (index: number, field: keyof MilestoneFormData, value: string | number) => {
    const newMilestones = [...milestones];
    newMilestones[index] = { ...newMilestones[index], [field]: value };
    setMilestones(newMilestones);
  };

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      {
        milestone_name: '',
        description: '',
        amount: '',
        due_date: '',
        phase_index: 0,
      },
    ]);
  };

  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((_, i) => i !== index));
    }
  };

  const addDeliverable = (phaseIndex: number) => {
    const newPhases = [...phases];
    newPhases[phaseIndex].deliverables.push({
      id: crypto.randomUUID(),
      name: '',
      description: '',
    });
    setPhases(newPhases);
  };

  const updateDeliverable = (phaseIndex: number, deliverableIndex: number, value: string) => {
    const newPhases = [...phases];
    newPhases[phaseIndex].deliverables[deliverableIndex].name = value;
    setPhases(newPhases);
  };

  const removeDeliverable = (phaseIndex: number, deliverableIndex: number) => {
    const newPhases = [...phases];
    newPhases[phaseIndex].deliverables = newPhases[phaseIndex].deliverables.filter((_, i) => i !== deliverableIndex);
    setPhases(newPhases);
  };

  const addListItem = (phaseIndex: number, field: 'objectives' | 'goals') => {
    const newPhases = [...phases];
    newPhases[phaseIndex][field].push('');
    setPhases(newPhases);
  };

  const updateListItem = (phaseIndex: number, field: 'objectives' | 'goals', itemIndex: number, value: string) => {
    const newPhases = [...phases];
    newPhases[phaseIndex][field][itemIndex] = value;
    setPhases(newPhases);
  };

  const removeListItem = (phaseIndex: number, field: 'objectives' | 'goals', itemIndex: number) => {
    const newPhases = [...phases];
    newPhases[phaseIndex][field] = newPhases[phaseIndex][field].filter((_, i) => i !== itemIndex);
    setPhases(newPhases);
  };

  const handleSave = async (status: 'draft' | 'sent') => {
    setIsSaving(true);

    try {
      const proposalData = {
        lead_submission_id: leadId || null,
        client_name: formData.client_name,
        client_email: formData.client_email,
        client_company: formData.client_company || null,
        client_phone: formData.client_phone || null,
        project_name: formData.project_name,
        project_overview: formData.project_overview || null,
        project_scope: formData.project_scope || null,
        total_timeline: formData.total_timeline || null,
        start_date: formData.start_date || null,
        estimated_completion_date: formData.estimated_completion_date || null,
        total_amount: calculateTotalAmount(),
        discount_percentage: parseFloat(formData.discount_percentage) || 0,
        final_amount: calculateFinalAmount(),
        status,
        phases: phases
          .filter((p) => p.phase_name)
          .map((p, i) => ({
            phase_number: i + 1,
            phase_name: p.phase_name,
            description: p.description || null,
            timeline: p.timeline || null,
            deliverables: p.deliverables.filter((d) => d.name),
            objectives: p.objectives.filter(Boolean),
            goals: p.goals.filter(Boolean),
            amount: parseFloat(p.amount) || 0,
            visible_in_portal: p.visible_in_portal,
          })),
        milestones: milestones
          .filter((m) => m.milestone_name)
          .map((m) => ({
            milestone_name: m.milestone_name,
            description: m.description || null,
            amount: parseFloat(m.amount) || 0,
            due_date: m.due_date || null,
          })),
        agreement_text: agreementText,
      };

      const response = await authFetch('/api/proposals', {
        method: 'POST',
        body: JSON.stringify(proposalData),
      });

      const result = await response.json();

      if (response.ok && result.data) {
        router.push(`/admin/proposals/${result.data.id}`);
      } else {
        console.error('Error creating proposal:', result.error);
      }
    } catch (error) {
      console.error('Error saving proposal:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const businessIntelligence = lead?.business_intelligence as BusinessIntelligence | undefined;

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="New Proposal"
        subtitle={lead ? `For ${lead.name}` : 'Create a new client proposal'}
      />

      <div className="py-8 md:py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          <Link
            href="/admin/proposals"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Proposals
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* AI Generation Panel - Show when lead exists */}
              {lead && (
                <div className="bg-gradient-to-br from-radiance-gold/10 to-radiance-amber/5 border border-radiance-gold/30 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                        <svg className="w-5 h-5 text-radiance-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        AI-Powered Proposal Generation
                      </h3>
                      <p className="text-text-muted text-sm mt-1">
                        {businessIntelligence
                          ? 'Generate a complete proposal based on the lead\'s business intelligence'
                          : 'Select services to generate a proposal template'}
                      </p>
                    </div>
                    {lead.readiness_score !== undefined && lead.readiness_score !== null && (
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        lead.readiness_score >= 70
                          ? 'bg-green-500/20 text-green-400'
                          : lead.readiness_score >= 40
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-red-500/20 text-red-400'
                      }`}>
                        AI Score: {lead.readiness_score}/100
                      </div>
                    )}
                  </div>

                  {/* Show data quality warning if limited data */}
                  {!businessIntelligence && (
                    <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <p className="text-amber-400 text-sm font-medium">Limited Business Intelligence</p>
                          <p className="text-amber-400/70 text-xs mt-1">
                            This lead was created before AI analysis or analysis failed. You can still generate a proposal, but it will use default templates. Consider re-analyzing the website for better results.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Service Selection */}
                  <div className="mb-4">
                    <label className="block text-text-primary text-sm font-medium mb-2">
                      Select Services
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {SERVICE_OPTIONS.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            selectedServices.includes(service.id)
                              ? 'border-radiance-gold bg-radiance-gold/10 text-text-primary'
                              : 'border-depth-border bg-depth-elevated text-text-muted hover:border-depth-border/50'
                          }`}
                        >
                          <div className="font-medium text-sm">{service.name}</div>
                          <div className="text-xs opacity-70">{service.price}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Requirements */}
                  <div className="mb-4">
                    <Textarea
                      label="Additional Requirements (Optional)"
                      rows={2}
                      value={customRequirements}
                      onChange={(e) => setCustomRequirements(e.target.value)}
                      placeholder="Any specific requirements or customizations..."
                    />
                  </div>

                  <Button
                    onClick={handleGenerateWithAI}
                    isLoading={isGenerating}
                    disabled={selectedServices.length === 0}
                    className="w-full"
                  >
                    {isGenerating ? 'Generating Proposal...' : businessIntelligence ? 'Generate Personalized Proposal' : 'Generate Proposal Template'}
                  </Button>
                </div>
              )}

              {/* Pricing Summary */}
              <div className="p-4 bg-depth-surface border border-depth-border rounded-xl flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-6">
                  <div>
                    <span className="text-text-muted text-sm">Total Amount</span>
                    <p className="text-text-primary font-bold text-xl">{formatCurrency(calculateTotalAmount())}</p>
                  </div>
                  {parseFloat(formData.discount_percentage) > 0 && (
                    <div>
                      <span className="text-text-muted text-sm">Discount ({formData.discount_percentage}%)</span>
                      <p className="text-red-400 font-bold text-xl">
                        -{formatCurrency(calculateTotalAmount() * parseFloat(formData.discount_percentage) / 100)}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-text-muted text-sm">Final Amount</span>
                    <p className="text-radiance-gold font-bold text-xl">{formatCurrency(calculateFinalAmount())}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => handleSave('draft')} isLoading={isSaving}>
                    Save Draft
                  </Button>
                  <Button variant="primary" onClick={() => handleSave('sent')} isLoading={isSaving}>
                    Send Proposal
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-depth-border">
                {[
                  { key: 'details', label: 'Details' },
                  { key: 'phases', label: 'Phases' },
                  { key: 'milestones', label: 'Milestones' },
                  { key: 'agreement', label: 'Agreement' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as typeof activeTab)}
                    className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                      activeTab === tab.key
                        ? 'text-radiance-gold border-radiance-gold'
                        : 'text-text-muted border-transparent hover:text-text-primary'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-depth-surface border border-depth-border rounded-2xl p-6 overflow-hidden relative">
                <div
                  className="absolute inset-0 opacity-[0.015] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />

                <div className="relative z-10">
                  {/* Details Tab */}
                  {activeTab === 'details' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-4">Client Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Client Name"
                            required
                            value={formData.client_name}
                            onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                          />
                          <Input
                            label="Client Email"
                            type="email"
                            required
                            value={formData.client_email}
                            onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                          />
                          <Input
                            label="Company"
                            value={formData.client_company}
                            onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
                          />
                          <Input
                            label="Phone"
                            type="tel"
                            value={formData.client_phone}
                            onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-4">Project Information</h3>
                        <div className="space-y-4">
                          <Input
                            label="Project Name"
                            required
                            value={formData.project_name}
                            onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                          />
                          <Textarea
                            label="Project Overview"
                            rows={4}
                            value={formData.project_overview}
                            onChange={(e) => setFormData({ ...formData, project_overview: e.target.value })}
                            hint="Supports markdown formatting"
                          />
                          <Textarea
                            label="Project Scope"
                            rows={4}
                            value={formData.project_scope}
                            onChange={(e) => setFormData({ ...formData, project_scope: e.target.value })}
                            hint="Supports markdown formatting"
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-4">Timeline & Pricing</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Input
                            label="Total Timeline"
                            placeholder="e.g., 6-9 months"
                            value={formData.total_timeline}
                            onChange={(e) => setFormData({ ...formData, total_timeline: e.target.value })}
                          />
                          <Input
                            label="Start Date"
                            type="date"
                            value={formData.start_date}
                            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                          />
                          <Input
                            label="Estimated Completion"
                            type="date"
                            value={formData.estimated_completion_date}
                            onChange={(e) => setFormData({ ...formData, estimated_completion_date: e.target.value })}
                          />
                          <Input
                            label="Discount (%)"
                            type="number"
                            min="0"
                            max="100"
                            value={formData.discount_percentage}
                            onChange={(e) => setFormData({ ...formData, discount_percentage: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Phases Tab */}
                  {activeTab === 'phases' && (
                    <div className="space-y-6">
                      {phases.map((phase, phaseIndex) => (
                        <div
                          key={phaseIndex}
                          className={`p-6 bg-depth-elevated border border-depth-border rounded-xl transition-opacity ${
                            !phase.visible_in_portal ? 'opacity-60' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <h4 className="text-lg font-semibold text-text-primary">
                                Phase {phaseIndex + 1}
                              </h4>
                              {!phase.visible_in_portal && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-gray-500/10 text-gray-400">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                  </svg>
                                  Hidden from client
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={phase.visible_in_portal}
                                  onChange={(e) => updatePhase(phaseIndex, 'visible_in_portal', e.target.checked)}
                                  className="w-4 h-4 rounded border-depth-border bg-depth-base text-radiance-gold focus:ring-radiance-gold focus:ring-offset-0"
                                />
                                <span className="text-sm text-text-muted">Visible in Portal</span>
                              </label>
                              {phases.length > 1 && (
                                <button
                                  onClick={() => removePhase(phaseIndex)}
                                  className="text-red-400 hover:text-red-300 text-sm"
                                >
                                  Remove Phase
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <Input
                                label="Phase Name"
                                required
                                value={phase.phase_name}
                                onChange={(e) => updatePhase(phaseIndex, 'phase_name', e.target.value)}
                              />
                              <Input
                                label="Timeline"
                                placeholder="e.g., 4-6 weeks"
                                value={phase.timeline}
                                onChange={(e) => updatePhase(phaseIndex, 'timeline', e.target.value)}
                              />
                              <Input
                                label="Amount"
                                type="number"
                                min="0"
                                value={phase.amount}
                                onChange={(e) => updatePhase(phaseIndex, 'amount', e.target.value)}
                              />
                            </div>

                            <Textarea
                              label="Description"
                              rows={3}
                              value={phase.description}
                              onChange={(e) => updatePhase(phaseIndex, 'description', e.target.value)}
                            />

                            <div>
                              <label className="block text-text-primary text-sm font-medium mb-2">
                                Deliverables
                              </label>
                              <div className="space-y-2">
                                {phase.deliverables.map((deliverable, dIndex) => (
                                  <div key={deliverable.id} className="flex gap-2">
                                    <Input
                                      value={deliverable.name}
                                      onChange={(e) => updateDeliverable(phaseIndex, dIndex, e.target.value)}
                                      placeholder="Deliverable name"
                                    />
                                    <button
                                      onClick={() => removeDeliverable(phaseIndex, dIndex)}
                                      className="px-3 text-red-400 hover:text-red-300"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}
                                <button
                                  onClick={() => addDeliverable(phaseIndex)}
                                  className="text-radiance-gold hover:text-radiance-amber text-sm"
                                >
                                  + Add Deliverable
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="block text-text-primary text-sm font-medium mb-2">
                                Objectives
                              </label>
                              <div className="space-y-2">
                                {phase.objectives.map((objective, oIndex) => (
                                  <div key={oIndex} className="flex gap-2">
                                    <Input
                                      value={objective}
                                      onChange={(e) => updateListItem(phaseIndex, 'objectives', oIndex, e.target.value)}
                                      placeholder="Objective"
                                    />
                                    <button
                                      onClick={() => removeListItem(phaseIndex, 'objectives', oIndex)}
                                      className="px-3 text-red-400 hover:text-red-300"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}
                                <button
                                  onClick={() => addListItem(phaseIndex, 'objectives')}
                                  className="text-radiance-gold hover:text-radiance-amber text-sm"
                                >
                                  + Add Objective
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      <Button variant="outline" onClick={addPhase}>
                        + Add Phase
                      </Button>
                    </div>
                  )}

                  {/* Milestones Tab */}
                  {activeTab === 'milestones' && (
                    <div className="space-y-6">
                      {milestones.map((milestone, index) => (
                        <div
                          key={index}
                          className="p-6 bg-depth-elevated border border-depth-border rounded-xl"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-text-primary">
                              Milestone {index + 1}
                            </h4>
                            {milestones.length > 1 && (
                              <button
                                onClick={() => removeMilestone(index)}
                                className="text-red-400 hover:text-red-300 text-sm"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              label="Milestone Name"
                              required
                              value={milestone.milestone_name}
                              onChange={(e) => updateMilestone(index, 'milestone_name', e.target.value)}
                            />
                            <Input
                              label="Amount"
                              type="number"
                              min="0"
                              value={milestone.amount}
                              onChange={(e) => updateMilestone(index, 'amount', e.target.value)}
                            />
                            <Input
                              label="Due Date"
                              type="date"
                              value={milestone.due_date}
                              onChange={(e) => updateMilestone(index, 'due_date', e.target.value)}
                            />
                            <div>
                              <label className="block text-text-primary text-sm font-medium mb-2">
                                Related Phase
                              </label>
                              <select
                                value={milestone.phase_index}
                                onChange={(e) => updateMilestone(index, 'phase_index', parseInt(e.target.value))}
                                className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary focus:border-radiance-gold focus:outline-none"
                              >
                                {phases.map((phase, pIndex) => (
                                  <option key={pIndex} value={pIndex}>
                                    {phase.phase_name || `Phase ${pIndex + 1}`}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="md:col-span-2">
                              <Textarea
                                label="Description"
                                rows={2}
                                value={milestone.description}
                                onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <Button variant="outline" onClick={addMilestone}>
                        + Add Milestone
                      </Button>
                    </div>
                  )}

                  {/* Agreement Tab */}
                  {activeTab === 'agreement' && (
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Agreement Terms</h3>
                      <p className="text-text-muted text-sm mb-4">
                        This agreement will be presented to the client for signing. Supports markdown formatting.
                      </p>
                      <Textarea
                        rows={20}
                        value={agreementText}
                        onChange={(e) => setAgreementText(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - Lead Info & Business Intelligence */}
            <div className="lg:col-span-1">
              {lead && (
                <div className="sticky top-24 space-y-4">
                  {/* Lead Info Card - Always show for leads */}
                  <div className="bg-depth-surface border border-depth-border rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-radiance-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Lead Info
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-text-muted">Name:</span>
                        <span className="text-text-primary ml-2 font-medium">{lead.name}</span>
                      </div>
                      {lead.company && (
                        <div>
                          <span className="text-text-muted">Company:</span>
                          <span className="text-text-primary ml-2">{lead.company}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-text-muted">Email:</span>
                        <a href={`mailto:${lead.email}`} className="text-radiance-gold hover:underline ml-2">
                          {lead.email}
                        </a>
                      </div>
                      {lead.website_url && (
                        <div>
                          <span className="text-text-muted">Website:</span>
                          <a
                            href={lead.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-radiance-gold hover:underline ml-2"
                          >
                            {(() => {
                              try {
                                return new URL(lead.website_url).hostname;
                              } catch {
                                return lead.website_url;
                              }
                            })()}
                          </a>
                        </div>
                      )}
                      <div className="pt-2 border-t border-depth-border flex items-center justify-between">
                        <div>
                          <span className="text-text-muted">Service:</span>
                          <span className="text-text-primary ml-2 capitalize">{lead.service}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          lead.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                          lead.status === 'contacted' ? 'bg-amber-500/20 text-amber-400' :
                          lead.status === 'proposal_sent' ? 'bg-green-500/20 text-green-400' :
                          lead.status === 'converted' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {lead.status}
                        </span>
                      </div>
                      <div className="text-xs text-text-muted">
                        Created {new Date(lead.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Business Intelligence Card */}
                  <div className="bg-depth-surface border border-depth-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                        <svg className="w-4 h-4 text-radiance-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Business Intelligence
                      </h3>
                      {businessIntelligence && (
                        <button
                          onClick={() => setShowBusinessIntel(!showBusinessIntel)}
                          className="text-text-muted hover:text-text-primary text-xs"
                        >
                          {showBusinessIntel ? 'Collapse' : 'Expand'}
                        </button>
                      )}
                    </div>
                    {showBusinessIntel && (
                      <BusinessIntelligenceSummary
                        businessIntelligence={businessIntelligence}
                        readinessScore={lead?.readiness_score || undefined}
                        compact={false}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Placeholder when no lead */}
              {!lead && (
                <div className="sticky top-24 bg-depth-surface border border-depth-border rounded-xl p-6 text-center">
                  <svg className="w-12 h-12 mx-auto text-text-muted mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-text-muted text-sm mb-2">
                    No lead selected
                  </p>
                  <p className="text-text-muted text-xs mb-4">
                    Select a lead to access AI-powered proposal generation and business intelligence.
                  </p>
                  <Link
                    href="/admin/leads"
                    className="inline-flex items-center gap-2 text-radiance-gold hover:underline text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    View Leads
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default function AdminNewProposalPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen">
        <AdminHeader title="New Proposal" subtitle="Loading..." />
        <Container size="wide" className="py-12">
          <div className="text-center text-text-muted">Loading...</div>
        </Container>
      </div>
    }>
      <NewProposalContent />
    </Suspense>
  );
}
