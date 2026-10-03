import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import DashboardSection from './components/DashboardSection';
import TopStorySection from './components/TopStorySection';
import BriefSection from './components/BriefSection';

import { 
  loadExcelData, 
  parseCustomFile,
  extractFilterOptions, 
  calculateFilteredMetrics, 
  generateTopStory, 
  generateBrief 
} from './data/excelLoader';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCompany, setSelectedCompany] = useState('Marks & Spencer (M&S)');
  const [activeDatasetName, setActiveDatasetName] = useState('MS_DataGenie_Synthetic_Dataset.xlsx');
  const [rawData, setRawData] = useState(null);
  
  const [filters, setFilters] = useState({
    category: 'All',
    channel: 'All',
    region: 'All',
    location: 'All',
    product: 'All'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await loadExcelData();
        setRawData(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load dataset:', err);
        setError('Failed to load dataset file.');
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        setLoading(true);
        const arrayBuffer = e.target.result;
        const parsed = parseCustomFile(arrayBuffer, file.name);
        setRawData(parsed);
        setActiveDatasetName(file.name);
        setSelectedCompany(`Custom Upload (${file.name})`);
        setFilters({ category: 'All', channel: 'All', region: 'All', location: 'All', product: 'All' });
        setLoading(false);
      } catch (err) {
        console.error('Failed to parse uploaded file:', err);
        alert('Could not parse file. Please upload a valid .xlsx or .csv workbook.');
        setLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#090d16', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px solid rgba(6,182,212,0.2)', borderTopColor: '#06b6d4', animation: 'spin 1s linear infinite' }} />
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: '#9ca3af' }}>
          Loading dataset and calculating metrics...
        </p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: '#090d16', color: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: '#111827', border: '1px solid #f43f5e', padding: '2rem', borderRadius: '16px', maxWidth: '500px', textAlign: 'center' }}>
          <h2>Error Loading Data</h2>
          <p style={{ marginTop: '0.5rem', color: '#cbd5e1' }}>{error}</p>
        </div>
      </div>
    );
  }

  const filterOptions = extractFilterOptions(rawData);
  const metrics = calculateFilteredMetrics(rawData, filters);
  const topStory = generateTopStory(rawData);
  const brief = generateBrief(rawData);

  return (
    <div className="app-container">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        selectedCompany={selectedCompany}
        activeDatasetName={activeDatasetName}
      />

      <main className="main-content">
        {activeTab === 'home' && (
          <HomeSection 
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
            onFileUpload={handleFileUpload}
            activeDatasetName={activeDatasetName}
            onGoToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardSection 
            filters={filters}
            setFilters={setFilters}
            filterOptions={filterOptions}
            metrics={metrics}
            onViewTopStory={() => setActiveTab('topstory')}
          />
        )}

        {activeTab === 'topstory' && (
          <TopStorySection 
            topStory={topStory}
            onViewBrief={() => setActiveTab('brief')}
          />
        )}

        {activeTab === 'brief' && (
          <BriefSection 
            brief={brief}
          />
        )}
      </main>
    </div>
  );
}
