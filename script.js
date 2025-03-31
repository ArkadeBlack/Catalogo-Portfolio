// ================ CONFIGURACIÓN GLOBAL ================
const WHATSAPP_NUMBER = '5491112345678'; // Reemplaza con tu número de WhatsApp
const EMAIL_CONFIG = {
    address: 'tu@email.com', // Reemplaza con tu dirección de correo electrónico
    subject: 'Consulta sobre producto',
    template: `Hola,

Me gustaría recibir más información sobre el producto {productName}.

Quedo atento a su respuesta.
Saludos cordiales.`
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

// ================ PRODUCTOS ================
const products = [
    {
        id: 1,
        image: '/assets/Img/product_1.jpg',
        title: 'Producto 1',
        description: 'Descripción del producto 1',
        price: '$10.00'
    },
    {
        id: 2,
        image: '/assets/Img/product_1.jpg',
        title: 'Producto 2',
        description: 'Descripción del producto 2',
        price: '$89.99'
    }, {
        id: 3,
        image: '/assets/Img/product_1.jpg',
        title: 'Producto 3',
        description: 'Descripción del producto 1',
        price: '$99.99'
    },
    {
        id: 4,
        image: '/assets/Img/product_1.jpg',
        title: 'Producto 4',
        description: 'Descripción del producto 2',
        price: '$89.99'
    }, {
        id: 5,
        image: '/assets/Img/product_1.jpg',
        title: 'Producto 5',
        description: 'Descripción del producto 1',
        price: '$99.99'
    },
    {
        id: 6,
        image: '/assets/Img/product_1.jpg',
        title: 'Producto 6',
        description: 'Descripción del producto 2',
        price: '$89.99'
    }, {
        id: 7,
        image: '/assets/Img/product_1.jpg',
        title: 'Producto 7',
        description: 'Descripción del producto 1',
        price: '$99.99'
    },
    {
        id: 8,
        image: '/assets/Img/product_1.jpg',
        title: 'Producto 8',
        description: 'Descripción del producto 2',
        price: '$89.99'
    }, {
        id: 9,
        image: '/assets/Img/product_1.jpg',
        title: 'Producto 9',
        description: 'Descripción del producto 1',
        price: '$99.99'
    },
    {
        id: 10,
        image: '/assets/Img/product_1.jpg',
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
    
    initializeModalButtons(modalButtons, modal);
}

function initializeModalButtons(modalButtons, modal) {
    modalButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const productTitle = modal.dataset.currentProduct;
            
            if (index === 0) {
                handleWhatsAppButton(productTitle);
            } else {
                handleEmailButton(productTitle);
            }
        });
    });
}

function handleWhatsAppButton(productTitle) {
    const message = `Hola, me interesa el producto ${productTitle}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
}

function handleEmailButton(productTitle) {
    const subject = `${EMAIL_CONFIG.subject} ${productTitle}`;
    const body = EMAIL_CONFIG.template.replace('{productName}', productTitle);
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

function initializeCarousel() {
    const carouselButtons = document.querySelectorAll('.carousel-btn');
    const carouselItems = document.querySelectorAll('.carousel-item');

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

    carouselItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            img.addEventListener('error', () => {
                img.src = '/assets/Img/placeholder.jpg'; // Imagen de respaldo
            });
        }
    });

    showCarouselItem(0);
    resetCarouselInterval();
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
}