document.addEventListener('DOMContentLoaded', function () {
  const checkoutForm = document.getElementById('checkout-form');
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotal = document.getElementById('cart-total');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Display cart items
  function displayCartItems() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <div class="item-info">
          <h3>${item.name}</h3>
          <p>Rs ${item.price.toFixed(2)} x ${item.quantity}</p>
        </div>
        <div class="item-total">
          <p>Rs ${itemTotal.toFixed(2)}</p>
          <button class="btn remove-item" data-index="${index}">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    // Update total
    cartTotal.textContent = `Rs ${total.toFixed(2)}`;
  }

  // Remove item from cart
  cartItemsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-item')) {
      const index = e.target.getAttribute('data-index');
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCartItems();
      updateCartIcon();
    }
  });

  // Update cart icon
  function updateCartIcon() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.setAttribute('data-count', totalItems);
  }

  // Checkout process
  checkoutForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your cart is empty. Add some products before checking out.');
      return;
    }

    // Get form data
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    // Generate WhatsApp message
    const phoneNumber = '+923023418062'; // Replace with your WhatsApp number
    let message = `Hello, I would like to place an order:\n\n`;

    cart.forEach(item => {
      message += `${item.name} - Rs ${item.price.toFixed(2)} x ${item.quantity}\n`;
    });

    message += `\nTotal: Rs ${cartTotal.textContent}\n\n`;
    message += `Customer Details:\n`;
    message += `Name: ${name}\n`;
    message += `Phone: ${phone}\n`;
    message += `Address: ${address}\n\n`;
    message += `Please confirm my order.`;

    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);

    // Redirect to WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  });

  // Initialize
  displayCartItems();
  updateCartIcon();
});