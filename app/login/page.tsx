'use client';

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push('/'); // Redirect to dashboard on success
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F1ED] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-[#3D2B1F]/10 p-10 space-y-8">
                <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-[#FA8072] rounded-2xl mx-auto flex items-center justify-center text-white font-serif font-bold text-3xl shadow-lg">S</div>
                    <h1 className="font-serif text-3xl font-bold text-[#3D2B1F]">Strands Lagos</h1>
                    <p className="text-[#3D2B1F]/60 text-sm">Internal Inventory Management</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl font-medium">
                            {error}
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-[#3D2B1F]/40 tracking-widest ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3D2B1F]/20" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@strandslagos.com"
                                className="w-full pl-12 pr-4 py-3.5 bg-[#F5F1ED]/50 border border-[#3D2B1F]/10 rounded-xl focus:ring-2 focus:ring-[#FA8072]/20 focus:border-[#FA8072] outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-[#3D2B1F]/40 tracking-widest ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3D2B1F]/20" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-3.5 bg-[#F5F1ED]/50 border border-[#3D2B1F]/10 rounded-xl focus:ring-2 focus:ring-[#FA8072]/20 focus:border-[#FA8072] outline-none transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-[#3D2B1F] text-[#F5F1ED] font-bold rounded-xl hover:bg-[#3D2B1F]/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#3D2B1F]/20 disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Access Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
}