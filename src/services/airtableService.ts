const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
const ACCESS_TOKEN = import.meta.env.VITE_AIRTABLE_ACCESS_TOKEN;

const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const headers = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
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