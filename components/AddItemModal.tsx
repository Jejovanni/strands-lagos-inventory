'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { X, Check, ChevronDown, Plus } from 'lucide-react';
import { InventoryItem, ItemType, warehouses, styles, colours } from '@/lib/store';

interface AddItemModalProps {
  onAdd: (item: InventoryItem) => void;
}

export default function AddItemModal({ onAdd }: AddItemModalProps) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<ItemType>('wig');
  const [name, setName] = useState('');
  const [colour, setColour] = useState(colours[0]);
  const [length, setLength] = useState(20);
  const [style, setStyle] = useState(styles[0]);
  const [density, setDensity] = useState('180%');
  const [warehouse, setWarehouse] = useState(warehouses[0]);
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: InventoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      sku: `SL-${type === 'wig' ? 'W' : 'B'}-${style.substring(0, 2).toUpperCase()}-${colour.split(' ')[0]}-${length}-${density.replace('%', '').replace('g', '')}-${warehouse.split(' ').map(w => w[0]).join('')}`,
      type,
      name,
      colour,
      length,
      style,
      density,
      warehouse,
      quantity,
      dateAdded: new Date().toISOString(),
    };
    onAdd(newItem);
    setOpen(false);
    // Reset form
    setName('');
    setQuantity(1);
    setLength(20);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="bg-salmon hover:bg-salmon-hover text-coffee font-medium px-4 py-2 rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-5 h-5" />
          Add Item
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-coffee/40 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sand rounded-2xl shadow-xl w-[90vw] max-w-2xl max-h-[90vh] overflow-y-auto z-50 p-6">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="font-serif text-2xl font-bold text-coffee">
              Log New Inventory
            </Dialog.Title>
            <Dialog.Close className="text-coffee/60 hover:text-coffee transition-colors">
              <X className="w-6 h-6" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type Selection */}
            <div>
              <label className="block text-sm font-medium text-coffee/80 mb-2">Item Type</label>
              <RadioGroup.Root
                value={type}
                onValueChange={(v) => setType(v as ItemType)}
                className="flex gap-4"
              >
                <div className="flex items-center">
                  <RadioGroup.Item
                    value="wig"
                    id="r-wig"
                    className="w-5 h-5 rounded-full border-2 border-coffee/30 bg-white data-[state=checked]:border-salmon data-[state=checked]:bg-salmon outline-none cursor-pointer flex items-center justify-center"
                  >
                    <RadioGroup.Indicator className="w-2.5 h-2.5 rounded-full bg-coffee" />
                  </RadioGroup.Item>
                  <label htmlFor="r-wig" className="ml-2 text-coffee font-medium cursor-pointer">Wig</label>
                </div>
                <div className="flex items-center">
                  <RadioGroup.Item
                    value="bundle"
                    id="r-bundle"
                    className="w-5 h-5 rounded-full border-2 border-coffee/30 bg-white data-[state=checked]:border-salmon data-[state=checked]:bg-salmon outline-none cursor-pointer flex items-center justify-center"
                  >
                    <RadioGroup.Indicator className="w-2.5 h-2.5 rounded-full bg-coffee" />
                  </RadioGroup.Item>
                  <label htmlFor="r-bundle" className="ml-2 text-coffee font-medium cursor-pointer">Bundle(s)</label>
                </div>
              </RadioGroup.Root>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-coffee/80 mb-1">Product Name</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={type === 'wig' ? "e.g. Luxe Body Wave Frontal Wig" : "e.g. Platinum Blonde Straight Bundles"}
                className="w-full px-4 py-2 rounded-xl border border-coffee/20 bg-white focus:outline-none focus:ring-2 focus:ring-salmon focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Length */}
              <div>
                <label className="block text-sm font-medium text-coffee/80 mb-1">Length (inches)</label>
                <input
                  required
                  type="number"
                  min="8"
                  max="40"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-xl border border-coffee/20 bg-white focus:outline-none focus:ring-2 focus:ring-salmon focus:border-transparent"
                />
              </div>

              {/* Density / Weight */}
              <div>
                <label className="block text-sm font-medium text-coffee/80 mb-1">
                  {type === 'wig' ? 'Density (%)' : 'Weight (grams)'}
                </label>
                <input
                  required
                  type="text"
                  value={density}
                  onChange={(e) => setDensity(e.target.value)}
                  placeholder={type === 'wig' ? "180%" : "300g"}
                  className="w-full px-4 py-2 rounded-xl border border-coffee/20 bg-white focus:outline-none focus:ring-2 focus:ring-salmon focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Colour */}
              <div>
                <label className="block text-sm font-medium text-coffee/80 mb-1">Colour</label>
                <select
                  value={colour}
                  onChange={(e) => setColour(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-coffee/20 bg-white focus:outline-none focus:ring-2 focus:ring-salmon focus:border-transparent appearance-none"
                >
                  {colours.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Style */}
              <div>
                <label className="block text-sm font-medium text-coffee/80 mb-1">Style</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-coffee/20 bg-white focus:outline-none focus:ring-2 focus:ring-salmon focus:border-transparent appearance-none"
                >
                  {styles.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Warehouse */}
              <div>
                <label className="block text-sm font-medium text-coffee/80 mb-1">Warehouse</label>
                <select
                  value={warehouse}
                  onChange={(e) => setWarehouse(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-coffee/20 bg-white focus:outline-none focus:ring-2 focus:ring-salmon focus:border-transparent appearance-none"
                >
                  {warehouses.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-coffee/80 mb-1">Quantity</label>
                <input
                  required
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-xl border border-coffee/20 bg-white focus:outline-none focus:ring-2 focus:ring-salmon focus:border-transparent"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-coffee/10">
              <Dialog.Close asChild>
                <button type="button" className="px-6 py-2 rounded-xl text-coffee font-medium hover:bg-coffee/5 transition-colors">
                  Cancel
                </button>
              </Dialog.Close>
              <button type="submit" className="px-6 py-2 rounded-xl bg-coffee text-sand font-medium hover:bg-coffee-dark transition-colors">
                Save Item
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
