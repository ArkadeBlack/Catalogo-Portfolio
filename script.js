// ================ CONFIGURACIÓN GLOBAL ================
const WHATSAPP_NUMBER = '5491112345678'; // Reemplaza con tu número de WhatsApp
const WHATSAPP_CONFIG = {
    template: (products) => {
        if (products.size === 1) {
            const [firstProduct] = products.keys();
            return `Hola! 👋\n\nMe interesa el producto ${firstProduct}.\n¿Podrías darme más información sobre precio y disponibilidad?\n\nGracias!`;
        }
        
        return `Hola! 👋\n\nMe interesan los siguientes productos:\n${Array.from(products.keys()).map(name => `- ${name}`).join('\n')}\n\n¿Podrías darme más información sobre precios y disponibilidad?\n\nGracias!`;
    }
};

const EMAIL_CONFIG = {
    address: 'tu@email.com', // Reemplaza con tu dirección de correo electrónico
    subject: (count) => `Consulta sobre ${count > 1 ? count + ' productos' : 'producto'}`,
    template: (products) => {
        if (products.size === 1) {
            const [firstProduct] = products.keys();
            return `Hola,\n\nMe gustaría recibir más información sobre el producto ${firstProduct}.\n\nQuedo atento a su respuesta.\nSaludos cordiales.`;
        }
        
        return `Hola,\n\nMe gustaría recibir más información sobre los siguientes productos:\n${Array.from(products.keys()).map(name => `- ${name}`).join('\n')}\n\nQuedo atento a su respuesta.\nSaludos cordiales.`;
    }
};

// ================ CONFIGURACIÓN DE OBSERVERS ================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// ================ VARIABLES GLOBALES ================
let currentProductIndex = 4; // Una sola inicialización
let currentCarouselIndex = 0;
let carouselIntervalId;
const selectedProducts = new Map(); // Usar Map para almacenar productos seleccionados

// ================ PRODUCTOS ================
const products = [
    {
        id: 1,
        image: '/assets/Img/product/desktop/product_1.jpg',
        title: 'Producto 1',
        description: 'Descripción del producto 1',
        price: '$10.00'
    },
    {
        id: 2,
        image: '/assets/Img/product/desktop/product_1.jpg',
        title: 'Producto 2',
        description: 'Descripción del producto 2',
        price: '$89.99'
    }, {
        id: 3,
        image: '/assets/Img/product/desktop/product_1.jpg',
        title: 'Producto 3',
        description: 'Descripción del producto 1',
        price: '$99.99'
    },
    {
        id: 4,
        image: '/assets/Img/product/desktop/product_1.jpg',
        title: 'Producto 4',
        description: 'Descripción del producto 2',
        price: '$89.99'
    }, {
        id: 5,
        image: '/assets/Img/product/desktop/product_1.jpg',
        title: 'Producto 5',
        description: 'Descripción del producto 1',
        price: '$99.99'
    },
    {
        id: 6,
        image: '/assets/Img/product/desktop/product_1.jpg',
        title: 'Producto 6',
        description: 'Descripción del producto 2',
        price: '$89.99'
    }, {
        id: 7,
        image: '/assets/Img/product/desktop/product_1.jpg',
        title: 'Producto 7',
        description: 'Descripción del producto 1',
        price: '$99.99'
    },
    {
        id: 8,
        image: '/assets/Img/product/desktop/product_1.jpg',
        title: 'Producto 8',
        description: 'Descripción del producto 2',
        price: '$89.99'
    }, {
        id: 9,
        image: '/assets/Img/product/desktop/product_1.jpg',
        title: 'Producto 9',
        description: 'Descripción del producto 1',
        price: '$99.99'
    },
    {
        id: 10,
        image: '/assets/Img/product/desktop/product_1.jpg',
        title: 'Producto 10',
        description: 'Descripción del producto 2',
        price: '$89.99'
    }
];

