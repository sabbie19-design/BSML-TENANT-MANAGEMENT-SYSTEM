
import React, { useState } from 'react';
import { Search, Filter, Mail, Phone, MoreHorizontal, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';
import { CLUSTERS } from '../constants';

const ResidentDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Flatten all units across all clusters to show in a table
  const allUnits = CLUSTERS.flatMap(c => 
    c.buildings.flatMap(b => 
      b.units.map(u => ({
        ...u,
        buildingName: b.name,
        clusterName: c.name
      }))
    )
  ).filter(u => u.status === 'Occupied');

  const filtered = allUnits.filter(u => 
    u.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (u.tenantName && u.tenantName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    u.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Resident Directory</h2>
          <p className="text-slate-500 mt-1">Manage contact information and residency records.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
          <UserPlus className="w-4 h-4" />
          Add Resident
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-lg flex-1 min-w-[300px]">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, unit, or phone..."
              className="bg-transparent border-none outline-none text-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Resident Info</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 uppercase">
                        {(r.tenantName || r.ownerName).charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{r.tenantName || r.ownerName}</p>
                        <p className="text-xs text-slate-400">{r.tenantName ? 'Tenant' : 'Unit Owner'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-700">{r.clusterName}</p>
                    <p className="text-xs text-slate-500">{r.buildingName}, Unit #{r.number}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded border border-green-100">
                      Registered
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
          <p className="text-sm text-slate-500">Showing {filtered.length} residents</p>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              <span className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-sm">1</span>
              <span className="w-8 h-8 flex items-center justify-center text-slate-500 text-sm font-medium cursor-pointer hover:bg-slate-100 rounded-lg transition-colors">2</span>
              <span className="w-8 h-8 flex items-center justify-center text-slate-500 text-sm font-medium cursor-pointer hover:bg-slate-100 rounded-lg transition-colors">3</span>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentDirectory;
