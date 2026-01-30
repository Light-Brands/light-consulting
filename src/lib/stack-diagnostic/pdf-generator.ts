/**
 * PDF Generator for Stack Diagnostic Reports
 * Uses html2canvas + jsPDF for client-side PDF generation
 */

import type { AnalysisResult, PlacedTool, ToolConnection, IndustryTemplate } from '@/types/stack-diagnostic';
import { getToolById } from './tools';

interface PDFOptions {
  analysis: AnalysisResult;
  template: IndustryTemplate;
  placedTools: PlacedTool[];
  connections: ToolConnection[];
  sections: {
    stack: boolean;
    analysis: boolean;
    solution: boolean;
  };
}

export async function generatePDF(options: PDFOptions): Promise<void> {
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Colors
  const gold = '#E8B84A';
  const darkBg = '#1A1A2E';
  const textPrimary = '#E8E8E8';
  const textMuted = '#888888';
  const red = '#EF4444';
  const green = '#22C55E';

  // Background
  doc.setFillColor(darkBg);
  doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), 'F');

  // Header
  doc.setTextColor(gold);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Stack Diagnostic Report', margin, y + 8);
  y += 14;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted);
  doc.text(`Template: ${options.template.name}`, margin, y);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin, y, { align: 'right' });
  y += 4;

  // Divider
  doc.setDrawColor(gold);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Stack section
  if (options.sections.stack) {
    doc.setTextColor(gold);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Current Tech Stack', margin, y);
    y += 8;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textPrimary);

    const toolNames = options.placedTools.map(pt => {
      const tool = getToolById(pt.toolId);
      return tool ? `${tool.icon} ${tool.name}` : pt.toolId;
    });

    // List tools in columns
    const cols = 3;
    const colWidth = contentWidth / cols;
    toolNames.forEach((name, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const xPos = margin + col * colWidth;
      const yPos = y + row * 5;

      if (yPos > doc.internal.pageSize.getHeight() - 20) return;
      doc.text(`- ${name}`, xPos, yPos);
    });

    y += Math.ceil(toolNames.length / cols) * 5 + 6;

    doc.setTextColor(textMuted);
    doc.setFontSize(8);
    doc.text(`${options.placedTools.length} tools · ${options.connections.length} connections`, margin, y);
    y += 10;
  }

  // Analysis section
  if (options.sections.analysis) {
    // Check page break
    if (y > doc.internal.pageSize.getHeight() - 80) {
      doc.addPage();
      doc.setFillColor(darkBg);
      doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), 'F');
      y = margin;
    }

    doc.setTextColor(gold);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Analysis Results', margin, y);
    y += 8;

    // Health score
    const scoreColor = options.analysis.score >= 70 ? green : options.analysis.score >= 40 ? gold : red;
    doc.setTextColor(scoreColor);
    doc.setFontSize(24);
    doc.text(`${options.analysis.score}/100`, margin, y + 2);
    doc.setTextColor(textMuted);
    doc.setFontSize(8);
    doc.text('Stack Health Score', margin + 30, y + 2);
    y += 12;

    // Stats
    const stats = [
      { label: 'Tools Siloed', value: `${options.analysis.stats.toolsSiloed}` },
      { label: 'Data Lost', value: `${options.analysis.stats.dataLostPercent}%` },
      { label: 'Manual Hrs/Wk', value: `${options.analysis.stats.manualHoursPerWeek}h` },
      { label: 'Leads Lost', value: `${options.analysis.stats.leadsLostPercent}%` },
      { label: 'Monthly Waste', value: `$${options.analysis.stats.monthlyWaste}` },
    ];

    const statWidth = contentWidth / stats.length;
    stats.forEach((stat, i) => {
      const xPos = margin + i * statWidth;
      doc.setTextColor(red);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(stat.value, xPos, y);
      doc.setTextColor(textMuted);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.text(stat.label, xPos, y + 4);
    });
    y += 12;

    // Issues
    doc.setTextColor(textPrimary);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Issues (${options.analysis.issues.length})`, margin, y);
    y += 6;

    for (const issue of options.analysis.issues) {
      if (y > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        doc.setFillColor(darkBg);
        doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), 'F');
        y = margin;
      }

      const issueColor = issue.severity === 'critical' ? red : gold;
      doc.setTextColor(issueColor);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text(`[${issue.severity.toUpperCase()}] ${issue.title}`, margin, y);
      y += 4;

      doc.setTextColor(textMuted);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(issue.description, contentWidth);
      doc.text(lines, margin, y);
      y += lines.length * 3.5 + 3;
    }

    y += 4;
  }

  // Solution section
  if (options.sections.solution) {
    if (y > doc.internal.pageSize.getHeight() - 60) {
      doc.addPage();
      doc.setFillColor(darkBg);
      doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), 'F');
      y = margin;
    }

    const solution = options.template.solution;

    doc.setTextColor(green);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Recommended Solution', margin, y);
    y += 8;

    doc.setTextColor(textPrimary);
    doc.setFontSize(12);
    doc.text(`${solution.hub.icon} ${solution.name}`, margin, y);
    y += 6;

    doc.setTextColor(textMuted);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(solution.description, contentWidth);
    doc.text(descLines, margin, y);
    y += descLines.length * 3.5 + 6;

    // Modules
    for (const sat of solution.satellites) {
      if (y > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        doc.setFillColor(darkBg);
        doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), 'F');
        y = margin;
      }

      doc.setTextColor('#14B8A6');
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(`${sat.icon} ${sat.name}`, margin, y);

      if (sat.replaces.length > 0) {
        doc.setTextColor(textMuted);
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.text(`Replaces: ${sat.replaces.join(', ')}`, margin + 60, y);
      }
      y += 4;

      doc.setTextColor(textMuted);
      doc.setFontSize(7);
      doc.text(sat.features.join(' · '), margin + 4, y);
      y += 6;
    }

    // After stats
    y += 4;
    const afterStats = [
      { label: 'Tools Siloed', value: `${solution.stats.toolsSiloed}` },
      { label: 'Data Lost', value: `${solution.stats.dataLostPercent}%` },
      { label: 'Manual Hrs/Wk', value: `${solution.stats.manualHoursPerWeek}h` },
      { label: 'Leads Lost', value: `${solution.stats.leadsLostPercent}%` },
      { label: 'Monthly Savings', value: `$${solution.stats.monthlySavings}` },
    ];

    const aStatWidth = contentWidth / afterStats.length;
    afterStats.forEach((stat, i) => {
      const xPos = margin + i * aStatWidth;
      doc.setTextColor(green);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(stat.value, xPos, y);
      doc.setTextColor(textMuted);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.text(stat.label, xPos, y + 4);
    });
  }

  // Footer
  const lastPage = doc.internal.pages.length - 1;
  for (let p = 1; p <= lastPage; p++) {
    doc.setPage(p);
    doc.setTextColor(textMuted);
    doc.setFontSize(7);
    doc.text(
      'Light Brand Consulting · Stack Diagnostic Report',
      margin,
      doc.internal.pageSize.getHeight() - 8
    );
    doc.text(
      `Page ${p} of ${lastPage}`,
      pageWidth - margin,
      doc.internal.pageSize.getHeight() - 8,
      { align: 'right' }
    );
  }

  doc.save(`stack-diagnostic-${options.template.id}-${Date.now()}.pdf`);
}
