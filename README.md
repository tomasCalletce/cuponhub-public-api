# CuponHub Public API

A simple API to expose CuponHub coupons and offers to partners.

## Authentication

To get an auth token, please message **nilho.co**

Include the token in your requests:
```
Authorization: Bearer YOUR_TOKEN
```
or
```
Authorization: YOUR_TOKEN
```

## API Endpoints

### GET /entries

Get coupons and offers for a specific country.

**Parameters:**
- `limit` (optional): Number of entries to return (1-30, defaults to 10)
- `geo` (required): Country code (`mx`, `co`, `cl`, `ar`)

**Note:** Results are ranked by popularity. If you request `limit=10`, you'll get the top 10 most used entries from the latest 100 entries in the database.

**Example:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://cuponhub-public-api.vercel.app/entries?limit=10&geo=mx"
```

**Response:**
```json
{
  "message": "Entries retrieved successfully",
  "data": {
    "count": 10,
    "entries": [
      {
        "title": "Cupón Mercado Libre: aprovecha este descuento especial de $199 MXN",
        "description": "Este cupón aplica para compra a partir de $1,990 MXN. Consulta los términos y condiciones de esta promoción de Mercado Libre.",
        "cupon_code": "HOYES99",
        "icon_text": "$199 cupón",
        "target_link": "https://mercadolibre.com/affiliate-link",
        "type": "CUPON",
        "start_validity": "2025-09-09T06:00:00.000Z",
        "end_validity": null,
        "created_at": "2025-09-09T16:37:56.703Z",
        "updated_at": "2025-09-09T16:37:56.703Z",
        "last_used_at": "2025-09-14T23:05:21.065Z",
        "brand": {
          "name": "Mercado Libre",
          "image_url": "https://logo.clearbit.com/mercadolibre.com"
        }
      }
    ]
  }
}
```

**Field Descriptions:**
- `title`: Main description of the offer/coupon
- `description`: Additional details like terms and conditions
- `target_link`: URL to send users to (triggers affiliate tracking)
- `cupon_code`: Discount code for users to apply (CUPON type only)
- `icon_text`: Visual indicator text (CUPON type only)
- `brand.name`: Brand name of the entry
- `brand.image_url`: Brand logo URL

**Entry Types:**
- `CUPON`: Has `cupon_code` and `icon_text`
- `OFFER`: General offers without coupon codes

## Development

To develop locally:

```bash
pnpm install
pnpm run dev
```

Server runs on http://localhost:3000