'use client';

import React, { useState } from 'react';
import {
    UserPlus,
    ShieldCheck,
    Shield,
    Clock,
    Mail,
    CheckCircle2,
    Trash2,
    ShieldAlert,
    MoreVertical
} from 'lucide-react';
import { Employee, EmployeeRole } from '../types';

const initialEmployees: Employee[] = [
    { id: '1', name: 'Admin User', email: 'admin@strandslagos.com', role: 'admin', status: 'active', lastActive: 'Now' },
    { id: '2', name: 'Sade Williams', email: 'sade@strandslagos.com', role: 'editor', status: 'active', lastActive: '2 hours ago' },
    { id: '3', name: 'Chioma Okoro', email: 'chioma@strandslagos.com', role: 'viewer', status: 'pending', lastActive: 'Never' },
];

const ManageUsers = () => {
    const [employees] = useState<Employee[]>(initialEmployees);

    const getRoleIcon = (role: EmployeeRole) => {
        switch (role) {
            case 'admin': return <ShieldCheck className="w-4 h-4 text-[#FA8072]" />;
            case 'editor': return <Shield className="w-4 h-4 text-[#3D2B1F]/60" />;
            case 'viewer': return <Clock className="w-4 h-4 text-[#3D2B1F]/40" />;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D2B1F] mb-2">Team Access</h2>
                    <p className="text-[#3D2B1F]/60">Control permissions and manage staff access levels.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-[#3D2B1F] text-[#F5F1ED] px-6 py-3 rounded-xl font-medium hover:bg-[#3D2B1F]/90 transition-all shadow-lg active:scale-95 whitespace-nowrap">
                    <UserPlus className="w-5 h-5" />
                    Invite Member
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-[#3D2B1F]/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-[#F5F1ED]/50 border-b border-[#3D2B1F]/10">
                            <tr>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Member</th>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Role</th>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider">Status</th>
                                <th className="px-8 py-5 text-sm font-serif font-bold text-[#3D2B1F] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#3D2B1F]/5">
                            {employees.map((member) => (
                                <tr key={member.id} className="hover:bg-[#F5F1ED]/20 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[#3D2B1F]/5 flex items-center justify-center font-bold text-[#3D2B1F] border border-[#3D2B1F]/10 shrink-0">
                                                {member.name.charAt(0)}
                                            </div>
                                            <div className="truncate">
                                                <p className="font-medium text-[#3D2B1F] truncate">{member.name}</p>
                                                <p className="text-xs text-[#3D2B1F]/50 flex items-center gap-1">
                                                    <Mail className="w-3 h-3" /> {member.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 px-3 py-1 bg-[#F5F1ED] rounded-full w-fit border border-[#3D2B1F]/5">
                                            {getRoleIcon(member.role)}
                                            <span className="text-xs font-bold text-[#3D2B1F]/70 capitalize">{member.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            {member.status === 'active' ? (
                                                <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-md">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Active
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                                                    <Clock className="w-3.5 h-3.5" /> Pending
                                                </span>
                                            )}
                                            <span className="text-[10px] text-[#3D2B1F]/40 uppercase font-bold tracking-tighter">Last: {member.lastActive}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-[#F5F1ED] rounded-lg text-[#3D2B1F]/60 transition-colors">
                                                <ShieldAlert className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-[#F5F1ED] rounded-lg text-[#3D2B1F]/40">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
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