import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  MapPin, 
  TrendingDown, 
  Layers, 
  Database, 
  FileText, 
  X, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function TopStorySection({ topStory, onViewBrief }) {
  const [selectedCitation, setSelectedCitation] = useState(null);

  if (!topStory) return <div style={{ color: '#fff', padding: '2rem' }}>Loading Top Story calculation...</div>;

  const { title, what, where, why, whatElse } = topStory;

  return (
    <div className="top-story-container">
      <div className="story-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <Sparkles size={24} color="#06b6d4" />
          <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#06b6d4', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Top Story Analysis
          </span>
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff', lineHeight: '1.3' }}>
          {title}
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginTop: '0.4rem' }}>
          Dynamic analytical synthesis connecting cross-KPI movements from active dataset
        </p>
      </div>

      {/* 4 Story Cards: WHAT, WHERE, WHY, WHAT ELSE */}
      <div className="story-grid">
        {/* WHAT? */}
        <div className="story-card" style={{ borderLeft: '4px solid #f43f5e' }}>
          <div className="story-card-tag tag-what">
            <HelpCircle size={14} />
            <span>WHAT?</span>
          </div>
          <h3 className="story-card-title">{what.headline}</h3>
          <p className="story-card-desc">{what.description}</p>
          
          <div style={{ background: 'rgba(244, 63, 94, 0.08)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(244, 63, 94, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#fda4af' }}>Disruption Availability</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#f43f5e' }}>{what.metricValue}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: '#fda4af' }}>Baseline Change</div>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: '#fb7185' }}>{what.metricDelta}</div>
            </div>
          </div>

          <button 
            className="evidence-badge"
            onClick={() => setSelectedCitation({ title: "WHAT? Evidence Citation", ...what.citation })}
          >
            <Database size={13} />
            <span>Trace to Source: {what.citation.sheet} Sheet</span>
          </button>
        </div>

        {/* WHERE? */}
        <div className="story-card" style={{ borderLeft: '4px solid #06b6d4' }}>
          <div className="story-card-tag tag-where">
            <MapPin size={14} />
            <span>WHERE?</span>
          </div>
          <h3 className="story-card-title">{where.headline}</h3>
          <p className="story-card-desc">{where.description}</p>

          <div style={{ background: 'rgba(6, 182, 212, 0.08)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}><strong>Isolated Segment:</strong> {where.segment}</div>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.2rem' }}><strong>Affected SKU IDs:</strong> {where.affectedProducts}</div>
          </div>

          <button 
            className="evidence-badge"
            onClick={() => setSelectedCitation({ title: "WHERE? Evidence Citation", ...where.citation })}
          >
            <Database size={13} />
            <span>Trace to Source: {where.citation.sheet}</span>
          </button>
        </div>

        {/* WHY? */}
        <div className="story-card" style={{ borderLeft: '4px solid #f59e0b' }}>
          <div className="story-card-tag tag-why">
            <TrendingDown size={14} />
            <span>WHY?</span>
          </div>
          <h3 className="story-card-title">{why.headline}</h3>
          <p className="story-card-desc">{why.description}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <div style={{ fontSize: '0.7rem', color: '#fde68a' }}>Daily Revenue Loss</div>
              <div style={{ fontSize: '1rem', fontWeight: '800', color: '#f59e0b' }}>{why.salesDrop}</div>
            </div>
            <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <div style={{ fontSize: '0.7rem', color: '#fde68a' }}>Markdown Increase</div>
              <div style={{ fontSize: '1rem', fontWeight: '800', color: '#f59e0b' }}>{why.markdownSurge}</div>
            </div>
          </div>

          <button 
            className="evidence-badge"
            onClick={() => setSelectedCitation({ title: "WHY? Evidence Citation", ...why.citation })}
          >
            <Database size={13} />
            <span>Trace to Source: {why.citation.sheet} Sheet</span>
          </button>
        </div>

        {/* WHAT ELSE? */}
        <div className="story-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
          <div className="story-card-tag tag-whatelse">
            <Layers size={14} />
            <span>WHAT ELSE?</span>
          </div>
          <h3 className="story-card-title">{whatElse.headline}</h3>
          <p className="story-card-desc">{whatElse.description}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <div style={{ background: 'rgba(139, 92, 246, 0.08)', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
              <div style={{ fontSize: '0.7rem', color: '#ddd6fe' }}>Excess Stock Value</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#c084fc' }}>{whatElse.inventoryValueIncrease}</div>
            </div>
            <div style={{ background: 'rgba(139, 92, 246, 0.08)', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
              <div style={{ fontSize: '0.7rem', color: '#ddd6fe' }}>Fulfilment Cost Surge</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#c084fc' }}>{whatElse.fulfilmentCostSurge}</div>
            </div>
          </div>

          <button 
            className="evidence-badge"
            onClick={() => setSelectedCitation({ title: "WHAT ELSE? Evidence Citation", ...whatElse.citation })}
          >
            <Database size={13} />
            <span>Trace to Source: {whatElse.citation.sheet} Sheets</span>
          </button>
        </div>
      </div>

      {/* Action Banner to Executive Brief */}
      <div className="action-banner">
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>Executive Briefing Summary</h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            View high-level operational takeaways tailored for leadership decision-making.
          </p>
        </div>
        <button className="action-btn" onClick={onViewBrief}>
          <FileText size={18} />
          <span>View Executive Brief</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Modal Citation Drawer */}
      {selectedCitation && (
        <div className="modal-overlay" onClick={() => setSelectedCitation(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Database size={20} color="#06b6d4" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>{selectedCitation.title}</h3>
              </div>
              <button className="modal-close" onClick={() => setSelectedCitation(null)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.3rem' }}>Dataset Sheet Origin:</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: '#38bdf8', fontWeight: '600' }}>
                [{selectedCitation.sheet}] Sheet
              </div>

              <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.8rem', marginBottom: '0.3rem' }}>Calculated Fields:</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#a7f3d0' }}>
                {selectedCitation.fields}
              </div>
            </div>

            <div style={{ background: 'rgba(6, 182, 212, 0.08)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#06b6d4', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <CheckCircle2 size={16} />
                Calculated Proof & Values
              </div>
              <p style={{ fontSize: '0.875rem', color: '#e2e8f0', lineHeight: '1.5' }}>
                {selectedCitation.rawProof}
              </p>
            </div>

            <button 
              style={{
                background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
                color: '#fff',
                border: 'none',
                padding: '0.6rem 1.2rem',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}
              onClick={() => setSelectedCitation(null)}
            >
              Close Citation Inspection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
