/*This page contains code mostly relating to the homepage.
The html for the checkout is generated here*/
//homepage.js
import { products } from './products.js';
import { cart, addToCart, updateCartQuantity } from './cart.js';
import './headers/headers.js';

const productsContainer = document.querySelector('.all-products-container');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

// Toggle mobile menu
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!mainNav.contains(event.target) && !menuToggle.contains(event.target) && mainNav.classList.contains('active')) {
      mainNav.classList.remove('active');
    }
  });
}

// Function to handle scroll buttons
const scrollContainer = document.querySelector('.scroll-container');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

if (scrollContainer && leftBtn && rightBtn) {
  leftBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: -200, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
  });
}

// Function to render products
function renderProducts() { 
  if (!productsContainer) return;

  products.forEach((product) => {
    const newProduct = `
      <div class="product-container">  
        <div>
          <img src="${product.image}" alt="${product.name}" class="product-image">
        </div>
        <div class="product-details">
          <div class="product-name">${product.name}</div>
          <div class="price-container">
            <div class="price-before">Ksh ${product.price.before}</div>
            <div class="price-now">Ksh ${product.price.now}</div>
          </div>
          <div class="items-left">${product.stock_left} left in stock</div>
          <div class="product-rating">
            <img src="${product.rating.image}" alt="rating" class="rating-stars">
            <div class="rating-number">${product.rating.star_count}</div>
          </div>
          <div class="show-added-to-cart-js show-added-to-cart-css"></div>
          <div class="cart-actions">
            <select class="quantity-selector">
              <option value="1" selected>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <button class="add-to-cart-btn add-to-cart-js" data-product-name="${product.name}" data-product-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
    productsContainer.insertAdjacentHTML('beforeend', newProduct);
  });

  // Add cart notification functionality
  document.querySelectorAll('.add-to-cart-js').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const productContainer = button.closest('.product-container');
      const quantitySelector = productContainer.querySelector('.quantity-selector');
      const quantity = parseInt(quantitySelector.value, 10);
      const notification = productContainer.querySelector('.show-added-to-cart-js');

      addToCart(productId, quantity);
      updateCartQuantity();

      // Show added to cart notification
      notification.textContent = `${quantity} item(s) added to cart!`;
      notification.classList.add('active');
      
      setTimeout(() => {
        notification.classList.remove('active');
      }, 2000);
    });
  });

  console.log('cart:', cart);
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartQuantity();
});

// Handle login selector if it exists
const loginSelect = document.getElementById('login-select');
if (loginSelect) {
  loginSelect.addEventListener('change', function() {
    window.location.href = this.value;
  });
}

// For better performance on mobile
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && mainNav && mainNav.classList.contains('active')) {
    mainNav.classList.remove('active');
  }
});