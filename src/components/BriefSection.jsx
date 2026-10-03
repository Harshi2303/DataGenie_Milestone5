import React from 'react';
import { 
  FileText, 
  TrendingDown, 
  TrendingUp, 
  Lightbulb, 
  Target
} from 'lucide-react';

export default function BriefSection({ brief }) {
  if (!brief) return <div style={{ color: '#fff', padding: '2rem' }}>Loading Executive Brief...</div>;

  const { gist, headlineNumbers, top5Insights, businessTakeaway } = brief;

  return (
    <div className="brief-container">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
          <FileText size={24} color="#8b5cf6" />
          <h1 className="section-title">Executive Brief</h1>
        </div>
      </div>

      <div className="brief-card">
        {/* 1. Short Gist */}
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#06b6d4', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            1. Operational Summary Gist
          </div>
          <div className="brief-gist">
            "{gist}"
          </div>
        </div>

        {/* 2. Headline Numbers */}
        <div style={{ marginTop: '1.75rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#8b5cf6', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            2. Headline Operational Metrics
          </div>
          <div className="headline-grid">
            {headlineNumbers.map((item, idx) => (
              <div key={idx} className="headline-card">
                <div style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: '600' }}>{item.label}</div>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '800', 
                  color: item.trend === 'down' ? '#fb7185' : '#c084fc',
                  margin: '0.3rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  {item.trend === 'down' ? <TrendingDown size={20} /> : <TrendingUp size={20} />}
                  {item.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.subtext}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Top 5 Actionable Insights */}
        <div style={{ marginTop: '2rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#f59e0b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Lightbulb size={16} />
            <span>3. Top 5 Operational Insights</span>
          </div>
          <div className="insights-list">
            {top5Insights.map(item => (
              <div key={item.id} className="insight-item">
                <div className="insight-num">{item.id}</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#f3f4f6', marginBottom: '0.2rem' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.5' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Concise Business Takeaway */}
        <div style={{ marginTop: '2rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#10b981', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Target size={16} />
            <span>4. Key Executive Takeaway</span>
          </div>
          <div className="brief-takeaway">
            <strong>Action Takeaway:</strong> {businessTakeaway}
          </div>
        </div>
      </div>
    </div>
  );
}
