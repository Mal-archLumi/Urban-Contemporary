export let cart = loadCartFromLocalStorage();

export function addToCart(productId, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let matchingItem = cart.find(item => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity});
  }

  saveCartToLocalStorage(cart);
  updateCartQuantity(); 
  displaycart();// Ensure UI updates
}

//  Remove from cart function (updates storage & UI)
export function removeFromCart(productId) {
  let cart = loadCartFromLocalStorage();

  // Remove item from cart
  cart = cart.filter(item => item.productId !== productId);

  saveCartToLocalStorage(cart); //  Save updated cart
  updateCartQuantity(); //  Update cart quantity display
  displaycart();
}

//  Updates Cart Icon/Badge
export function updateCartQuantity() {
  let cart = loadCartFromLocalStorage(); 
  let cartQuantity = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const displayElement = document.querySelector('.cart-quantity-display-js');

  if (displayElement) {
    displayElement.innerHTML = cartQuantity;
    localStorage.setItem('cartQuantityDisplay', cartQuantity); // Store display item to localStorage
  } else {
    console.warn("Cart display element not found! Skipping update.");
  }
  localStorage.getItem('cartQuantityDisplay');
}


//  Load cart from localStorage
function loadCartFromLocalStorage() {
  let cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : [];
}

// Save cart to localStorage
function saveCartToLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
