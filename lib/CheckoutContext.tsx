"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { CartData, ShippingAddress } from "./types";

interface CheckoutContextType {
  cartData: CartData | null;
  setCartData: (data: CartData) => void;
  shippingAddress: ShippingAddress | null;
  setShippingAddress: (address: ShippingAddress) => void;
  getSubtotal: () => number;
  getGrandTotal: () => number;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined,
);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [shippingAddress, setShippingAddress] =
    useState<ShippingAddress | null>(null);

  const getSubtotal = () => {
    if (!cartData) return 0;
    return cartData.cartItems.reduce(
      (sum, item) => sum + item.product_price * item.quantity,
      0,
    );
  };

  const getGrandTotal = () => {
    if (!cartData) return 0;
    return getSubtotal() + cartData.shipping_fee - cartData.discount_applied;
  };

  return (
    <CheckoutContext.Provider
      value={{
        cartData,
        setCartData,
        shippingAddress,
        setShippingAddress,
        getSubtotal,
        getGrandTotal,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx)
    throw new Error("useCheckout must be used within a CheckoutProvider");
  return ctx;
}
