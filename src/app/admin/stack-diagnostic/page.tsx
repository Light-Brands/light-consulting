/**
 * Stack Diagnostic Admin Page
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import { AdminHeader } from '@/components/admin';
import { StackDiagnosticTool } from '@/components/admin/stack-diagnostic';

export default function StackDiagnosticPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader
        title="Stack Diagnostic"
        subtitle="Interactive sales tool for live prospect calls"
      />
      <div className="flex-1 min-h-0" style={{ height: 'calc(100vh - 120px)' }}>
        <StackDiagnosticTool />
      </div>
    </div>
  );
}
