
import React from 'react';
import { X, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CartItem {
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (name: string, quantity: number) => void;
  onRemoveItem: (name: string) => void;
  language: string;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  language
}) => {
  const translations = {
    en: {
      cart: "Shopping Cart",
      empty: "Your cart is empty",
      total: "Total",
      checkout: "Proceed to Checkout",
      remove: "Remove",
      quantity: "Qty"
    },
    hi: {
      cart: "शॉपिंग कार्ट",
      empty: "आपकी कार्ट खाली है",
      total: "कुल",
      checkout: "चेकआउट करें",
      remove: "हटाएं",
      quantity: "मात्रा"
    },
    es: {
      cart: "Carrito de Compras",
      empty: "Tu carrito está vacío",
      total: "Total",
      checkout: "Proceder al Pago",
      remove: "Eliminar",
      quantity: "Cant"
    },
    fr: {
      cart: "Panier",
      empty: "Votre panier est vide",
      total: "Total",
      checkout: "Passer la Commande",
      remove: "Supprimer",
      quantity: "Qté"
    }
  };

  const t = translations[language] || translations.en;

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace('₹', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="fixed right-0 top-0 h-full w-96 bg-background shadow-xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            {t.cart}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{t.empty}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                        <p className="text-green-600 font-semibold">{item.price}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onUpdateQuantity(item.name, Math.max(1, item.quantity - 1))}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onUpdateQuantity(item.name, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onRemoveItem(item.name)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">{t.total}:</span>
              <span className="text-xl font-bold text-green-600">₹{calculateTotal().toLocaleString()}</span>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              {t.checkout}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
