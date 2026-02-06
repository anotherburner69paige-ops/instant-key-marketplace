import { Link } from 'react-router-dom';
import { TopNav } from '@/components/TopNav';
import { SearchBar } from '@/components/SearchBar';
import { ProductCard } from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { products, categories, platforms } from '@/data/mockData';
import { Zap, Shield, Clock, TrendingUp, ChevronRight, Gift, Gamepad2 } from 'lucide-react';

const Index = () => {
  const featuredProducts = products.slice(0, 4);
  const dealsProducts = products.slice(2, 8);

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Glow Effects */}
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]" />
          
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <Badge variant="verified" className="px-4 py-1.5">
                <Zap className="h-3 w-3 mr-1" />
                Instant Digital Delivery
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                <span className="text-foreground">Best Deals on</span>
                <br />
                <span className="text-gradient">Digital Game Keys</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Compare prices from verified sellers. Get your game key instantly. Save up to 90% on PC, PlayStation, Xbox & Nintendo games.
              </p>

              {/* Hero Search */}
              <div className="max-w-2xl mx-auto">
                <SearchBar size="large" />
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-verified" />
                  <span>Verified Sellers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-warning" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 border-t border-border/50">
          <div className="container">
            <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map((cat) => (
                <Link key={cat.id} to={`/search?category=${cat.id}`}>
                  <Button variant="cart" className="gap-2 whitespace-nowrap">
                    <span className="text-lg">{cat.icon}</span>
                    {cat.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Deals */}
        <section className="py-12">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Featured Deals</h2>
                  <p className="text-sm text-muted-foreground">Top selling games at the best prices</p>
                </div>
              </div>
              <Link to="/search">
                <Button variant="ghost" className="gap-1">
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Platform Sections */}
        <section className="py-12 border-t border-border/50">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <Gamepad2 className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Browse by Platform</h2>
                  <p className="text-sm text-muted-foreground">Find games for your favorite platform</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {platforms.map((platform) => (
                <Link key={platform} to={`/search?platform=${platform}`} className="group">
                  <div className="relative p-6 rounded-xl bg-card border border-border card-glow text-center transition-all hover:-translate-y-1">
                    <Badge 
                      variant={platform.toLowerCase() as 'pc' | 'ps' | 'xbox' | 'nintendo'} 
                      className="text-base px-4 py-1.5"
                    >
                      {platform}
                    </Badge>
                    <p className="mt-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {products.filter(p => p.platform === platform).length}+ games
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Hot Deals Grid */}
        <section className="py-12 border-t border-border/50">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-destructive/20 flex items-center justify-center">
                  <Gift className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Hot Right Now</h2>
                  <p className="text-sm text-muted-foreground">Limited time offers</p>
                </div>
              </div>
              <Link to="/search">
                <Button variant="ghost" className="gap-1">
                  See More <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {dealsProducts.map((product) => (
                <ProductCard key={product.id} product={product} showQuickBuy={false} />
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 border-t border-border/50">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold text-foreground">Why Choose Us?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center neon-glow">
                    <Zap className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Instant Delivery</h3>
                  <p className="text-sm text-muted-foreground">Get your game key instantly after payment. No waiting, just play.</p>
                </div>
                <div className="space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-verified/20 flex items-center justify-center">
                    <Shield className="h-7 w-7 text-verified" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Verified Sellers</h3>
                  <p className="text-sm text-muted-foreground">All sellers are verified. Your purchase is protected.</p>
                </div>
                <div className="space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-warning/20 flex items-center justify-center">
                    <TrendingUp className="h-7 w-7 text-warning" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Best Prices</h3>
                  <p className="text-sm text-muted-foreground">Compare prices from multiple sellers. Save up to 90%.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-neon flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">G</span>
              </div>
              <span className="text-lg font-bold text-foreground">GameKeys</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 GameKeys Marketplace. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link to="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link to="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/support" className="hover:text-foreground transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
