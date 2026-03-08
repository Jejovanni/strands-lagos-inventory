'use client';

import React, { useState } from 'react';
import { Plus, Building2, Download } from 'lucide-react';

// Root-level Components
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import StatsOverview from '../components/StatsOverview';
import ReportsView from '../components/ReportsView';
import StockLogsView from '../components/StockLogsView';
import InventoryTable from '../components/InventoryTable';

// Centralized Types
import {
  ActiveTab,
  InventoryItem,
  StockLogEntry,
  FilterType
} from '../types';

// --- Initial Data ---
const initialInventory: InventoryItem[] = [
  { id: '1', name: 'Brazilian Silk Straight', sku: 'WIG-BS-001', type: 'wig', quantity: 12, price: 85000, status: 'in-stock', warehouse: 'Lagos Main' },
  { id: '2', name: 'Peruvian Deep Wave 14"', sku: 'BUN-PDW-14', type: 'bundle', quantity: 3, price: 45000, status: 'low-stock', warehouse: 'Ike Branch' },
  { id: '3', name: 'Frontal Closure Wig 18"', sku: 'WIG-FCW-18', type: 'wig', quantity: 0, price: 120000, status: 'out-of-stock', warehouse: 'Lagos Main' },
  { id: '4', name: 'Mink Body Wave Bundles', sku: 'BUN-MBW-03', type: 'bundle', quantity: 25, price: 35000, status: 'in-stock', warehouse: 'Lagos Main' },
];

const initialLogs: StockLogEntry[] = [
  { id: 'l1', itemId: '1', itemName: 'Brazilian Silk Straight', type: 'addition', amount: 5, previousQty: 7, newQty: 12, reason: 'Restock from Supplier', timestamp: '2023-10-24 14:30', user: 'Admin User' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inventory');
  const [items] = useState<InventoryItem[]>(initialInventory);
  const [logs] = useState<StockLogEntry[]>(initialLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterLocation, setFilterLocation] = useState<'all' | 'Lagos Main' | 'Ike Branch'>('all');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesLocation = filterLocation === 'all' || item.warehouse === filterLocation;
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="flex w-full min-h-screen bg-[#F5F1ED] overflow-hidden text-[#3D2B1F]">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showSearch={activeTab === 'inventory'}
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
        />

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">

            {activeTab === 'inventory' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D2B1F] mb-2">Inventory Overview</h2>
                    <p className="text-[#3D2B1F]/60">Monitor and manage hair stock across Strands Lagos locations.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white border border-[#3D2B1F]/10 text-[#3D2B1F] px-5 py-3 rounded-xl text-sm font-bold shadow-sm hover:bg-[#F5F1ED] transition-all"><Download className="w-4 h-4" /> Export CSV</button>
                    <button className="flex items-center gap-2 bg-[#3D2B1F] text-[#F5F1ED] px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-[#3D2B1F]/90 transition-all"><Plus className="w-5 h-5" /> Add Item</button>
                  </div>
                </div>

                <StatsOverview items={items} />

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="font-serif text-2xl font-bold text-[#3D2B1F]">Live Stock</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#3D2B1F]/10 shadow-sm mr-2">
                        <Building2 className="w-4 h-4 text-[#3D2B1F]/30" />
                        <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value as any)} className="text-xs font-bold outline-none bg-transparent">
                          <option value="all">All Locations</option>
                          <option value="Lagos Main">Lagos Main</option>
                          <option value="Ike Branch">Ike Branch</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#3D2B1F]/10 shadow-sm">
                        {(['all', 'wig', 'bundle'] as FilterType[]).map((type) => (
                          <button key={type} onClick={() => setFilterType(type)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors capitalize ${filterType === type ? 'bg-[#3D2B1F] text-[#F5F1ED]' : 'text-[#3D2B1F]/60 hover:text-[#3D2B1F]'}`}>
                            {type === 'all' ? 'All Hair' : type + 's'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <InventoryTable items={filteredItems} onEdit={(item) => console.log('Edit', item)} />
                </div>
              </div>
            )}

            {activeTab === 'logs' && <StockLogsView logs={logs} />}
            {activeTab === 'reports' && <ReportsView items={items} logs={logs} />}
            {activeTab === 'team' && <div className="p-8 bg-white rounded-3xl border border-[#3D2B1F]/10 font-serif">Team Access View Coming Soon</div>}

          </div>
        </div>
      </main>
    </div>
  );
}