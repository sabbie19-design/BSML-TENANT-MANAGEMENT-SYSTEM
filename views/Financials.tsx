
import React from 'react';
import { Download, Upload, Filter, Search, CreditCard, DollarSign, PieChart, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { COLORS } from '../constants';

const collectionData = [
  { name: 'Cluster 1', value: 85 },
  { name: 'Cluster 2', value: 92 },
  { name: 'Cluster 3', value: 68 },
  { name: 'Cluster 4', value: 75 },
  { name: 'Cluster 5', value: 88 },
  { name: 'Cluster 6', value: 95 },
  { name: 'Cluster 7', value: 82 },
];

const Financials = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Financials & Billing</h2>
          <p className="text-slate-500 mt-1">Manage association dues, payments, and delinquency reports.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all">
            <Upload className="w-4 h-4" />
            Batch Upload
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
            <Download className="w-4 h-4" />
            Generate Statement
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Collection Rate by Cluster (%)</h3>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={collectionData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} domain={[0, 100]} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {collectionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value < 75 ? '#ef4444' : '#4f46e5'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
            <div className="flex items-center gap-3 mb-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <h4 className="font-bold">Pending Dues</h4>
            </div>
            <p className="text-3xl font-bold text-red-700">₱42,500</p>
            <p className="text-xs text-red-500 mt-2 font-medium">12 Units are currently delinquent</p>
          </div>
          <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-lg shadow-indigo-100">
            <div className="flex items-center gap-3 mb-2 opacity-80">
              <DollarSign className="w-5 h-5" />
              <h4 className="font-bold">Goal (Oct)</h4>
            </div>
            <p className="text-3xl font-bold">₱300,000</p>
            <div className="w-full bg-indigo-500 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-white h-full w-[82%]"></div>
            </div>
            <p className="text-xs mt-2 font-medium opacity-80">82% of monthly target reached</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Unit</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { unit: 'C1-B1-101', type: 'Assoc. Dues', amount: 2500, date: 'Oct 24, 2023', status: 'Paid' },
                { unit: 'C3-B2-502', type: 'Amenity Fee', amount: 500, date: 'Oct 24, 2023', status: 'Paid' },
                { unit: 'C5-B1-203', type: 'Assoc. Dues', amount: 2500, date: 'Oct 23, 2023', status: 'Pending' },
                { unit: 'C2-B1-401', type: 'Assoc. Dues', amount: 2500, date: 'Oct 22, 2023', status: 'Delinquent' },
              ].map((t, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800 text-sm">{t.unit}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{t.type}</td>
                  <td className="px-6 py-4 font-bold text-slate-800 text-sm">₱{t.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{t.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${COLORS[t.status as keyof typeof COLORS]}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import { AlertCircle } from 'lucide-react';

export default Financials;
