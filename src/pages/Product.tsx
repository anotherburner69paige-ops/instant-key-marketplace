import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TopNav } from '@/components/TopNav';
import { OfferRow } from '@/components/OfferRow';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getProductById, getOffersByProductId, getSellerById } from '@/data/mockData';
import { ChevronLeft, Shield, Zap, TrendingDown, Info } from 'lucide-react';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const offers = getOffersByProductId(id || '');
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopNav />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
            <Link to="/">
              <Button variant="default">Go Home</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const lowestPrice = offers[0]?.price || 0;
  const averagePrice = offers.reduce((sum, o) => sum + o.price, 0) / offers.length;
  const instantOffers = offers.filter(o => o.deliveryType === 'instant');
  const verifiedOffers = offers.filter(o => o.sellerBadge.includes('verified'));

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />

      <main className="flex-1 container py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link to="/search" className="text-muted-foreground hover:text-foreground transition-colors">
            Games
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{product.title}</span>
        </div>

        <div className="grid lg:grid-cols-[1fr,400px] gap-8">
          {/* Left Column - Product Info */}
          <div className="space-y-8">
            {/* Product Header */}
            <div className="flex gap-6">
              <div className="w-48 shrink-0">
                <div className="aspect-[3/4] rounded-xl overflow-hidden border border-border">
                  <img
                    src={product.thumbnailUrl}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <Badge 
                    variant={product.platform.toLowerCase() as 'pc' | 'ps' | 'xbox' | 'nintendo'}
                    className="mb-2"
                  >
                    {product.platform}
                  </Badge>
                  <h1 className="text-3xl font-bold text-foreground">{product.title}</h1>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.categories.map((cat) => (
                    <Badge key={cat} variant="outline">{cat}</Badge>
                  ))}
                </div>

                <p className="text-muted-foreground">{product.description}</p>

                {/* Quick Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-verified">
                    <Shield className="h-4 w-4" />
                    <span>{verifiedOffers.length} verified sellers</span>
                  </div>
                  <div className="flex items-center gap-1 text-success">
                    <Zap className="h-4 w-4" />
                    <span>{instantOffers.length} instant delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Comparison Strip */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-success" />
                  Price Comparison
                </h3>
                <Badge variant="instant" className="gap-1">
                  <Zap className="h-3 w-3" />
                  {instantOffers.length} instant offers
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Lowest</p>
                  <p className="text-2xl font-bold text-primary neon-text">${lowestPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average</p>
                  <p className="text-2xl font-bold text-foreground">${averagePrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">You Save</p>
                  <p className="text-2xl font-bold text-success">
                    {Math.round(((averagePrice - lowestPrice) / averagePrice) * 100)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Offers List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  All Offers ({offers.length})
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <span>Sorted by price</span>
                </div>
              </div>

              <div className="space-y-3">
                {offers.map((offer) => (
                  <OfferRow 
                    key={offer.id} 
                    offer={offer}
                    expanded={selectedOffer === offer.id}
                    onSelect={() => setSelectedOffer(selectedOffer === offer.id ? null : offer.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Best Offer Summary */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <div className="p-6 rounded-xl bg-card border border-border neon-glow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Best Price</span>
                  <Badge variant="verified" className="gap-1">
                    <Shield className="h-3 w-3" />
                    Verified
                  </Badge>
                </div>

                <div className="text-center py-4">
                  <p className="text-5xl font-bold text-primary neon-text">
                    ${lowestPrice.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    from {getSellerById(offers[0]?.sellerId)?.name}
                  </p>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <Badge variant="instant" className="gap-1">
                      <Zap className="h-3 w-3" />
                      Instant
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Region</span>
                    <span className="text-foreground">{offers[0]?.regionLock || 'Global'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Stock</span>
                    <span className="text-foreground">{offers[0]?.stock} available</span>
                  </div>
                </div>

                <Button variant="buy" size="xl" className="w-full gap-2">
                  <Zap className="h-5 w-5" />
                  Buy Now
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Secure checkout • Instant delivery • Buyer protection
                </p>
              </div>
            </div>

            {/* Protection Info */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-verified shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground">Buyer Protection</p>
                  <p className="text-muted-foreground">
                    Full refund if key doesn't work. 24/7 support available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
