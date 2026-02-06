import { useState } from 'react';
import { Copy, Check, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface KeyRevealModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameKey: string;
  productTitle: string;
}

export function KeyRevealModal({ isOpen, onClose, gameKey, productTitle }: KeyRevealModalProps) {
  const [copied, setCopied] = useState(false);
  const [redeemed, setRedeemed] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(gameKey);
    setCopied(true);
    toast.success('Key copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMarkRedeemed = () => {
    setRedeemed(true);
    toast.success('Key marked as redeemed');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md glass border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-center">
            <span className="text-gradient text-2xl">🎮 Your Key is Ready!</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="text-center">
            <p className="text-muted-foreground mb-2">Game Key for</p>
            <p className="text-lg font-semibold text-foreground">{productTitle}</p>
          </div>

          {/* Key Display */}
          <div className="relative p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-center font-mono text-xl tracking-wider text-foreground select-all break-all">
              {gameKey}
            </p>
          </div>

          {/* Copy Button */}
          <Button 
            variant="buy" 
            className="w-full gap-2"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy to Clipboard
              </>
            )}
          </Button>

          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              variant={redeemed ? 'success' : 'outline'} 
              className="flex-1 gap-2"
              onClick={handleMarkRedeemed}
              disabled={redeemed}
            >
              {redeemed ? (
                <>
                  <Check className="h-4 w-4" />
                  Redeemed
                </>
              ) : (
                'Mark as Redeemed'
              )}
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <ExternalLink className="h-4 w-4" />
              Redeem Now
            </Button>
          </div>

          {/* Warning */}
          <div className="text-center text-xs text-muted-foreground">
            <p>Having issues? <button className="text-primary hover:underline">Report a problem</button></p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
