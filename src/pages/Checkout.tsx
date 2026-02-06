import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '@/components/TopNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { KeyRevealModal } from '@/components/KeyRevealModal';
import { CreditCard, Shield, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type CheckoutStep = 'review' | 'payment' | 'confirmation';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<CheckoutStep>('review');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [deliveredKey, setDeliveredKey] = useState('');

  if (items.length === 0 && step !== 'confirmation') {
    navigate('/cart');
    return null;
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a mock key
    const mockKey = 'XXXX-YYYY-ZZZZ-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    setDeliveredKey(mockKey);
    
    setIsProcessing(false);
    setStep('confirmation');
    setShowKeyModal(true);
    
    toast.success('Payment successful!', {
      description: 'Your game key has been delivered.',
    });
    
    clearCart();
  };

  const steps = [
    { id: 'review', label: 'Review' },
    { id: 'payment', label: 'Payment' },
    { id: 'confirmation', label: 'Confirmation' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />

      <main className="flex-1 container py-6 max-w-4xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className={`flex items-center gap-2 ${
                s.id === step ? 'text-primary' : 
                steps.findIndex(st => st.id === step) > i ? 'text-success' : 'text-muted-foreground'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  s.id === step ? 'bg-primary text-primary-foreground' :
                  steps.findIndex(st => st.id === step) > i ? 'bg-success text-success-foreground' : 'bg-muted'
                }`}>
                  {steps.findIndex(st => st.id === step) > i ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className="font-medium hidden sm:inline">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-12 sm:w-24 h-0.5 mx-2 ${
                  steps.findIndex(st => st.id === step) > i ? 'bg-success' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {step === 'review' && (
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-2xl font-bold text-foreground text-center">Review Your Order</h1>

            <div className="p-6 rounded-xl bg-card border border-border space-y-4">
              {items.map((item) => (
                <div key={item.offerId} className="flex items-center gap-4">
                  <div className="w-16 h-20 rounded-lg overflow-hidden border border-border">
                    <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">Qty: {item.qty}</p>
                  </div>
                  <p className="font-semibold text-foreground">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary neon-text">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button variant="buy" size="xl" className="w-full" onClick={() => setStep('payment')}>
              Continue to Payment
            </Button>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-2xl font-bold text-foreground text-center">Payment Method</h1>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Payment Methods */}
              <div className="p-6 rounded-xl bg-card border border-border space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    <div className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                      paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'
                    }`} onClick={() => setPaymentMethod('card')}>
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-3">
                        <CreditCard className="h-5 w-5" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    
                    <div className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                      paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'
                    }`} onClick={() => setPaymentMethod('paypal')}>
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        PayPal
                      </Label>
                    </div>
                    
                    <div className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                      paymentMethod === 'crypto' ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'
                    }`} onClick={() => setPaymentMethod('crypto')}>
                      <RadioGroupItem value="crypto" id="crypto" />
                      <Label htmlFor="crypto" className="flex-1 cursor-pointer">
                        Cryptocurrency
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 pt-4 border-t border-border animate-fade-in">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="mt-1" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="p-6 rounded-xl bg-card border border-border space-y-4">
                <h3 className="font-semibold text-foreground">Order Summary</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span>$0.00</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold text-primary neon-text">${total.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 text-sm">
                  <Shield className="h-4 w-4 text-verified" />
                  <span className="text-muted-foreground">Buyer protection included</span>
                </div>
              </div>
            </div>

            <Button 
              variant="buy" 
              size="xl" 
              className="w-full gap-2"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Pay ${total.toFixed(2)}</>
              )}
            </Button>
          </div>
        )}

        {step === 'confirmation' && (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="w-20 h-20 mx-auto rounded-full bg-success/20 flex items-center justify-center">
              <Check className="h-10 w-10 text-success" />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Order Complete!</h1>
              <p className="text-muted-foreground">Your game key has been delivered instantly.</p>
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="buy" onClick={() => setShowKeyModal(true)}>
                View Key
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </main>

      <KeyRevealModal
        isOpen={showKeyModal}
        onClose={() => setShowKeyModal(false)}
        gameKey={deliveredKey}
        productTitle={items[0]?.title || 'Your Game'}
      />
    </div>
  );
}
