import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, Calendar as CalendarIcon, Download, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onExport?: () => void;
  onBulkDelete?: (ids: string[]) => void;
}

export interface SearchFilters {
  query: string;
  modality: string[];
  dateFrom?: Date;
  dateTo?: Date;
  sortBy: 'relevance' | 'date' | 'frequency';
  minRelevance?: number;
}

export function AdvancedMemorySearch({ onSearch, onExport, onBulkDelete }: AdvancedSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedModalities, setSelectedModalities] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'frequency'>('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const modalities = [
    { value: 'text', label: 'Text' },
    { value: 'image', label: 'Image' },
    { value: 'audio', label: 'Audio' },
    { value: 'video', label: 'Video' },
  ];

  const handleSearch = () => {
    onSearch({
      query,
      modality: selectedModalities,
      dateFrom,
      dateTo,
      sortBy,
    });
  };

  const toggleModality = (modality: string) => {
    setSelectedModalities((prev) =>
      prev.includes(modality)
        ? prev.filter((m) => m !== modality)
        : [...prev, modality]
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Advanced Search</CardTitle>
          <CardDescription>Search and filter your multi-modal memory</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations, images, audio..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setShowFilters(!showFilters)} variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="space-y-4 pt-4 border-t">
              {/* Modality Filters */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Content Type</label>
                <div className="flex flex-wrap gap-2">
                  {modalities.map((modality) => (
                    <div key={modality.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={modality.value}
                        checked={selectedModalities.includes(modality.value)}
                        onCheckedChange={() => toggleModality(modality.value)}
                      />
                      <label
                        htmlFor={modality.value}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {modality.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !dateFrom && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">To Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !dateTo && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateTo ? format(dateTo, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateTo}
                        onSelect={setDateTo}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Sort Options */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="date">Date (Newest First)</SelectItem>
                    <SelectItem value="frequency">Access Frequency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Bulk Actions */}
          {selectedIds.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <span className="text-sm font-medium">
                {selectedIds.length} item{selectedIds.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                {onExport && (
                  <Button variant="outline" size="sm" onClick={onExport}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                )}
                {onBulkDelete && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onBulkDelete(selectedIds)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
