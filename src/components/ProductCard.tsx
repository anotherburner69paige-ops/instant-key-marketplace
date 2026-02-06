import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/marketplace';
import { Zap, Shield } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  showQuickBuy?: boolean;
}

const platformVariants: Record<Product['platform'], 'pc' | 'ps' | 'xbox' | 'nintendo'> = {
  PC: 'pc',
  PS: 'ps',
  XBOX: 'xbox',
  NINTENDO: 'nintendo',
};

export function ProductCard({ product, showQuickBuy = true }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative rounded-xl overflow-hidden bg-card border border-border card-glow transition-all duration-300 hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={product.thumbnailUrl}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* Platform Badge */}
          <Badge 
            variant={platformVariants[product.platform]} 
            className="absolute top-3 left-3"
          >
            {product.platform}
          </Badge>

          {/* Quick Buy Button */}
          {showQuickBuy && (
            <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <Button variant="buy" size="sm" className="w-full gap-2">
                <Zap className="h-4 w-4" />
                Quick Buy
              </Button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3 w-3 text-verified" />
            <span>Verified sellers</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs text-muted-foreground">From</p>
              <p className="text-xl font-bold text-primary neon-text">
                ${product.lowestPrice.toFixed(2)}
              </p>
            </div>
            <Badge variant="instant" className="text-[10px]">
              Instant
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}
