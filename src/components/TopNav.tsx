import { Search, ShoppingCart, User, Menu, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { categories, platforms } from '@/data/mockData';

export function TopNav() {
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border glass">
      <div className="container flex h-16 items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-neon flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">G</span>
          </div>
          <span className="text-xl font-bold text-foreground hidden sm:inline">GameKeys</span>
        </Link>

        {/* Categories Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-1 hidden md:flex">
              <Menu className="h-4 w-4" />
              Categories
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 glass">
            {categories.map((cat) => (
              <DropdownMenuItem key={cat.id} asChild>
                <Link to={`/search?category=${cat.id}`} className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  {cat.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Platform Pills */}
        <div className="hidden lg:flex items-center gap-1">
          {platforms.map((platform) => (
            <Link key={platform} to={`/search?platform=${platform}`}>
              <Button variant="ghost" size="sm" className="text-xs">
                {platform}
              </Button>
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search games, gift cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted border-border focus:border-primary/50 focus:ring-primary/20"
            />
          </div>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
            <User className="h-4 w-4" />
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
