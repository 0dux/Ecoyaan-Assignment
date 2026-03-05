"use client";

import { useCheckout } from "@/lib/CheckoutContext";
import Link from "next/link";

export default function SuccessPage() {
  const { getGrandTotal, shippingAddress } = useCheckout();
  const grandTotal = getGrandTotal();

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-green-100 max-w-md w-full text-center">
        {/* Animated Checkmark */}
        <div className="mx-auto w-20 h-20 rounded-full bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-6 animate-bounce-in shadow-lg shadow-green-200">
          <svg
            className="w-10 h-10 text-white animate-draw-check"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
              style={{
                strokeDasharray: 24,
                strokeDashoffset: 0,
              }}
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order Successful!
        </h1>
        <p className="text-gray-500 mb-6">
          Thank you for choosing sustainable products. 🌍
        </p>

        <div className="bg-green-50 rounded-xl p-4 mb-6">
          {grandTotal > 0 && (
            <p className="text-sm text-gray-600 mb-1">
              Amount Paid:{" "}
              <span className="font-bold text-green-700 text-lg">
                ₹{grandTotal.toLocaleString("en-IN")}
              </span>
            </p>
          )}
          {shippingAddress && (
            <p className="text-xs text-gray-400 mt-2">
              Delivering to{" "}
              <span className="font-medium text-gray-600">
                {shippingAddress.fullName}
              </span>
              , {shippingAddress.city}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-1">
            Order ID: #ECO-
            {Math.random().toString(36).substring(2, 8).toUpperCase()}
          </p>
        </div>

        <Link
          href="/"
          className="inline-block w-full bg-linear-to-r from-green-600 to-emerald-600 text-white 
                     font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-green-200
                     hover:from-green-700 hover:to-emerald-700 hover:shadow-xl hover:shadow-green-300
                     active:scale-[0.98] transition-all duration-200 text-sm"
        >
          Continue Shopping 🛍️
        </Link>
      </div>
    </div>
  );
}
