# Village For Her

## Security: Cart, Pricing, and Checkout

- All product pricing, totals, and tax are calculated and displayed only by Snipcart’s secure cart and checkout UI.
- Never trust or display custom totals for products outside of Snipcart.
- All add-to-cart prices must come from your trusted database or CMS.
- For maximum security, set up a Snipcart webhook to validate prices server-side before charging the customer.

### Example: Snipcart Webhook (Node.js/Express)

```js
app.post('/snipcart-webhook', (req, res) => {
  const { eventName, content } = req.body;
  if (eventName === 'order.completed') {
    for (const item of content.items) {
      // Fetch canonical price from your DB
      const canonicalPrice = getProductPriceFromDB(item.id);
      if (item.price !== canonicalPrice) {
        // Flag or reject the order
        return res.status(400).send('Price mismatch');
      }
    }
  }
  res.status(200).send('OK');
});
```

- See Snipcart docs: https://docs.snipcart.com/webhooks 