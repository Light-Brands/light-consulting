/**
 * Projects API Route
 * Light Brand Consulting
 *
 * Handles GET (list) and POST (create) operations for projects
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { ProjectInsert, Project } from '@/types/database';

// Placeholder data for when Supabase is not configured
const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Sales Intelligence System',
    description: 'Developed a comprehensive AI system that analyzes customer behavior patterns and predicts optimal engagement timing, resulting in a 40% increase in conversion rates.',
    image_url: '/images/portfolio/project-sales-ai.jpg',
    tags: ['AI', 'Sales', 'Analytics', 'Automation'],
    case_study_url: '/insights/case-study-sales-ai',
    client_name: 'Growth Mastery AI',
    industry: 'Professional Services',
    featured: true,
    status: 'published',
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Automated Content Production Engine',
    description: 'Built an intelligent content engine that generates, schedules, and optimizes marketing content across multiple channels, reducing content creation time by 75%.',
    image_url: '/images/portfolio/project-content-engine.jpg',
    tags: ['AI', 'Content', 'Marketing', 'Automation'],
    case_study_url: '/insights/case-study-content-engine',
    client_name: 'MediaFlow Studios',
    industry: 'Media & Entertainment',
    featured: true,
    status: 'published',
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Healthcare Patient Journey Optimizer',
    description: 'Implemented an AI-driven patient management system that streamlines intake, follow-ups, and care coordination, improving patient satisfaction by 60%.',
    image_url: '/images/portfolio/project-healthcare.jpg',
    tags: ['AI', 'Healthcare', 'Patient Care', 'Workflow'],
    case_study_url: '/insights/case-study-healthcare',
    client_name: 'Wellness Partners Medical',
    industry: 'Healthcare & Life Sciences',
    featured: false,
    status: 'published',
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'E-commerce Inventory Intelligence',
    description: 'Created a predictive inventory management system using AI to forecast demand, optimize stock levels, and reduce overstock costs by 35%.',
    image_url: '/images/portfolio/project-ecommerce.jpg',
    tags: ['AI', 'E-commerce', 'Inventory', 'Prediction'],
    case_study_url: null,
    client_name: 'RetailEdge Inc.',
    industry: 'E-commerce & Retail',
    featured: false,
    status: 'published',
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Financial Advisory AI Assistant',
    description: 'Developed an AI-powered advisory tool that provides personalized investment recommendations and market insights for wealth management clients.',
    image_url: '/images/portfolio/project-finance.jpg',
    tags: ['AI', 'Finance', 'Advisory', 'Investment'],
    case_study_url: null,
    client_name: 'Prosperity Wealth Advisors',
    industry: 'Financial Services',
    featured: true,
    status: 'published',
    sort_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Manufacturing Quality Control System',
    description: 'Implemented computer vision-based quality control that detects defects in real-time, reducing production errors by 90% and saving millions in recalls.',
    image_url: '/images/portfolio/project-manufacturing.jpg',
    tags: ['AI', 'Manufacturing', 'Quality Control', 'Computer Vision'],
    case_study_url: null,
    client_name: 'PrecisionTech Manufacturing',
    industry: 'Manufacturing & Logistics',
    featured: false,
    status: 'published',
    sort_order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// GET - List all projects (public can see published, admin can see all)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    // Check if admin (to show all projects including drafts)
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === 'admin';

    // If Supabase is not configured, return placeholder data
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, returning placeholder data');
      let projects = [...PLACEHOLDER_PROJECTS];

      // Filter by status (public only sees published)
      if (!isAdmin) {
        projects = projects.filter(p => p.status === 'published');
      } else if (status) {
        projects = projects.filter(p => p.status === status);
      }

      // Filter by featured
      if (featured === 'true') {
        projects = projects.filter(p => p.featured);
      }

      // Apply limit
      if (limit) {
        projects = projects.slice(0, parseInt(limit));
      }

      return NextResponse.json({ data: projects, error: null, count: projects.length });
    }

    // Build query
    let query = supabaseAdmin
      .from('projects')
      .select('*', { count: 'exact' })
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    // Filter by status
    if (status) {
      query = query.eq('status', status);
    } else if (!isAdmin) {
      // Public users can only see published projects
      query = query.eq('status', 'published');
    }

    // Filter by featured
    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    // Apply limit
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching projects:', error);
      return NextResponse.json(
        { data: null, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null, count });
  } catch (error) {
    console.error('Error in GET /api/projects:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new project (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body: ProjectInsert = await request.json();

    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        { data: null, error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return mock response
    if (!isSupabaseConfigured()) {
      const mockProject: Project = {
        id: Date.now().toString(),
        title: body.title,
        description: body.description,
        image_url: body.image_url || null,
        tags: body.tags || [],
        case_study_url: body.case_study_url || null,
        client_name: body.client_name || null,
        industry: body.industry || null,
        featured: body.featured || false,
        status: body.status || 'draft',
        sort_order: body.sort_order || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockProject, error: null }, { status: 201 });
    }

    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return NextResponse.json(
        { data: null, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/projects:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
