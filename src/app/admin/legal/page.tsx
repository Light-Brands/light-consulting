/**
 * Legal Vault Page
 * Light Brand Consulting
 *
 * Displays legal documents from the brand-factory repository
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AdminHeader } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';

interface LegalDocument {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size: number;
  downloadUrl: string | null;
  githubUrl: string;
  category: string;
  extension: string | null;
}

interface LegalResponse {
  documents: LegalDocument[];
  categories: string[];
  total: number;
  repoUrl: string;
  error?: string;
}

// Format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

// Get file icon based on extension
function getFileIcon(extension: string | null): React.ReactNode {
  const iconClass = "w-8 h-8";

  switch (extension?.toLowerCase()) {
    case 'pdf':
      return (
        <svg className={`${iconClass} text-red-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          <text x="7" y="17" fontSize="6" fill="currentColor" fontWeight="bold">PDF</text>
        </svg>
      );
    case 'md':
      return (
        <svg className={`${iconClass} text-blue-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'txt':
      return (
        <svg className={`${iconClass} text-gray-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    default:
      return (
        <svg className={`${iconClass} text-radiance-gold`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
  }
}

// Category badge colors
function getCategoryColor(category: string): string {
  switch (category.toLowerCase()) {
    case 'tax-forms':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'agreements':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'root':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    default:
      return 'bg-radiance-gold/20 text-radiance-gold border-radiance-gold/30';
  }
}

export default function LegalPage() {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [repoUrl, setRepoUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { authFetch } = useAuthFetch();

  const fetchDocuments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authFetch('/api/admin/legal');
      const data: LegalResponse = await response.json();

      if (data.error && data.documents.length === 0) {
        setError(data.error);
      } else {
        setDocuments(data.documents || []);
        setCategories(data.categories || []);
        setRepoUrl(data.repoUrl || '');
      }
    } catch (err) {
      console.error('Error fetching legal documents:', err);
      setError('Failed to load documents');
    } finally {
      setIsLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = !categoryFilter || doc.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch = !searchTerm ||
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group by category
  const groupedDocuments = filteredDocuments.reduce((acc, doc) => {
    const cat = doc.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(doc);
    return acc;
  }, {} as Record<string, LegalDocument[]>);

  const stats = {
    total: documents.length,
    categories: categories.length,
    pdfs: documents.filter(d => d.extension === 'pdf').length,
  };

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Legal Vault"
        subtitle="Company legal documents and tax forms"
        action={
          repoUrl && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.open(repoUrl, '_blank')}
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              View on GitHub
            </Button>
          )
        }
      />

      <div className="py-4 md:py-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-depth-surface border border-depth-border rounded-lg p-4">
              <div className="text-2xl font-bold text-text-primary">{stats.total}</div>
              <div className="text-sm text-text-muted">Total Documents</div>
            </div>
            <div className="bg-depth-surface border border-depth-border rounded-lg p-4">
              <div className="text-2xl font-bold text-text-primary">{stats.categories}</div>
              <div className="text-sm text-text-muted">Categories</div>
            </div>
            <div className="bg-depth-surface border border-depth-border rounded-lg p-4">
              <div className="text-2xl font-bold text-red-400">{stats.pdfs}</div>
              <div className="text-sm text-text-muted">PDF Files</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-depth-surface border border-depth-border rounded-lg p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-radiance-gold/50"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setCategoryFilter('')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    !categoryFilter
                      ? 'bg-radiance-gold text-depth-base'
                      : 'bg-depth-elevated text-text-secondary hover:text-text-primary'
                  }`}
                >
                  All
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
                      categoryFilter === cat
                        ? 'bg-radiance-gold text-depth-base'
                        : 'bg-depth-elevated text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {cat.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-radiance-gold border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
              <svg className="w-12 h-12 mx-auto mb-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-red-400 font-medium">{error}</p>
              <p className="text-text-muted text-sm mt-2">
                Make sure GITHUB_ACCESS_TOKEN is configured in your environment variables.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && documents.length === 0 && (
            <div className="bg-depth-surface border border-depth-border rounded-lg p-12 text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <p className="text-text-secondary font-medium">No documents found</p>
              <p className="text-text-muted text-sm mt-2">
                Add documents to the legal-vault folder in your brand-factory repository.
              </p>
            </div>
          )}

          {/* Documents Grid by Category */}
          {!isLoading && !error && Object.keys(groupedDocuments).length > 0 && (
            <div className="space-y-8">
              {Object.entries(groupedDocuments).map(([category, docs]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2 capitalize">
                    <span className={`px-2 py-0.5 text-xs rounded border ${getCategoryColor(category)}`}>
                      {category.replace('-', ' ')}
                    </span>
                    <span className="text-text-muted text-sm font-normal">({docs.length} files)</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {docs.map((doc) => (
                      <div
                        key={doc.path}
                        className="group bg-depth-surface border border-depth-border rounded-lg p-4 hover:border-radiance-gold/30 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            {getFileIcon(doc.extension)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-text-primary font-medium truncate" title={doc.name}>
                              {doc.name}
                            </h4>
                            <p className="text-text-muted text-sm mt-1">
                              {formatFileSize(doc.size)}
                              {doc.extension && (
                                <span className="ml-2 uppercase text-xs">{doc.extension}</span>
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          {doc.downloadUrl && (
                            <a
                              href={doc.downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-radiance-gold/10 text-radiance-gold rounded-lg text-sm font-medium hover:bg-radiance-gold/20 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Download
                            </a>
                          )}
                          <a
                            href={doc.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-depth-elevated text-text-secondary rounded-lg text-sm font-medium hover:text-text-primary transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}
