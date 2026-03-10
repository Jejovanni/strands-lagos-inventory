'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, ShieldCheck, Shield, Clock, CheckCircle2, Trash2, MoreVertical, ShieldAlert } from 'lucide-react';
import { Employee, EmployeeRole } from '../types';

const ManageUsers = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEmployees = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            // Mapping Supabase data to our Employee type
            const formatted = data.map(p => ({
                id: p.id,
                name: p.full_name || 'New Member',
                email: p.email,
                role: p.role as EmployeeRole,
                status: 'active' as const, // In a real app, you'd check last_sign_in_at
                lastActive: 'Online'
            }));
            setEmployees(formatted);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const updateRole = async (id: string, newRole: EmployeeRole) => {
        const { error } = await supabase
            .from('profiles')
            .update({ role: newRole })
            .eq('id', id);

        if (!error) fetchEmployees();
    };

    if (loading) return <div className="p-8 font-serif">Loading team...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D2B1F] mb-2">Team Access</h2>
                    <p className="text-[#3D2B1F]/60">Manage permissions for Strands Lagos staff.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#3D2B1F]/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-[#F5F1ED]/50 border-b border-[#3D2B1F]/10">
                            <tr>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Member</th>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Role</th>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#3D2B1F]/5">
                            {employees.map((member) => (
                                <tr key={member.id} className="hover:bg-[#F5F1ED]/20 transition-colors group">
                                    <td className="px-8 py-5 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#FA8072]/10 flex items-center justify-center font-bold text-[#FA8072] border border-[#FA8072]/20 uppercase">
                                            {member.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-[#3D2B1F]">{member.name}</p>
                                            <p className="text-xs text-[#3D2B1F]/50 flex items-center gap-1"><Mail className="w-3 h-3" /> {member.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <select
                                            value={member.role}
                                            onChange={(e) => updateRole(member.id, e.target.value as EmployeeRole)}
                                            className="bg-[#F5F1ED] text-xs font-bold text-[#3D2B1F]/70 px-3 py-1 rounded-full border border-[#3D2B1F]/5 outline-none cursor-pointer"
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="editor">Editor</option>
                                            <option value="viewer">Viewer</option>
                                        </select>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button className="p-2 hover:bg-red-50 rounded-lg text-red-400 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
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

export default ManageUsers;