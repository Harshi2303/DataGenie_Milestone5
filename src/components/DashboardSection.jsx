import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { 
  DollarSign, 
  PackageCheck, 
  Boxes, 
  Truck, 
  Filter, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler
);

export default function DashboardSection({ 
  filters, 
  setFilters, 
  filterOptions, 
  metrics, 
  onViewTopStory 
}) {
  if (!metrics) return <div style={{ color: '#fff', padding: '2rem' }}>Loading dataset metrics...</div>;

  const { dailySeries, totals } = metrics;
  const labels = dailySeries.map(d => d.date);

  const createChartOptions = (yTitle, isPercent = false, prefix = '') => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (ctx) => `${yTitle}: ${prefix}${ctx.parsed.y}${isPercent ? '%' : ''}`
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#9ca3af', font: { size: 11 } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { 
          color: '#9ca3af', 
          font: { size: 11 },
          callback: (val) => `${prefix}${val}${isPercent ? '%' : ''}`
        },
        suggestedMin: isPercent ? 40 : undefined,
        suggestedMax: isPercent ? 100 : undefined
      }
    }
  });

  const salesChartData = {
    labels,
    datasets: [{
      label: 'Sales Revenue (£)',
      data: dailySeries.map(d => d.salesAmount),
      borderColor: '#06b6d4',
      backgroundColor: 'rgba(6, 182, 212, 0.12)',
      borderWidth: 2.5,
      pointBackgroundColor: '#06b6d4',
      fill: true,
      tension: 0.3
    }]
  };

  const availChartData = {
    labels,
    datasets: [{
      label: 'Availability Rate (%)',
      data: dailySeries.map(d => d.availRate),
      borderColor: dailySeries.some(d => d.availRate < 80) ? '#f43f5e' : '#10b981',
      backgroundColor: dailySeries.some(d => d.availRate < 80) ? 'rgba(244, 63, 94, 0.12)' : 'rgba(16, 185, 129, 0.12)',
      borderWidth: 2.5,
      pointBackgroundColor: dailySeries.some(d => d.availRate < 80) ? '#f43f5e' : '#10b981',
      fill: true,
      tension: 0.3
    }]
  };

  const inventoryChartData = {
    labels,
    datasets: [{
      label: 'Inventory Level (Units)',
      data: dailySeries.map(d => d.stockQty),
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.12)',
      borderWidth: 2.5,
      pointBackgroundColor: '#8b5cf6',
      fill: true,
      tension: 0.3
    }]
  };

  const fulfChartData = {
    labels,
    datasets: [{
      label: 'Cost to Serve (£)',
      data: dailySeries.map(d => d.fulfCost),
      borderColor: '#f59e0b',
      backgroundColor: 'rgba(245, 158, 11, 0.12)',
      borderWidth: 2.5,
      pointBackgroundColor: '#f59e0b',
      fill: true,
      tension: 0.3
    }]
  };

  return (
    <div className="dashboard-container">
      <div className="section-header">
        <h1 className="section-title">Executive Dashboard</h1>
        <p className="section-subtitle">
          Real-time KPI metrics, performance trends over time, and multi-dimensional filter controls calculated from the active dataset.
        </p>
      </div>

      {/* Interactive Filters Bar */}
      <div className="filter-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#06b6d4', fontWeight: '700', marginRight: '0.5rem' }}>
          <Filter size={18} />
          <span>Filters:</span>
        </div>

        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select 
            className="filter-select"
            value={filters.category || 'All'} 
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            {filterOptions.categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Channel</label>
          <select 
            className="filter-select"
            value={filters.channel || 'All'} 
            onChange={(e) => setFilters({ ...filters, channel: e.target.value })}
          >
            {filterOptions.channels.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Region</label>
          <select 
            className="filter-select"
            value={filters.region || 'All'} 
            onChange={(e) => setFilters({ ...filters, region: e.target.value })}
          >
            {filterOptions.regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Location</label>
          <select 
            className="filter-select"
            value={filters.location || 'All'} 
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          >
            {filterOptions.locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Product</label>
          <select 
            className="filter-select"
            value={filters.product || 'All'} 
            onChange={(e) => setFilters({ ...filters, product: e.target.value })}
          >
            {filterOptions.products.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <button 
          style={{
            marginLeft: 'auto',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#9ca3af',
            padding: '0.4rem 0.8rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
          onClick={() => setFilters({ category: 'All', channel: 'All', region: 'All', location: 'All', product: 'All' })}
        >
          Reset Filters
        </button>
      </div>

      {/* 4 Executive KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Sales Revenue</span>
            <div className="kpi-icon"><DollarSign size={18} /></div>
          </div>
          <div className="kpi-value">£{totals.totalSalesRevenue.toLocaleString()}</div>
          <div className="kpi-subtext">
            <span>Total period sales amount</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Product Availability Rate</span>
            <div className="kpi-icon" style={{ color: totals.overallAvailabilityRate < 80 ? '#f43f5e' : '#10b981' }}>
              <PackageCheck size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: totals.overallAvailabilityRate < 80 ? '#fb7185' : '#fff' }}>
            {totals.overallAvailabilityRate}%
          </div>
          <div className="kpi-subtext">
            <span>Overall available vs expected units</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Inventory Level</span>
            <div className="kpi-icon" style={{ color: '#8b5cf6' }}><Boxes size={18} /></div>
          </div>
          <div className="kpi-value">{totals.latestStockQty.toLocaleString()} <span style={{ fontSize: '1rem', color: '#9ca3af' }}>units</span></div>
          <div className="kpi-subtext">
            <span>Latest inventory value: £{totals.latestInvValue.toLocaleString()}</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Cost to Serve (Fulfilment)</span>
            <div className="kpi-icon" style={{ color: '#f59e0b' }}><Truck size={18} /></div>
          </div>
          <div className="kpi-value">£{totals.totalFulfilmentCost.toLocaleString()}</div>
          <div className="kpi-subtext">
            <span>Total shipping & handling costs</span>
          </div>
        </div>
      </div>

      {/* 4 Line Charts Grid */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <span className="chart-title">1. Sales Revenue Over Time (£)</span>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Sheet: Sales_Transactions</span>
          </div>
          <div className="chart-container">
            <Line data={salesChartData} options={createChartOptions('Sales', false, '£')} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <span className="chart-title">2. Product Availability Rate Over Time (%)</span>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Sheet: Availability</span>
          </div>
          <div className="chart-container">
            <Line data={availChartData} options={createChartOptions('Availability', true)} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <span className="chart-title">3. Inventory Level Over Time (Stock Quantity)</span>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Sheet: Inventory</span>
          </div>
          <div className="chart-container">
            <Line data={inventoryChartData} options={createChartOptions('Stock Units', false)} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <span className="chart-title">4. Cost to Serve Over Time (£)</span>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Sheet: Fulfilment_Cost</span>
          </div>
          <div className="chart-container">
            <Line data={fulfChartData} options={createChartOptions('Fulfilment Cost', false, '£')} />
          </div>
        </div>
      </div>

      {/* Action Banner to Top Story */}
      <div className="action-banner">
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>Synthesize Performance Insights</h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Automatically connect cross-KPI movements into a structured Top Story breakdown.
          </p>
        </div>
        <button className="action-btn" onClick={onViewTopStory}>
          <Sparkles size={18} />
          <span>View Top Story</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
