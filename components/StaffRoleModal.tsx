'use client';

import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

export interface StaffMember {
    id: string;
    name: string;
    email: string;
    role: string;
    location: string;
    status: string;
}

interface StaffRoleModalProps {
    member: StaffMember | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (id: string, newRole: string, newStatus: string) => void;
}

export default function StaffRoleModal({ member, open, onOpenChange, onSave }: StaffRoleModalProps) {
    const [role, setRole] = useState(member?.role || '');
    const [status, setStatus] = useState(member?.status || '');

    if (!member) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(member.id, role, status);
        onOpenChange(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-coffee/40 backdrop-blur-sm z-40" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sand rounded-2xl shadow-xl w-[90vw] max-w-md z-50 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <Dialog.Title className="font-serif text-2xl font-bold text-coffee">
                            Edit Permissions
                        </Dialog.Title>
                        <Dialog.Close className="text-coffee/60 hover:text-coffee transition-colors">
                            <X className="w-6 h-6" />
                        </Dialog.Close>
                    </div>

                    <div className="mb-6 p-4 bg-coffee/5 rounded-xl border border-coffee/10">
                        <p className="font-medium text-coffee">{member.name}</p>
                        <p className="text-sm text-coffee/60">{member.email}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-coffee/80 mb-2">Role & Permissions</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-4 py-2 rounded-xl border border-coffee/20 bg-white focus:outline-none focus:ring-2 focus:ring-salmon focus:border-transparent appearance-none"
                            >
                                <option value="Admin">Admin (Full Access)</option>
                                <option value="Manager">Manager (Manage Inventory & Staff)</option>
                                <option value="Inventory Clerk">Inventory Clerk (Log & View Only)</option>
                                <option value="Viewer">Viewer (Read Only)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-coffee/80 mb-2">Account Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-4 py-2 rounded-xl border border-coffee/20 bg-white focus:outline-none focus:ring-2 focus:ring-salmon focus:border-transparent appearance-none"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="pt-4 flex justify-end gap-3 border-t border-coffee/10">
                            <Dialog.Close asChild>
                                <button type="button" className="px-6 py-2 rounded-xl text-coffee font-medium hover:bg-coffee/5 transition-colors">
                                    Cancel
                                </button>
                            </Dialog.Close>
                            <button type="submit" className="px-6 py-2 rounded-xl bg-coffee text-sand font-medium hover:bg-coffee-dark transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
