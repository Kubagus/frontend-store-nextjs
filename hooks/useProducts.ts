"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getProductById, getCategories } from "@/lib/api";
import { Product } from "@/types";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
}

export function useProduct(id: number) {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
