import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import { getProductById, getAllProducts } from "@/lib/api";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(Number(id)).catch(() => null);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.title} - TJermin Marketplace`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    id: String(product.id),
  }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(Number(id)).catch(() => null);
  if (!product) notFound();

  const allProducts = await getAllProducts();
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
