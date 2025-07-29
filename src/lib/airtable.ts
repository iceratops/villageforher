export async function fetchProducts() {
  try {
    const response = await fetch('/.netlify/functions/getProducts');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function fetchProductById(productId: string) {
  try {
    const response = await fetch(`/.netlify/functions/getProducts?id=${productId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const products = await response.json();
    return products.find((product: any) => product.id === productId);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
} 