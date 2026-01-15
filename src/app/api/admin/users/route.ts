/**
 * Admin Users API Route
 * Light Brand Consulting
 *
 * Handles user creation and listing using Supabase Admin API
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

interface CreateUserRequest {
  email: string;
  password: string;
}

// GET - List all auth users (admin only)
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // If Supabase is not configured, return empty list
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        data: [],
        error: null,
        message: 'Supabase not configured',
      });
    }

    // List users using admin API
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      console.error('Error listing users:', error);
      return NextResponse.json(
        { data: null, error: error.message },
        { status: 500 }
      );
    }

    // Return simplified user data
    const users = data.users.map((user) => ({
      id: user.id,
      email: user.email,
      email_confirmed_at: user.email_confirmed_at,
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at,
    }));

    return NextResponse.json({ data: users, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/users:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new user (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body: CreateUserRequest = await request.json();

    // Validate required fields
    if (!body.email || !body.password) {
      return NextResponse.json(
        { data: null, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { data: null, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (body.password.length < 6) {
      return NextResponse.json(
        { data: null, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return mock response
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        data: {
          id: 'mock-user-id',
          email: body.email,
          email_confirmed_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        },
        error: null,
        message: 'Mock user created (Supabase not configured)',
      }, { status: 201 });
    }

    // Create user using Supabase Admin API with email confirmed
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: body.email,
      password: body.password,
      email_confirm: true, // Auto-verify the user
    });

    if (error) {
      console.error('Error creating user:', error);
      return NextResponse.json(
        { data: null, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      data: {
        id: data.user.id,
        email: data.user.email,
        email_confirmed_at: data.user.email_confirmed_at,
        created_at: data.user.created_at,
      },
      error: null,
    }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/users:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
