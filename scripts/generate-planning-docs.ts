/**
 * Generate Planning Docs
 *
 * Reads ALL brand directories from brands-reorg/ and generates
 * a typed TypeScript data file with brand metadata and markdown content.
 *
 * Usage: npm run generate:planning-docs
 */

import fs from 'fs';
import path from 'path';

// ============================================================================
// Types (mirrors @/types/planning)
// ============================================================================

interface BrandMetadata {
  brandName: string;
  slug: string;
  type: string;
  status: string;
  description: string;
  tags: string[];
  councilStatus: string;
  hasPlan: boolean;
  hasApp: boolean;
  hasIdentity: boolean;
  hasSpec: boolean;
}

interface PlanningDoc {
  id: string;
  fileName: string;
  title: string;
  relativePath: string;
  content: string;
}

interface TreeNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: TreeNode[];
}

interface PlanningBrand {
  slug: string;
  brandName: string;
  description: string;
  type: string;
  status: string;
  tags: string[];
  councilStatus: string;
  docCount: number;
  tree: TreeNode[];
  docs: PlanningDoc[];
}

// ============================================================================
// Helpers
// ============================================================================

const BRANDS_ROOT = '/Users/lawless/Documents/brand-factory/brands-reorg/';
const OUTPUT_FILE = path.resolve(import.meta.dirname!, '../src/data/planning-docs.ts');

// Directories to skip when scanning brands-reorg
const SKIP_DIRS = new Set(['light-brand-consulting', '.git', 'node_modules']);

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : '';
}

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function readMarkdownFiles(dir: string, basePath: string): { docs: PlanningDoc[]; tree: TreeNode[] } {
  const docs: PlanningDoc[] = [];
  const tree: TreeNode[] = [];

  if (!fs.existsSync(dir)) return { docs, tree };

  const entries = fs.readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => {
      // Folders first, then files, alphabetical within each
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(basePath, fullPath);

    // Skip non-doc directories
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'app', 'dist', '.next', '.vite'].includes(entry.name)) continue;

      const sub = readMarkdownFiles(fullPath, basePath);
      if (sub.docs.length > 0) {
        tree.push({
          name: entry.name,
          path: relativePath,
          type: 'folder',
          children: sub.tree,
        });
        docs.push(...sub.docs);
      }
      continue;
    }

    if (!entry.name.endsWith('.md')) continue;

    const content = fs.readFileSync(fullPath, 'utf-8');
    const title = extractTitle(content) || entry.name.replace(/\.md$/, '');
    const id = slugify(`${path.dirname(relativePath)}-${entry.name.replace(/\.md$/, '')}`);

    const doc: PlanningDoc = {
      id,
      fileName: entry.name,
      title,
      relativePath,
      content,
    };

    docs.push(doc);
    tree.push({
      name: entry.name,
      path: relativePath,
      type: 'file',
    });
  }

  return { docs, tree };
}

// ============================================================================
// Main
// ============================================================================

function main() {
  console.log('Generating planning docs from:', BRANDS_ROOT);

  const brands: PlanningBrand[] = [];

  const entries = fs.readdirSync(BRANDS_ROOT, { withFileTypes: true })
    .filter(e => e.isDirectory() && !SKIP_DIRS.has(e.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    const brandDir = path.join(BRANDS_ROOT, entry.name);
    const metadataPath = path.join(brandDir, 'metadata.json');

    if (!fs.existsSync(metadataPath)) {
      console.log(`  Skipping ${entry.name} (no metadata.json)`);
      continue;
    }

    const metadata: BrandMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    const { docs, tree } = readMarkdownFiles(brandDir, brandDir);

    if (docs.length === 0) {
      console.log(`  Skipping ${entry.name} (no .md files)`);
      continue;
    }

    brands.push({
      slug: metadata.slug,
      brandName: metadata.brandName,
      description: metadata.description,
      type: metadata.type,
      status: metadata.status,
      tags: metadata.tags || [],
      councilStatus: metadata.councilStatus,
      docCount: docs.length,
      tree,
      docs,
    });

    console.log(`  ✓ ${metadata.brandName} (${metadata.status}) — ${docs.length} docs`);
  }

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate TypeScript output
  const output = `/**
 * Auto-generated Planning Docs Data
 * Generated at: ${new Date().toISOString()}
 *
 * DO NOT EDIT — run \`npm run generate:planning-docs\` to regenerate.
 */

import type { PlanningBrand } from '@/types/planning';

// ============================================================================
// Data
// ============================================================================

export const PLANNING_BRANDS: PlanningBrand[] = ${JSON.stringify(brands, null, 2)};

export const PLANNING_BRAND_COUNT = ${brands.length};
export const PLANNING_DOC_COUNT = ${brands.reduce((sum, b) => sum + b.docCount, 0)};
`;

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
  console.log(`\nGenerated ${OUTPUT_FILE}`);
  console.log(`  ${brands.length} brands, ${brands.reduce((sum, b) => sum + b.docCount, 0)} total docs`);
}

main();
