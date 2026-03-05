"use client";

import { useCheckout } from "@/lib/CheckoutContext";
import { ShippingAddress } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  pinCode?: string;
  city?: string;
  state?: string;
}

function validate(form: ShippingAddress): FormErrors {
  const errors: FormErrors = {};

  if (!form.fullName.trim()) errors.fullName = "Full name is required";
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!form.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(form.phone)) {
    errors.phone = "Enter a valid 10-digit phone number";
  }
  if (!form.pinCode.trim()) {
    errors.pinCode = "PIN code is required";
  } else if (!/^\d{6}$/.test(form.pinCode)) {
    errors.pinCode = "Enter a valid 6-digit PIN code";
  }
  if (!form.city.trim()) errors.city = "City is required";
  if (!form.state.trim()) errors.state = "State is required";

  return errors;
}

export default function ShippingPage() {
  const router = useRouter();
  const { cartData, setShippingAddress } = useCheckout();

  const [form, setForm] = useState<ShippingAddress>({
    fullName: "",
    email: "",
    phone: "",
    pinCode: "",
    city: "",
    state: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  if (!cartData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="text-center bg-white rounded-2xl p-10 shadow-sm border border-green-100">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link
            href="/"
            className="text-green-700 font-semibold hover:text-green-800 underline underline-offset-4"
          >
            ← Go back to cart
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value });
      setErrors((prev) => ({
        ...prev,
        [name]: newErrors[name as keyof FormErrors] || undefined,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({
      ...prev,
      [name]: newErrors[name as keyof FormErrors] || undefined,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      pinCode: true,
      city: true,
      state: true,
    });

    if (Object.keys(validationErrors).length === 0) {
      setShippingAddress(form);
      router.push("/payment");
    }
  };

  const fields: {
    name: keyof ShippingAddress;
    label: string;
    type: string;
    placeholder: string;
    half?: boolean;
  }[] = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "John Doe",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "john@example.com",
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "9876543210",
    },
    {
      name: "pinCode",
      label: "PIN Code",
      type: "text",
      placeholder: "560001",
      half: true,
    },
    {
      name: "city",
      label: "City",
      type: "text",
      placeholder: "Bangalore",
      half: true,
    },
    { name: "state", label: "State", type: "text", placeholder: "Karnataka" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-linear-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <Image
              src="/favicon.ico"
              alt="Ecoyaan logo"
              width={28}
              height={28}
              className="inline-block"
            />{" "}
            Ecoyaan
          </Link>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
            Step 2 of 3
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-green-700 hover:text-green-800 font-medium mb-6 group"
        >
          <span className="mr-1 group-hover:-translate-x-0.5 transition-transform">
            ←
          </span>{" "}
          Back to Cart
        </Link>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Shipping Address</h2>
          <p className="text-gray-500 mt-1">
            Where should we deliver your order?
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-green-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={field.half ? "" : "sm:col-span-2"}
                >
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    {field.label} <span className="text-red-400">*</span>
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={field.placeholder}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none
                      ${
                        errors[field.name] && touched[field.name]
                          ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                          : "border-gray-200 bg-gray-50 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
                      }`}
                  />
                  {errors[field.name] && touched[field.name] && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <span>⚠</span> {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            id="continue-to-payment"
            type="submit"
            className="mt-8 w-full bg-linear-to-r from-green-600 to-emerald-600 text-white 
                       font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-green-200
                       hover:from-green-700 hover:to-emerald-700 hover:shadow-xl hover:shadow-green-300
                       active:scale-[0.98] transition-all duration-200 cursor-pointer text-sm"
          >
            Continue to Payment →
          </button>
        </form>
      </main>
    </div>
  );
}
