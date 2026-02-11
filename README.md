# Paintings Catalog

A simple, responsive catalog for paintings with contact information. Built with vanilla HTML, CSS, and JavaScript.

## Structure

- **Page 1 (index.html)**: Contact section at top, scroll hint, and catalog of available paintings
- **Page 2 (sold.html)**: Sold paintings (no prices displayed)

## Running Locally

Because the catalog loads data from `paintings.json`, you need to serve the project over HTTP (file:// won't work due to browser security).

**Option 1 – Python:**
```bash
cd PaintingsCatalog
python3 -m http.server 8000
```
Then open http://localhost:8000

**Option 2 – Node.js (npx serve):**
```bash
cd PaintingsCatalog
npx serve
```

## Customizing Content

### Paintings

Edit `paintings.json` to add or update paintings:

```json
{
  "id": "4",
  "name": "Your Painting Name",
  "image": "images/your-image.jpg",
  "size": "80 × 60 cm",
  "technique": "Oil on canvas",
  "material": "Canvas",
  "year": "2024",
  "price": "€450",
  "status": "available"
}
```

- **status**: `"available"` (shown on catalog page with price) or `"sold"` (shown on sold page, no price)
- **image**: Path relative to project root. Add your image files to the `images/` folder.

### Contact Info

Update the `contact` object in `paintings.json`:

```json
{
  "contact": {
    "email": "your@email.com",
    "phone": "+1 234 567 890",
    "address": "Your address",
    "social": [
      { "name": "Instagram", "url": "https://instagram.com/yourprofile" },
      { "name": "Facebook", "url": "https://facebook.com/yourpage" }
    ]
  }
}
```

You can add or remove social links as needed.