// ================ FUNCIONES DEL MODAL ================
function openModal(productCard) {
    const modal = document.getElementById('productModal');
    const modalImg = modal.querySelector('.modal-img');
    const modalTitle = modal.querySelector('.modal-details h2');
    const modalDescription = modal.querySelector('.modal-description');
    const modalPrice = modal.querySelector('.modal-price');
    const checkbox = modal.querySelector('.select-product');
    
    // Obtener datos del producto desde la card
    const img = productCard.querySelector('img');
    const title = productCard.querySelector('h3');
    const description = productCard.querySelector('.product-details p:not(.price)');
    const price = productCard.querySelector('.price');
    
    // Actualizar contenido del modal
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalTitle.textContent = title.textContent;
    modalDescription.textContent = description.textContent;
    modalPrice.textContent = price.textContent;

    // Guardar el ID del producto en el modal
    modal.dataset.currentProduct = modalTitle.textContent;

    // Actualizar checkbox state
    const productTitle = productCard.querySelector('h3').textContent;
    checkbox.checked = selectedProducts.has(productTitle);
    
    // Mostrar modal con efecto inmediato
    modal.style.display = 'block';
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// ================ FUNCIONES DE PRODUCTOS ================
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card loading';
    card.dataset.productId = product.id;
    card.onclick = () => openModal(card);
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="product-details">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p class="price">${product.price}</p>
        </div>
    `;
    
    return card;
}

function loadInitialProducts() {
    const productsSection = document.querySelector('.products-section');
    const initialProductsCount = 4;
    let delay = 0;

    for(let i = 0; i < initialProductsCount && i < products.length; i++) {
        const product = products[i];
        const productCard = createProductCard(product);
        
        productsSection.appendChild(productCard);
        
        // Mostrar el producto con delay
        setTimeout(() => {
            productCard.classList.remove('loading');
            productCard.classList.add('show');
        }, delay);
        
        delay += 200;
    }
    
    currentProductIndex = initialProductsCount;
}

// ================ FUNCIONES DEL CARRUSEL ================
function showCarouselItem(index) {
    currentCarouselIndex = index;
    
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carouselButtons = document.querySelectorAll('.carousel-btn');
    
    // Asegurarse de que el índice esté dentro del rango
    if (currentCarouselIndex >= carouselItems.length) {
        currentCarouselIndex = 0;
    }
    
    carouselItems.forEach((item) => {
        item.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
    });

    // Actualizar el estado activo de los botones
    carouselButtons.forEach((button, i) => {
        button.classList.toggle('active', i === currentCarouselIndex);
    });
}

function slideCarousel() {
    showCarouselItem(currentCarouselIndex + 1);
}

function resetCarouselInterval() {
    clearInterval(carouselIntervalId);
    carouselIntervalId = setInterval(slideCarousel, 3000);
}

function initializeCarousel() {
    const carousel = document.querySelector('.carousel');
    
    // Definir las imágenes para cada slide y sus versiones responsivas
    const slides = [
        {
            desktop: '/assets/Img/carousel/desktop/plantilla-carrousel.jpg',    // 1920x800
            netbook: '/assets/Img/carousel/netbook/slide1.jpg',    // 1280x600
            tablet: '/assets/Img/carousel/tablet/slide1.jpg',      // 768x400
            mobile: '/assets/Img/carousel/mobile/slide1.jpg',      // 576x350
            mobileSm: '/assets/Img/carousel/mobile-sm/mobile360x280.jpg' // 360x280
        },
        {
            desktop: '/assets/Img/carousel/desktop/plantilla-carrousel.jpg',
            netbook: '/assets/Img/carousel/netbook/slide2.jpg',
            tablet: '/assets/Img/carousel/tablet/slide2.jpg',
            mobile: '/assets/Img/carousel/mobile/slide2.jpg',
            mobileSm: '/assets/Img/carousel/mobile-sm/slide2.jpg'
        },
        {
            desktop: '/assets/Img/carousel/desktop/plantilla-carrousel.jpg',
            netbook: '/assets/Img/carousel/netbook/slide3.jpg',
            tablet: '/assets/Img/carousel/tablet/slide3.jpg',
            mobile: '/assets/Img/carousel/mobile/slide3.jpg',
            mobileSm: '/assets/Img/carousel/mobile-sm/slide3.jpg'
        }
    ];

    // Crear elementos del carousel
    carousel.innerHTML = `
        <button class="carousel-arrow prev">&#10094;</button>
        ${slides.map(slide => `
            <div class="carousel-item">
                <picture>
                    <source media="(max-width: 360px)" srcset="${slide.mobileSm}">
                    <source media="(max-width: 576px)" srcset="${slide.mobile}">
                    <source media="(max-width: 768px)" srcset="${slide.tablet}">
                    <source media="(max-width: 1280px)" srcset="${slide.netbook}">
                    <img src="${slide.desktop}" alt="Slide">
                </picture>
            </div>
        `).join('')}
        <button class="carousel-arrow next">&#10095;</button>
        <div class="carousel-buttons">
            ${slides.map((_, index) => `
                <button class="carousel-btn" data-index="${index}"></button>
            `).join('')}
        </div>
    `;

    const carouselButtons = document.querySelectorAll('.carousel-btn');
    const carouselItems = document.querySelectorAll('.carousel-item');

    // Event listeners
    carouselButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            showCarouselItem(index);
            resetCarouselInterval();
        });
    });

    document.querySelector('.carousel-arrow.prev').addEventListener('click', () => {
        currentCarouselIndex = (currentCarouselIndex - 1 + carouselItems.length) % carouselItems.length;
        showCarouselItem(currentCarouselIndex);
        resetCarouselInterval();
    });

    document.querySelector('.carousel-arrow.next').addEventListener('click', () => {
        currentCarouselIndex = (currentCarouselIndex + 1) % carouselItems.length;
        showCarouselItem(currentCarouselIndex);
        resetCarouselInterval();
    });

    // Manejo de errores de carga de imágenes
    carouselItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            img.addEventListener('error', () => {
                img.src = '/assets/Img/placeholder.jpg';
            });
        }
    });

    showCarouselItem(0);
    resetCarouselInterval();
}

// ================ EVENT LISTENERS ================
document.addEventListener('DOMContentLoaded', () => {
    // Forzar scroll al inicio inmediatamente
    window.scrollTo(0, 0);
    
    // Inicialización de productos y efectos
    loadInitialProducts();
    initializeRevealEffects();
    initializeModalListeners();
    initializeCarousel();
    initializeFloatButtons();
    initializeNavigation();
    initializeLoadMoreButton();
    initializeSearchBar(); // Añadir esta línea
});

// Eliminar los event listeners anteriores de beforeunload y load
// y reemplazarlos con este:
window.onpagehide = function() {
    window.scrollTo(0, 0);
};

function initializeRevealEffects() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Una vez que el elemento es visible, dejamos de observarlo
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => observer.observe(element));
}

function initializeModalListeners() {
    const modal = document.getElementById('productModal');
    const closeBtn = modal.querySelector('.close-modal');
    const checkbox = modal.querySelector('.select-product');
    const modalButtons = modal.querySelectorAll('.modal-btn');
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    checkbox.addEventListener('change', function() {
        const productTitle = modal.dataset.currentProduct;
        if (this.checked) {
            selectedProducts.set(productTitle, true);
        } else {
            selectedProducts.delete(productTitle);
        }
        updateButtonsText(modalButtons);
        updateSelectedProductsList(); // Agregar esta línea
    });
    
    initializeModalButtons(modalButtons, modal);

    // Agregar listener para "Limpiar todo"
    document.querySelector('.clear-all').addEventListener('click', () => {
        selectedProducts.clear();
        updateSelectedProductsList();
        
        // Actualizar checkbox en modal si está abierto
        const modal = document.getElementById('productModal');
        if (modal.style.display === 'block') {
            const checkbox = modal.querySelector('.select-product');
            checkbox.checked = false;
        }
        
        // Limpiar selección visual en todas las product cards
        document.querySelectorAll('.product-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Actualizar texto de los botones en el modal
        const modalButtons = modal.querySelectorAll('.modal-btn');
        updateButtonsText(modalButtons);
    });

    // Agregar listener para el botón de consulta
    document.querySelector('.consult-selected').addEventListener('click', () => {
        if (selectedProducts.size === 0) {
            return; // No hacer nada si no hay productos seleccionados
        }
        
        const message = WHATSAPP_CONFIG.template(selectedProducts);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
        
        // Opcionalmente, limpiar la selección después de enviar
        // selectedProducts.clear();
        // updateSelectedProductsList();
    });
}

function initializeModalButtons(modalButtons, modal) {
    modalButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            if (index === 0) {
                handleWhatsAppButton();
            } else {
                handleEmailButton();
            }
        });
    });
}

function updateButtonsText(buttons) {
    const count = selectedProducts.size;
    const suffix = count > 0 ? ` (${count})` : '';
    
    buttons[0].innerHTML = `<i class="fab fa-whatsapp"></i>Consultar por WhatsApp${suffix}`;
    buttons[1].innerHTML = `<i class="far fa-envelope"></i>Consultar por Email${suffix}`;
}

function handleWhatsAppButton() {
    const modal = document.getElementById('productModal');
    const currentProduct = modal.dataset.currentProduct;
    const tempMap = new Map(selectedProducts);

    // Si no hay productos seleccionados, usar el producto actual
    if (selectedProducts.size === 0) {
        tempMap.set(currentProduct, true);
    }
    
    const message = WHATSAPP_CONFIG.template(tempMap);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
}

function handleEmailButton() {
    const modal = document.getElementById('productModal');
    const currentProduct = modal.dataset.currentProduct;
    const tempMap = new Map(selectedProducts);

    // Si no hay productos seleccionados, usar el producto actual
    if (selectedProducts.size === 0) {
        tempMap.set(currentProduct, true);
    }
    
    const subject = EMAIL_CONFIG.subject(tempMap.size);
    const body = EMAIL_CONFIG.template(tempMap);
    window.location.href = `mailto:${EMAIL_CONFIG.address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// ================ FLOAT BUTTONS ================
function initializeFloatButtons() {
    const floatButtons = document.querySelector('.float-buttons');
    const footer = document.querySelector('footer');
    const topButton = document.querySelector('.float-btn.top');

    // Scroll hacia arriba
    topButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                floatButtons.classList.add('hide');
            } else {
                floatButtons.classList.remove('hide');
            }
        });
    }, observerOptions); // Usar las opciones globales

    if (footer) {
        footerObserver.observe(footer);
    }
}

