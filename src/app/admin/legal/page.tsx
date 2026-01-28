/**
 * Legal Vault Page
 * Light Brand Consulting
 *
 * Displays legal documents from the brand-factory repository
 * Folder-based navigation with inline markdown preview
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AdminHeader } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import ReactMarkdown from 'react-markdown';

interface LegalDocument {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size: number;
  downloadUrl: string | null;
  githubUrl: string;
  category: string;
  subcategory: string | null;
  fullCategory: string;
  extension: string | null;
}

interface LegalResponse {
  documents: LegalDocument[];
  categories: string[];
  fullCategories: string[];
  total: number;
  repoUrl: string;
  error?: string;
}

// Format category name for display
function formatCategoryName(category: string): string {
  return category
    .split('/')
    .map(part => part.replace(/-/g, ' '))
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' / ');
}

// Format document name (remove extension for display)
function formatDocumentName(name: string): string {
  return name.replace(/\.md$/i, '').replace(/-/g, ' ');
}

// Folder icon
function FolderIcon({ isOpen = false }: { isOpen?: boolean }) {
  return isOpen ? (
    <svg className="w-5 h-5 text-radiance-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-radiance-gold/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}

// Document icon
function DocumentIcon() {
  return (
    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

// Chevron icon
function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`w-4 h-4 text-text-muted transition-transform ${isOpen ? 'rotate-90' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

// Document Preview Component
function DocumentPreview({
  document,
  content,
  isLoading,
  onClose,
}: {
  document: LegalDocument;
  content: string | null;
  isLoading: boolean;
  onClose: () => void;
}) {
  return (
    <div className="mt-4 bg-depth-base border border-depth-border rounded-xl overflow-hidden">
      {/* Preview Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-depth-elevated border-b border-depth-border">
        <h4 className="font-medium text-text-primary">{formatDocumentName(document.name)}</h4>
        <div className="flex items-center gap-2">
          <a
            href={document.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-text-muted hover:text-text-primary transition-colors"
            title="View on GitHub"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
          {document.downloadUrl && (
            <a
              href={document.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-text-muted hover:text-radiance-gold transition-colors"
              title="Download"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-text-muted hover:text-text-primary transition-colors"
            title="Close"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-h-[60vh] overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-radiance-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : content ? (
          <article className="prose prose-invert prose-lg max-w-none
            prose-headings:text-text-primary prose-headings:font-semibold
            prose-h1:text-2xl prose-h1:border-b prose-h1:border-depth-border prose-h1:pb-3 prose-h1:mb-6
            prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-text-secondary prose-p:leading-relaxed
            prose-li:text-text-secondary prose-li:my-1
            prose-strong:text-text-primary prose-strong:font-semibold
            prose-code:text-radiance-gold prose-code:bg-depth-elevated prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-depth-elevated prose-pre:border prose-pre:border-depth-border
            prose-blockquote:border-l-radiance-gold prose-blockquote:text-text-muted prose-blockquote:italic
            prose-a:text-radiance-gold prose-a:no-underline hover:prose-a:underline
            prose-hr:border-depth-border
            prose-table:border-collapse
            prose-th:bg-depth-elevated prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:border prose-th:border-depth-border
            prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-depth-border
          ">
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
        ) : (
          <p className="text-text-muted text-center py-8">Unable to load document content</p>
        )}
      </div>
    </div>
  );
}

export default function LegalPage() {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [repoUrl, setRepoUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null);
  const [documentContent, setDocumentContent] = useState<string | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
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

  // Fetch document content for preview
  const fetchDocumentContent = useCallback(async (doc: LegalDocument) => {
    if (!doc.downloadUrl) {
      setDocumentContent(null);
      return;
    }

    setIsLoadingContent(true);
    try {
      const response = await fetch(doc.downloadUrl);
      const text = await response.text();
      setDocumentContent(text);
    } catch (err) {
      console.error('Error fetching document content:', err);
      setDocumentContent(null);
    } finally {
      setIsLoadingContent(false);
    }
  }, []);

  const toggleFolder = (category: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
        // Close document preview if it's in this folder
        if (selectedDocument?.fullCategory === category) {
          setSelectedDocument(null);
          setDocumentContent(null);
        }
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const handleDocumentClick = (doc: LegalDocument) => {
    if (selectedDocument?.path === doc.path) {
      // Toggle off if clicking the same document
      setSelectedDocument(null);
      setDocumentContent(null);
    } else {
      setSelectedDocument(doc);
      fetchDocumentContent(doc);
    }
  };

  // Group documents by fullCategory
  const groupedDocuments = documents.reduce((acc, doc) => {
    const cat = doc.fullCategory;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(doc);
    return acc;
  }, {} as Record<string, LegalDocument[]>);

  // Build folder structure
  const folderStructure: { [key: string]: string[] } = {};
  categories.forEach(cat => {
    folderStructure[cat] = Object.keys(groupedDocuments)
      .filter(fc => fc === cat || fc.startsWith(cat + '/'))
      .sort();
  });

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Legal Vault"
        subtitle="Company legal documents and agreements"
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

        <Container size="wide" className="relative z-10">
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

          {/* Folder Structure */}
          {!isLoading && !error && categories.length > 0 && (
            <div className="bg-depth-surface border border-depth-border rounded-xl overflow-hidden">
              {categories.sort().map((category, index) => {
                const isExpanded = expandedFolders.has(category);
                const categoryDocs = groupedDocuments[category] || [];
                const subfolders = Object.keys(groupedDocuments)
                  .filter(fc => fc.startsWith(category + '/') && !fc.slice(category.length + 1).includes('/'))
                  .sort();

                return (
                  <div key={category} className={index > 0 ? 'border-t border-depth-border' : ''}>
                    {/* Top-level folder */}
                    <button
                      onClick={() => toggleFolder(category)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-depth-elevated/50 transition-colors"
                    >
                      <ChevronIcon isOpen={isExpanded} />
                      <FolderIcon isOpen={isExpanded} />
                      <span className="font-medium text-text-primary capitalize">
                        {category.replace(/-/g, ' ')}
                      </span>
                      <span className="text-text-muted text-sm ml-auto">
                        {Object.keys(groupedDocuments)
                          .filter(fc => fc === category || fc.startsWith(category + '/'))
                          .reduce((sum, fc) => sum + (groupedDocuments[fc]?.length || 0), 0)} files
                      </span>
                    </button>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="bg-depth-base border-t border-depth-border">
                        {/* Direct files in this category */}
                        {categoryDocs.map((doc) => (
                          <div key={doc.path}>
                            <button
                              onClick={() => handleDocumentClick(doc)}
                              className={`w-full flex items-center gap-3 pl-12 pr-4 py-2.5 hover:bg-depth-elevated/30 transition-colors ${
                                selectedDocument?.path === doc.path ? 'bg-radiance-gold/5' : ''
                              }`}
                            >
                              <DocumentIcon />
                              <span className="text-text-secondary hover:text-text-primary transition-colors">
                                {formatDocumentName(doc.name)}
                              </span>
                            </button>
                            {selectedDocument?.path === doc.path && (
                              <div className="px-4 pb-4">
                                <DocumentPreview
                                  document={doc}
                                  content={documentContent}
                                  isLoading={isLoadingContent}
                                  onClose={() => {
                                    setSelectedDocument(null);
                                    setDocumentContent(null);
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Subfolders */}
                        {subfolders.map((subfolder) => {
                          const subfolderName = subfolder.slice(category.length + 1);
                          const isSubExpanded = expandedFolders.has(subfolder);
                          const subDocs = groupedDocuments[subfolder] || [];

                          return (
                            <div key={subfolder}>
                              <button
                                onClick={() => toggleFolder(subfolder)}
                                className="w-full flex items-center gap-3 pl-8 pr-4 py-2.5 hover:bg-depth-elevated/30 transition-colors"
                              >
                                <ChevronIcon isOpen={isSubExpanded} />
                                <FolderIcon isOpen={isSubExpanded} />
                                <span className="text-text-secondary capitalize">
                                  {subfolderName.replace(/-/g, ' ')}
                                </span>
                                <span className="text-text-muted text-sm ml-auto">
                                  {subDocs.length} files
                                </span>
                              </button>

                              {isSubExpanded && subDocs.map((doc) => (
                                <div key={doc.path}>
                                  <button
                                    onClick={() => handleDocumentClick(doc)}
                                    className={`w-full flex items-center gap-3 pl-20 pr-4 py-2.5 hover:bg-depth-elevated/30 transition-colors ${
                                      selectedDocument?.path === doc.path ? 'bg-radiance-gold/5' : ''
                                    }`}
                                  >
                                    <DocumentIcon />
                                    <span className="text-text-secondary hover:text-text-primary transition-colors">
                                      {formatDocumentName(doc.name)}
                                    </span>
                                  </button>
                                  {selectedDocument?.path === doc.path && (
                                    <div className="px-4 pb-4">
                                      <DocumentPreview
                                        document={doc}
                                        content={documentContent}
                                        isLoading={isLoadingContent}
                                        onClose={() => {
                                          setSelectedDocument(null);
                                          setDocumentContent(null);
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}
