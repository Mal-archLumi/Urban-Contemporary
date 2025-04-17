// checkout.js
import { cart, removeFromCart, updateCartQuantity } from './cart.js';
import { products } from './products.js';

// Get the container elements
let cartContainer = document.querySelector('.cart-section');

function displayCart() {
  // Clear the cart container first
  cartContainer.innerHTML = '';

  cart.forEach((item) => {
    // Find the product details based on productId
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      console.warn(`No matching product found for ID: ${item.productId}`);
      return;
    }
    
    // Create a new cart item element
    let cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.dataset.productId = item.productId; // Store product ID for reference

    // Build the inner HTML for the cart item
    cartItem.innerHTML = `
      <div class="product-details">
        <div class="product-img-container">
          <img src="${product.image}" alt="${product.name}" class="cart-product-img">
        </div>
        <div class="cart-product-details">
          <p class="product-name">${product.name}</p>
          <p class="product-price">Ksh ${product.price.now}</p>
          <p class="product-quantity">Quantity: ${item.quantity}</p>
          <button class="update-btn">+1</button>
          <button class="delete-btn">Delete</button>
          <button class="buy-btn">Buy</button>
        </div>
      </div>
      <div class="delivery-options">
        <h4 class="delivery-option-heading">Choose Delivery Option</h4>
        <!-- Adding a value attribute for each option for later use -->
        <label>
          <input type="radio" name="delivery-option" value="0" checked>
          Tuesday, 21 June - Free Shipping
        </label>
        <label>
          <input type="radio" name="delivery-option" value="350">
          Wednesday, 22 June - Ksh 350 Shipping
        </label>
        <label>
          <input type="radio" name="delivery-option" value="500">
          Saturday, 25 June - Ksh 500 Shipping
        </label>
      </div>
    `;

    // Append the cart item to the container
    cartContainer.appendChild(cartItem);
  });

  // Attach event listeners to delete buttons so that deleting an item also updates the summary
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const cartItem = event.target.closest('.cart-item');
      const productId = cartItem.dataset.productId;

      removeFromCart(productId);
      displayCart(); // Re-render entire cart
      updateSummary();
    });
  });

  // Update the summary after displaying the cart
  updateSummary();
}

// Function to calculate and update the summary section
function updateSummary() {
  let totalItems = 0;
  let subtotal = 0;

  // Compute totals
  cart.forEach((item) => {
    const product = products.find(p => p.id === item.productId);
    if (product) {
      totalItems += item.quantity;
      subtotal += item.quantity * product.price.now;
    }
  });

  // Find the summary elements
  const itemsEl = document.getElementById('summary-items');
  const subtotalEl = document.getElementById('summary-subtotal');
  const totalBeforeTaxEl = document.getElementById('summary-total-before-tax');
  const shippingEl = document.getElementById('summary-shipping');
  const taxEl = document.getElementById('summary-tax');
  const totalEl = document.getElementById('summary-total');

  // If any of these elements are missing, exit the function
  if (!itemsEl || !subtotalEl || !totalBeforeTaxEl || !shippingEl || !taxEl || !totalEl) {
    console.warn("One or more summary elements are missing in the DOM.");
    return;
  }

  // Calculate shipping with critical fix: initialize shippingCost to 0
  let shippingCost = 0;
  const selectedDeliveryOption = document.querySelector('input[name="delivery-option"]:checked');
  if (selectedDeliveryOption) {
    shippingCost = parseFloat(selectedDeliveryOption.value);
  }

  // Calculate tax (15%)
  const VAT_RATE = 0.15;
  const tax = subtotal * VAT_RATE;
  const orderTotal = subtotal + shippingCost + tax;

  // Update the summary
  itemsEl.textContent = `Items(${totalItems})`;
  subtotalEl.textContent = `Ksh ${subtotal.toFixed(2)}`;
  totalBeforeTaxEl.textContent = `Ksh ${subtotal.toFixed(2)}`;
  shippingEl.textContent = `Ksh ${shippingCost.toFixed(2)}`;
  taxEl.textContent = `Ksh ${tax.toFixed(2)}`;
  totalEl.textContent = `Ksh ${orderTotal.toFixed(2)}`;
}

// Listen for changes on the delivery options so that if the user switches the option, the summary updates
document.addEventListener('change', function(event) {
  if (event.target.name === 'delivery-option') {
    updateSummary();
    updateCartQuantity(); // Update the cart quantity display
    displayCart(); // Update the cart display
  }
});

// Display the cart when the page loads
document.addEventListener('DOMContentLoaded', displayCart);
