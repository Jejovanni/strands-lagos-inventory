export type ItemType = 'bundle' | 'wig';

export interface InventoryItem {
  id: string;
  sku: string;
  type: ItemType;
  name: string;
  colour: string;
  length: number; // in inches
  style: string;
  density: string; // e.g., '150%', '200g'
  warehouse: string;
  quantity: number;
  dateAdded: string;
}

export const initialInventory: InventoryItem[] = [
  {
    id: '1',
    sku: 'SL-W-BW-1B-24-180-LHQ',
    type: 'wig',
    name: 'Luxe Body Wave Frontal Wig',
    colour: '1B (Natural Black)',
    length: 24,
    style: 'Body Wave',
    density: '180%',
    warehouse: 'Lagos HQ',
    quantity: 12,
    dateAdded: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '2',
    sku: 'SL-B-ST-613-30-300-ABJ',
    type: 'bundle',
    name: 'Platinum Blonde Straight Bundles (3pcs)',
    colour: '613 (Blonde)',
    length: 30,
    style: 'Straight',
    density: '300g',
    warehouse: 'Abuja Branch',
    quantity: 5,
    dateAdded: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: '3',
    sku: 'SL-W-DW-99J-20-200-LHQ',
    type: 'wig',
    name: 'Burgundy Deep Wave Closure Wig',
    colour: '99J (Burgundy)',
    length: 20,
    style: 'Deep Wave',
    density: '200%',
    warehouse: 'Lagos HQ',
    quantity: 8,
    dateAdded: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

export const warehouses = ['Lagos HQ', 'Abuja Branch', 'Port Harcourt Hub'];
export const styles = ['Straight', 'Body Wave', 'Deep Wave', 'Water Wave', 'Kinky Curly', 'Yaki Straight'];
export const colours = ['1B (Natural Black)', '2 (Dark Brown)', '4 (Light Brown)', '27 (Honey Blonde)', '613 (Blonde)', '99J (Burgundy)', 'Custom Color'];
