
import React, { useState } from 'react';
import { CLUSTERS, COLORS } from '../constants';
import { ChevronRight, Home, LayoutGrid, List } from 'lucide-react';
import { UnitStatus } from '../types';

const PropertyMap = () => {
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);

  const cluster = CLUSTERS.find(c => c.id === selectedCluster);
  const building = cluster?.buildings.find(b => b.id === selectedBuilding);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Property Mapping</h2>
          <p className="text-slate-500 mt-1">Visualize and manage your 7 Clusters and 15 Buildings.</p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <button 
          onClick={() => { setSelectedCluster(null); setSelectedBuilding(null); }}
          className="hover:text-indigo-600"
        >
          All Clusters
        </button>
        {selectedCluster && (
          <>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <button 
              onClick={() => setSelectedBuilding(null)}
              className="hover:text-indigo-600"
            >
              {cluster?.name}
            </button>
          </>
        )}
        {selectedBuilding && (
          <>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="text-slate-800">{building?.name}</span>
          </>
        )}
      </nav>

      {!selectedCluster ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLUSTERS.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCluster(c.id)}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                <LayoutGrid className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">{c.name}</h3>
              <p className="text-slate-500 text-sm mt-1">{c.buildings.length} Buildings • {c.buildings.reduce((acc, b) => acc + b.units.length, 0)} Units</p>
            </button>
          ))}
        </div>
      ) : !selectedBuilding ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cluster?.buildings.map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedBuilding(b.id)}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">{b.name}</h3>
              <p className="text-slate-500 text-sm mt-1">{b.units.length} Units</p>
              <div className="flex gap-1 mt-4">
                {b.units.slice(0, 10).map(u => (
                  <div key={u.id} className={`w-2 h-2 rounded-full ${u.status === 'Occupied' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                ))}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h3 className="font-bold text-slate-800 text-xl">{building?.name} Inventory</h3>
              <p className="text-sm text-slate-500">Unit availability and status tracker</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="w-3 h-3 rounded bg-green-500"></span> Occupied
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="w-3 h-3 rounded bg-amber-500"></span> Maintenance
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="w-3 h-3 rounded bg-slate-300"></span> Vacant
              </div>
            </div>
          </div>
          <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {building?.units.map(u => (
              <div
                key={u.id}
                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${COLORS[u.status]}`}
              >
                <span className="text-lg font-bold">#{u.number}</span>
                <span className="text-[10px] uppercase font-bold opacity-70 tracking-tighter">{u.status}</span>
                {u.balance > 0 && <span className="text-[10px] bg-red-500 text-white px-1 rounded">Debt</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;
