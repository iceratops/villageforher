import { AIRTABLE_CONFIG } from '../config/airtable';

const API_URL = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.TABLE_NAME}`;

const headers = {
  Authorization: `Bearer ${AIRTABLE_CONFIG.ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
};

export const AirtableService = {
  async fetchProducts() {
    const res = await fetch(API_URL, { headers });
    if (!res.ok) throw new Error('Failed to fetch products from Airtable');
    const data = await res.json();
    return data.records.map((record: any) => ({ id: record.id, ...record.fields }));
  },

  async fetchProductById(id: string) {
    const res = await fetch(`${API_URL}/${id}`, { headers });
    if (!res.ok) throw new Error('Failed to fetch product from Airtable');
    const data = await res.json();
    return { id: data.id, ...data.fields };
  },

  async updateProductStock(id: string, newStock: number, lowStockAlert?: boolean) {
    const body: any = { fields: { 'Stock Count': newStock } };
    if (typeof lowStockAlert === 'boolean') body.fields['Low Stock Alert'] = lowStockAlert;
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('Failed to update product stock in Airtable');
    return await res.json();
  },
}; 