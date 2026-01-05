import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FilterGender, FilterStatus } from '@/types/employee';
import { Search, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';


interface SearchFilterProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    genderFilter: FilterGender;
    onGenderChange: (value: FilterGender) => void;
    statusFilter: FilterStatus;
    onStatusChange: (value: FilterStatus) => void;
    onClearFilters: () => void;
    hasActiveFilters: boolean;
}


function SearchFilter({
    searchTerm,
    onSearchChange,
    genderFilter,
    onGenderChange,
    statusFilter,
    onStatusChange,
    onClearFilters,
    hasActiveFilters,
}: SearchFilterProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 p-4 bg-card rounded-xl border border-border/50 shadow-sm">
            {/* Search */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9 input-focus"
                />
            </div>

            {/* Gender Filter */}
            <Select value={genderFilter} onValueChange={onGenderChange}>
                <SelectTrigger className="w-full sm:w-35">
                    <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All Genders</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={onStatusChange}>
                <SelectTrigger className="w-full sm:w-35">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
            </Select>

            {/* Clear Filters */}
            {hasActiveFilters && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClearFilters}
                    className="shrink-0"
                >
                    <X className="w-4 h-4" />
                </Button>
            )}
        </div>

    )
}

export default SearchFilter