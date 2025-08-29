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
  console.log('Fetching product by ID or slug:', productId);
  console.log('Available products:', products.map(p => ({ id: p.id, slug: p['Slug'], name: p['Product Name'] })));
  
  const found = products.find((p: any) => p['Slug'] === productId || p.id === productId);
  console.log('Found product:', found);
  return found || null;
} 