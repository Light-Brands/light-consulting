/**
 * Admin Offers Page
 * Light Brand Consulting
 *
 * Manage offer ladder: Entry → Core → Premium → Elite
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AdminHeader, ViewToggle, CollapsibleStats } from '@/components/admin';
import type { ViewMode } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { Offer, OfferInsert, OfferUpdate } from '@/types/offers';
import { getTierColor } from '@/types/offers';

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { authFetch } = useAuthFetch();

  // Form state
  const [formData, setFormData] = useState<OfferInsert>({
    name: '',
    slug: '',
    description: '',
    tier: 1,
    tier_label: 'Entry',
    target_audience: '',
    qualifying_criteria: '',
    price_range: '',
    deliverables: [],
    funnel_route: '',
    is_invite_only: false,
    sort_order: 0,
  });
  const [deliverablesText, setDeliverablesText] = useState('');

  const fetchOffers = useCallback(async () => {
    try {
      const response = await authFetch('/api/admin/offers?include_inactive=true');
      const data = await response.json();

      if (data.data) {
        setOffers(data.data);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  const openNewModal = () => {
    setEditingOffer(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      tier: offers.length + 1,
      tier_label: 'Entry',
      target_audience: '',
      qualifying_criteria: '',
      price_range: '',
      deliverables: [],
      funnel_route: '',
      is_invite_only: false,
      sort_order: offers.length,
    });
    setDeliverablesText('');
    setIsModalOpen(true);
  };

  const openEditModal = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      name: offer.name,
      slug: offer.slug,
      description: offer.description || '',
      tier: offer.tier,
      tier_label: offer.tier_label || 'Entry',
      target_audience: offer.target_audience || '',
      qualifying_criteria: offer.qualifying_criteria || '',
      price_range: offer.price_range || '',
      deliverables: offer.deliverables || [],
      funnel_route: offer.funnel_route || '',
      is_invite_only: offer.is_invite_only,
      sort_order: offer.sort_order,
    });
    setDeliverablesText((offer.deliverables || []).join('\n'));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingOffer(null);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const deliverables = deliverablesText
        .split('\n')
        .map((d) => d.trim())
        .filter((d) => d.length > 0);

      const payload: OfferInsert | OfferUpdate = {
        ...formData,
        deliverables: deliverables.length > 0 ? deliverables : null,
      };

      const url = editingOffer
        ? `/api/admin/offers/${editingOffer.id}`
        : '/api/admin/offers';
      const method = editingOffer ? 'PUT' : 'POST';

      const response = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.error) {
        console.error('Error saving offer:', data.error);
        return;
      }

      if (editingOffer) {
        setOffers((prev) =>
          prev.map((o) => (o.id === editingOffer.id ? data.data : o))
        );
      } else {
        setOffers((prev) => [...prev, data.data]);
      }

      closeModal();
    } catch (error) {
      console.error('Error saving offer:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await authFetch(`/api/admin/offers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setOffers((prev) => prev.filter((o) => o.id !== id));
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  const toggleActive = async (offer: Offer) => {
    try {
      const response = await authFetch(`/api/admin/offers/${offer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !offer.is_active }),
      });

      const data = await response.json();

      if (data.data) {
        setOffers((prev) =>
          prev.map((o) => (o.id === offer.id ? data.data : o))
        );
      }
    } catch (error) {
      console.error('Error toggling offer status:', error);
    }
  };

  const stats = {
    total: offers.length,
    active: offers.filter((o) => o.is_active).length,
    inviteOnly: offers.filter((o) => o.is_invite_only).length,
    tiers: {
      entry: offers.filter((o) => o.tier_label === 'Entry').length,
      core: offers.filter((o) => o.tier_label === 'Core').length,
      premium: offers.filter((o) => o.tier_label === 'Premium').length,
      elite: offers.filter((o) => o.tier_label === 'Elite').length,
    },
  };

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Offers"
        subtitle="Manage your offer ladder"
        action={
          <Button variant="primary" size="sm" onClick={openNewModal}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Offer
          </Button>
        }
      />

      <div className="py-4 md:py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          {/* Stats Row */}
          <CollapsibleStats>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
              {[
                { label: 'Total', value: stats.total, color: 'text-radiance-gold' },
                { label: 'Active', value: stats.active, color: 'text-green-400' },
                { label: 'Entry', value: stats.tiers.entry, color: 'text-blue-400' },
                { label: 'Core', value: stats.tiers.core, color: 'text-purple-400' },
                { label: 'Premium', value: stats.tiers.premium, color: 'text-radiance-gold' },
                { label: 'Elite', value: stats.tiers.elite, color: 'text-amber-400' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-depth-surface border border-depth-border rounded-lg md:rounded-xl px-2 py-2 md:px-4 md:py-3 text-center"
                >
                  <p className={`font-bold ${stat.color} text-lg md:text-2xl`}>
                    {isLoading ? '-' : stat.value}
                  </p>
                  <p className="text-[10px] md:text-sm text-text-muted truncate">{stat.label}</p>
                </div>
              ))}
            </div>
          </CollapsibleStats>

          {/* View Toggle */}
          <div className="flex justify-end mb-6">
            <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>

          {/* Offer Ladder Visualization */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
              <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                Offer::Ladder
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
              {['Entry', 'Core', 'Premium', 'Elite'].map((tier, index) => {
                const tierColor = getTierColor(tier);
                const tierOffers = offers.filter((o) => o.tier_label === tier);
                return (
                  <React.Fragment key={tier}>
                    <div className={`flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl border ${tierColor.border} ${tierColor.bg}`}>
                      <span className={`font-semibold text-sm md:text-base ${tierColor.text}`}>{tier}</span>
                      <span className="text-xs text-text-muted">{tierOffers.length} offer{tierOffers.length !== 1 ? 's' : ''}</span>
                    </div>
                    {index < 3 && (
                      <svg className="w-4 h-4 md:w-6 md:h-6 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Offers Display */}
          <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            <div className="relative z-10 overflow-hidden">
              <div className="p-4 md:p-6 border-b border-depth-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                  <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                    Offers::All
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-text-primary">All Offers</h2>
              </div>

              {isLoading ? (
                <div className="p-4 md:p-6 text-center text-text-muted">Loading...</div>
              ) : offers.length === 0 ? (
                <div className="p-4 md:p-6 text-center text-text-muted">
                  No offers found.{' '}
                  <button
                    onClick={openNewModal}
                    className="text-radiance-gold hover:underline"
                  >
                    Add your first offer
                  </button>
                </div>
              ) : (
                <>
                  {/* Card View */}
                  {viewMode === 'card' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                      {offers.map((offer) => {
                        const tierColor = getTierColor(offer.tier_label);
                        return (
                          <div
                            key={offer.id}
                            className={`bg-depth-elevated border rounded-xl p-4 transition-all ${
                              offer.is_active
                                ? 'border-depth-border hover:border-radiance-gold/30'
                                : 'border-depth-border/50 opacity-60'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-text-primary">{offer.name}</h3>
                                <p className="text-sm text-text-muted font-mono">/{offer.slug}</p>
                              </div>
                              <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${tierColor.bg} ${tierColor.text} ${tierColor.border} border`}>
                                {offer.tier_label || 'Entry'}
                              </span>
                            </div>

                            {offer.description && (
                              <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                                {offer.description}
                              </p>
                            )}

                            <div className="space-y-2 mb-4">
                              {offer.target_audience && (
                                <div className="text-xs">
                                  <span className="text-text-muted">Audience:</span>{' '}
                                  <span className="text-text-secondary">{offer.target_audience}</span>
                                </div>
                              )}
                              {offer.price_range && (
                                <div className="text-xs">
                                  <span className="text-text-muted">Price:</span>{' '}
                                  <span className="text-radiance-gold font-medium">{offer.price_range}</span>
                                </div>
                              )}
                              {offer.is_invite_only && (
                                <div className="flex items-center gap-1 text-xs text-amber-400">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                  </svg>
                                  Invite Only
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2 pt-3 border-t border-depth-border">
                              <button
                                onClick={() => toggleActive(offer)}
                                className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                                  offer.is_active
                                    ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                                    : 'bg-gray-500/10 text-gray-400 hover:bg-gray-500/20'
                                }`}
                              >
                                {offer.is_active ? 'Active' : 'Inactive'}
                              </button>
                              <div className="flex-1" />
                              <button
                                onClick={() => openEditModal(offer)}
                                className="p-2 text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/10 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => setDeleteId(offer.id)}
                                className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* List View */}
                  {viewMode === 'list' && (
                    <div className="overflow-x-auto max-w-full">
                      <table className="w-full min-w-[800px]">
                        <thead className="bg-depth-elevated">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                              Offer
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                              Tier
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                              Audience
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                              Price
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                              Status
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-depth-border">
                          {offers.map((offer) => {
                            const tierColor = getTierColor(offer.tier_label);
                            return (
                              <tr
                                key={offer.id}
                                className={`hover:bg-depth-elevated transition-colors ${
                                  !offer.is_active ? 'opacity-60' : ''
                                }`}
                              >
                                <td className="px-4 py-3">
                                  <div className="min-w-[180px]">
                                    <p className="font-medium text-text-primary">{offer.name}</p>
                                    <p className="text-sm text-text-muted font-mono">/{offer.slug}</p>
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${tierColor.bg} ${tierColor.text} ${tierColor.border} border`}>
                                    {offer.tier_label || 'Entry'}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <p className="text-sm text-text-secondary max-w-[200px] truncate">
                                    {offer.target_audience || '-'}
                                  </p>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <p className="text-sm text-radiance-gold font-medium">
                                    {offer.price_range || '-'}
                                  </p>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => toggleActive(offer)}
                                      className={`px-2 py-0.5 text-xs rounded-full font-medium transition-colors ${
                                        offer.is_active
                                          ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                                          : 'bg-gray-500/10 text-gray-400 hover:bg-gray-500/20'
                                      }`}
                                    >
                                      {offer.is_active ? 'Active' : 'Inactive'}
                                    </button>
                                    {offer.is_invite_only && (
                                      <span className="text-amber-400" title="Invite Only">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex items-center justify-end gap-1">
                                    <button
                                      onClick={() => openEditModal(offer)}
                                      className="p-2 text-text-muted hover:text-text-primary hover:bg-depth-elevated rounded-lg transition-colors"
                                      title="Edit"
                                    >
                                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                      </svg>
                                    </button>
                                    <button
                                      onClick={() => setDeleteId(offer.id)}
                                      className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                      title="Delete"
                                    >
                                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeModal}
          />
          <div className="relative bg-depth-surface border border-depth-border rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              {editingOffer ? 'Edit Offer' : 'New Offer'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                        slug: !editingOffer ? generateSlug(e.target.value) : prev.slug,
                      }));
                    }}
                    className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary font-mono focus:border-radiance-gold focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  rows={2}
                  className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary focus:border-radiance-gold focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Tier Level
                  </label>
                  <input
                    type="number"
                    value={formData.tier}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        tier: parseInt(e.target.value) || 1,
                      }))
                    }
                    min={1}
                    className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Tier Label
                  </label>
                  <select
                    value={formData.tier_label || 'Entry'}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, tier_label: e.target.value }))
                    }
                    className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                  >
                    <option value="Entry">Entry</option>
                    <option value="Core">Core</option>
                    <option value="Premium">Premium</option>
                    <option value="Elite">Elite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        sort_order: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={formData.target_audience || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, target_audience: e.target.value }))
                    }
                    placeholder="e.g., Business owners evaluating AI"
                    className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Qualifying Criteria
                  </label>
                  <input
                    type="text"
                    value={formData.qualifying_criteria || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, qualifying_criteria: e.target.value }))
                    }
                    placeholder="e.g., Completed AI Readiness Diagnostic"
                    className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Price Range
                  </label>
                  <input
                    type="text"
                    value={formData.price_range || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, price_range: e.target.value }))
                    }
                    placeholder="e.g., $500-$1,500"
                    className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Funnel Route
                  </label>
                  <input
                    type="text"
                    value={formData.funnel_route || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, funnel_route: e.target.value }))
                    }
                    placeholder="e.g., /funnel/ai-readiness"
                    className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Deliverables (one per line)
                </label>
                <textarea
                  value={deliverablesText}
                  onChange={(e) => setDeliverablesText(e.target.value)}
                  rows={4}
                  placeholder="AI Readiness Score&#10;30-minute strategy call&#10;Implementation roadmap"
                  className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary focus:border-radiance-gold focus:outline-none resize-none font-mono text-sm"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_invite_only}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, is_invite_only: e.target.checked }))
                    }
                    className="w-4 h-4 rounded border-depth-border bg-depth-base text-radiance-gold focus:ring-radiance-gold"
                  />
                  <span className="text-sm text-text-secondary">Invite Only</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-depth-border">
                <Button variant="ghost" type="button" onClick={closeModal}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving...' : editingOffer ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDeleteId(null)}
          />
          <div className="relative bg-depth-surface border border-depth-border rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Delete Offer
            </h3>
            <p className="text-text-secondary mb-6">
              Are you sure you want to delete this offer? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => handleDelete(deleteId)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
