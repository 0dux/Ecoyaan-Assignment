"use client";

import { useCheckout } from "@/lib/CheckoutContext";
import { CartData } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CartPage({ data }: { data: CartData }) {
  const router = useRouter();
  const { setCartData, getSubtotal, getGrandTotal, cartData } = useCheckout();

  useEffect(() => {
    setCartData(data);
  }, [data, setCartData]);

  const subtotal = cartData ? getSubtotal() : 0;
  const grandTotal = cartData ? getGrandTotal() : 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-linear-to-r from-green-700 via-green-400 to-emerald-600 bg-clip-text text-transparent">
            <Image
              src="/favicon.ico"
              alt="Ecoyaan logo"
              width={28}
              height={28}
              className="inline-block mr-1"
            />{" "}
            Ecoyaan
          </h1>
          <div className="flex items-center gap-2 text-sm text-green-700 font-medium">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
              Step 1 of 3
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Your Cart</h2>
          <p className="text-gray-500 mt-1">
            Review your eco-friendly selections
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {data.cartItems.map((item) => (
              <div
                key={item.product_id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-green-100 
                           hover:shadow-md hover:border-green-200 transition-all duration-300 
                           flex gap-4 items-center group"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-green-50 shrink-0">
                  <Image
                    unoptimized
                    src={item.image}
                    alt={item.product_name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                    {item.product_name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-bold text-green-700">
                    ₹
                    {(item.product_price * item.quantity).toLocaleString(
                      "en-IN",
                    )}
                  </p>
                  <p className="text-xs text-gray-400">
                    ₹{item.product_price} each
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Order Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">₹{data.shipping_fee}</span>
                </div>
                {data.discount_applied > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">
                      -₹{data.discount_applied}
                    </span>
                  </div>
                )}
                <hr className="border-green-100 my-2" />
                <div className="flex justify-between text-gray-900 text-base font-bold">
                  <span>Grand Total</span>
                  <span className="text-green-700">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                id="proceed-to-checkout"
                onClick={() => router.push("/shipping")}
                className="mt-6 w-full bg-linear-to-r from-green-600 to-emerald-600 text-white 
                           font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-green-200
                           hover:from-green-700 hover:to-emerald-700 hover:shadow-xl hover:shadow-green-300
                           active:scale-[0.98] transition-all duration-200 cursor-pointer text-sm"
              >
                Proceed to Checkout →
              </button>

              <p className="text-xs text-center text-gray-400 mt-4">
                🔒 Secure & Sustainable Checkout
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
