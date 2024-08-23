const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Mock product data with online image URLs
const products = {
    laptops: [
        { name: "Dell XPS 13", description: "A high-end laptop", price: 999.99, image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/g-series/g15-5535/media-gallery/black/1-zone-white-kb/notebook-g15-5535-nt-bk-gallery-4.psd?fmt=pjpg&pscan=auto&scl=1&wid=4165&hei=2887&qlt=100,1&resMode=sharp2&size=4165,2887&chrss=full&imwidth=5000"},
        { name: "MacBook Air", description: "Light and portable", price: 1299.99, image: "https://m.media-amazon.com/images/I/51hJIsWMagL._AC_UF1000,1000_QL80_.jpg" },
        { name: "HP Spectre x360", description: "A versatile 2-in-1", price: 1099.99, image: "https://images.herzindagi.info/image/2024/Feb/best-hp-laptop.jpg" }
    ],
    mobiles: [
        { name: "iPhone 13", description: "Apple's latest iPhone", price: 799.99, image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818" },
        { name: "Samsung Galaxy S21", description: "Flagship Samsung phone", price: 999.99, image: "https://m.media-amazon.com/images/I/81vxWpPpgNL.jpg" },
        { name: "OnePlus 9", description: "High-performance Android phone", price: 729.99, image: "data:image/jpeg;base64,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" }
    ],
    tvs: [
        { name: "Samsung QLED", description: "A top-tier 4K TV", price: 1499.99, image: "https://m.media-amazon.com/images/I/81qzesFxZvL.jpg" },
        { name: "LG OLED", description: "Stunning OLED display", price: 1799.99, image: "https://www.lg.com/content/dam/channel/wcms/in/images/tvs/43uq7500psf_atr_eail_in_c/gallery/43UQ7500PSF-DZ-001.jpg" },
        { name: "Sony Bravia", description: "A premium 4K TV", price: 1299.99, image: "https://5.imimg.com/data5/SELLER/Default/2022/6/ZG/RC/EN/123741053/sony-bravia-x75k-4k-ultra-hd-led-smart-google-tv.jpg" }
    ]
};

// Endpoint to get products based on category
app.get('/products', (req, res) => {
    const category = req.query.category;
    const data = products[category];
    if (data) {
        res.json(data);
    } else {
        res.status(404).send('Category not found');
    }
});

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Serve a test HTML file
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
