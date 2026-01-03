
import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  CreditCard, 
  Wrench, 
  ShieldCheck, 
  Bell, 
  Search, 
  ChevronRight, 
  TrendingUp,
  AlertCircle,
  Plus,
  Home,
  MessageSquare
} from 'lucide-react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import PropertyMap from './views/PropertyMap';
import ResidentDirectory from './views/ResidentDirectory';
import Financials from './views/Financials';
import Maintenance from './views/Maintenance';
import Security from './views/Security';
import SmartAnnouncements from './views/SmartAnnouncements';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Property Map', icon: Building2, path: '/property' },
    { name: 'Residents', icon: Users, path: '/residents' },
    { name: 'Financials', icon: CreditCard, path: '/billing' },
    { name: 'Maintenance', icon: Wrench, path: '/maintenance' },
    { name: 'Security', icon: ShieldCheck, path: '/security' },
    { name: 'Announcements', icon: MessageSquare, path: '/announcements' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 z-20">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
          B
        </div>
        <div>
          <h1 className="font-bold text-slate-800 leading-tight">BSML</h1>
          <p className="text-xs text-slate-400 font-medium tracking-wider">TENANT MGMT</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
            JD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold text-slate-800 truncate">Admin Officer</p>
            <p className="text-xs text-slate-500 truncate">admin@bsml-hoa.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const Header = () => (
  <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 fixed top-0 left-64 right-0 z-10">
    <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-lg w-96">
      <Search className="w-4 h-4 text-slate-400" />
      <input 
        type="text" 
        placeholder="Search units, tenants, or vehicles..." 
        className="bg-transparent border-none outline-none text-sm w-full text-slate-600 placeholder:text-slate-400"
      />
    </div>
    <div className="flex items-center gap-6">
      <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
      </button>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
        <Plus className="w-4 h-4" />
        New Entry
      </button>
    </div>
  </header>
);

const SetupGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  if (!isOpen) return (
    <button 
      onClick={() => setIsOpen(true)}
      className="fixed bottom-6 right-6 bg-slate-900 text-white p-4 rounded-full shadow-2xl z-50 hover:scale-105 transition-transform"
    >
      🚀 How to Deploy?
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 custom-scrollbar">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">Deployment & Tech Stack Setup</h2>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
              <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded flex items-center justify-center text-sm">1</span>
              Firebase Backend Setup
            </h3>
            <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 space-y-2">
              <p>1. Go to <a href="https://console.firebase.google.com" className="text-indigo-600 font-medium">Firebase Console</a>.</p>
              <p>2. Create a project named <b>"BSML-HOA"</b>.</p>
              <p>3. Enable <b>Authentication</b> (Email/Password).</p>
              <p>4. Create a <b>Cloud Firestore</b> database in production mode.</p>
              <p>5. Under Project Settings, add a Web App and copy your <code>firebaseConfig</code>.</p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-sm">2</span>
              GitHub & Code Integration
            </h3>
            <div className="bg-slate-50 p-4 rounded-lg text-sm font-mono text-slate-700 whitespace-pre">
{`git init
git add .
git commit -m "initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main`}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
              <span className="w-6 h-6 bg-black text-white rounded flex items-center justify-center text-sm">3</span>
              Vercel Hosting
            </h3>
            <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 space-y-2">
              <p>1. Sign in to <a href="https://vercel.com" className="text-indigo-600 font-medium">Vercel</a> with GitHub.</p>
              <p>2. Click <b>Add New Project</b> and import your repo.</p>
              <p>3. Add your Firebase keys as <b>Environment Variables</b> if you moved them out of the code.</p>
              <p>4. Hit <b>Deploy</b>!</p>
            </div>
          </section>
        </div>
        
        <button 
          onClick={() => setIsOpen(false)}
          className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700"
        >
          Got it, let's explore the dashboard!
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex">
        <Sidebar />
        <main className="flex-1 ml-64 min-h-screen pt-16">
          <Header />
          <div className="p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/property" element={<PropertyMap />} />
              <Route path="/residents" element={<ResidentDirectory />} />
              <Route path="/billing" element={<Financials />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/security" element={<Security />} />
              <Route path="/announcements" element={<SmartAnnouncements />} />
            </Routes>
          </div>
        </main>
        <SetupGuide />
      </div>
    </Router>
  );
}
