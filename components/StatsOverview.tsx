'use client';

import React from 'react';
import { InventoryItem } from '@/app/page'; // We'll import the type from the main page

interface StatsOverviewProps {
    items: InventoryItem[];
}

const StatsOverview = ({ items }: StatsOverviewProps) => {
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const lowStockItems = items.filter(item => item.quantity > 0 && item.quantity <= 5).length;
    const totalValue = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalWigs = items.filter(item => item.type === 'wig').reduce((acc, item) => acc + item.quantity, 0);

    const stats = [
        { label: 'Units in Stock', value: totalItems, color: 'bg-[#FA8072]/10' },
        { label: 'Total Wigs', value: totalWigs, color: 'bg-[#3D2B1F]/5' },
        { label: 'Inventory Value', value: `₦${(totalValue / 1000).toFixed(0)}k`, color: 'bg-[#3D2B1F]/5' },
        { label: 'Low Stock', value: lowStockItems, color: 'bg-red-500/10', alert: lowStockItems > 0 },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className={`bg-white p-6 rounded-2xl shadow-sm border ${stat.alert ? 'border-red-200' : 'border-[#3D2B1F]/10'
                        } relative overflow-hidden group transition-all hover:border-[#FA8072]/30`}
                >
                    <div className={`absolute -right-6 -top-6 w-24 h-24 ${stat.color} rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
                    <p className={`text-sm font-medium uppercase tracking-wider mb-2 ${stat.alert ? 'text-red-500/80' : 'text-[#3D2B1F]/60'}`}>{stat.label}</p>
                    <p className={`font-serif text-3xl font-bold ${stat.alert ? 'text-red-500' : 'text-[#3D2B1F]'}`}>{stat.value}</p>
                </div>
            ))}
        </div>
    );
};

export default StatsOverview;