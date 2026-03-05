import CartPage from "@/components/CartPage";
import { CartData } from "@/lib/types";

async function getCartData(): Promise<CartData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/cart`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch cart data");
  return res.json();
}

export default async function Home() {
  const data = await getCartData();
  return <CartPage data={data} />;
}
