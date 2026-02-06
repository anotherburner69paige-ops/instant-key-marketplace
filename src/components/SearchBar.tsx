import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  initialQuery?: string;
  size?: 'default' | 'large';
  placeholder?: string;
}

export function SearchBar({ initialQuery = '', size = 'default', placeholder = 'Search for games, gift cards, and more...' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const isLarge = size === 'large';

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground ${isLarge ? 'h-5 w-5' : 'h-4 w-4'}`} />
          <Input
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`${isLarge ? 'h-14 pl-12 text-lg' : 'h-10 pl-10'} bg-card border-border focus:border-primary/50 focus:ring-primary/20 rounded-xl`}
          />
        </div>
        <Button 
          type="submit" 
          variant="buy" 
          className={isLarge ? 'h-14 px-8 text-lg' : 'h-10 px-6'}
        >
          Search
        </Button>
      </div>
    </form>
  );
}
