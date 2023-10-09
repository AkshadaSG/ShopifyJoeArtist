// cart.tsx
import React, { useState, useEffect } from 'react';
import Client from 'shopify-buy';

const shopifyClient = Client.buildClient({
  storefrontAccessToken: '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',
  domain: 'akshadatest.myshopify.com',
});

interface CartItem {
  id: string;
  title: string;
  variantId: string;
  price: number;
  quantity: number;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the initial cart data when the component mounts
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const checkout = await shopifyClient.checkout.create();
      setCart(checkout.lineItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (variantId: string, quantity: number) => {
    try {
      setLoading(true);
      const updatedCart = await shopifyClient.checkout.addLineItems(cart[0].id, [{ variantId, quantity }]);
      setCart(updatedCart.lineItems);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (variantId: string) => {
    try {
      setLoading(true);
      const updatedCart = await shopifyClient.checkout.removeLineItems(cart[0].id, [variantId]);
      setCart(updatedCart.lineItems);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="cart-notification-button">
      <h2>Shopping Cart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.title} - ${item.price} x {item.quantity}
              <button onClick={() => removeFromCart(item.variantId)}>Removekkkkkkk</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
