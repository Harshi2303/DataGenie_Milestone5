import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  FileText, 
  Home
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'topstory', label: 'Top Story', icon: Sparkles },
    { id: 'brief', label: 'Executive Brief', icon: FileText },
  ];

  return (
    <header>
      <nav className="navbar">
        <div className="brand-section">
          <div className="brand-logo">BI</div>
          <div>
            <div className="brand-title">Enterprise Operations Studio</div>
            <div className="brand-tag">Business Intelligence</div>
          </div>
        </div>

        <div className="nav-links">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
