'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { InventoryItem } from '../types';

interface ItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (item: Partial<InventoryItem> & { logReason?: string }) => void;
    initialData?: InventoryItem;
}

const generateSKU = (name: string): string => {
    if (!name) return '';
    const words = name.toUpperCase().split(/\s+/).filter(Boolean);
    
    let textWords: string[] = [];
    let numbers = '';
    
    words.forEach(word => {
        const numMatch = word.match(/\d+/g);
        if (numMatch) {
            numbers += numMatch.join('');
        }
        const textMatch = word.replace(/[^A-Z]/g, '');
        if (textMatch) {
            textWords.push(textMatch);
        }
    });

    let part1 = textWords.length > 0 ? textWords[0].substring(0, 3) : '';
    let part2 = textWords.length > 1 ? textWords.slice(1).map(w => w[0]).join('') : '';
    
    const maxNumbers = numbers.length > 0 ? Math.min(numbers.length, 2) : 0;
    let availableForPart2 = 7 - part1.length - maxNumbers;
    if (availableForPart2 < 0) availableForPart2 = 0;
    
    part2 = part2.substring(0, availableForPart2);
    
    let availableForNumbers = 7 - part1.length - part2.length;
    numbers = numbers.substring(0, availableForNumbers);
    
    const parts = [part1, part2, numbers].filter(Boolean);
    return parts.join('-');
};

const ItemModal = ({ isOpen, onClose, onSave, initialData }: ItemModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        type: 'wig' as 'wig' | 'bundle',
        quantity: 0,
        price: 0,
        warehouse: 'Lagos Main' as 'Lagos Main' | 'Ike Branch',
        logReason: ''
    });

    const [isSkuDirty, setIsSkuDirty] = useState(false);

    useEffect(() => {
        if (initialData && isOpen) {
            setFormData({
                name: initialData.name,
                sku: initialData.sku,
                type: initialData.type,
                quantity: initialData.quantity,
                price: initialData.price,
                warehouse: initialData.warehouse,
                logReason: ''
            });
            setIsSkuDirty(true);
        } else if (isOpen) {
            setFormData({ name: '', sku: '', type: 'wig', quantity: 0, price: 0, warehouse: 'Lagos Main', logReason: '' });
            setIsSkuDirty(false);
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3D2B1F]/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-serif text-2xl font-bold text-[#3D2B1F]">
                        {initialData ? 'Edit Inventory' : 'Add New Inventory'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-[#F5F1ED] rounded-full transition-colors">
                        <X className="w-5 h-5 text-[#3D2B1F]/40" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-[#3D2B1F]/60 uppercase mb-1">Item Name</label>
                        <input
                            required
                            value={formData.name}
                            onChange={e => {
                                const newName = e.target.value;
                                setFormData(prev => ({
                                    ...prev,
                                    name: newName,
                                    ...(!isSkuDirty ? { sku: generateSKU(newName) } : {})
                                }));
                            }}
                            className="w-full p-3 rounded-xl border border-[#3D2B1F]/10 focus:ring-2 focus:ring-[#FA8072]/20 outline-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-[#3D2B1F]/60 uppercase mb-1">SKU</label>
                            <input
                                required
                                value={formData.sku}
                                onChange={e => {
                                    setFormData(prev => ({ ...prev, sku: e.target.value.toUpperCase() }));
                                    setIsSkuDirty(true);
                                }}
                                className="w-full p-3 rounded-xl border border-[#3D2B1F]/10 focus:ring-2 focus:ring-[#FA8072]/20 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#3D2B1F]/60 uppercase mb-1">Type</label>
                            <select
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                                className="w-full p-3 rounded-xl border border-[#3D2B1F]/10 outline-none bg-white"
                            >
                                <option value="wig">Wig</option>
                                <option value="bundle">Bundle</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-[#3D2B1F]/60 uppercase mb-1">Warehouse</label>
                            <select
                                value={formData.warehouse}
                                onChange={e => setFormData({ ...formData, warehouse: e.target.value as any })}
                                className="w-full p-3 rounded-xl border border-[#3D2B1F]/10 outline-none bg-white"
                            >
                                <option value="Lagos Main">Lagos Main</option>
                                <option value="Ike Branch">Ike Branch</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#3D2B1F]/60 uppercase mb-1">Quantity</label>
                            <input
                                type="number"
                                required
                                value={formData.quantity}
                                onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                                className="w-full p-3 rounded-xl border border-[#3D2B1F]/10 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-[#3D2B1F]/60 uppercase mb-1">Selling Price (₦)</label>
                        <input
                            type="number"
                            required
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                            className="w-full p-3 rounded-xl border border-[#3D2B1F]/10 focus:ring-2 focus:ring-[#FA8072]/20 outline-none"
                        />
                    </div>

                    {initialData && (
                        <div>
                            <label className="block text-xs font-bold text-[#3D2B1F]/60 uppercase mb-1">Reason for Change</label>
                            <input
                                placeholder="e.g., Sale, Restock, Damage..."
                                value={formData.logReason}
                                onChange={e => setFormData({ ...formData, logReason: e.target.value })}
                                className="w-full p-3 rounded-xl border border-[#3D2B1F]/10 focus:ring-2 focus:ring-[#FA8072]/20 outline-none text-sm"
                            />
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 text-[#3D2B1F]/60 font-medium border border-[#3D2B1F]/10 rounded-xl hover:bg-[#F5F1ED] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-[#3D2B1F] text-[#F5F1ED] font-bold rounded-xl hover:bg-[#3D2B1F]/90 transition-all active:scale-95 shadow-lg shadow-[#3D2B1F]/20"
                        >
                            {initialData ? 'Update Item' : 'Save Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ItemModal;