// Agregar esta función después de loadInitialProducts()
function initializeLoadMoreButton() {
    const loadMoreBtn = document.querySelector('.load-more button');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const productsSection = document.querySelector('.products-section');
            const productsToLoad = 4;
            let delay = 0;

            for (let i = currentProductIndex; i < currentProductIndex + productsToLoad && i < products.length; i++) {
                const product = products[i];
                const productCard = createProductCard(product);
                
                productsSection.appendChild(productCard);
                
                setTimeout(() => {
                    productCard.classList.remove('loading');
                    productCard.classList.add('show');
                }, delay);
                
                delay += 200;
            }

            currentProductIndex += productsToLoad;

            // Ocultar el botón si no hay más productos
            if (currentProductIndex >= products.length) {
                loadMoreBtn.parentElement.style.display = 'none';
            }
        });
    }
}

// Agregar esta nueva función
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const extraOffset = 150;
                const offset = headerHeight + navbarHeight + extraOffset;
                
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    menuToggle?.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navLinksContainer.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    navLinksContainer.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
        });
    });
}

// Añadir esta nueva función
function initializeSearchBar() {
    const searchInput = document.querySelector('.search-bar input');
    const productsSection = document.querySelector('.products-section');
    const loadMoreBtn = document.querySelector('.load-more');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        // Si el término de búsqueda está vacío, restaurar vista inicial
        if (searchTerm === '') {
            resetProductsView();
            return;
        }
        
        // Cargar todos los productos si hay término de búsqueda
        loadAllProducts();
        
        // Filtrar productos
        const productCards = document.querySelectorAll('.product-card');
        let hasResults = false;
        
        productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.product-details p:not(.price)').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                card.classList.add('show');
                hasResults = true;
            } else {
                card.style.display = 'none';
                card.classList.remove('show');
            }
        });
        
        // Ocultar botón "Ver más" durante la búsqueda
        loadMoreBtn.style.display = 'none';
        
        // Mostrar mensaje si no hay resultados
        showNoResultsMessage(hasResults, productsSection);
    });

    // Add new event listener for Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            // Scroll to products section
            const headerHeight = document.querySelector('.header').offsetHeight;
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const extraOffset = 20; // Reduced offset for better positioning
            const offset = headerHeight + navbarHeight + extraOffset;
            
            const targetPosition = productsSection.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Optional: focus out from input
            searchInput.blur();
        }
    });
}

