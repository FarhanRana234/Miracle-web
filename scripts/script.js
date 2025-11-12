document.addEventListener('DOMContentLoaded', () => {
  // ===============================
  //      CART FUNCTIONALITY
  // ===============================
  const cartIcon = document.querySelector('.cart-icon');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function updateCartIcon() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartIcon.setAttribute('data-count', totalItems);
  }

  function addProductToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
  }

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      addProductToCart(id, name, price);

      // Button feedback
      button.textContent = "Added!";
      setTimeout(() => button.textContent = "Add to Cart", 1000);
    });
  });

  updateCartIcon();

  // ===============================
  //      SEARCH FUNCTIONALITY
  // ===============================
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      document.querySelectorAll('.product').forEach(product => {
        const name = product.dataset.name.toLowerCase();
        product.style.display = name.includes(query) ? 'block' : 'none';
      });
    });
  }

  // ===============================
  //      MENU TOGGLE (MOBILE)
  // ===============================
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('nav ul');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => navUl.classList.toggle('active'));
  }

  // ===============================
  //      DROPDOWN FUNCTIONALITY
  // ===============================
  const dropdownLinks = document.querySelectorAll('nav ul li.has-dropdown > a');

  function handleDropdownClick(e) {
    const parentLi = e.currentTarget.parentElement;

    if (window.innerWidth <= 991) {
      e.preventDefault(); // Prevent full page jump on mobile
      parentLi.classList.toggle('active');

      // Close other dropdowns
      dropdownLinks.forEach(link => {
        if (link !== e.currentTarget) link.parentElement.classList.remove('active');
      });
    }
  }

  dropdownLinks.forEach(link => link.addEventListener('click', handleDropdownClick));

  // Desktop hover
  function handleDesktopHover() {
    if (window.innerWidth > 991) {
      document.querySelectorAll('nav ul li.has-dropdown').forEach(li => {
        li.addEventListener('mouseenter', () => li.classList.add('active'));
        li.addEventListener('mouseleave', () => li.classList.remove('active'));
      });
    } else {
      document.querySelectorAll('nav ul li.has-dropdown').forEach(li => {
        li.removeEventListener('mouseenter', () => li.classList.add('active'));
        li.removeEventListener('mouseleave', () => li.classList.remove('active'));
      });
    }
  }

  handleDesktopHover();
  window.addEventListener('resize', handleDesktopHover);

  // ===============================
  //      CATEGORY FILTER FUNCTION
  // ===============================
  function filterByCategory(category) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
      const prodCategory = product.dataset.category.toLowerCase();
      if (category === 'all' || prodCategory.includes(category)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }

  // Initialize category filter based on URL hash
  const hash = window.location.hash.toLowerCase().replace('#', '');
  if (hash) filterByCategory(hash);

  // Category links click
  document.querySelectorAll('.dropdown a[data-category]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const category = link.dataset.category.toLowerCase();
      filterByCategory(category);
    });
  });

  // ===============================
  //      WISHLIST FUNCTION
  // ===============================
  document.querySelectorAll('.wishlist i').forEach(icon => {
    icon.addEventListener('click', () => {
      icon.classList.toggle('fa-regular');
      icon.classList.toggle('fa-solid');
      icon.style.color = icon.classList.contains('fa-solid') ? 'red' : '#555';
    });
  });
});

// products.js
document.addEventListener("DOMContentLoaded", function() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  if (category) {
    filterByCategory(category); // call your existing filter function
  }
});

// Mobile dropdown toggle
document.querySelectorAll('nav ul li.has-dropdown > a').forEach(link => {
  link.addEventListener('click', function(e) {
    const dropdown = this.nextElementSibling;
    if (window.innerWidth <= 991) {
      e.preventDefault();  // only prevent default if you want toggle
      dropdown.classList.toggle('active');
    }
  });
});

document.querySelectorAll('nav ul li.has-dropdown > a').forEach(link => {
  link.addEventListener('click', function(e) {
    const dropdown = this.nextElementSibling;
    if (window.innerWidth <= 991 && this.getAttribute('href') === '#') {
      e.preventDefault();  
      dropdown.classList.toggle('active');
    }
  });
});

const features = document.querySelectorAll('.feature');
window.addEventListener('scroll', () => {
  features.forEach(f => {
    const rect = f.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) f.classList.add('visible');
  });
});
