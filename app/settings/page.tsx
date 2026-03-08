'use client';

import { useState } from 'react';
import {
    UserPlus,
    ShieldCheck,
    ShieldAlert,
    Shield,
    MoreVertical,
    Mail,
    Clock,
    Trash2,
    CheckCircle2
} from 'lucide-react';

// Types for Employee Management
export type EmployeeRole = 'admin' | 'editor' | 'viewer';

interface Employee {
    id: string;
    name: string;
    email: string;
    role: EmployeeRole;
    status: 'active' | 'pending';
    lastActive: string;
    avatar?: string;
}

const initialEmployees: Employee[] = [
    {
        id: '1',
        name: 'Admin User',
        email: 'admin@strandslagos.com',
        role: 'admin',
        status: 'active',
        lastActive: 'Now',
    },
    {
        id: '2',
        name: 'Sade Williams',
        email: 'sade@strandslagos.com',
        role: 'editor',
        status: 'active',
        lastActive: '2 hours ago',
    },
    {
        id: '3',
        name: 'Chioma Okoro',
        email: 'chioma@strandslagos.com',
        role: 'viewer',
        status: 'pending',
        lastActive: 'Never',
    },
];

export default function ManageUsers() {
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

    const getRoleIcon = (role: EmployeeRole) => {
        switch (role) {
            case 'admin': return <ShieldCheck className="w-4 h-4 text-salmon" />;
            case 'editor': return <Shield className="w-4 h-4 text-coffee/60" />;
            case 'viewer': return <Clock className="w-4 h-4 text-coffee/40" />;
        }
    };

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="font-serif text-4xl font-bold text-coffee mb-2">Team Access</h2>
                    <p className="text-coffee/60">Control permissions and manage staff access levels.</p>
                </div>
                <button className="flex items-center gap-2 bg-coffee text-sand px-6 py-3 rounded-xl font-medium hover:bg-coffee/90 transition-all shadow-lg active:scale-95">
                    <UserPlus className="w-5 h-5" />
                    Invite Member
                </button>
            </div>

            {/* Role Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Admins', count: 1, icon: <ShieldCheck className="text-salmon" /> },
                    { label: 'Editors', count: 1, icon: <Shield className="text-coffee/60" /> },
                    { label: 'Viewers', count: 1, icon: <Clock className="text-coffee/40" /> },
                ].map((card) => (
                    <div key={card.label} className="bg-white p-6 rounded-2xl border border-coffee/10 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm text-coffee/60 font-medium uppercase tracking-wider">{card.label}</p>
                            <p className="text-3xl font-serif font-bold text-coffee">{card.count}</p>
                        </div>
                        <div className="p-3 bg-sand rounded-xl">
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Employees Table */}
            <div className="bg-white rounded-3xl border border-coffee/10 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-sand/50 border-b border-coffee/10">
                        <tr>
                            <th className="px-8 py-5 text-sm font-serif font-bold text-coffee uppercase tracking-wider">Member</th>
                            <th className="px-8 py-5 text-sm font-serif font-bold text-coffee uppercase tracking-wider">Role</th>
                            <th className="px-8 py-5 text-sm font-serif font-bold text-coffee uppercase tracking-wider">Status</th>
                            <th className="px-8 py-5 text-sm font-serif font-bold text-coffee uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-coffee/5">
                        {employees.map((member) => (
                            <tr key={member.id} className="hover:bg-sand/20 transition-colors group">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-coffee/5 flex items-center justify-center font-bold text-coffee border border-coffee/10">
                                            {member.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-coffee">{member.name}</p>
                                            <p className="text-xs text-coffee/50 flex items-center gap-1">
                                                <Mail className="w-3 h-3" /> {member.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-sand rounded-full w-fit border border-coffee/5">
                                        {getRoleIcon(member.role)}
                                        <span className="text-xs font-bold text-coffee/70 capitalize">{member.role}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2">
                                        {member.status === 'active' ? (
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                                                <CheckCircle2 className="w-3.5 h-3.5" /> Active
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                                                <Clock className="w-3.5 h-3.5" /> Pending
                                            </span>
                                        )}
                                        <span className="text-[10px] text-coffee/40 uppercase font-medium">Last: {member.lastActive}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-sand rounded-lg text-coffee/60 transition-colors" title="Change Role">
                                            <ShieldAlert className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600 transition-colors" title="Remove Member">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-sand rounded-lg text-coffee/40">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Security Info Footer */}
            <div className="p-6 bg-salmon/5 rounded-2xl border border-salmon/10 flex gap-4 items-start">
                <ShieldCheck className="w-6 h-6 text-salmon shrink-0 mt-1" />
                <div>
                    <p className="text-sm font-bold text-coffee mb-1">Row Level Security (RLS) Active</p>
                    <p className="text-xs text-coffee/60 leading-relaxed">
                        All data modifications are governed by Supabase RLS policies. Admins can manage all records,
                        Editors can modify inventory but not delete, and Viewers have read-only access to HQ data.
                    </p>
                </div>
            </div>
        </div>
    );
}