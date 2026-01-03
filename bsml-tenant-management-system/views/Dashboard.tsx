
import React from 'react';
// Fix: Added ChevronRight to the lucide-react imports
import { TrendingUp, Users, AlertCircle, CreditCard, ArrowUpRight, ArrowDownRight, Clock, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Jan', collections: 4000 },
  { name: 'Feb', collections: 3000 },
  { name: 'Mar', collections: 2000 },
  { name: 'Apr', collections: 2780 },
  { name: 'May', collections: 1890 },
  { name: 'Jun', collections: 2390 },
  { name: 'Jul', collections: 3490 },
];

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {Math.abs(change)}%
      </div>
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Dashboard Overview</h2>
          <p className="text-slate-500 mt-1">Welcome back, Admin. Here's what's happening at BSML today.</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-white border border-slate-200 text-sm rounded-lg px-4 py-2 outline-none">
            <option>Last 30 Days</option>
            <option>Last Quarter</option>
            <option>Year to Date</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Collections" value="₱245,800" change={12.5} icon={CreditCard} color="bg-indigo-600" />
        <StatCard title="Active Residents" value="1,248" change={2.4} icon={Users} color="bg-blue-600" />
        <StatCard title="Open Requests" value="18" change={-8.1} icon={AlertCircle} color="bg-amber-600" />
        <StatCard title="Occupancy Rate" value="94.2%" change={0.5} icon={TrendingUp} color="bg-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Revenue Trends</h3>
            <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Download Report</button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorColl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
                <Area type="monotone" dataKey="collections" stroke="#4f46e5" fillOpacity={1} fill="url(#colorColl)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Urgent Maintenance</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-100">
                  <Wrench className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">Pipe Burst - C{i} B1</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-500">2 hours ago</span>
                  </div>
                </div>
                {/* Fixed: ChevronRight now has its import defined */}
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 self-center" />
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">
            View All Issues
          </button>
        </div>
      </div>
    </div>
  );
};

import { Wrench } from 'lucide-react';

export default Dashboard;