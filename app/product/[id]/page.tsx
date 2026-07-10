import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import { getProductById, getAllProducts } from "@/lib/api";

// Force dynamic rendering - fetch on every request
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = await getProductById(Number(id));
    if (!product) return { title: "Product Not Found" };
    return {
      title: `${product.title} - TJermin Marketplace`,
      description: product.description,
    };
  } catch {
    return { title: "Product Not Found" };
  }
}

export default async function ProductPage({ params }: Props) {
  try {
    const { id } = await params;
    const product = await getProductById(Number(id));
    if (!product) notFound();

    const allProducts = await getAllProducts();
    const relatedProducts = allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

    return <ProductDetail product={product} relatedProducts={relatedProducts} />;
  } catch (error) {
    notFound();
  }
}
