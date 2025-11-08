// Cart functionality
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartIcon = document.querySelector('.cart-icon');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Update cart icon
    function updateCartIcon() {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartIcon.setAttribute('data-count', totalItems);
    }
  
    // Add to cart
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function () {
        const productId = button.getAttribute('data-id');
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));
  
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }
  
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
  
        // Update cart icon
        updateCartIcon();
  
        alert(`${productName} added to cart!`);
      });
    });
  
    // Initialize cart icon
    updateCartIcon();
  });

  // Search functionality
function filterProducts() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const products = document.querySelectorAll('.product');

  products.forEach(product => {
    const productName = product.getAttribute('data-name').toLowerCase();
    if (productName.includes(searchInput)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}