function resetProductsView() {
    const productsSection = document.querySelector('.products-section');
    const loadMoreBtn = document.querySelector('.load-more');
    const noResults = document.querySelector('.no-results');
    
    // Eliminar mensaje de no resultados si existe
    if (noResults) {
        noResults.remove();
    }
    
    // Limpiar productos actuales
    productsSection.innerHTML = '';
    
    // Recargar productos iniciales
    currentProductIndex = 4;
    loadInitialProducts();
    
    // Mostrar botón "Ver más" si hay más productos
    loadMoreBtn.style.display = products.length > 4 ? 'block' : 'none';
}

function loadAllProducts() {
    const productsSection = document.querySelector('.products-section');
    
    // Si ya están todos los productos cargados, no hacer nada
    if (document.querySelectorAll('.product-card').length === products.length) {
        return;
    }
    
    // Cargar todos los productos restantes
    for (let i = currentProductIndex; i < products.length; i++) {
        const product = products[i];
        const productCard = createProductCard(product);
        productsSection.appendChild(productCard);
        productCard.classList.remove('loading');
        productCard.classList.add('show');
    }
}

function showNoResultsMessage(hasResults, container) {
    // Eliminar mensaje anterior si existe
    const existingMessage = document.querySelector('.no-results');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Mostrar mensaje si no hay resultados
    if (!hasResults) {
        const message = document.createElement('div');
        message.className = 'no-results';
        message.textContent = 'No se encontraron productos';
        container.appendChild(message);
    }
}

