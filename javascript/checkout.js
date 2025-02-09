import { cart, removeFromCart } from './cart.js';
import { products } from './products.js';

let cartContainer = document.querySelector('.cart-section');

function displayCart() {
  cartContainer.innerHTML = '';

  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      console.warn(`No matching product found for ID: ${item.productId}`);
    }
    if (product) {
      let cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.dataset.productId = item.productId; //  Store product ID in dataset

      cartItem.innerHTML = `
        <div class="product-details">
          <div class="product-img-container">
            <img src="${product.image}" alt="${product.name}" class="cart-product-img">
          </div>
          <div class="cart-product-details">
            <p class="product-name">${product.name}</p>
            <p class="product-price">Ksh ${product.price.now}</p>
            <p class="product-quantity">Quantity: ${item.quantity}</p>
            <button class="update-btn">Add</button>
            <button class="delete-btn">Delete</button>
          </div>
        </div>
        <div class="delivery-options">
          <h4 class="delivery-option-heading">Choose Delivery Option</h4>
          <label><input type="radio" name="delivery-option"> Tuesday, 21 June - Free Shipping</label>
          <label><input type="radio" name="delivery-option"> Wednesday, 22 June - Ksh 350 Shipping</label>
          <label><input type="radio" name="delivery-option"> Saturday, 25 June - Ksh 500 Shipping</label>
        </div>
      `;

      cartContainer.appendChild(cartItem);
    }
  });

  //  Attach event listeners to delete buttons
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const cartItem = event.target.closest('.cart-item');
      const productId = cartItem.dataset.productId;

      cartItem.remove(); //  Remove from DOM
      removeFromCart(productId); 
    });
  });

  console.log('Cart is:', cart);
}

document.addEventListener('DOMContentLoaded', displayCart);
