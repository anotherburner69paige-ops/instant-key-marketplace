import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Offer, Seller } from '@/types/marketplace';
import { Zap, Clock, Shield, Star, CreditCard } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getProductById, getSellerById } from '@/data/mockData';
import { toast } from 'sonner';

interface OfferRowProps {
  offer: Offer;
  expanded?: boolean;
  onSelect?: () => void;
}

export function OfferRow({ offer, expanded = false, onSelect }: OfferRowProps) {
  const seller = getSellerById(offer.sellerId);
  const product = getProductById(offer.productId);
  const { addItem } = useCart();

  if (!seller || !product) return null;

  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      offerId: offer.id,
      productId: offer.productId,
      price: offer.price,
      qty: 1,
      title: product.title,
      thumbnailUrl: product.thumbnailUrl,
      platform: product.platform,
      sellerName: seller.name,
    });
    toast.success('Added to cart', {
      description: `${product.title} from ${seller.name}`,
    });
  };

  return (
    <div 
      className={`group p-4 rounded-lg bg-card border border-border transition-all hover:border-primary/30 hover:bg-card-hover ${expanded ? 'ring-2 ring-primary' : ''}`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-4">
        {/* Seller Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-sm font-semibold">{seller.name[0]}</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-foreground truncate">{seller.name}</span>
                {offer.sellerBadge.includes('verified') && (
                  <Badge variant="verified" className="text-[10px] px-1.5">
                    <Shield className="h-3 w-3 mr-0.5" />
                    Verified
                  </Badge>
                )}
                {offer.sellerBadge.includes('top-seller') && (
                  <Badge variant="top-seller" className="text-[10px] px-1.5">
                    <Star className="h-3 w-3 mr-0.5" />
                    Top
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current text-warning" />
                  {offer.rating}
                </span>
                <span>•</span>
                <span>{seller.salesCount.toLocaleString()} sales</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery & Region */}
        <div className="hidden sm:flex flex-col items-center gap-1">
          {offer.deliveryType === 'instant' ? (
            <Badge variant="instant" className="gap-1">
              <Zap className="h-3 w-3" />
              Instant
            </Badge>
          ) : (
            <Badge variant="manual" className="gap-1">
              <Clock className="h-3 w-3" />
              ~{offer.etaMinutes}min
            </Badge>
          )}
          {offer.regionLock ? (
            <Badge variant="region" className="text-[10px]">{offer.regionLock}</Badge>
          ) : (
            <Badge variant="global" className="text-[10px]">Global</Badge>
          )}
        </div>

        {/* Payment Methods */}
        <div className="hidden md:flex items-center gap-1">
          {offer.paymentMethods.includes('card') && (
            <div className="w-8 h-5 rounded bg-muted flex items-center justify-center" title="Credit Card">
              <CreditCard className="h-3 w-3 text-muted-foreground" />
            </div>
          )}
          {offer.paymentMethods.includes('paypal') && (
            <div className="w-8 h-5 rounded bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground" title="PayPal">
              PP
            </div>
          )}
          {offer.paymentMethods.includes('crypto') && (
            <div className="w-8 h-5 rounded bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground" title="Crypto">
              ₿
            </div>
          )}
        </div>

        {/* Price & Buy */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xl font-bold text-primary neon-text">
              ${offer.price.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">{offer.stock} in stock</p>
          </div>
          <Button variant="buy" size="default" onClick={handleBuy} className="shrink-0">
            <Zap className="h-4 w-4" />
            Buy
          </Button>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-border animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Response Time</p>
              <p className="font-medium">{seller.responseTimeMinutes} min</p>
            </div>
            <div>
              <p className="text-muted-foreground">Delivery</p>
              <p className="font-medium capitalize">{offer.deliveryType}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Region</p>
              <p className="font-medium">{offer.regionLock || 'Global'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Stock</p>
              <p className="font-medium">{offer.stock} available</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
