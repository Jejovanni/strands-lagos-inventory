'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { TrendingUp, TrendingDown, ChevronRight, User } from 'lucide-react';
import { StockLogEntry } from '../types';

const StockLogsView = () => {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        const { data, error } = await supabase
            .from('stock_logs')
            .select(`
        *,
        profiles (full_name)
      `)
            .order('created_at', { ascending: false });

        if (!error && data) setLogs(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    if (loading) return <div className="p-8 font-serif">Loading history...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className="font-serif text-3xl font-bold text-[#3D2B1F]">Activity History</h2>

            <div className="bg-white rounded-3xl border border-[#3D2B1F]/10 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#F5F1ED]/50 border-b border-[#3D2B1F]/10">
                        <tr>
                            <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Date</th>
                            <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Product</th>
                            <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Change</th>
                            <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Staff Member</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3D2B1F]/5">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-[#F5F1ED]/20 transition-colors">
                                <td className="px-8 py-5 text-sm text-[#3D2B1F]/60">
                                    {new Date(log.created_at).toLocaleString()}
                                </td>
                                <td className="px-8 py-5 font-medium text-[#3D2B1F]">{log.itemName}</td>
                                <td className="px-8 py-5">
                                    <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md w-fit ${log.type === 'addition' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                                        }`}>
                                        {log.type === 'addition' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                        {log.amount}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-sm flex items-center gap-2">
                                    <User size={14} className="text-[#3D2B1F]/30" />
                                    {log.profiles?.full_name || 'System'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockLogsView;