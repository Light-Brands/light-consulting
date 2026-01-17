/**
 * Admin Edit Proposal Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin';
import { Container, Button, Input, Textarea } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { ProposalWithDetails, Deliverable } from '@/types/proposals';

interface PhaseFormData {
  id?: string;
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
  id?: string;
  milestone_name: string;
  description: string;
  amount: string;
  due_date: string;
  phase_index: number;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminEditProposalPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { authFetch } = useAuthFetch();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'phases' | 'milestones' | 'agreement'>('details');

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
    portal_password: '',
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

  // Initialize with default 50/50 payment schedule
  const [milestones, setMilestones] = useState<MilestoneFormData[]>([
    {
      milestone_name: 'Upfront Payment',
      description: '50% deposit to begin work',
      amount: '',
      due_date: '',
      phase_index: 0,
    },
    {
      milestone_name: 'Final Payment',
      description: '50% upon project completion and launch',
      amount: '',
      due_date: '',
      phase_index: 0,
    },
  ]);

  const [agreementText, setAgreementText] = useState('');
  const [proposalFinalAmount, setProposalFinalAmount] = useState<number | null>(null);

  // Fetch existing proposal data
  const fetchProposal = useCallback(async () => {
    try {
      console.log('🔄 Fetching proposal data...');
      const response = await authFetch(`/api/proposals/${id}`);
      const data = await response.json();

      if (data.data) {
        const proposal: ProposalWithDetails = data.data;
        console.log('✅ Proposal data received:', {
          id: proposal.id,
          phases_count: proposal.phases?.length || 0,
          milestones_count: proposal.milestones?.length || 0,
          final_amount: proposal.final_amount,
        });
        
        // Store the proposal's final_amount for comparison
        setProposalFinalAmount(proposal.final_amount);

        // Populate form data
        setFormData({
          client_name: proposal.client_name || '',
          client_email: proposal.client_email || '',
          client_company: proposal.client_company || '',
          client_phone: proposal.client_phone || '',
          project_name: proposal.project_name || '',
          project_overview: proposal.project_overview || '',
          project_scope: proposal.project_scope || '',
          total_timeline: proposal.total_timeline || '',
          start_date: proposal.start_date || '',
          estimated_completion_date: proposal.estimated_completion_date || '',
          discount_percentage: proposal.discount_percentage?.toString() || '0',
          portal_password: proposal.portal_password || '',
        });

        // Populate phases
        console.log('📦 Loading phases from API:', proposal.phases);
        if (proposal.phases && proposal.phases.length > 0) {
          const loadedPhases = proposal.phases.map((phase) => ({
            id: phase.id,
            phase_name: phase.phase_name || '',
            description: phase.description || '',
            timeline: phase.timeline || '',
            amount: phase.amount?.toString() || '',
            deliverables: phase.deliverables || [],
            objectives: phase.objectives || [],
            goals: phase.goals || [],
            visible_in_portal: phase.visible_in_portal ?? true,
          }));
          console.log('📦 Setting phases in form:', loadedPhases);
          setPhases(loadedPhases);
        } else {
          console.log('⚠️ No phases in proposal - resetting to single empty phase');
          // Reset to a single empty phase if there are none saved
          setPhases([{
            phase_name: '',
            description: '',
            timeline: '',
            amount: '',
            deliverables: [],
            objectives: [],
            goals: [],
            visible_in_portal: true,
          }]);
        }

        // Populate milestones - map phase_id back to phase_index
        console.log('🎯 Loading milestones from API:', proposal.milestones);
        if (proposal.milestones && proposal.milestones.length > 0) {
          // Build phase_id to index map
          const phaseIdToIndex: Record<string, number> = {};
          if (proposal.phases) {
            proposal.phases.forEach((phase, index) => {
              phaseIdToIndex[phase.id] = index;
            });
          }
          console.log('🗺️ Phase ID to Index mapping:', phaseIdToIndex);

          const loadedMilestones = proposal.milestones.map((milestone) => {
            const phase_index = milestone.phase_id ? (phaseIdToIndex[milestone.phase_id] ?? 0) : 0;
            console.log(`  Milestone "${milestone.milestone_name}": phase_id=${milestone.phase_id} → phase_index=${phase_index}`);
            return {
              id: milestone.id,
              milestone_name: milestone.milestone_name || '',
              description: milestone.description || '',
              amount: milestone.amount?.toString() || '',
              due_date: milestone.due_date || '',
              phase_index,
            };
          });
          
          // If milestones exist but have no amounts, initialize from proposal final_amount
          const totalMilestoneAmount = loadedMilestones.reduce((sum, m) => sum + (parseFloat(m.amount) || 0), 0);
          if (totalMilestoneAmount === 0 && proposal.final_amount > 0) {
            console.log('⚠️ Milestones have no amounts, initializing from proposal final_amount:', proposal.final_amount);
            const half = (proposal.final_amount / loadedMilestones.length).toFixed(2);
            loadedMilestones.forEach((m) => {
              m.amount = half;
            });
          }
          
          console.log('🎯 Setting milestones in form:', loadedMilestones);
          setMilestones(loadedMilestones);
        } else {
          console.log('⚠️ No milestones in proposal - initializing with default 50/50 split');
          // Initialize with default 50/50 split based on proposal final_amount
          const defaultAmount = proposal.final_amount > 0 
            ? (proposal.final_amount / 2).toFixed(2)
            : '';
          setMilestones([
            {
              milestone_name: 'Upfront Payment',
              description: '50% deposit to begin work',
              amount: defaultAmount,
              due_date: '',
              phase_index: 0,
            },
            {
              milestone_name: 'Final Payment',
              description: '50% upon project completion and launch',
              amount: defaultAmount,
              due_date: '',
              phase_index: 0,
            },
          ]);
        }

        // Populate agreement
        if (proposal.agreement) {
          setAgreementText(proposal.agreement.agreement_text || '');
        }
      }
    } catch (error) {
      console.error('Error fetching proposal:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, id]);

  useEffect(() => {
    fetchProposal();
  }, [fetchProposal]);

  const calculateTotalAmount = () => {
    // Calculate total from payment milestones, not phases
    return milestones.reduce((sum, milestone) => sum + (parseFloat(milestone.amount) || 0), 0);
  };

  const calculateFinalAmount = () => {
    const total = calculateTotalAmount();
    const discount = parseFloat(formData.discount_percentage) || 0;
    return total - (total * discount) / 100;
  };

  // Auto-update milestone amounts when they change (50/50 split by default)
  // This effect is removed since we want manual control over amounts now

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
      setMilestones(
        milestones.map((m) => ({
          ...m,
          phase_index: m.phase_index === index ? 0 : m.phase_index > index ? m.phase_index - 1 : m.phase_index,
        }))
      );
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

  const handleSave = async () => {
    setIsSaving(true);

    try {
      // Update proposal basic info
      const proposalData = {
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
        portal_password: formData.portal_password || null,
      };

      console.log('Saving proposal:', proposalData);
      const response = await authFetch(`/api/proposals/${id}`, {
        method: 'PUT',
        body: JSON.stringify(proposalData),
      });

      if (!response.ok) {
        const result = await response.json();
        console.error('Error updating proposal:', result.error);
        alert('Failed to update proposal. Please try again.');
        return;
      }

      // Batch update all phases (replaces existing phases with new set)
      const phasesPayload = phases
        .filter((p) => p.phase_name) // Only include phases with names
        .map((phase, index) => ({
          phase_number: index + 1,
          phase_name: phase.phase_name,
          description: phase.description || null,
          timeline: phase.timeline || null,
          deliverables: phase.deliverables.filter((d) => d.name),
          objectives: phase.objectives.filter(Boolean),
          goals: phase.goals.filter(Boolean),
          amount: 0, // Phases no longer have pricing - set to 0
          sort_order: index,
          visible_in_portal: phase.visible_in_portal,
        }));

      console.log('Phases before filter:', phases);
      console.log('Saving phases:', phasesPayload);
      
      if (phasesPayload.length === 0) {
        console.warn('No phases to save! This might not be intentional.');
        const confirmed = confirm('Warning: You are about to save this proposal with no phases. This will delete all existing phases. Continue?');
        if (!confirmed) {
          setIsSaving(false);
          return;
        }
      }
      const phasesResponse = await authFetch(`/api/proposals/${id}/phases`, {
        method: 'PUT',
        body: JSON.stringify({ phases: phasesPayload }),
      });

      if (!phasesResponse.ok) {
        const result = await phasesResponse.json();
        console.error('Error updating phases:', result.error);
        alert('Failed to update phases. Please try again.');
        return;
      }

      const phasesResult = await phasesResponse.json();
      console.log('Phases saved successfully:', phasesResult);

      // Batch update all milestones (replaces existing milestones with new set)
      const milestonesPayload = milestones
        .filter((m) => m.milestone_name)
        .map((milestone, index) => ({
          milestone_name: milestone.milestone_name,
          description: milestone.description || null,
          amount: parseFloat(milestone.amount) || 0,
          due_date: milestone.due_date || null,
          sort_order: index,
          phase_index: milestone.phase_index,
        }));

      console.log('Milestones before filter:', milestones);
      console.log('Saving milestones:', milestonesPayload);
      
      if (milestonesPayload.length === 0) {
        console.warn('No milestones to save - all will be deleted');
      }
      const milestonesResponse = await authFetch(`/api/proposals/${id}/milestones`, {
        method: 'PUT',
        body: JSON.stringify({ milestones: milestonesPayload }),
      });

      if (!milestonesResponse.ok) {
        const result = await milestonesResponse.json();
        console.error('Error updating milestones:', result.error);
        alert('Failed to update milestones. Please try again.');
        return;
      }

      const milestonesResult = await milestonesResponse.json();
      console.log('Milestones saved successfully:', milestonesResult);

      console.log('✅ Proposal saved successfully!');
      console.log(`  - Phases: ${phasesPayload.length}`);
      console.log(`  - Milestones: ${milestonesPayload.length}`);
      console.log(`  - Total Amount: $${calculateTotalAmount()}`);
      console.log(`  - Final Amount: $${calculateFinalAmount()}`);

      router.push(`/admin/proposals/${id}`);
    } catch (error) {
      console.error('Error saving proposal:', error);
      alert('An error occurred while saving. Please check the console for details.');
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

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <AdminHeader title="Edit Proposal" subtitle="Loading..." />
        <Container size="wide" className="py-12">
          <div className="text-center text-text-muted">Loading proposal...</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AdminHeader title="Edit Proposal" subtitle={formData.project_name || 'Update proposal details'} />

      <div className="py-4 sm:py-8 md:py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          <Link
            href={`/admin/proposals/${id}`}
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-4 sm:mb-6 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          {/* Pricing Summary */}
          <div className="p-3 sm:p-4 bg-depth-surface border border-depth-border rounded-xl mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <div>
                  <span className="text-text-muted text-xs sm:text-sm">Total</span>
                  <p className="text-text-primary font-bold text-lg sm:text-xl">{formatCurrency(calculateTotalAmount())}</p>
                </div>
                {parseFloat(formData.discount_percentage) > 0 && (
                  <div>
                    <span className="text-text-muted text-xs sm:text-sm">Discount ({formData.discount_percentage}%)</span>
                    <p className="text-red-400 font-bold text-lg sm:text-xl">
                      -{formatCurrency((calculateTotalAmount() * parseFloat(formData.discount_percentage)) / 100)}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-text-muted text-xs sm:text-sm">Final</span>
                  <p className="text-radiance-gold font-bold text-lg sm:text-xl">{formatCurrency(calculateFinalAmount())}</p>
                  {proposalFinalAmount !== null && Math.abs(calculateFinalAmount() - proposalFinalAmount) > 0.01 && (
                    <p className="text-amber-400 text-xs mt-1">
                      Saved: {formatCurrency(proposalFinalAmount)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                <Link href={`/admin/proposals/${id}`} className="flex-1 sm:flex-none">
                  <Button variant="ghost" className="w-full sm:w-auto text-sm">Cancel</Button>
                </Link>
                <Button variant="primary" onClick={handleSave} isLoading={isSaving} className="flex-1 sm:flex-none text-sm">
                  Save
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-depth-border mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            {[
              { key: 'details', label: 'Details' },
              { key: 'phases', label: 'Phases' },
              { key: 'milestones', label: 'Payments' },
              { key: 'agreement', label: 'Agreement' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`px-3 sm:px-6 py-3 text-xs sm:text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap flex-shrink-0 ${
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
          <div className="bg-depth-surface border border-depth-border rounded-xl sm:rounded-2xl p-4 sm:p-6 overflow-hidden relative">
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
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4">Client Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                    <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4">Project Information</h3>
                    <div className="space-y-3 sm:space-y-4">
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
                    <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4">Timeline & Pricing</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4">Portal Access</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-text-primary text-sm font-medium mb-2">
                          Portal Password (Optional)
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={4}
                          value={formData.portal_password}
                          onChange={(e) => setFormData({ ...formData, portal_password: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                          placeholder="4-digit PIN"
                          className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted/50 focus:border-radiance-gold focus:outline-none transition-colors font-mono tracking-widest"
                        />
                        <p className="text-text-muted text-xs mt-1">
                          Leave empty for no password protection
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Phases Tab */}
              {activeTab === 'phases' && (
                <div className="space-y-6">
                  {phases.map((phase, phaseIndex) => (
                    <div
                      key={phase.id || phaseIndex}
                      className={`p-4 sm:p-6 bg-depth-elevated border border-depth-border rounded-xl transition-opacity ${
                        !phase.visible_in_portal ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          <h4 className="text-base sm:text-lg font-semibold text-text-primary">Phase {phaseIndex + 1}</h4>
                          {!phase.visible_in_portal && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-gray-500/10 text-gray-400">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                />
                              </svg>
                              Hidden
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={phase.visible_in_portal}
                              onChange={(e) => updatePhase(phaseIndex, 'visible_in_portal', e.target.checked)}
                              className="w-4 h-4 rounded border-depth-border bg-depth-base text-radiance-gold focus:ring-radiance-gold focus:ring-offset-0"
                            />
                            <span className="text-xs sm:text-sm text-text-muted">Visible</span>
                          </label>
                          {phases.length > 1 && (
                            <button
                              onClick={() => removePhase(phaseIndex)}
                              className="text-red-400 hover:text-red-300 text-xs sm:text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Phase Name"
                            required
                            placeholder="e.g., Discovery & Planning"
                            value={phase.phase_name}
                            onChange={(e) => updatePhase(phaseIndex, 'phase_name', e.target.value)}
                          />
                          <Input
                            label="Timeline"
                            placeholder="e.g., 4-6 weeks"
                            value={phase.timeline}
                            onChange={(e) => updatePhase(phaseIndex, 'timeline', e.target.value)}
                          />
                        </div>

                        <Textarea
                          label="Description"
                          placeholder="What will be accomplished in this phase?"
                          rows={3}
                          value={phase.description}
                          onChange={(e) => updatePhase(phaseIndex, 'description', e.target.value)}
                        />

                        <div>
                          <label className="block text-text-primary text-sm font-medium mb-2">Deliverables</label>
                          <div className="space-y-2">
                            {phase.deliverables.map((deliverable, dIndex) => (
                              <div key={deliverable.id} className="flex gap-2 items-start">
                                <div className="flex-1 min-w-0">
                                  <Input
                                    value={deliverable.name}
                                    onChange={(e) => updateDeliverable(phaseIndex, dIndex, e.target.value)}
                                    placeholder="Deliverable name"
                                  />
                                </div>
                                <button
                                  onClick={() => removeDeliverable(phaseIndex, dIndex)}
                                  className="px-3 py-3 text-red-400 hover:text-red-300 flex-shrink-0"
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
                          <label className="block text-text-primary text-sm font-medium mb-2">Objectives</label>
                          <div className="space-y-2">
                            {phase.objectives.map((objective, oIndex) => (
                              <div key={oIndex} className="flex gap-2 items-start">
                                <div className="flex-1 min-w-0">
                                  <Input
                                    value={objective}
                                    onChange={(e) => updateListItem(phaseIndex, 'objectives', oIndex, e.target.value)}
                                    placeholder="Objective"
                                  />
                                </div>
                                <button
                                  onClick={() => removeListItem(phaseIndex, 'objectives', oIndex)}
                                  className="px-3 py-3 text-red-400 hover:text-red-300 flex-shrink-0"
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
                  <div className="bg-radiance-gold/5 border border-radiance-gold/20 rounded-xl p-3 sm:p-4 mb-6">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-radiance-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="text-text-primary font-medium text-sm sm:text-base mb-1">Payment Schedule</h4>
                        <p className="text-text-secondary text-xs sm:text-sm">
                          Define when clients pay. Default is 50% upfront and 50% on completion.
                        </p>
                      </div>
                    </div>
                  </div>

                  {milestones.map((milestone, index) => (
                    <div key={milestone.id || index} className="p-4 sm:p-6 bg-depth-elevated border border-depth-border rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base sm:text-lg font-semibold text-text-primary">Payment #{index + 1}</h4>
                        {milestones.length > 2 && (
                          <button onClick={() => removeMilestone(index)} className="text-red-400 hover:text-red-300 text-xs sm:text-sm">
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <Input
                          label="Payment Name"
                          placeholder="e.g., Upfront Payment, Final Payment"
                          required
                          value={milestone.milestone_name}
                          onChange={(e) => updateMilestone(index, 'milestone_name', e.target.value)}
                        />
                        <Input
                          label="Amount"
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          value={milestone.amount}
                          onChange={(e) => updateMilestone(index, 'amount', e.target.value)}
                        />
                        <Input
                          label="Due Date (Optional)"
                          type="date"
                          value={milestone.due_date}
                          onChange={(e) => updateMilestone(index, 'due_date', e.target.value)}
                        />
                        <div>
                          <label className="block text-text-primary text-sm font-medium mb-2">Related Phase (Optional)</label>
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
                        <div className="sm:col-span-2">
                          <Textarea
                            label="Description (Optional)"
                            placeholder="e.g., 50% deposit to begin work"
                            rows={2}
                            value={milestone.description}
                            onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" onClick={addMilestone}>
                    + Add Payment Milestone
                  </Button>
                </div>
              )}

              {/* Agreement Tab */}
              {activeTab === 'agreement' && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2 sm:mb-4">Agreement Terms</h3>
                  <p className="text-text-muted text-xs sm:text-sm mb-3 sm:mb-4">
                    This agreement will be presented to the client for signing. Supports markdown.
                  </p>
                  <Textarea
                    rows={12}
                    value={agreementText}
                    onChange={(e) => setAgreementText(e.target.value)}
                    className="min-h-[300px] sm:min-h-[400px]"
                  />
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
