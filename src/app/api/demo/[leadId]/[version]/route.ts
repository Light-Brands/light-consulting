/**
 * Demo HTML Serving Route
 * Light Brand Consulting
 *
 * GET /api/demo/[leadId]/[version]
 * Serves generated HTML demo files
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

interface RouteParams {
  params: Promise<{ leadId: string; version: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { leadId, version } = await params;
    const versionNum = parseInt(version, 10);
    
    if (!leadId || isNaN(versionNum) || versionNum < 1 || versionNum > 3) {
      return NextResponse.json(
        { error: 'Invalid demo request' },
        { status: 400 }
      );
    }
    
    if (!isSupabaseConfigured()) {
      // Return a placeholder demo in development
      const placeholderHtml = await generatePlaceholderDemo(versionNum);
      return new NextResponse(placeholderHtml, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    }
    
    // Fetch lead to get demo links
    const { data: lead, error } = await supabaseAdmin
      .from('lead_submissions')
      .select('system_demo_links')
      .eq('id', leadId)
      .single();
    
    if (error || !lead) {
      return NextResponse.json(
        { error: 'Demo not found' },
        { status: 404 }
      );
    }
    
    // For now, we'll store HTML in the database or generate on-the-fly
    // In production, you'd fetch from file storage (S3, etc.)
    // For this implementation, we'll generate a demo based on the lead data
    
    const demoHtml = await generateDemoHTML(leadId, versionNum);
    
    return new NextResponse(demoHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error serving demo:', error);
    return NextResponse.json(
      { error: 'Failed to serve demo' },
      { status: 500 }
    );
  }
}

async function generateDemoHTML(leadId: string, version: number): Promise<string> {
  // Fetch lead data for personalization
  const { data: lead } = await supabaseAdmin
    .from('lead_submissions')
    .select('website_story, tech_stack, company')
    .eq('id', leadId)
    .single();
  
  const versionNames = ['Essential', 'Advanced', 'Enterprise'];
  const versionName = versionNames[version - 1] || `Version ${version}`;
  
  // Generate personalized demo HTML
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Super Intelligence System - ${versionName} | ${lead?.company || 'Your Business'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #e5e5e5; line-height: 1.6; }
    nav { background: #1a1a1a; padding: 1rem 2rem; border-bottom: 1px solid #2a2a2a; position: sticky; top: 0; z-index: 100; }
    nav .container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.5rem; font-weight: bold; color: #E8B84A; }
    .nav-links { display: flex; gap: 2rem; }
    .nav-links a { color: #e5e5e5; text-decoration: none; transition: color 0.3s; }
    .nav-links a:hover { color: #E8B84A; }
    .hero { padding: 6rem 2rem; text-align: center; background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); }
    .hero h1 { font-size: 3rem; margin-bottom: 1rem; color: #E8B84A; }
    .hero p { font-size: 1.25rem; color: #999; max-width: 600px; margin: 0 auto 2rem; }
    .features { padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; }
    .features h2 { text-align: center; margin-bottom: 3rem; font-size: 2rem; color: #E8B84A; }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem; }
    .feature-card { background: #1a1a1a; padding: 2rem; border-radius: 8px; border: 1px solid #2a2a2a; transition: transform 0.3s, border-color 0.3s; }
    .feature-card:hover { transform: translateY(-4px); border-color: #E8B84A; }
    .feature-card h3 { color: #E8B84A; margin-bottom: 1rem; font-size: 1.25rem; }
    .feature-card p { color: #999; }
    .dashboard-preview { padding: 4rem 2rem; background: #1a1a1a; }
    .dashboard-preview h2 { text-align: center; margin-bottom: 3rem; font-size: 2rem; color: #E8B84A; }
    .dashboard-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
    .dashboard-card { background: #0a0a0a; padding: 1.5rem; border-radius: 8px; border: 1px solid #2a2a2a; }
    .dashboard-card h4 { color: #E8B84A; margin-bottom: 0.5rem; }
    .dashboard-card .value { font-size: 2rem; font-weight: bold; color: #e5e5e5; }
    .cta { text-align: center; padding: 4rem 2rem; }
    .btn { display: inline-block; padding: 1rem 2rem; background: #E8B84A; color: #0a0a0a; text-decoration: none; border-radius: 6px; font-weight: bold; transition: transform 0.3s, box-shadow 0.3s; }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(232, 184, 74, 0.3); }
    .badge { display: inline-block; padding: 0.25rem 0.75rem; background: #E8B84A; color: #0a0a0a; border-radius: 12px; font-size: 0.75rem; font-weight: bold; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <nav>
    <div class="container">
      <div class="logo">AI Intelligence</div>
      <div class="nav-links">
        <a href="#features">Features</a>
        <a href="#dashboard">Dashboard</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  </nav>
  <section class="hero">
    <span class="badge">${versionName} Edition</span>
    <h1>AI Super Intelligence System</h1>
    <p>Transform ${lead?.company || 'your business'} with intelligent automation and predictive insights</p>
  </section>
  <section class="features" id="features">
    <h2>Key Features</h2>
    <div class="features-grid">
      <div class="feature-card">
        <h3>Intelligent Automation</h3>
        <p>Automate repetitive tasks and workflows with AI-powered intelligence that learns and adapts to your business needs.</p>
      </div>
      <div class="feature-card">
        <h3>Predictive Analytics</h3>
        <p>Make data-driven decisions with advanced predictive insights and real-time analytics dashboards.</p>
      </div>
      <div class="feature-card">
        <h3>Smart Content Generation</h3>
        <p>Generate and optimize content automatically with AI assistance, maintaining your brand voice and style.</p>
      </div>
      <div class="feature-card">
        <h3>Customer Intelligence</h3>
        <p>Understand your customers better with AI-powered analysis of behavior, preferences, and engagement patterns.</p>
      </div>
      <div class="feature-card">
        <h3>Workflow Optimization</h3>
        <p>Streamline operations with intelligent workflow automation that reduces manual work and increases efficiency.</p>
      </div>
      <div class="feature-card">
        <h3>Real-time Insights</h3>
        <p>Get instant insights and recommendations based on your business data and industry best practices.</p>
      </div>
    </div>
  </section>
  <section class="dashboard-preview" id="dashboard">
    <h2>Dashboard Preview</h2>
    <div class="dashboard-grid">
      <div class="dashboard-card">
        <h4>AI Readiness Score</h4>
        <div class="value">${75 + version * 5}</div>
      </div>
      <div class="dashboard-card">
        <h4>Automation Rate</h4>
        <div class="value">${60 + version * 10}%</div>
      </div>
      <div class="dashboard-card">
        <h4>Time Saved</h4>
        <div class="value">${15 + version * 5}hrs/week</div>
      </div>
      <div class="dashboard-card">
        <h4>Efficiency Gain</h4>
        <div class="value">${30 + version * 5}%</div>
      </div>
    </div>
  </section>
  <section class="cta">
    <h2 style="margin-bottom: 1rem; color: #E8B84A;">Ready to Transform Your Business?</h2>
    <p style="margin-bottom: 2rem; color: #999;">Schedule a call to see how this system can work for you</p>
    <a href="#contact" class="btn">Get Started</a>
  </section>
</body>
</html>`;
}

async function generatePlaceholderDemo(version: number): Promise<string> {
  return generateDemoHTML('placeholder', version);
}
