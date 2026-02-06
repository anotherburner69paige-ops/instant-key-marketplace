import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { TopNav } from '@/components/TopNav';
import { SearchBar } from '@/components/SearchBar';
import { ProductCard } from '@/components/ProductCard';
import { FiltersPanel, defaultFilters } from '@/components/FiltersPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products, getOffersByProductId } from '@/data/mockData';
import { ChevronLeft, SlidersHorizontal, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const platformParam = searchParams.get('platform') || '';
  const categoryParam = searchParams.get('category') || '';
  
  const [filters, setFilters] = useState({
    ...defaultFilters,
    platform: platformParam ? [platformParam] : [],
  });
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'name'>('price');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Text search
      if (query && !product.title.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      // Platform filter
      if (filters.platform.length > 0 && !filters.platform.includes(product.platform)) {
        return false;
      }

      // Category filter
      if (categoryParam && !product.categories.some(c => c.toLowerCase() === categoryParam)) {
        return false;
      }

      // Price range
      if (product.lowestPrice < filters.priceRange[0] || product.lowestPrice > filters.priceRange[1]) {
        return false;
      }

      // Delivery type & rating filters would check offers
      if (filters.deliveryType.length > 0 || filters.minRating > 0 || filters.verifiedOnly) {
        const offers = getOffersByProductId(product.id);
        const matchingOffers = offers.filter(offer => {
          if (filters.deliveryType.length > 0 && !filters.deliveryType.includes(offer.deliveryType)) {
            return false;
          }
          if (filters.minRating > 0 && offer.rating < filters.minRating) {
            return false;
          }
          if (filters.verifiedOnly && !offer.sellerBadge.includes('verified')) {
            return false;
          }
          return true;
        });
        if (matchingOffers.length === 0) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.lowestPrice - b.lowestPrice;
        case 'rating':
          return b.lowestPrice - a.lowestPrice; // Just for demo
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [query, filters, sortBy, categoryParam]);

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const activeFilterCount = [
    filters.platform.length > 0,
    filters.deliveryType.length > 0,
    filters.minRating > 0,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 100,
    filters.verifiedOnly,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />

      <main className="flex-1 container py-6">
        {/* Breadcrumb & Search */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">Search</span>
            {query && (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="text-primary">"{query}"</span>
              </>
            )}
          </div>
          
          <SearchBar initialQuery={query} />
        </div>

        <div className="flex gap-6">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FiltersPanel 
              filters={filters} 
              onChange={setFilters} 
              onClear={clearFilters}
            />
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-foreground">
                  {filteredProducts.length} Results
                </h1>
                {query && (
                  <Badge variant="outline" className="gap-1">
                    "{query}"
                    <Link to="/search" className="ml-1">
                      <X className="h-3 w-3" />
                    </Link>
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile Filter Toggle */}
                <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                      {activeFilterCount > 0 && (
                        <Badge variant="default" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                          {activeFilterCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 glass">
                    <div className="mt-6">
                      <FiltersPanel 
                        filters={filters} 
                        onChange={setFilters} 
                        onClear={clearFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground hidden sm:inline">Sort:</span>
                  <div className="flex gap-1">
                    {(['price', 'rating', 'name'] as const).map((sort) => (
                      <Button
                        key={sort}
                        variant={sortBy === sort ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSortBy(sort)}
                        className="capitalize"
                      >
                        {sort}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-4">No products found</p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
