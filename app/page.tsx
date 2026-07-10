import HomeClient from "@/components/home/HomeClient";
import { getAllProducts } from "@/lib/api";

export default async function Home() {
  const products = await getAllProducts();

  return <HomeClient initialProducts={products} />;
}
