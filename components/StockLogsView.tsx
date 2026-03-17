'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { TrendingUp, TrendingDown, Clock, User, Package } from 'lucide-react';

const StockLogsView = () => {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    
    const fetchLogs = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('stock_logs')
            .select(`
                *,
                profiles!created_by (
                full_name
                )
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching logs:', error.message);
        } else {
            setLogs(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    if (loading) return <div className="p-8 font-serif animate-pulse">Loading activity history...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D2B1F] mb-2">Activity History</h2>
                <p className="text-[#3D2B1F]/60">Every stock movement across Novare and Pearl Garden stores.</p>
            </div>

            <div className="bg-white rounded-3xl border border-[#3D2B1F]/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-[#F5F1ED]/50 border-b border-[#3D2B1F]/10">
                            <tr>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Time</th>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Product</th>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Change</th>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Staff Member</th>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Reason</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#3D2B1F]/5">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-[#F5F1ED]/20 transition-colors">
                                    <td className="px-8 py-5 text-sm text-[#3D2B1F]/60 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3 h-3" />
                                            {new Date(log.created_at).toLocaleString('en-NG', {
                                                dateStyle: 'medium',
                                                timeStyle: 'short'
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 font-bold text-[#3D2B1F]">
                                            <Package className="w-4 h-4 text-[#3D2B1F]/20" />
                                            {log.item_name} {/* Ensure it's item_name, not itemName */}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${log.type === 'addition' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                                            }`}>
                                            {log.type === 'addition' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                            {log.type === 'addition' ? '+' : '-'}{log.amount}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                            <div className="w-6 h-6 rounded-full bg-[#3D2B1F]/5 flex items-center justify-center text-[10px] text-[#3D2B1F]/40 border border-[#3D2B1F]/10">
                                                <User className="w-3 h-3" />
                                            </div>
                                            {log.profiles?.full_name || 'Unknown Staff'}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-sm text-[#3D2B1F]/60 italic font-serif">
                                        {log.reason || 'Manual Adjustment'}
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

export default StockLogsView;