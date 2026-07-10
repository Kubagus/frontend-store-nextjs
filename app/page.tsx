import HomeClient from "@/components/home/HomeClient";
import { getAllProducts } from "@/lib/api";

// Force dynamic rendering - fetch on every request
export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    const products = await getAllProducts();
    return <HomeClient initialProducts={products} />;
  } catch (error) {
    return <HomeClient initialProducts={[]} />;
  }
}