// Añadir esta nueva función
function updateSelectedProductsList() {
    const selectedItems = document.querySelector('.selected-items');
    const selectedCount = document.querySelector('.selected-count');
    const modal = document.getElementById('productModal');
    
    // Actualizar contador
    selectedCount.textContent = selectedProducts.size;
    
    // Limpiar lista actual
    selectedItems.innerHTML = '';
    
    // Agregar productos seleccionados
    selectedProducts.forEach((value, productName) => {
        const item = document.createElement('div');
        item.className = 'selected-item';
        item.innerHTML = `
            <span>${productName}</span>
            <button class="remove-item" data-product="${productName}">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Agregar event listener para el botón de eliminar
        const removeBtn = item.querySelector('.remove-item');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevenir propagación del evento
            const productToRemove = e.currentTarget.dataset.product;
            
            // Eliminar producto del Map
            selectedProducts.delete(productToRemove);
            
            // Actualizar checkbox en modal si está abierto y es el mismo producto
            if (modal.style.display === 'block' && modal.dataset.currentProduct === productToRemove) {
                const checkbox = modal.querySelector('.select-product');
                checkbox.checked = false;
            }
            
            // Actualizar visual de la product card
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                if (card.querySelector('h3').textContent === productToRemove) {
                    card.classList.remove('selected');
                }
            });
            
            // Actualizar lista y botones
            updateSelectedProductsList();
            const modalButtons = modal.querySelectorAll('.modal-btn');
            updateButtonsText(modalButtons);
        });

        selectedItems.appendChild(item);
    });
}

// Nueva función para actualizar selección en product cards
function updateProductCardSelection(productName, isSelected) {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const title = card.querySelector('h3').textContent;
        if (title === productName) {
            // Actualizar estado visual si es necesario
            card.classList.toggle('selected', isSelected);
        }
    });
}