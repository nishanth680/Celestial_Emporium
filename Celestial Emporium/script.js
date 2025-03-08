"use strict";

(function () {
    /**
     * @typedef {object} Product
     * @property {number} id
     * @property {string} title
     * @property {number} price
     * @property {string} image
     * @property {string} description
     * @property {string} category
     */

    /** @type {Product[]} */
    const products = [
        { id: 1, title: "Astral Silk Scarf", price: 35.99, image: "images/Gemini_Generated_Image_24pfml24pfml24pf.jpeg", description: "A luxurious scarf made from astral silk.", category: "Apparel" },
        { id: 2, title: "Cosmic Coffee Beans", price: 15.50, image: "images/Gemini_Generated_Image_7g35i57g35i57g35.jpeg", description: "The most delicious coffee you'll ever taste.", category: "Food" },
        { id: 3, title: "Galactic Backpack", price: 59.99, image: "images/Gemini_Generated_Image_2u9wus2u9wus2u9w.jpeg", description: "A spacious backpack perfect for exploring the galaxy." },
        { id: 4, title: "Lunar Glow Lamp", price: 45.00, image: "images/Gemini_Generated_Image_dff3lvdff3lvdff3.jpeg", description: "A lamp that glows with a soft, lunar light." },
        { id: 5, title: "Stardust Necklace", price: 89.99, image: "images/Gemini_Generated_Image_mgt4jfmgt4jfmgt4.jpeg", description: "A beautiful necklace adorned with stardust.", category: "Accessories" },
        { id: 6, title: "Nebula Notebook", price: 12.00, image: "images/Gemini_Generated_Image_wep9w7wep9w7wep9.jpeg", description: "A notebook perfect for jotting down your thoughts and ideas." },
        { id: 7, title: "Solaris Tea Set", price: 60.50, image: "images/Gemini_Generated_Image_hnfrm8hnfrm8hnfr.jpeg", description: "A tea set perfect for a relaxing afternoon.", category: "Food" },
        { id: 8, title: "Andromeda Art Print", price: 34.99, image: "images/Gemini_Generated_Image_ohjn2sohjn2sohjn.jpeg", description: "A beautiful art print of the Andromeda galaxy.", category: "Home" },
        { id: 9, title: "Quasar Socks", price: 18.00, image: "images/Gemini_Generated_Image_hq3b1jhq3b1jhq3b.jpeg", description: "Socks that are out of this world.", category: "Apparel" },
        { id: 10, title: "Comet Candles", price: 10.75, image: "images/Gemini_Generated_Image_her5nther5nther5.jpeg", description: "Candles that smell like comets.", category: "Home" },
        { id: 11, title: "Celestial Soap", price: 11.99, image: "images/Gemini_Generated_Image_n8xuizn8xuizn8xu.jpeg", description: "Soap that will make you feel like you're floating in space." },
        { id: 12, title: "Interstellar Pen", price: 7.25, image: "images/Gemini_Generated_Image_w1mnt5w1mnt5w1mn.jpeg", description: "A pen that writes like it's from another world.", category: "Accessories" },
        { id: 13, title: "Galaxy Puzzle", price: 22.50, image: "images/Gemini_Generated_Image_slxtm5slxtm5slxt.jpeg", description: "A puzzle that will challenge your mind." },
        { id: 14, title: "Space Explorer Tee", price: 27.99, image: "images/Gemini_Generated_Image_6dz09a6dz09a6dz0.jpeg", description: "A t-shirt perfect for exploring the cosmos.", category: "Apparel" }
    ];

    /**
     * @typedef {object} CartItem
     * @property {Product} product
     * @property {number} quantity
     */

    /** @type {CartItem[]} */
    let cart = [];

    // DOM Elements (cached for performance)
    const dom = {
        productList: document.getElementById("product-list"),
        cartItems: document.getElementById("cart-items"),
        totalPrice: document.getElementById("total-price"),
        cartStatus: document.getElementById("cart-status"),
        sidebar: document.getElementById('sidebar'),
        openSidebarButton: document.getElementById('open-sidebar'),
        themeToggle: document.getElementById('theme-toggle'),
        themeIcon: document.getElementById('theme-icon'),
        searchInput: document.getElementById('search-input'),
        sortSelect: document.getElementById('sort-select'),
        categoryFilters: document.getElementById('category-filters'),
        dateTimeSpan: document.getElementById('datetime'),
        main: document.querySelector('main'),
        categoryMenu: document.getElementById('category-menu') // Added category menu
    };

    // --- UTILITY FUNCTIONS ---

    /**
     * Displays a message in the cart status area.
     * @param {string} message The message to display.
     */
    function setCartStatus(message) {
        dom.cartStatus.textContent = message;
        setTimeout(() => {
            dom.cartStatus.textContent = "";
        }, 2000);
    }

    /**
     * Saves the cart data to local storage.
     */
    function saveCartToLocalStorage() {
        try {
            localStorage.setItem('celestialCart', JSON.stringify(cart));
        } catch (error) {
            console.error("Failed to save cart to localStorage:", error);
            setCartStatus("Error saving cart!");
        }
    }

    /**
     * Loads the cart data from local storage.
     */
    function loadCartFromLocalStorage() {
        try {
            const savedCart = localStorage.getItem('celestialCart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
                renderCart();
            }
        } catch (error) {
            console.error("Failed to load cart from localStorage:", error);
            setCartStatus("Error loading cart!");
        }
    }

    /**
     * Formats a number as a currency string.
     * @param {number} price The price to format.
     * @returns {string} The formatted price string.
     */
    function formatPrice(price) {
        return price.toFixed(2);
    }

    // --- CART FUNCTIONALITY ---

    /**
     * Adds a product to the cart.
     * @param {number} productId The ID of the product to add.
     */
    function addToCart(productId) {
        const productToAdd = products.find(product => product.id === productId);

        if (!productToAdd) {
            console.error("Product not found");
            setCartStatus("Lost in space: Product not found!");
            return;
        }

        const existingCartItem = cart.find(item => item.product.id === productId);

        if (existingCartItem) {
            existingCartItem.quantity++;
        } else {
            cart.push({
                product: productToAdd,
                quantity: 1
            });
        }

        renderCart();
        saveCartToLocalStorage();
        setCartStatus("Added to your galaxy of good taste!");
    }

    /**
     * Removes a product from the cart.
     * @param {number} productId The ID of the product to remove.
     */
    function removeFromCart(productId) {
        cart = cart.filter(item => item.product.id !== productId);
        renderCart();
        saveCartToLocalStorage();
    }

    /**
     * Updates the quantity of a product in the cart.
     * @param {number} productId The ID of the product to update.
     * @param {number} change The amount to change the quantity by (positive or negative).
     */
    function updateQuantity(productId, change) {
        const cartItem = cart.find(item => item.product.id === productId);
        if (cartItem) {
            cartItem.quantity += change;
            if (cartItem.quantity <= 0) {
                removeFromCart(productId);
            } else {
                renderCart();
                saveCartToLocalStorage();
            }
        }
    }

    /**
     * Renders the cart items in the cart area.
     */
    function renderCart() {
        dom.cartItems.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            dom.cartItems.innerHTML = "<p>Your cart is empty.</p>";
            dom.totalPrice.textContent = `Total: $${formatPrice(0)}`;
            return;
        }

        cart.forEach(cartItem => {
            const item = cartItem.product;
            const cartItemDiv = document.createElement("div");
            cartItemDiv.classList.add("cart-item");
            cartItemDiv.dataset.productId = item.id;

            cartItemDiv.innerHTML = `
                <span class="cart-item-name">${item.title}</span>
                <div class="cart-quantity-controls">
                    <button class="quantity-button" data-product-id="${item.id}" data-action="decrease" aria-label="Decrease quantity">-</button>
                    <span class="cart-item-quantity">${cartItem.quantity}</span>
                    <button class="quantity-button" data-product-id="${item.id}" data-action="increase" aria-label="Increase quantity">+</button>
                </div>
                <button class="remove-from-cart-button" data-product-id="${item.id}">Remove</button>
            `;

            dom.cartItems.appendChild(cartItemDiv);
            total += item.price * cartItem.quantity;
        });

        dom.totalPrice.textContent = `Total: $${formatPrice(total)}`;
    }

    // --- PRODUCT LIST FUNCTIONALITY ---

    /**
     * Renders the product list in the product list area.
     * @param {Product[]} productsToRender An array of products to render.
     */
    function renderProducts(productsToRender = products) {
        dom.productList.innerHTML = "";

        if (productsToRender.length === 0) {
            dom.productList.innerHTML = "<p>No products found matching your search.</p>";
            return;
        }

        productsToRender.forEach(product => {
            const productCard = document.createElement("article");
            productCard.classList.add("product-card");
            productCard.dataset.productId = product.id;

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${formatPrice(product.price)}</p>
                <div class="product-actions">
                    <button class="add-to-cart-button" data-product-id="${product.id}">Add to Cart</button>
                    <button class="details-button" data-product-id="${product.id}">Details</button>
                </div>
            `;

            dom.productList.appendChild(productCard);
        });
    }
     /**
         * Shows the product details in a modal.
         * @param {number} productId The ID of the product to show.
         */
        /**
         * Shows the product details in a modal.
         * @param {number} productId The ID of the product to show.
         */
        function showProductDetails(productId) {
            const product = products.find(p => p.id === productId);
    
            if (!product) {
                console.error("Product not found");
                setCartStatus("Product Details unavailable!");
                return;
            }
    
            // Create modal overlay
            const modalOverlay = document.createElement('div');
            modalOverlay.id = 'product-details-modal';
    
            // Create the modal container
            const modal = document.createElement('div');
            modal.classList.add('product-details-modal');
    
            // Create the modal content area
            const modalContent = document.createElement('div');
            modalContent.classList.add('modal-content');
    
            // Create the sidebar for image and basic info
            const modalSidebar = document.createElement('div');
            modalSidebar.classList.add('modal-sidebar');
            modalSidebar.innerHTML = `
              <img src="${product.image}" alt="${product.title}" class="modal-sidebar-image">
              <h3>${product.title}</h3>
              <p>Price: $${formatPrice(product.price)}</p>
            `;
    
            // Create the main content for detailed info
            const modalMainContent = document.createElement('div');
            modalMainContent.classList.add('modal-main-content');
            modalMainContent.innerHTML = `
              <p>Description: ${product.description}</p>
    
              <h3>Sales Data</h3>
              <canvas id="salesChart" width="400" height="200"></canvas>
              
              <button class="close-modal">Close</button>
            `;
    
            // Append everything to the main modal content element
            modalContent.appendChild(modalSidebar);
            modalContent.appendChild(modalMainContent);
    
            // Modal Content
            modal.appendChild(modalContent);
            modalOverlay.appendChild(modal);
            document.body.appendChild(modalOverlay);
            modalOverlay.style.display = 'flex';
            // Chart logic
            try {
                // Sample sales data
                const salesData = {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Monthly Sales',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                };
    
                // Chart configuration
                const chartConfig = {
                    type: 'bar',
                    data: salesData,
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                };
    
                // Create the chart
                const salesChartCanvas = modalContent.querySelector('#salesChart');
                new Chart(salesChartCanvas, chartConfig);
            } catch (chartError) {
                console.error("Failed to initialize chart:", chartError);
                setCartStatus("Error initializing chart!");
            }
    
            // Close the modal
            modalMainContent.querySelector('.close-modal').addEventListener('click', () => {
                document.body.removeChild(modalOverlay);
            });
            
            modalOverlay.addEventListener('click', (event) => {
                if (event.target === modalOverlay) {
                    document.body.removeChild(modalOverlay);
                }
            });
        }

    /**
     * Performs a search of the products based on the search input.
     */
    function performSearch() {
        const searchTerm = dom.searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    }

    /**
     * Filters the product list by a specific category.
     * @param {string} category The category to filter by.
     */
    function filterByCategory(category) {
        const filteredProducts = category === "All" ?
            products :
            products.filter(product => product.category === category);
        renderProducts(filteredProducts);
    }

    /**
     * Sorts the product list.
     * @param {string} sortBy The sorting option ('price-low', 'price-high', 'name', or 'default').
     */
    function sortProducts(sortBy) {
        let sortedProducts = [...products];

        switch (sortBy) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                // Do nothing (keep original order)
                break;
        }

        renderProducts(sortedProducts);
    }

    // --- SIDEBAR FUNCTIONALITY ---

    /**
     * Toggles the visibility of the sidebar.
     */
    function toggleSidebar() {
        const isExpanded = dom.sidebar.classList.contains('open');
        dom.sidebar.classList.toggle('open');
        dom.openSidebarButton.setAttribute('aria-expanded', !isExpanded); // accessibility
        dom.openSidebarButton.ariaLabel = isExpanded ? 'Open sidebar' : 'Close sidebar';
    }

    // --- DATE AND TIME ---

    /**
     * Updates the date and time display.
     */
    function updateDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        dom.dateTimeSpan.innerHTML = `
          Date: ${year}-${month}-${day}<br>
          Time: ${hours}:${minutes}:${seconds}
      `;
    }

    // --- THEME FUNCTIONALITY ---

    /**
     * Enables dark mode.
     */
    function enableDarkMode() {
        document.body.classList.add('dark-mode'); // Apply to body instead of main
        dom.themeIcon.textContent = '🌙';
        try {
            localStorage.setItem('theme', 'dark');
        } catch (e) {
            console.error("Error saving to localStorage", e);
        }
    }

    /**
     * Disables dark mode.
     */
    function disableDarkMode() {
        document.body.classList.remove('dark-mode'); // Apply to body instead of main
        dom.themeIcon.textContent = '☀️';
        try {
            localStorage.setItem('theme', 'light');
        } catch (e) {
            console.error("Error saving to localStorage", e);
        }
    }

    /**
     * Handles a change in the user's preferred color scheme.
     * @param {MediaQueryListEvent} event The media query list event.
     */
    function handleThemeChange(event) {
        if (event.matches) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }

    /**
     * Toggles the theme (light or dark).
     */
    function toggleTheme() {
        console.log("Toggling theme...");  // Add this line for debugging
        if (document.body.classList.contains('dark-mode')) {
            console.log("Disabling dark mode"); //add for debugging
            disableDarkMode();
        } else {
            console.log("Enabling dark mode"); //add for debugging
            enableDarkMode();
        }
    }

    /**
     * Loads the theme preference from local storage.
     */
    function loadThemePreference() {
        try {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                enableDarkMode();
            } else if (savedTheme === 'light') {
                disableDarkMode();
            } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                enableDarkMode(); // respect browser preference
            }
        } catch (e) {
            console.error("Error loading from localStorage", e);
        }
    }

    // --- EVENT LISTENERS ---

    /**
     * Attaches event listeners to DOM elements.
     */
    function attachEventListeners() {
        dom.openSidebarButton.addEventListener('click', toggleSidebar);
        dom.themeToggle.addEventListener('click', toggleTheme); // This line is correct
        dom.searchInput.addEventListener('input', performSearch);
        dom.sortSelect.addEventListener('change', () => sortProducts(dom.sortSelect.value));

        // Event delegation: handle clicks on category filters (main content)
        dom.categoryFilters.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                filterByCategory(event.target.dataset.category);
            }
        });

        // Event delegation: handle clicks on the product list (add to cart and show details)
        dom.productList.addEventListener('click', (event) => {
            const target = event.target;
            const productCard = target.closest('.product-card');
            if (!productCard) return;
            
            const productId = parseInt(productCard.dataset.productId);

            if (target.classList.contains('add-to-cart-button')) {
                addToCart(productId);
            } else if (target.classList.contains('details-button')) {
                showProductDetails(productId);
            } else if (target.classList.contains('product-image')) {
                // Also show details when clicking on the product image
                showProductDetails(productId);
            }
        });

        // Event delegation: handle clicks on the cart items (remove, increase quantity, decrease quantity)
        dom.cartItems.addEventListener('click', (event) => {
            const target = event.target;
            const productId = parseInt(target.dataset.productId);

            if (target.classList.contains('remove-from-cart-button')) {
                removeFromCart(productId);
            } else if (target.classList.contains('quantity-button')) {
                const action = target.dataset.action;
                updateQuantity(productId, action === 'increase' ? 1 : -1);
            }
        });

        // Listen for changes in the preferred color scheme
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);

        // Event delegation: handle clicks on category menu (sidebar)
        dom.categoryMenu.addEventListener('click', (event) => {
            const target = event.target;
            if (target.tagName === 'A' && target.dataset.category) {
                event.preventDefault(); // Prevent navigation
                filterByCategory(target.dataset.category);
                toggleSidebar(); // Close the sidebar after selecting a category
            }
        });
    }

    // --- INITIALIZATION ---
    function init() {
        loadThemePreference();
        loadCartFromLocalStorage();
        renderProducts();
        updateDateTime(); // Initial update
        setInterval(updateDateTime, 1000);
        attachEventListeners();

        // Removed the automatic sidebar opening that was here
    }

    // Initialize the application when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', init);

})();