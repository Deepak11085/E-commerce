document.addEventListener('DOMContentLoaded', function() {
    const categoryLinks = document.querySelectorAll('.dropdown-content a[data-category]');
    const productList = document.getElementById('product-list');

    categoryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const category = this.getAttribute('data-category');

            fetch(`http://localhost:3000/products?category=${category}`)
                .then(response => response.json())
                .then(data => {
                    productList.innerHTML = '<h2>Products:</h2><ul>' +
                        data.map(product => `
                            <li>
                                <img src="${product.image}" alt="${product.name}">
                                <h3>${product.name}</h3>
                                <p>${product.description}</p>
                                <p class="price">Price: $${product.price.toFixed(2)}</p>
                            </li>
                        `).join('') +
                        '</ul>';
                })
                .catch(error => console.error('Error fetching products:', error));
        });
    });
});
