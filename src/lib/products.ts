import { AirtableService } from './airtable';

export interface Product {
  id: string;
  [key: string]: any;
}

export async function fetchProductsVisible(): Promise<Product[]> {
  const products = await AirtableService.fetchProducts();
  return products.filter((p: any) => p['Visible on Site']);
}

export async function fetchProductByIdOrSlug(productId: string): Promise<Product | null> {
  const products = await AirtableService.fetchProducts();
  const found = products.find((p: any) => p['Slug'] === productId || p.id === productId);
  return found || null;
} 