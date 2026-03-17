'use client';
import { supabase } from '../lib/supabase';
import React, { useState, useEffect } from 'react';
import { Plus, Building2, Download } from 'lucide-react';

// Modularized Components from root /components
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import StatsOverview from '../components/StatsOverview';
import ReportsView from '../components/ReportsView';
import StockLogsView from '../components/StockLogsView';
import InventoryTable from '../components/InventoryTable';
import ManageUsers from '../components/ManageUsers';
import ItemModal from '../components/ItemModal';

// Centralized Types from root /types.ts
import { ActiveTab, InventoryItem, StockLogEntry, FilterType } from '../types';

// --- Initial Data ---
const initialInventory: InventoryItem[] = [
  { id: '1', name: 'Brazilian Silk Straight', sku: 'WIG-BS-001', type: 'wig', quantity: 12, price: 85000, status: 'in-stock', warehouse: 'Novare Store' },
  { id: '2', name: 'Peruvian Deep Wave 14"', sku: 'BUN-PDW-14', type: 'bundle', quantity: 3, price: 45000, status: 'low-stock', warehouse: 'Pearl Garden Main' },
  { id: '3', name: 'Frontal Closure Wig 18"', sku: 'WIG-FCW-18', type: 'wig', quantity: 0, price: 120000, status: 'out-of-stock', warehouse: 'Novare Store' },
  { id: '4', name: 'Mink Body Wave Bundles', sku: 'BUN-MBW-03', type: 'bundle', quantity: 25, price: 35000, status: 'in-stock', warehouse: 'Novare Store' },
];
export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inventory');
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [logs] = useState<StockLogEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterLocation, setFilterLocation] = useState<'all' | 'Novare Store' | 'Pearl Garden Main'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const lowStockAlerts = items.filter(item => item.quantity <= 5 && item.quantity > 0);
  const outOfStockAlerts = items.filter(item => item.quantity === 0);

  // 1. Create the fetch function
  const fetchInventory = async () => {
    setLoading(true);

    // 1. Start the query
    let query = supabase
      .from('products')
      .select('*')
      .order('name', { ascending: true });

    // 2. Apply Search Filter (if text exists)
    if (searchQuery) {
      // This searches both Name and SKU at the same time
      query = query.or(`name.ilike.%${searchQuery}%,sku.ilike.%${searchQuery}%`);
    }

    // 3. Apply Category Filter (Wig vs Bundle)
    if (filterType !== 'all') {
      query = query.eq('type', filterType);
    }

    // 4. Apply Location Filter
    if (filterLocation !== 'all') {
      query = query.eq('warehouse', filterLocation);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching inventory:', error);
    } else {
      setItems(data as InventoryItem[]);
    }
    setLoading(false);
  };

  // 2. Trigger fetch on mount
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchInventory();
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, filterType, filterLocation]);

  const handleSaveItem = async (data: Partial<InventoryItem> & { logReason?: string }) => {
    const { logReason, id, status, ...productData } = data;

    try {
      if (editingItem) {
        // Direct call to our new database function
        const { error } = await supabase.rpc('update_inventory_item', {
          p_id: editingItem.id,
          p_name: productData.name,
          p_sku: productData.sku,
          p_type: productData.type,
          p_quantity: Number(productData.quantity),
          p_price: Number(productData.price),
          p_warehouse: productData.warehouse,
          p_reason: logReason || 'Manual Adjustment'
        });

        if (error) throw error;
      } else {
        // New items are still handled by the simple insert + trigger
        const { error } = await supabase
          .from('products')
          .insert([{
            ...productData,
            quantity: Number(productData.quantity) || 0
          }]);
        if (error) throw error;
      }

      await fetchInventory();
      setIsAddModalOpen(false);
      setEditingItem(null);
    } catch (error: any) {
      console.error('Strands Lagos Save Error:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

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
          alerts={[...lowStockAlerts, ...outOfStockAlerts]}
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
                    <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 bg-[#3D2B1F] text-[#F5F1ED] px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-[#3D2B1F]/90 transition-all"><Plus className="w-5 h-5" /> Add Item</button>
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
                          <option value="Novare Store">Novare Store</option>
                          <option value="Pearl Garden Main">Pearl Garden Main</option>
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
                  <InventoryTable items={items} onEdit={setEditingItem} />
                </div>
              </div>
            )}
            {activeTab === 'logs' && <StockLogsView />}
            {activeTab === 'reports' && <ReportsView items={items} />}
            {activeTab === 'team' && <ManageUsers />}
          </div>
        </div>
      </main>

      <ItemModal
        isOpen={isAddModalOpen || !!editingItem}
        onClose={() => { setIsAddModalOpen(false); setEditingItem(null); }}
        onSave={handleSaveItem}
        initialData={editingItem || undefined}
      />
    </div>
  );
}