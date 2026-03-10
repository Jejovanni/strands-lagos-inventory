'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowUpRight } from 'lucide-react';
import { InventoryItem } from '../types';

const ReportsView = ({ items }: { items: InventoryItem[] }) => {
    const [weeklyActivity, setWeeklyActivity] = useState<number[]>(new Array(7).fill(0));
    const totalValue = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const fetchWeeklyStats = async () => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const { data, error } = await supabase
            .from('stock_logs')
            .select('created_at')
            .gte('created_at', sevenDaysAgo.toISOString());

        if (!error && data) {
            const counts = new Array(7).fill(0);
            data.forEach(log => {
                const dayIndex = new Date(log.created_at).getDay();
                // Adjust index so today is the last bar
                counts[dayIndex] += 1;
            });
            setWeeklyActivity(counts);
        }
    };

    useEffect(() => { fetchWeeklyStats(); }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header with Total Value */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="font-serif text-3xl font-bold text-[#3D2B1F] mb-2">Performance Reports</h2>
                    <p className="text-[#3D2B1F]/60">Live inventory health and activity trends.</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-[#3D2B1F]/10 shadow-sm text-right">
                    <p className="text-[10px] uppercase font-bold text-[#3D2B1F]/40 tracking-widest mb-1">Total Inventory Value</p>
                    <p className="text-2xl font-serif font-bold text-[#FA8072]">₦{totalValue.toLocaleString()}</p>
                </div>
            </div>

            {/* Live Weekly Activity Chart */}
            <div className="bg-white p-8 rounded-3xl border border-[#3D2B1F]/10 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-[#3D2B1F] mb-8">Weekly Activity</h3>
                <div className="flex items-end justify-between h-64 gap-4 px-2">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, i) => (
                        <div key={day} className="flex-1 flex flex-col items-center gap-4 group">
                            <div className="w-full relative h-full flex items-end">
                                <div className="absolute inset-0 bg-[#F5F1ED] rounded-xl opacity-50"></div>
                                <div
                                    className="relative w-full bg-[#3D2B1F] rounded-xl transition-all duration-500 group-hover:bg-[#FA8072]"
                                    style={{ height: `${Math.min((weeklyActivity[i] / 20) * 100, 100)}%` }}
                                ></div>
                            </div>
                            <span className="text-[10px] font-bold text-[#3D2B1F]/40">{day}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReportsView;