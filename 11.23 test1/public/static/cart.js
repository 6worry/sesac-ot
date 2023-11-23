document.addEventListener('DOMContentLoaded', () => {
    fetch('/products')
        .then((response) => response.json())
        .then((products) => displayProduct(products));
});

function displayProduct(products) {
    const productTableBody = document.querySelector('#productTable tbody')
    console.log(productTableBody);

    products.forEach((product) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><button onclick="addToCart(${product.id})">담기</button></td>
            `;
        productTableBody.appendChild(row);
    });
};

function addToCart(productid) {
    fetch(`/add-to-cart/${productid}`, {method: 'POST'})
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            // alert(Json.stringify(data.cart))
            fetch('/cart')
                .then((response) => response.json())
                .then((cart) => displayCart(cart));
        });
};

function displayCart(cart) {
    const cartTableBody = document.querySelector('#cartTable tbody');
    cartTableBody.innerHTML = '';
    cart.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            `;
        cartTableBody.appendChild(row);
    });
};

function updateTable () {
    
}