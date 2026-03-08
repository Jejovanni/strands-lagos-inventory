'use client';

import React from 'react';
import {
    Search,
    Bell,
    UserCircle2,
    User,
    MapPin,
    Lock,
    LogOut
} from 'lucide-react';

interface TopbarProps {
    searchQuery: string;
    setSearchQuery: (s: string) => void;
    showSearch: boolean;
    isProfileOpen: boolean;
    setIsProfileOpen: (val: boolean) => void;
}

const Topbar = ({
    searchQuery,
    setSearchQuery,
    showSearch,
    isProfileOpen,
    setIsProfileOpen
}: TopbarProps) => {
    return (
        <header className="h-20 border-b border-[#3D2B1F]/10 bg-white/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0 relative z-50">
            {/* Search Bar - Only visible on Inventory Tab */}
            <div className={`relative w-96 transition-all duration-300 ${showSearch ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3D2B1F]/40" />
                <input
                    type="text"
                    placeholder="Search items or SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#3D2B1F]/10 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#FA8072]/50 focus:border-[#FA8072] transition-all shadow-sm text-sm"
                />
            </div>

            <div className="flex items-center gap-6">
                {/* Notifications */}
                <button className="relative p-2 text-[#3D2B1F]/60 hover:text-[#FA8072] transition-colors">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#FA8072] rounded-full border-2 border-white"></span>
                </button>

                {/* User Profile Trigger */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={`flex items-center gap-3 pl-6 border-l border-[#3D2B1F]/10 transition-all hover:opacity-80 ${isProfileOpen ? 'opacity-50' : ''}`}
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-[#3D2B1F]">Admin User</p>
                            <p className="text-[10px] uppercase tracking-tighter text-[#3D2B1F]/40 font-bold">Strands Lagos HQ</p>
                        </div>
                        <div className="relative">
                            <UserCircle2 className="w-10 h-10 text-[#3D2B1F]/20" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                    </button>

                    {/* Profile Dropdown Menu */}
                    {isProfileOpen && (
                        <>
                            <div className="fixed inset-0 z-[-1]" onClick={() => setIsProfileOpen(false)}></div>
                            <div className="absolute right-0 mt-4 w-64 bg-white rounded-2xl border border-[#3D2B1F]/10 shadow-2xl py-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                <div className="px-4 py-3 border-b border-[#3D2B1F]/5 mb-2">
                                    <p className="text-xs font-bold text-[#3D2B1F]/40 uppercase tracking-widest mb-1">Account</p>
                                    <p className="text-sm font-bold text-[#3D2B1F]">admin@strandslagos.com</p>
                                </div>
                                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#3D2B1F]/70 hover:bg-[#F5F1ED] hover:text-[#3D2B1F] transition-colors group">
                                    <User className="w-4 h-4 text-[#3D2B1F]/30 group-hover:text-[#FA8072]" />
                                    <span>My Profile</span>
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#3D2B1F]/70 hover:bg-[#F5F1ED] hover:text-[#3D2B1F] transition-colors group">
                                    <MapPin className="w-4 h-4 text-[#3D2B1F]/30 group-hover:text-[#FA8072]" />
                                    <span>Store Locations</span>
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#3D2B1F]/70 hover:bg-[#F5F1ED] hover:text-[#3D2B1F] transition-colors group">
                                    <Lock className="w-4 h-4 text-[#3D2B1F]/30 group-hover:text-[#FA8072]" />
                                    <span>Password & Security</span>
                                </button>
                                <div className="h-px bg-[#3D2B1F]/5 my-2"></div>
                                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors group font-bold">
                                    <LogOut className="w-4 h-4" />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Topbar;