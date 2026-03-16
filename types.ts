import { LucideIcon } from 'lucide-react';

export type ActiveTab = 'inventory' | 'team' | 'logs' | 'reports';

export type InventoryItem = {
    id: string;
    name: string;
    sku: string;
    type: 'wig' | 'bundle';
    quantity: number;
    price: number;
    status: 'in-stock' | 'low-stock' | 'out-of-stock';
    warehouse: 'Novare Store' | 'Pearl Garden Main';
};

export type StockLogEntry = {
    id: string;
    itemId: string;
    itemName: string;
    type: 'addition' | 'reduction' | 'adjustment';
    amount: number;
    previousQty: number;
    newQty: number;
    reason: string;
    timestamp: string;
    user: string;
};

export type FilterType = 'all' | 'wig' | 'bundle';
export type EmployeeRole = 'admin' | 'editor' | 'viewer';

export interface Employee {
    id: string;
    name: string;
    email: string;
    role: EmployeeRole;
    status: 'active' | 'pending';
    lastActive: string;
}