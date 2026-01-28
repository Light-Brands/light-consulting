/**
 * Legal Documents API
 * Fetches documents from the brand-factory GitHub repository's legal-vault
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
  category: string;
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

async function fetchAllDocuments(token: string): Promise<LegalDocument[]> {
  const documents: LegalDocument[] = [];

  // Fetch root legal-vault contents
  const rootContents = await fetchGitHubContents(LEGAL_VAULT_PATH, token);

  for (const item of rootContents) {
    if (item.type === 'dir') {
      // Fetch subdirectory contents
      const subContents = await fetchGitHubContents(item.path, token);

      for (const subItem of subContents) {
        if (subItem.type === 'file') {
          const extension = subItem.name.includes('.')
            ? subItem.name.split('.').pop()?.toLowerCase() || null
            : null;

          documents.push({
            name: subItem.name,
            path: subItem.path,
            type: 'file',
            size: subItem.size,
            downloadUrl: subItem.download_url,
            githubUrl: subItem.html_url,
            category: item.name,
            extension,
          });
        }
      }
    } else if (item.type === 'file') {
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

    // Filter by category if specified
    const documents = category
      ? allDocuments.filter(doc => doc.category.toLowerCase() === category.toLowerCase())
      : allDocuments;

    // Get unique categories for filtering
    const categories = [...new Set(allDocuments.map(doc => doc.category))];

    return NextResponse.json({
      documents,
      categories,
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
