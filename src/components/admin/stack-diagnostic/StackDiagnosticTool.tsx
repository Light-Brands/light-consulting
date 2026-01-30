/**
 * Stack Diagnostic Tool - Main Orchestrator
 * Manages the 4-step diagnostic flow
 */

'use client';

import React, { useState, useCallback } from 'react';
import type {
  DiagnosticStep,
  IndustryTemplate,
  PlacedTool,
  ToolConnection,
  AnalysisResult,
  StackSession,
} from '@/types/stack-diagnostic';
import { analyzeStack } from '@/lib/stack-diagnostic';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import { TemplateSelector } from './TemplateSelector';
import { BuildStep } from './BuildStep';
import { AnalysisOverlay } from './AnalysisOverlay';
import { TransformView } from './TransformView';
import { SessionsDrawer } from './SessionsDrawer';
import { ExportModal } from './ExportModal';

interface StackDiagnosticToolProps {
  sessionId?: string;
  initialSession?: StackSession;
}

export const StackDiagnosticTool: React.FC<StackDiagnosticToolProps> = ({
  sessionId: initialSessionId,
  initialSession,
}) => {
  const { authFetch } = useAuthFetch();

  // Flow state
  const [currentStep, setCurrentStep] = useState<DiagnosticStep>(
    initialSession ? 'build' : 'template'
  );
  const [selectedTemplate, setSelectedTemplate] = useState<IndustryTemplate | null>(null);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(
    initialSession?.lead_id || null
  );

  // Canvas state
  const [placedTools, setPlacedTools] = useState<PlacedTool[]>(
    initialSession?.tools || []
  );
  const [connections, setConnections] = useState<ToolConnection[]>(
    initialSession?.connections || []
  );

  // Analysis state
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(
    initialSession?.analysis || null
  );

  // Session state
  const [sessionId, setSessionId] = useState<string | null>(initialSessionId || null);
  const [coachNotes, setCoachNotes] = useState(initialSession?.coach_notes || '');
  const [isSaving, setIsSaving] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const steps: { key: DiagnosticStep; label: string; number: number }[] = [
    { key: 'template', label: 'Industry', number: 1 },
    { key: 'build', label: 'Build Stack', number: 2 },
    { key: 'analyze', label: 'Fractures', number: 3 },
    { key: 'transform', label: 'Solution', number: 4 },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === currentStep);

  // Template selection
  const handleTemplateSelect = (template: IndustryTemplate) => {
    setSelectedTemplate(template);
    setCurrentStep('build');
  };

  // Analysis
  const handleAnalyze = useCallback(() => {
    const result = analyzeStack(placedTools, connections);
    setAnalysis(result);
    setCurrentStep('analyze');

    // Auto-save on analyze
    handleSave(result);
  }, [placedTools, connections]);

  // Transform
  const handleShowSolution = () => {
    setCurrentStep('transform');
  };

  // Save session
  const handleSave = useCallback(async (analysisOverride?: AnalysisResult) => {
    if (!selectedTemplate && !initialSession) return;
    setIsSaving(true);

    try {
      const payload = {
        template_id: selectedTemplate?.id || initialSession?.template_id || 'custom',
        tools: placedTools,
        connections,
        analysis: analysisOverride || analysis,
        lead_id: selectedLeadId,
        coach_notes: coachNotes,
      };

      if (sessionId) {
        await authFetch(`/api/admin/stack-diagnostic/${sessionId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        const response = await authFetch('/api/admin/stack-diagnostic', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        const result = await response.json();
        if (result.data?.id) {
          setSessionId(result.data.id);
        }
      }
    } catch (error) {
      console.error('Error saving session:', error);
    } finally {
      setIsSaving(false);
    }
  }, [selectedTemplate, initialSession, placedTools, connections, analysis, selectedLeadId, coachNotes, sessionId, authFetch]);

  // Load session
  const handleLoadSession = (session: StackSession) => {
    setPlacedTools(session.tools || []);
    setConnections(session.connections || []);
    setAnalysis(session.analysis || null);
    setCoachNotes(session.coach_notes || '');
    setSelectedLeadId(session.lead_id);
    setSessionId(session.id);
    setCurrentStep(session.analysis ? 'analyze' : 'build');
    setShowSessions(false);
  };

  // Navigation
  const handleBack = () => {
    const idx = currentStepIndex;
    if (idx > 0) {
      setCurrentStep(steps[idx - 1].key);
    }
  };

  const handleReset = () => {
    setCurrentStep('template');
    setSelectedTemplate(null);
    setPlacedTools([]);
    setConnections([]);
    setAnalysis(null);
    setSessionId(null);
    setCoachNotes('');
    setSelectedLeadId(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Step indicator bar */}
      <div className="bg-depth-surface border-b border-depth-border px-4 py-3">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-1">
            {steps.map((step, i) => (
              <React.Fragment key={step.key}>
                <button
                  onClick={() => {
                    if (i < currentStepIndex) setCurrentStep(step.key);
                  }}
                  disabled={i > currentStepIndex}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                    step.key === currentStep
                      ? 'bg-radiance-gold/10 text-radiance-gold border border-radiance-gold/20'
                      : i < currentStepIndex
                        ? 'text-text-secondary hover:text-text-primary cursor-pointer'
                        : 'text-text-muted cursor-not-allowed'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono ${
                    step.key === currentStep
                      ? 'bg-radiance-gold text-depth-base'
                      : i < currentStepIndex
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-depth-elevated text-text-muted'
                  }`}>
                    {i < currentStepIndex ? '✓' : step.number}
                  </span>
                  <span className="hidden md:inline">{step.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`w-6 h-px ${
                    i < currentStepIndex ? 'bg-green-500/30' : 'bg-depth-border'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {currentStep !== 'template' && (
              <button
                onClick={() => setShowSessions(true)}
                className="text-xs text-text-muted hover:text-text-secondary px-2 py-1 rounded transition-colors"
              >
                Sessions
              </button>
            )}
            {analysis && (
              <button
                onClick={() => setShowExport(true)}
                className="text-xs text-text-muted hover:text-text-secondary px-2 py-1 rounded transition-colors"
              >
                Export
              </button>
            )}
            {currentStep !== 'template' && (
              <>
                <button
                  onClick={() => handleSave()}
                  disabled={isSaving}
                  className="text-xs bg-depth-elevated hover:bg-depth-surface text-text-secondary px-3 py-1.5 rounded-lg border border-depth-border transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleReset}
                  className="text-xs text-text-muted hover:text-red-400 px-2 py-1 rounded transition-colors"
                >
                  Reset
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 min-h-0">
        {currentStep === 'template' && (
          <TemplateSelector
            onSelect={handleTemplateSelect}
            selectedLeadId={selectedLeadId}
            onLeadSelect={setSelectedLeadId}
          />
        )}

        {currentStep === 'build' && selectedTemplate && (
          <BuildStep
            template={selectedTemplate}
            placedTools={placedTools}
            connections={connections}
            onToolsChange={setPlacedTools}
            onConnectionsChange={setConnections}
            onAnalyze={handleAnalyze}
            onBack={handleBack}
          />
        )}

        {currentStep === 'analyze' && analysis && selectedTemplate && (
          <AnalysisOverlay
            analysis={analysis}
            placedTools={placedTools}
            connections={connections}
            template={selectedTemplate}
            onShowSolution={handleShowSolution}
            onBack={handleBack}
            coachNotes={coachNotes}
            onCoachNotesChange={setCoachNotes}
          />
        )}

        {currentStep === 'transform' && selectedTemplate && (
          <TransformView
            template={selectedTemplate}
            analysis={analysis}
            onBack={handleBack}
            onReset={handleReset}
          />
        )}
      </div>

      {/* Sessions drawer */}
      {showSessions && (
        <SessionsDrawer
          onClose={() => setShowSessions(false)}
          onLoad={handleLoadSession}
          currentSessionId={sessionId}
        />
      )}

      {/* Export modal */}
      {showExport && analysis && selectedTemplate && (
        <ExportModal
          analysis={analysis}
          template={selectedTemplate}
          placedTools={placedTools}
          connections={connections}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
};
