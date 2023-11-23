
document.addEventListener('DOMContentLoaded', () => {
    fetch('/cart')
        .then((response) => response.json())
        .then((cart) => displayCart(cart))
});

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

function removeToCart(productid) {
    fetch(`/remove-to-cart/${productid}`, {method: 'DELETE'})
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            // alert(Json.stringify(data.cart))
            updateTable();
        });
};