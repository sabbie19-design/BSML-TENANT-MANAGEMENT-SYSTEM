
import React, { useState } from 'react';
import { MAINTENANCE_REQUESTS } from '../constants';
import { Wrench, Clock, CheckCircle2, MoreVertical, Plus, Filter, Calendar } from 'lucide-react';

const Maintenance = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Maintenance & Work Orders</h2>
          <p className="text-slate-500 mt-1">Track issues across all 7 clusters and manage amenity bookings.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100">
          <Plus className="w-4 h-4" />
          Log New Issue
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-4 border-b border-slate-200">
            {['All', 'Open', 'In Progress', 'Closed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`pb-4 text-sm font-bold transition-all relative ${
                  filter === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
                {filter === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"></div>}
              </button>
            ))}
          </div>

          <div className="grid gap-4">
            {MAINTENANCE_REQUESTS.map((req) => (
              <div key={req.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${req.status === 'Open' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{req.type} - {req.unitId}</h4>
                      <p className="text-xs text-slate-400 font-medium">{req.cluster} • Issued on {req.date}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    req.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {req.priority} Priority
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-6">{req.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[1, 2].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                          {i === 1 ? 'MT' : 'JD'}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 font-medium">Assigned to: Maintenance Team</span>
                  </div>
                  <button className="text-indigo-600 text-sm font-bold hover:underline">Update Status</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              Amenity Schedule
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Clubhouse', time: 'Oct 28, 2PM-6PM', user: 'Unit C1-402' },
                { name: 'Basketball Court', time: 'Oct 28, 8AM-10AM', user: 'Unit C2-101' },
                { name: 'Poolside', time: 'Oct 29, 4PM-9PM', user: 'Unit C4-301' },
              ].map((booking, idx) => (
                <div key={idx} className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <p className="text-sm font-bold text-slate-800">{booking.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{booking.time}</p>
                  <p className="text-[10px] text-indigo-600 font-bold mt-2 uppercase">{booking.user}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors">
              Book Amenity
            </button>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-xl shadow-slate-200">
            <h3 className="font-bold mb-4 opacity-90">Quick Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs opacity-60">Pending Fixes</p>
              </div>
              <div>
                <p className="text-2xl font-bold">08</p>
                <p className="text-xs opacity-60">Active Crews</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-green-400 text-sm font-bold">
                <CheckCircle2 className="w-4 h-4" />
                94% Resolution Rate
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
