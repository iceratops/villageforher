exports.handler = async (event) => {
  try {
    const snipcartApiKey = process.env.SNIPCART_API_KEY;
    
    if (!snipcartApiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Snipcart API key not configured' })
      };
    }

    const response = await fetch('https://app.snipcart.com/api/orders', {
      headers: {
        'Authorization': `Bearer ${snipcartApiKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Snipcart API error: ${response.status}`);
    }

    const orders = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orders.items || [])
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch orders' })
    };
  }
}; 