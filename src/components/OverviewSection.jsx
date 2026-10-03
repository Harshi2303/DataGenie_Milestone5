import React from 'react';
import { Building2, AlertTriangle, ArrowRight, ShieldAlert, PackageX, TrendingDown } from 'lucide-react';

export default function OverviewSection({ onStartDashboard }) {
  const painPoints = [
    {
      id: 1,
      title: "Maintaining product availability during operational disruption",
      desc: "Preventing stockout events across online fulfillment centers during logistics delays and demand volatility.",
      icon: ShieldAlert,
      badge: "High Operational Risk"
    },
    {
      id: 2,
      title: "Controlling excess stock and associated costs",
      desc: "Minimizing capital tied up in stranded inventory and avoiding bloated shipping and handling charges.",
      icon: PackageX,
      badge: "Margin Leakage"
    },
    {
      id: 3,
      title: "Understanding what is driving uneven performance across categories",
      desc: "Isolating cross-category disparities (e.g., Fashion Online vs. Food Store) to address localized revenue drag.",
      icon: TrendingDown,
      badge: "Category Vulnerability"
    }
  ];

  return (
    <div className="overview-container">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
          <Building2 size={24} color="#06b6d4" />
          <h1 className="section-title">Company Prospect Analysis: Marks & Spencer (M&S)</h1>
        </div>
        <p className="section-subtitle">
          Milestone 5 Hackathon Context — Evaluating supply chain resilience, cross-channel availability, and cost-to-serve metrics.
        </p>
      </div>

      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={20} color="#f59e0b" />
          Target Enterprise Pain Points
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
          The following three pain points define the core operational challenges facing M&S in this analytical scenario.
          These pain points serve as the foundation for the traditional dashboard investigation and the automated Top Story derivation.
        </p>

        <div className="pain-points-grid">
          {painPoints.map(item => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="pain-point-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="pain-point-num">Pain Point #{item.id}</span>
                  <span className="brand-tag" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fcd34d', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                    {item.badge}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <IconComponent size={24} color="#06b6d4" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <h3 className="pain-point-title">{item.title}</h3>
                </div>
                <p className="pain-point-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="action-banner">
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>Step 1: Investigate via Executive Dashboard</h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Experience the "Hard Way" of manually filtering charts and cross-referencing metrics across 4 separate tables.
          </p>
        </div>
        <button className="action-btn" onClick={onStartDashboard}>
          <span>Open Dashboard</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
