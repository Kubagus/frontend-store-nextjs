import { Metadata } from "next";
import ProductDetailClient from "@/components/product/ProductDetailClient";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Product #${id} - TJermin Marketplace`,
    description: "Product detail page",
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  return <ProductDetailClient productId={Number(id)} />;
}
