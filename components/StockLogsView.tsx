'use client';

import React from 'react';
import { Download, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { StockLogEntry } from '../types';

interface StockLogsViewProps {
    logs: StockLogEntry[];
}

const StockLogsView = ({ logs }: StockLogsViewProps) => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D2B1F] mb-2">Activity History</h2>
                    <p className="text-[#3D2B1F]/60">Track all stock additions, sales, and manual adjustments.</p>
                </div>
                <button className="flex items-center gap-2 bg-white border border-[#3D2B1F]/10 text-[#3D2B1F] px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-[#F5F1ED] transition-all active:scale-95">
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-[#3D2B1F]/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[900px]">
                        <thead className="bg-[#F5F1ED]/50 border-b border-[#3D2B1F]/10">
                            <tr>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Date & Time</th>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Product</th>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Change</th>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Stock Level</th>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Reason</th>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">User</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#3D2B1F]/5">
                            {[...logs].reverse().map((log) => (
                                <tr key={log.id} className="hover:bg-[#F5F1ED]/20 transition-colors">
                                    <td className="px-8 py-5 text-sm text-[#3D2B1F]/60">{log.timestamp}</td>
                                    <td className="px-8 py-5 font-medium text-[#3D2B1F]">{log.itemName}</td>
                                    <td className="px-8 py-5">
                                        <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md w-fit ${log.type === 'addition' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                                            }`}>
                                            {log.type === 'addition' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                                            {log.type === 'addition' ? '+' : '-'}{log.amount}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-serif">
                                        <span className="text-[#3D2B1F]/40">{log.previousQty}</span>
                                        <ChevronRight className="inline w-3 h-3 mx-1 text-[#3D2B1F]/20" />
                                        <span className="font-bold">{log.newQty}</span>
                                    </td>
                                    <td className="px-8 py-5 text-sm text-[#3D2B1F]/70 italic">{log.reason}</td>
                                    <td className="px-8 py-5 text-sm font-medium">{log.user}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StockLogsView;