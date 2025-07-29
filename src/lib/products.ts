import { fetchProducts } from './airtable';

export interface Product {
  id: string;
  [key: string]: any;
}

export async function fetchProductsVisible(): Promise<Product[]> {
  const products = await fetchProducts();
  return products.filter((p: any) => p['Visible on Site']);
}

export async function fetchProductByIdOrSlug(productId: string): Promise<Product | null> {
  const products = await fetchProducts();
  const found = products.find((p: any) => p['Slug'] === productId || p.id === productId);
  return found || null;
} 