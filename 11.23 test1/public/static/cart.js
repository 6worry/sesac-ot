document.addEventListener('DOMContentLoaded', () => {
    fetch('/cart')
        .then((response) => response.json())
        .then((cart) => displayCart(cart))
});

function displayCart(cart) {
    console.log(cart)
    const cartTableBody = document.querySelector('#cartTable tbody');
    cartTableBody.innerHTML = '';
    if(cart) {

        cart.forEach((item) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><button onclick="updateQuantity(${item.id}, 'inc')">+</button><button onclick="updateQuantity(${item.id}, 'dec')">-</button></td>
            <td><button onclick="removeToCart(${item.id})">Remove</button></td>
            `;
            cartTableBody.appendChild(row)
        });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td colspan="5">상품X</td>
            `;
            cartTableBody.appendChild(row)
        }
};

function updateQuantity(itemid, action){
    const change = action === 'inc' ? 1 : -1;
    fetch(`/update-quantity/${itemid}}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({change})
    })
    .then((response) => response.json())
    .then((data) => {
        displayCart(data.cart)
    })
}

function removeToCart(productid) {
    fetch(`/remove-to-cart/${productid}`, {method: 'DELETE'})
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            // alert(Json.stringify(data.cart))
            updateTable();
        });
};