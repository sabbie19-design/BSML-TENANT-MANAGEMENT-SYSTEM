
import React from 'react';
import { RECENT_VISITORS } from '../constants';
import { ShieldCheck, UserCheck, Search, QrCode, ClipboardList, Clock, AlertTriangle } from 'lucide-react';

const Security = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Security & Access</h2>
          <p className="text-slate-500 mt-1">Visitor logs, pre-registrations, and incident reporting.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-black transition-all">
            <AlertTriangle className="w-4 h-4" />
            Report Incident
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Recent Arrivals</h3>
              <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <input type="text" placeholder="Search visitors..." className="bg-transparent border-none outline-none text-xs w-32" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Visitor</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Unit Visited</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Purpose</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Time</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RECENT_VISITORS.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <UserCheck className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-semibold text-slate-800">{v.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">{v.unitVisited}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded">
                          {v.purpose}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          {v.arrivalTime}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <QrCode className="w-4 h-4 text-slate-400 cursor-pointer hover:text-indigo-600" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 text-center border-t border-slate-100">
              <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">View Full Visitor Logs</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              Guardhouse Status
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-indigo-700">On-Duty Guards</span>
                <span className="font-bold text-indigo-900">12 Officers</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-indigo-700">Active Gates</span>
                <span className="font-bold text-indigo-900">4 / 4 Open</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-indigo-700">Incidents (Today)</span>
                <span className="font-bold text-indigo-900">0 Reported</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-indigo-600" />
              Pre-Registered Guests
            </h3>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <p className="text-sm text-slate-500 italic">No guests pre-registered for today.</p>
              <button className="mt-4 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">
                Generate Guest Pass
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
