'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { InventoryItem, StockLogEntry } from '@/app/page';

interface ReportsViewProps {
    items: InventoryItem[];
    logs: StockLogEntry[];
}

const ReportsView = ({ items, logs }: ReportsViewProps) => {
    const totalValue = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const values = [60, 40, 70, 45, 85, 100, 80];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D2B1F] mb-2">Performance Reports</h2>
                    <p className="text-[#3D2B1F]/60">Visual overview of activity trends and inventory health.</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-[#3D2B1F]/10 shadow-sm text-right">
                    <p className="text-[10px] uppercase font-bold text-[#3D2B1F]/40 tracking-widest mb-1">Total Inventory Value</p>
                    <p className="text-2xl font-serif font-bold text-[#FA8072]">₦{totalValue.toLocaleString()}</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#3D2B1F]/10 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-serif text-xl font-bold text-[#3D2B1F]">Weekly Activity</h3>
                    <ArrowUpRight className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-end justify-between h-64 gap-4 px-2">
                    {values.map((v, i) => (
                        <div key={days[i]} className="flex-1 flex flex-col items-center gap-4 group">
                            <div className="w-full relative h-full flex items-end">
                                <div className="absolute inset-0 bg-[#F5F1ED] rounded-xl mb-0 opacity-50"></div>
                                <div
                                    className="relative w-full bg-[#3D2B1F] rounded-xl transition-all duration-500 group-hover:bg-[#FA8072]"
                                    style={{ height: `${v}%` }}
                                ></div>
                            </div>
                            <span className="text-[10px] font-bold text-[#3D2B1F]/40 tracking-tighter">{days[i]}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-[#3D2B1F]">Item Performance</h3>
                <div className="bg-white rounded-3xl border border-[#3D2B1F]/10 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-[#F5F1ED]/50 border-b border-[#3D2B1F]/10">
                            <tr>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Product</th>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Current Stock</th>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Health</th>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider text-right">Potential Revenue</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#3D2B1F]/5">
                            {items.slice(0, 4).map(item => (
                                <tr key={item.id} className="hover:bg-[#F5F1ED]/20 transition-colors">
                                    <td className="px-8 py-5 font-medium text-[#3D2B1F]">{item.name}</td>
                                    <td className="px-8 py-5 font-bold font-serif">{item.quantity}</td>
                                    <td className="px-8 py-5">
                                        <div className="w-32 h-2 bg-[#F5F1ED] rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${item.quantity > 5 ? 'bg-green-500' : 'bg-[#FA8072]'}`}
                                                style={{ width: `${Math.min((item.quantity / 20) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right font-bold text-[#3D2B1F] font-serif">
                                        ₦{(item.price * item.quantity).toLocaleString()}
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

export default ReportsView;