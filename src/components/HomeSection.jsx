import React, { useRef } from 'react';
import { UploadCloud, FileSpreadsheet, ArrowRight, CheckCircle2, Database } from 'lucide-react';

export default function HomeSection({ 
  onFileUpload, 
  activeDatasetName,
  onGoToDashboard 
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="home-container">
      <div className="section-header">
        <h1 className="section-title">Enterprise Analytics & Operations Platform</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Active Loaded Dataset Panel */}
        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <Database size={22} color="#06b6d4" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>Dataset Status</h2>
          </div>

          <div style={{
            background: 'rgba(6, 182, 212, 0.12)',
            border: '1px solid #06b6d4',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Operational Dataset Loaded
                <CheckCircle2 size={16} color="#06b6d4" />
              </div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileSpreadsheet size={15} />
                <span>{activeDatasetName || 'MS_DataGenie_Synthetic_Dataset.xlsx'}</span>
              </div>
            </div>
            <span className="brand-tag" style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#38bdf8' }}>
              Active
            </span>
          </div>
        </div>

        {/* Upload Custom File Panel */}
        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <UploadCloud size={22} color="#8b5cf6" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>Upload Additional Document</h2>
          </div>

          <div 
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            style={{
              border: '2px dashed rgba(139, 92, 246, 0.4)',
              borderRadius: '14px',
              padding: '1.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'rgba(139, 92, 246, 0.05)',
              transition: 'all 0.2s'
            }}
          >
            <UploadCloud size={32} color="#8b5cf6" style={{ margin: '0 auto 0.5rem auto' }} />
            <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>Upload file (.xlsx / .csv)</h3>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.2rem' }}>
              Optional: Upload custom operational workbook to analyze
            </p>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".xlsx, .xls, .csv" 
              style={{ display: 'none' }} 
            />
          </div>
        </div>
      </div>

      <div className="action-banner">
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>Ready to analyze operational metrics?</h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Proceed to the dashboard to view KPI metrics, performance trend charts, and multi-dimensional filter controls.
          </p>
        </div>
        <button className="action-btn" onClick={onGoToDashboard}>
          <span>View Dashboard</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
