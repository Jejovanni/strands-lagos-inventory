import { FilterType } from '@/app/page';

interface CategoryFiltersProps {
    currentFilter: FilterType;
    setFilter: (filter: FilterType) => void;
}

export default function CategoryFilters({ currentFilter, setFilter }: CategoryFiltersProps) {
    const options: { label: string; value: FilterType }[] = [
        { label: 'All', value: 'all' },
        { label: 'Wigs', value: 'wig' },
        { label: 'Bundles', value: 'bundle' },
    ];

    return (
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-coffee/10 shadow-sm">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    onClick={() => setFilter(opt.value)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentFilter === opt.value ? 'bg-coffee text-sand' : 'text-coffee/60 hover:text-coffee'
                        }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}