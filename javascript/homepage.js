//product details
const products=[{
  image:'../products/vintage radio casette.png',
  name:'Vintage radio player',
  price:{
    before:2500,
    now:1999,
  },
  stock_left:2,
  rating:{
    image:'../icons/cropped-five star rating sign_8240251 (1).png',
    star_count:'5 stars',
  },
} ,
{
  image:'../products/Black and red headsets.png',
  name:'Black and Red headsets',
  price:{
    before: 4500,
    now: 2500,
  },
  stock_left: 13,
  rating:{
    image:'../icons/cropped-five star rating sign_8240251 (1).png',
    star_count:'4 stars',
  } 
}
];

const productsContainer= document.querySelector('.all-products-container');

products.forEach((product) => {
  const newProducts=`
  <div class="product-container">
    <div>
      <img src="${product.image}" alt="${product.name}" class="product-image">
    </div>
    <div class="product-details">
      <div class="product-name">${product.name}</div>
      <div class="price-container">
        <div class="price-before">${product.price.before}</div>
        <div class="price-now">${product.price.now}</div>
      </div>
      <div class="items-left">${product.stock_left} left in stock</div>
      <div class="product-rating">
        <img src="${product.rating.image}" alt="rating" class="rating-stars">
        <div class="rating-number">${product.rating.star_count}</div>
      </div>
      <div class="cart-actions">
        <select class="quantity-selector">
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button class="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  </div> `;
  productsContainer.innerHTML += newProducts;

  console.log(newProducts)
})

