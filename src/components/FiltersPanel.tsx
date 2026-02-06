import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { platforms, categories } from '@/data/mockData';
import { X, Filter } from 'lucide-react';

interface FiltersState {
  platform: string[];
  deliveryType: string[];
  minRating: number;
  priceRange: [number, number];
  verifiedOnly: boolean;
}

interface FiltersPanelProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  onClear: () => void;
}

export function FiltersPanel({ filters, onChange, onClear }: FiltersPanelProps) {
  const updateFilter = <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'platform' | 'deliveryType', value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    updateFilter(key, updated);
  };

  const hasFilters = filters.platform.length > 0 || 
                     filters.deliveryType.length > 0 || 
                     filters.minRating > 0 ||
                     filters.priceRange[0] > 0 ||
                     filters.priceRange[1] < 100 ||
                     filters.verifiedOnly;

  return (
    <div className="space-y-6 p-4 rounded-xl bg-card border border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-foreground">Filters</h3>
        </div>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onClear} className="text-xs text-muted-foreground hover:text-foreground">
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Platform */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Platform</h4>
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform) => (
            <Badge
              key={platform}
              variant={filters.platform.includes(platform) ? 'default' : 'outline'}
              className="cursor-pointer transition-colors"
              onClick={() => toggleArrayFilter('platform', platform)}
            >
              {platform}
            </Badge>
          ))}
        </div>
      </div>

      {/* Delivery Type */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Delivery</h4>
        <div className="flex flex-wrap gap-2">
          {['instant', 'manual', 'email'].map((type) => (
            <Badge
              key={type}
              variant={filters.deliveryType.includes(type) ? (type === 'instant' ? 'instant' : 'manual') : 'outline'}
              className="cursor-pointer capitalize transition-colors"
              onClick={() => toggleArrayFilter('deliveryType', type)}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-muted-foreground">Price Range</h4>
          <span className="text-sm text-foreground">
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </span>
        </div>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
          min={0}
          max={100}
          step={5}
          className="w-full"
        />
      </div>

      {/* Minimum Rating */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-muted-foreground">Min Rating</h4>
          <span className="text-sm text-foreground">
            {filters.minRating > 0 ? `${filters.minRating}+ ★` : 'Any'}
          </span>
        </div>
        <div className="flex gap-1">
          {[0, 4.0, 4.5, 4.7, 4.9].map((rating) => (
            <Button
              key={rating}
              variant={filters.minRating === rating ? 'default' : 'outline'}
              size="sm"
              className="flex-1 text-xs"
              onClick={() => updateFilter('minRating', rating)}
            >
              {rating === 0 ? 'Any' : `${rating}+`}
            </Button>
          ))}
        </div>
      </div>

      {/* Verified Only */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="verified"
          checked={filters.verifiedOnly}
          onCheckedChange={(checked) => updateFilter('verifiedOnly', checked as boolean)}
        />
        <label htmlFor="verified" className="text-sm cursor-pointer">
          Verified sellers only
        </label>
      </div>
    </div>
  );
}

export const defaultFilters: FiltersState = {
  platform: [],
  deliveryType: [],
  minRating: 0,
  priceRange: [0, 100],
  verifiedOnly: false,
};
