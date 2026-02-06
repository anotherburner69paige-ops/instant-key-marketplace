import { Link } from 'react-router-dom';
import { TopNav } from '@/components/TopNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Shield } from 'lucide-react';

export default function Cart() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopNav />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
              <p className="text-muted-foreground">Start shopping to add items to your cart</p>
            </div>
            <Link to="/">
              <Button variant="buy" size="lg" className="gap-2">
                Browse Games
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />

      <main className="flex-1 container py-6">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid lg:grid-cols-[1fr,400px] gap-8">
          {/* Cart Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div 
                key={item.offerId}
                className="flex gap-4 p-4 rounded-xl bg-card border border-border"
              >
                {/* Thumbnail */}
                <Link to={`/product/${item.productId}`} className="shrink-0">
                  <div className="w-20 h-28 rounded-lg overflow-hidden border border-border">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge 
                        variant={item.platform.toLowerCase() as 'pc' | 'ps' | 'xbox' | 'nintendo'}
                        className="mb-1"
                      >
                        {item.platform}
                      </Badge>
                      <Link to={`/product/${item.productId}`}>
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        Sold by {item.sellerName}
                      </p>
                    </div>
                    <p className="text-xl font-bold text-primary neon-text shrink-0">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon-sm"
                        onClick={() => updateQuantity(item.offerId, item.qty - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.qty}</span>
                      <Button 
                        variant="outline" 
                        size="icon-sm"
                        onClick={() => updateQuantity(item.offerId, item.qty + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeItem(item.offerId)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="p-6 rounded-xl bg-card border border-border space-y-6">
              <h2 className="text-xl font-semibold text-foreground">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                  <span className="text-foreground">${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="text-foreground">$0.00</span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary neon-text">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Promo Code */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:border-primary/50"
                />
                <Button variant="outline" size="default">Apply</Button>
              </div>

              <Link to="/checkout" className="block">
                <Button variant="buy" size="xl" className="w-full gap-2">
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>

              <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
                <Shield className="h-4 w-4 text-verified" />
                <span>Secure checkout • Buyer protection</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
