document.addEventListener('DOMContentLoaded', () => {
    fetch('/products')
        .then((response) => response.json())
        .then((products) => displayProduct(products));
    updateTable()
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
            <td><button onclick="num_inc">+</button><button onclick="num_dec">-</button></td>
            <td><button onclick="removeToCart(${item.id})">Remove</button></td>
            `;
        cartTableBody.appendChild(row);
    });
};

function updateTable() {
    //갱신을 위한 최신 정보를 가져옴
    fetch('/cart')
        .then(response => response.json())
        .then(cart => displayCart(cart))
        .catch(error => console.error('사용자 정보 불러오기 실패', error));
};

function removeToCart(productid) {
    fetch(`/remove-to-cart/${productid}`, {method: 'DELETE'})
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            // alert(Json.stringify(data.cart))
            updateTable();
        });
};