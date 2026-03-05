"use client";

import { useCheckout } from "@/lib/CheckoutContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const { cartData, shippingAddress, getSubtotal, getGrandTotal } =
    useCheckout();

  if (!cartData || !shippingAddress) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="text-center bg-white rounded-2xl p-10 shadow-sm border border-green-100">
          <p className="text-gray-600 mb-4">Missing checkout information.</p>
          <Link
            href="/"
            className="text-green-700 font-semibold hover:text-green-800 underline underline-offset-4"
          >
            ← Start over
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const grandTotal = getGrandTotal();

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-linear-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            🌿 Ecoyaan
          </Link>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
            Step 3 of 3
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link
          href="/shipping"
          className="inline-flex items-center text-sm text-green-700 hover:text-green-800 font-medium mb-6 group"
        >
          <span className="mr-1 group-hover:-translate-x-0.5 transition-transform">
            ←
          </span>{" "}
          Back to Shipping
        </Link>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Review & Pay</h2>
          <p className="text-gray-500 mt-1">
            Confirm your order details before payment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Address Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">
                📦 Shipping Address
              </h3>
              <Link
                href="/shipping"
                className="text-xs text-green-600 hover:text-green-700 font-medium"
              >
                Edit
              </Link>
            </div>
            <div className="space-y-1.5 text-sm text-gray-600">
              <p className="font-semibold text-gray-800">
                {shippingAddress.fullName}
              </p>
              <p>{shippingAddress.email}</p>
              <p>{shippingAddress.phone}</p>
              <p>
                {shippingAddress.city}, {shippingAddress.state} —{" "}
                {shippingAddress.pinCode}
              </p>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
            <h3 className="text-base font-bold text-gray-900 mb-4">
              🧾 Order Summary
            </h3>
            <div className="space-y-3">
              {cartData.cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600 truncate mr-4">
                    {item.product_name}{" "}
                    <span className="text-gray-400">× {item.quantity}</span>
                  </span>
                  <span className="font-medium text-gray-800 shrink-0">
                    ₹
                    {(item.product_price * item.quantity).toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>
              ))}
              <hr className="border-green-100" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>₹{cartData.shipping_fee}</span>
              </div>
              {cartData.discount_applied > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-₹{cartData.discount_applied}</span>
                </div>
              )}
              <hr className="border-green-100" />
              <div className="flex justify-between font-bold text-base text-gray-900">
                <span>Total</span>
                <span className="text-green-700">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="mt-8 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-green-100">
          <h3 className="text-base font-bold text-gray-900 mb-2">💳 Payment</h3>
          <p className="text-sm text-gray-500 mb-6">
            This is a simulated payment. No real charges will be made.
          </p>

          <button
            id="pay-securely"
            onClick={() => router.push("/success")}
            className="w-full bg-linear-to-r from-green-600 to-emerald-600 text-white 
                       font-semibold py-4 px-6 rounded-xl shadow-lg shadow-green-200
                       hover:from-green-700 hover:to-emerald-700 hover:shadow-xl hover:shadow-green-300
                       active:scale-[0.98] transition-all duration-200 cursor-pointer text-base"
          >
            🔒 Pay Securely — ₹{grandTotal.toLocaleString("en-IN")}
          </button>
        </div>
      </main>
    </div>
  );
}
