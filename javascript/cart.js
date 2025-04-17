export let cart = loadCartFromLocalStorage();

export function addToCart(productId, quantity) {
  let localCart = JSON.parse(localStorage.getItem("cart")) || [];

  let matchingItem = localCart.find(item => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    localCart.push({ productId, quantity });
  }

  saveCartToLocalStorage(localCart);
  cart = localCart; // Update exported cart
  updateCartQuantity(); 
}

export function removeFromCart(productId) {
  let localCart = loadCartFromLocalStorage();
  localCart = localCart.filter(item => item.productId !== productId);
  saveCartToLocalStorage(localCart);
  cart = localCart; // Update exported cart
  updateCartQuantity();
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
