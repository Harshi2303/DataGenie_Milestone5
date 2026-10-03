import React from 'react';
import { 
  Bot, 
  Database, 
  CheckCheck, 
  Calculator, 
  Activity, 
  AlertTriangle, 
  SlidersHorizontal, 
  Network, 
  Search, 
  Sparkles, 
  FileText, 
  Link2, 
  BellRing,
  Cpu
} from 'lucide-react';

export default function AutomationSection() {
  const steps = [
    {
      id: 1,
      title: "Data Ingestion",
      desc: "Automatically ingests raw data feeds from ERP/WMS systems, Excel workbooks, and warehouse transaction logs.",
      icon: Database,
      category: "Data Pipeline"
    },
    {
      id: 2,
      title: "Data Quality Checks",
      desc: "Validates row formats, handles missing dates, detects schema mismatches, and enforces null-handling rules.",
      icon: CheckCheck,
      category: "Data Pipeline"
    },
    {
      id: 3,
      title: "KPI Calculation",
      desc: "Executes standard business metric logic (Availability %, Sales Revenue, Stock Qty, Cost to Serve) dynamically.",
      icon: Calculator,
      category: "Analytics Engine"
    },
    {
      id: 4,
      title: "KPI Trend Monitoring",
      desc: "Continuously tracks rolling period averages, comparing baseline trends against active operational periods.",
      icon: Activity,
      category: "Analytics Engine"
    },
    {
      id: 5,
      title: "Anomaly Detection",
      desc: "Flags statistically significant metric deviations (e.g., 35-point availability drops or 150% cost spikes).",
      icon: AlertTriangle,
      category: "Intelligence"
    },
    {
      id: 6,
      title: "Dimensional Analysis",
      desc: "Slices data across Category, Channel, Region, Location, and SKU dimensions to isolate root-cause clusters.",
      icon: SlidersHorizontal,
      category: "Intelligence"
    },
    {
      id: 7,
      title: "Cross-KPI Analysis",
      desc: "Correlates divergent movements across independent tables (e.g., matching low availability with rising stock).",
      icon: Network,
      category: "Intelligence"
    },
    {
      id: 8,
      title: "Identification of Contributing Factors",
      desc: "Calculates order-level shipping cost inflation, markdown growth, and out-of-stock SKU triggers.",
      icon: Search,
      category: "Synthesis"
    },
    {
      id: 9,
      title: "Top Story Generation",
      desc: "Synthesizes data-grounded What / Where / Why / What Else narrative structures from calculated metrics.",
      icon: Sparkles,
      category: "Synthesis"
    },
    {
      id: 10,
      title: "Brief Generation",
      desc: "Formats concise management-level summaries, headline metrics, and strategic takeaways for executives.",
      icon: FileText,
      category: "Synthesis"
    },
    {
      id: 11,
      title: "Evidence & Number Tracing",
      desc: "Embeds strict data lineage and table citations so every number traces back to its exact source cell.",
      icon: Link2,
      category: "Governance"
    },
    {
      id: 12,
      title: "Automated Reporting & Alerts",
      desc: "Dispatches proactive notifications via Slack/Email/Teams whenever critical business stories trigger.",
      icon: BellRing,
      category: "Governance"
    }
  ];

  return (
    <div className="automation-container">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
          <Bot size={26} color="#06b6d4" />
          <h1 className="section-title">Milestone 5: Potential Agentic AI Automation</h1>
        </div>
        <p className="section-subtitle">
          Demonstrating how DataGenie's autonomous AI agent architecture replaces manual dashboard searching with automated end-to-end analytical workflows.
        </p>
      </div>

      <div className="glass-panel" style={{ marginBottom: '2rem', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Cpu size={24} color="#38bdf8" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff' }}>
            Agentic AI Workflow Capability Matrix (12 Automated Steps)
          </h2>
        </div>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          In traditional SaaS analytics, human analysts manually execute steps 1 through 12 across spreadsheets and dashboards.
          DataGenie automates this entire lifecycle—from raw file ingestion down to traceable executive reporting.
        </p>

        <div className="automation-grid">
          {steps.map(step => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="auto-step-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="step-badge">Step {step.id < 10 ? `0${step.id}` : step.id}</span>
                  <span style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: '600' }}>{step.category}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.2rem' }}>
                  <IconComponent size={20} color="#06b6d4" />
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#fff' }}>{step.title}</h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: '1.5' }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '1.25rem 1.75rem', borderRadius: '14px', color: '#a7f3d0', fontSize: '0.875rem' }}>
        <strong>Hackathon Prototype Label:</strong> This section presents the conceptual Agentic AI architecture for Milestone 5. In this prototype, data calculations and story derivations run deterministically from <code>MS_DataGenie_Synthetic_Dataset.xlsx</code>.
      </div>
    </div>
  );
}
