/**
 * Legal Documents API
 * Fetches documents from the brand-factory GitHub repository's legal-vault
 * Recursively traverses all subdirectories to find all documents
 */

import { NextRequest, NextResponse } from 'next/server';

const GITHUB_API_BASE = 'https://api.github.com';
const REPO_OWNER = 'Light-Brands';
const REPO_NAME = 'brand-factory';
const LEGAL_VAULT_PATH = 'legal-vault';

interface GitHubContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: 'file' | 'dir';
}

interface LegalDocument {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size: number;
  downloadUrl: string | null;
  githubUrl: string;
  category: string;        // Top-level category (e.g., "agreements", "tax-forms")
  subcategory: string | null;  // Subcategory if nested (e.g., "ndas", "mou")
  fullCategory: string;    // Full path category (e.g., "agreements/ndas")
  extension: string | null;
}

async function fetchGitHubContents(path: string, token: string): Promise<GitHubContent[]> {
  const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}

/**
 * Recursively fetch all files from a directory and its subdirectories
 */
async function fetchDirectoryRecursive(
  path: string,
  token: string,
  category: string,
  subcategory: string | null = null
): Promise<LegalDocument[]> {
  const documents: LegalDocument[] = [];
  const contents = await fetchGitHubContents(path, token);

  for (const item of contents) {
    if (item.type === 'file') {
      // Skip hidden files and README files
      if (item.name.startsWith('.')) continue;
      if (item.name.toLowerCase() === 'readme.md') continue;

      const extension = item.name.includes('.')
        ? item.name.split('.').pop()?.toLowerCase() || null
        : null;

      const fullCategory = subcategory ? `${category}/${subcategory}` : category;

      documents.push({
        name: item.name,
        path: item.path,
        type: 'file',
        size: item.size,
        downloadUrl: item.download_url,
        githubUrl: item.html_url,
        category,
        subcategory,
        fullCategory,
        extension,
      });
    } else if (item.type === 'dir') {
      // Recursively fetch subdirectory contents
      // The subdirectory name becomes the subcategory (or extends it)
      const newSubcategory = subcategory ? `${subcategory}/${item.name}` : item.name;
      const subDocs = await fetchDirectoryRecursive(item.path, token, category, newSubcategory);
      documents.push(...subDocs);
    }
  }

  return documents;
}

async function fetchAllDocuments(token: string): Promise<LegalDocument[]> {
  const documents: LegalDocument[] = [];

  // Fetch root legal-vault contents
  const rootContents = await fetchGitHubContents(LEGAL_VAULT_PATH, token);

  for (const item of rootContents) {
    if (item.type === 'dir') {
      // Recursively fetch all files from this directory
      const dirDocs = await fetchDirectoryRecursive(item.path, token, item.name);
      documents.push(...dirDocs);
    } else if (item.type === 'file') {
      // Skip hidden files and README files
      if (item.name.startsWith('.')) continue;
      if (item.name.toLowerCase() === 'readme.md') continue;

      const extension = item.name.includes('.')
        ? item.name.split('.').pop()?.toLowerCase() || null
        : null;

      documents.push({
        name: item.name,
        path: item.path,
        type: 'file',
        size: item.size,
        downloadUrl: item.download_url,
        githubUrl: item.html_url,
        category: 'root',
        subcategory: null,
        fullCategory: 'root',
        extension,
      });
    }
  }

  return documents;
}

export async function GET(request: NextRequest) {
  try {
    const token = process.env.GITHUB_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: 'GitHub not configured', documents: [] },
        { status: 200 }
      );
    }

    // Get optional category filter from query params
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const allDocuments = await fetchAllDocuments(token);

    // Filter by category if specified (matches either category or fullCategory)
    const documents = category
      ? allDocuments.filter(doc =>
          doc.category.toLowerCase() === category.toLowerCase() ||
          doc.fullCategory.toLowerCase() === category.toLowerCase() ||
          doc.fullCategory.toLowerCase().startsWith(category.toLowerCase() + '/')
        )
      : allDocuments;

    // Get unique categories for filtering (use top-level categories)
    const categories = [...new Set(allDocuments.map(doc => doc.category))].filter(c => c !== 'root');

    // Get unique full categories for more granular filtering
    const fullCategories = [...new Set(allDocuments.map(doc => doc.fullCategory))].filter(c => c !== 'root');

    return NextResponse.json({
      documents,
      categories,
      fullCategories,
      total: documents.length,
      repoUrl: `https://github.com/${REPO_OWNER}/${REPO_NAME}/tree/main/${LEGAL_VAULT_PATH}`,
    });

  } catch (error) {
    console.error('Error fetching legal documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents', documents: [], categories: [] },
      { status: 500 }
    );
  }
}
