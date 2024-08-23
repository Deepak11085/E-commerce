const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const products = {
    laptops: [
        { name: "Dell XPS 13", description: "A high-end laptop", price: 999.99, image: "/images/laptop1.png" },
        { name: "MacBook Air", description: "Light and portable", price: 1299.99, image: "/images/laptop2.png" },
        { name: "HP Spectre x360", description: "A versatile 2-in-1", price: 1099.99, image: "/images/laptop3.png" }
    ],
    mobiles: [
        { name: "iPhone 13", description: "Apple's latest iPhone", price: 799.99, image: "/images/mobile1.png" },
        { name: "Samsung Galaxy S21", description: "Flagship Samsung phone", price: 999.99, image: "/images/mobile2.png" },
        { name: "OnePlus 9", description: "High-performance Android phone", price: 729.99, image: "/images/mobile3.png" }
    ],
    tvs: [
        { name: "Samsung QLED", description: "A top-tier 4K TV", price: 1499.99, image: "/images/tv1.png" },
        { name: "LG OLED", description: "Stunning OLED display", price: 1799.99, image: "/images/tv2.png" },
        { name: "Sony Bravia", description: "A premium 4K TV", price: 1299.99, image: "/images/tv3.png" }
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
app.use('/images', express.static('images'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
