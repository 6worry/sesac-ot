document.addEventListener('DOMContentLoaded', () => {
    fetch('/cart')
        .then((response) => response.json())
        .then((cart) => displayCart(cart))
});

function displayCart(cart, change) {
    console.log(cart)
    const cartTableBody = document.querySelector('#cartTable tbody');
    cartTableBody.innerHTML = '';
    if(cart && cart.length >0) {
        cart.forEach((item) => {
            item.quantity = item.quantity + change
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
            <span id="quantity-${item.id}">${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, 'inc')">+</button>
            <button onclick="updateQuantity(${item.id}, 'dec')">-</button>
            </td>
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
    console.log(change)
    fetch(`/update-quantity/${itemid}?change=${change}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    })
    .then((response) => response.json())
    .then((data) => {
        document.getElementById(`quantity-${itemid}`).innerText = data.updatedQuantity;
        displayCart(data.cart, change)
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