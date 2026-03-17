'use client';

import React from 'react';
import { Package, MapPin, Edit2, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { InventoryItem } from '../types';

const formatCurrency = (amount: number): string => {
  if (amount >= 1_000_000_000) {
    // For Billions (B)
    return `₦${(amount / 1_000_000_000).toLocaleString(undefined, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    })}B`;
  } else if (amount >= 1_000_000) {
    // For Millions (M)
    return `₦${(amount / 1_000_000).toLocaleString(undefined, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    })}M`;
  }
  // Standard format for anything under a Million
  return `₦${amount.toLocaleString()}`;
};

interface InventoryTableProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
}

const InventoryTable = ({ items, onEdit }: InventoryTableProps) => {
  return (
    <div className="bg-white rounded-3xl border border-[#3D2B1F]/10 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[1000px]">
          <thead className="bg-[#F5F1ED]/50 border-b border-[#3D2B1F]/10">
            <tr>
              <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Product</th>
              <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">SKU</th>
              <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider text-right">Stock</th>
              <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Price</th>
              <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Status</th>
              <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3D2B1F]/5">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-[#F5F1ED]/20 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.type === 'wig' ? 'bg-[#FA8072]/10 text-[#FA8072]' : 'bg-[#3D2B1F]/10 text-[#3D2B1F]'
                      }`}>
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-[#3D2B1F]">{item.name}</p>
                      <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase text-[#FA8072] tracking-tighter">
                        <MapPin className="w-2.5 h-2.5" /> {item.warehouse}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm font-mono text-[#3D2B1F]/60 tracking-tighter">{item.sku}</td>
                <td className="px-8 py-5 text-right font-bold text-lg font-serif">{item.quantity}</td>
                <td className="px-8 py-5 text-sm font-bold font-serif">
                  {formatCurrency(item.price)}
                </td>
                <td className="px-8 py-5">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${item.quantity === 0 ? 'bg-red-50 text-red-600' :
                      item.quantity <= 5 ? 'bg-[#FA8072]/10 text-[#FA8072]' :
                        'bg-green-50 text-green-600'
                    }`}>
                    {item.quantity === 0 ? <X className="w-3 h-3" /> :
                      item.quantity <= 5 ? <AlertTriangle className="w-3 h-3" /> :
                        <CheckCircle2 className="w-3 h-3" />}
                    {item.quantity === 0 ? 'Out' : item.quantity <= 5 ? 'Low' : 'In'}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 hover:bg-[#3D2B1F]/5 rounded-lg text-[#3D2B1F]/40 hover:text-[#3D2B1F] transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;