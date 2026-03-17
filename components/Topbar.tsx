'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Bell, LogOut, User as UserIcon, Package } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface TopbarProps {
    alerts: any[];
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    showSearch: boolean;
    isProfileOpen: boolean;
    setIsProfileOpen: (val: boolean) => void;
}

const Topbar = ({ alerts, searchQuery, setSearchQuery, showSearch, isProfileOpen, setIsProfileOpen }: TopbarProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAlertsOpen, setIsAlertsOpen] = useState(false); // NEW STATE FOR BELL

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = '/login';
    };

    return (
        <header className="bg-white border-b border-[#3D2B1F]/10 px-8 py-4 flex items-center justify-between">
            <div className="flex-1 max-w-md">
                {showSearch && (
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search inventory..."
                        className="w-full bg-[#F5F1ED] border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#3D2B1F]/20"
                    />
                )}
            </div>

            <div className="flex items-center gap-4">
                {/* NOTIFICATION BELL SECTION */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setIsAlertsOpen(!isAlertsOpen);
                            setIsProfileOpen(false); // Close profile if bell is clicked
                        }}
                        className="p-2.5 rounded-xl bg-[#F5F1ED] text-[#3D2B1F]/60 hover:bg-[#3D2B1F] hover:text-[#F5F1ED] transition-all relative"
                    >
                        <Bell className="w-5 h-5" />
                        {alerts.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FA8072] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                                {alerts.length}
                            </span>
                        )}
                    </button>

                    {/* ALERTS DROPDOWN */}
                    {isAlertsOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#3D2B1F]/10 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                            <div className="px-4 py-3 border-b border-[#3D2B1F]/5">
                                <h3 className="text-xs font-bold text-[#3D2B1F]/40 uppercase tracking-widest">Inventory Alerts</h3>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {alerts.length > 0 ? (
                                    alerts.map((item) => (
                                        <div key={item.id} className="px-4 py-3 hover:bg-[#F5F1ED]/50 transition-colors border-b border-[#3D2B1F]/5 last:border-0">
                                            <p className="text-sm font-bold text-[#3D2B1F]">{item.name}</p>
                                            <p className="text-[10px] font-bold text-red-500 uppercase mt-0.5">
                                                ONLY {item.quantity} LEFT • {item.warehouse}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-8 text-center">
                                        <Package className="w-8 h-8 text-[#3D2B1F]/10 mx-auto mb-2" />
                                        <p className="text-sm text-[#3D2B1F]/40">All stock levels healthy</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* PROFILE SECTION */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setIsProfileOpen(!isProfileOpen);
                            setIsAlertsOpen(false); // Close alerts if profile is clicked
                        }}
                        className="flex items-center gap-3 p-1 pr-4 rounded-full bg-[#F5F1ED] hover:bg-[#F5F1ED]/80 transition-all"
                    >
                        <div className="w-8 h-8 rounded-full bg-[#3D2B1F] flex items-center justify-center text-[#F5F1ED]">
                            <UserIcon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-[#3D2B1F]">Admin</span>
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#3D2B1F]/10 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                            <div className="px-4 py-3 border-b border-[#3D2B1F]/5">
                                <p className="text-xs text-[#3D2B1F]/40 uppercase tracking-widest font-bold">Logged in as</p>
                                <p className="text-sm font-bold text-[#3D2B1F] truncate">{user?.email || 'Loading...'}</p>
                            </div>
                            <div className="p-2">
                                <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Topbar;