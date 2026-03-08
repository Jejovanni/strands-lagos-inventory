'use client';

import React, { useState } from 'react';
import {
    Package,
    Users,
    History,
    BarChart3,
    X,
    Menu,
    ChevronRight,
    LogOut
} from 'lucide-react';

// Define the tab type here so the Sidebar knows what it's handling
export type ActiveTab = 'inventory' | 'team' | 'logs' | 'reports';

interface SidebarProps {
    activeTab: ActiveTab;
    onTabChange: (tab: ActiveTab) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const menuItems = [
        { id: 'inventory', label: 'Inventory', icon: Package },
        { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
        { id: 'logs', label: 'Activity Log', icon: History },
        { id: 'team', label: 'Team Access', icon: Users },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-[#3D2B1F] text-[#F5F1ED] rounded-full shadow-2xl"
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'
                } fixed lg:relative lg:translate-x-0 z-40 w-72 h-screen bg-white border-r border-[#3D2B1F]/10 transition-transform duration-300 flex flex-col`}>
                <div className="p-8 border-b border-[#3D2B1F]/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FA8072] rounded-xl flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg shadow-[#FA8072]/20">S</div>
                        <div>
                            <h1 className="font-serif font-bold text-xl text-[#3D2B1F] leading-tight">Strands</h1>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#FA8072] font-bold">Lagos Inventory</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                    <p className="px-4 mb-4 text-[10px] uppercase tracking-widest text-[#3D2B1F]/40 font-bold">Management</p>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onTabChange(item.id as ActiveTab)}
                                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${isActive ? 'bg-[#F5F1ED] text-[#3D2B1F] shadow-sm' : 'text-[#3D2B1F]/50 hover:bg-[#F5F1ED]/50 hover:text-[#3D2B1F]'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#FA8072]' : 'group-hover:text-[#FA8072]'} transition-colors`} />
                                    <span className={`text-sm font-semibold ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
                                </div>
                                {isActive && <ChevronRight className="w-4 h-4 text-[#FA8072]" />}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-[#3D2B1F]/5">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#3D2B1F]/40 hover:text-red-500 transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;