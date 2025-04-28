// Al inicio del archivo
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Remover hash y forzar scroll al inicio
if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
}

document.addEventListener('DOMContentLoaded', () => {
    // Forzar scroll al inicio
    window.scrollTo(0, 0);
    
    // Inicializaciones
    loadInitialProducts();
    initializeRevealEffects();
    initializeModalListeners();
    initializeCarousel();
    initializeFloatButtons();
    initializeNavigation();
    initializeLoadMoreButton();
    initializeSearchBar();
    updateSelectedProductsList();
});

// Prevenir scroll al recargar
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};

// Al inicio de script.js
if (window.location.hash) {
    console.log('Hash detectado:', window.location.hash);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded ejecutado');
    console.log('Scroll actual:', window.scrollY);
});

// ================ CONFIGURACIÓN GLOBAL ================
const WHATSAPP_NUMBER = '5493812408224'; // Update WhatsApp number
const WHATSAPP_CONFIG = {
    template: (products) => {
        if (products.size === 1) {
            const [[productName, details]] = products.entries();
            let message = `Hola! 👋\n\nMe interesa el producto ${productName}`;
            
            if (details.model || details.color) {
                message += '\nDetalles seleccionados:';
                if (details.model) message += `\n- Modelo: ${details.model}`;
                if (details.color) message += `\n- Color: ${details.color}`;
            }
            
            return `${message}\n\n¿Podrías darme más información sobre precio y disponibilidad?\n\nGracias!`;
        }
        
        let message = `Hola! 👋\n\nMe interesan los siguientes productos:\n`;
        products.forEach((details, productName) => {
            message += `\n• ${productName}`;
            if (details.model || details.color) {
                if (details.model) message += `\n  - Modelo: ${details.model}`;
                if (details.color) message += `\n  - Color: ${details.color}`;
            }
        });
        
        return `${message}\n\n¿Podrías darme más información sobre precios y disponibilidad?\n\nGracias!`;
    }
};

const EMAIL_CONFIG = {
    address: 'wallua.argentina@gmail.com',
    subject: (count) => `Consulta sobre ${count > 1 ? count + ' productos' : 'producto'}`,
    template: (products) => {
        if (products.size === 1) {
            const [[productName, details]] = products.entries();
            let message = `Hola,\n\nMe interesa el producto ${productName}`;
            
            if (details.model || details.color) {
                message += '\nDetalles seleccionados:';
                if (details.model) message += `\n- Modelo: ${details.model}`;
                if (details.color) message += `\n- Color: ${details.color}`;
            }
            
            return `${message}\n\nQuedo atento a su respuesta.\nSaludos cordiales.`;
        }
        
        let message = `Hola,\n\nMe interesan los siguientes productos:\n`;
        products.forEach((details, productName) => {
            message += `\n• ${productName}`;
            if (details.model || details.color) {
                if (details.model) message += `\n  - Modelo: ${details.model}`;
                if (details.color) message += `\n  - Color: ${details.color}`;
            }
        });
        
        return `${message}\n\nQuedo atento a su respuesta.\nSaludos cordiales.`;
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
        title: 'Funda Biodegradable',
        description: 'Para todos los modelos de iPhone 15',
        price: '$10.00'
    },
    {
        id: 2,
        image: '/assets/Img/product/desktop/product_1.jpg',
        title: 'Funda Silicon Case',
        description: 'Para todos los modelos de iPhone 15',
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
    
    // Inicializar los selectores de modelo y color
    initializeProductOptions(modal);
    
    // Mostrar modal con efecto inmediato
    modal.style.display = 'block';
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
    
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    
    // Limpiar selecciones visuales
    resetModalSelections(modal);
    
    // Restaurar overflow del body
    const mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenu || !mobileMenu.classList.contains('active')) {
        document.body.style.overflow = '';
    }
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Agregar esta nueva función
function resetModalSelections(modal) {
    // Resetear selector de modelo
    const modelSelect = modal.querySelector('#modalPhoneModel');
    if (modelSelect) {
        modelSelect.selectedIndex = 0;
    }

    // Resetear selector de color
    const colorSelected = modal.querySelector('.modal-color-selected');
    if (colorSelected) {
        colorSelected.style.backgroundColor = '';
    }

    // Cerrar panel de colores si está abierto
    const colorPanel = modal.querySelector('.modal-color-panel');
    if (colorPanel) {
        colorPanel.classList.remove('active');
    }
}

function initializeProductOptions(modal) {
    const colorSelector = modal.querySelector('.modal-color-select');
    const colorPreview = modal.querySelector('.modal-color-preview');
    const colorPanel = modal.querySelector('.modal-color-panel');
    const colorsGrid = modal.querySelector('.modal-colors-grid');
    const modelSelect = modal.querySelector('#modalPhoneModel');
    const productTitle = modal.dataset.currentProduct;
    const colorSelected = modal.querySelector('.modal-color-selected');

    // Primero resetear las selecciones
    resetModalSelections(modal);

    // Generar grid de colores si está vacío
    if (colorsGrid && !colorsGrid.children.length) {
        colorsGrid.innerHTML = phoneColors.map(color => `
            <div class="color-option" 
                 style="background-color: ${color.hex}" 
                 data-color="${color.name}"
                 title="${color.name}">
            </div>
        `).join('');
    }

    // Si el producto está en el carrito, restaurar sus valores
    if (selectedProducts.has(productTitle)) {
        const savedProduct = selectedProducts.get(productTitle);
        if (modelSelect) {
            modelSelect.value = savedProduct.model || '';
        }
        if (colorSelected && savedProduct.color) {
            const savedColor = phoneColors.find(c => c.name === savedProduct.color);
            if (savedColor) {
                colorSelected.style.backgroundColor = savedColor.hex;
            }
        }
    }

    // Event listeners
    if (modelSelect) {
        modelSelect.onchange = () => {
            if (selectedProducts.has(productTitle)) {
                const details = selectedProducts.get(productTitle);
                details.model = modelSelect.value;
                selectedProducts.set(productTitle, details);
                updateSelectedProductsList();
            }
        };
    }

    if (colorPreview) {
        colorPreview.onclick = (e) => {
            e.stopPropagation();
            colorPanel.classList.toggle('active');
        };
    }

    if (colorsGrid) {
        colorsGrid.onclick = (e) => {
            const colorOption = e.target.closest('.color-option');
            if (!colorOption) return;

            const selectedColor = colorOption.dataset.color;
            const colorHex = colorOption.style.backgroundColor;

            if (colorSelected) {
                colorSelected.style.backgroundColor = colorHex;
            }

            if (selectedProducts.has(productTitle)) {
                const details = selectedProducts.get(productTitle);
                details.color = selectedColor;
                selectedProducts.set(productTitle, details);
                updateSelectedProductsList();
            }

            colorPanel.classList.remove('active');
        };
    }

    // Cerrar panel de colores al hacer clic fuera
    document.onclick = (e) => {
        if (!colorSelector?.contains(e.target)) {
            colorPanel?.classList.remove('active');
        }
    };
}

// Agregar esta nueva función para actualizar los mensajes
function updateModalMessage(modal, selectedOptions) {
    const productTitle = modal.dataset.currentProduct;
    let message = `Hola! 👋\n\nMe interesa el producto ${productTitle}`;
    
    if (selectedOptions.model || selectedOptions.color) {
        message += '\nDetalles seleccionados:';
        if (selectedOptions.model) message += `\n- Modelo: ${selectedOptions.model}`;
        if (selectedOptions.color) message += `\n- Color: ${selectedOptions.color}`;
    }
    
    message += '\n\n¿Podrías darme más información sobre precio y disponibilidad?\n\nGracias!';

    // Actualizar configuración de mensajes
    WHATSAPP_CONFIG.template = () => message;
    EMAIL_CONFIG.template = () => message.replace('👋', '');
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
            desktop: '/assets/Img/carousel/desktop/Desktop_PC.jpg',    // 1920x800
            netbook: '/assets/Img/carousel/desktop/Desktop_PC.jpg',    // 1280x600
            laptop: '/assets/Img/carousel/desktop/Desktop_PC.jpg',     // 1024x832
            tablet: '/assets/Img/carousel/tablet/Tablet.jpg',          // 768x400
            mobile: '/assets/Img/carousel/mobile/Mobile.jpg',                // 576x350
            mobileSm: '/assets/Img/carousel/mobile/Mobile.jpg'               // 360x280
        },
        {
            desktop: '/assets/Img/carousel/desktop/Desktop_PC_1.jpg',    // 1920x800
            netbook: '/assets/Img/carousel/desktop/Desktop_PC_1.jpg',    // 1280x600
            laptop: '/assets/Img/carousel/desktop/Desktop_PC_1.jpg',     // 1024x832
            tablet: '/assets/Img/carousel/tablet/Tablet_1.jpg',          // 768x400
            mobile: '/assets/Img/carousel/mobile/Mobile_1.jpg',                // 576x350
            mobileSm: '/assets/Img/carousel/mobile/Mobile_1.jpg'               // 360x280
        },
        {
            desktop: '/assets/Img/carousel/desktop/Desktop_PC.jpg',    // 1920x800
            netbook: '/assets/Img/carousel/desktop/Desktop_PC.jpg',    // 1280x600
            laptop: '/assets/Img/carousel/desktop/Desktop_PC.jpg',     // 1024x832
            tablet: '/assets/Img/carousel/tablet/Tablet.jpg',          // 768x400
            mobile: '/assets/Img/carousel/mobile/Mobile.jpg',                // 576x350
            mobileSm: '/assets/Img/carousel/mobile/Mobile.jpg'               // 360x280
        }
    ];

    // Actualizar la estructura HTML con el nuevo breakpoint
    carousel.innerHTML = `
        <button class="carousel-arrow prev">&#10094;</button>
        ${slides.map(slide => `
            <div class="carousel-item">
                <picture>
                    <source media="(max-width: 360px)" srcset="${slide.mobileSm}">
                    <source media="(max-width: 576px)" srcset="${slide.mobile}">
                    <source media="(max-width: 768px)" srcset="${slide.tablet}">
                    <source media="(max-width: 1024px)" srcset="${slide.laptop}">
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
        updateSelectedProduct(modal);
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
    const modelSelect = modal.querySelector('#modalPhoneModel');
    const colorSelected = modal.querySelector('.modal-color-selected');
    const checkbox = modal.querySelector('.select-product');
    
    // Si hay productos seleccionados, usar esos
    if (selectedProducts.size > 0 && checkbox.checked) {
        const message = WHATSAPP_CONFIG.template(selectedProducts);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
        return;
    }
    
    // Si no, crear un mensaje con el producto actual y sus selecciones
    const currentSelection = {
        model: modelSelect?.value || '',
        color: getSelectedColorName(colorSelected) || ''
    };
    
    const tempMap = new Map();
    tempMap.set(currentProduct, currentSelection);
    
    const message = WHATSAPP_CONFIG.template(tempMap);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
}

function handleEmailButton() {
    const modal = document.getElementById('productModal');
    const currentProduct = modal.dataset.currentProduct;
    const modelSelect = modal.querySelector('#modalPhoneModel');
    const colorSelected = modal.querySelector('.modal-color-selected');
    const checkbox = modal.querySelector('.select-product');
    
    // Si hay productos seleccionados, usar esos
    if (selectedProducts.size > 0 && checkbox.checked) {
        const subject = EMAIL_CONFIG.subject(selectedProducts.size);
        const body = EMAIL_CONFIG.template(selectedProducts);
        window.location.href = `mailto:${EMAIL_CONFIG.address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        return;
    }
    
    // Si no, crear un mensaje con el producto actual y sus selecciones
    const currentSelection = {
        model: modelSelect?.value || '',
        color: getSelectedColorName(colorSelected) || ''
    };
    
    const tempMap = new Map();
    tempMap.set(currentProduct, currentSelection);
    
    const subject = EMAIL_CONFIG.subject(1);
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

function initializeNavigation() {
    // Usar IDs para asegurarnos de que sean únicos
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        // Eliminar eventos existentes para prevenir duplicación
        const newMenuToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
        
         // Añadir evento limpio
         newMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Hamburger clicked');
            
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Si el menú se está abriendo, resetear la vista de productos
            if (mobileMenu.classList.contains('active')) {
                resetProductsView();
            }
            
            // Controlar overflow
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Cerrar menú al hacer click en enlaces - con delegate
        document.querySelector('.mobile-nav').addEventListener('click', function(e) {
            if (e.target.classList.contains('nav-item')) {
                mobileMenu.classList.remove('active');
                newMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Cerrar al hacer click fuera
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                e.target !== newMenuToggle) {
                mobileMenu.classList.remove('active');
                newMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.error('Elementos del menú móvil no encontrados'); 
    }
    
    // Resto de la inicialización de navegación
}



// Añadir esta nueva función
function initializeSearchBar() {
    // Selectores separados para desktop y móvil
    const desktopSearch = document.querySelector('.search-bar input');
    const mobileSearch = document.querySelector('.mobile-search input');
    const productsSection = document.querySelector('.products-section');
    const loadMoreBtn = document.querySelector('.load-more');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Función común de búsqueda
    function handleSearch(searchTerm) {
        if (searchTerm === '') {
            resetProductsView();
            return;
        }

        loadAllProducts();
        
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
        
        loadMoreBtn.style.display = 'none';
        showNoResultsMessage(hasResults, productsSection);
    }

    // Desktop search functionality
    if (desktopSearch) {
        // Búsqueda en tiempo real
        desktopSearch.addEventListener('input', (e) => {
            handleSearch(e.target.value.toLowerCase().trim());
        });

        // Búsqueda con Enter
        desktopSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                scrollToProducts();
                desktopSearch.blur();
            }
        });
    }

    // Mobile search functionality
    if (mobileSearch) {
        mobileSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = mobileSearch.value.toLowerCase().trim();
                handleSearch(searchTerm);
                
                // Usar getElementById para mantener consistencia
                const mobileMenu = document.getElementById('mobileMenu');
                const menuToggle = document.getElementById('menuToggle');
                
                // Cerrar menú móvil
                if (mobileMenu && menuToggle) {
                    mobileMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    
                    // Forzar el ícono a su estado inicial
                    const menuIcon = menuToggle.querySelector('i');
                    if (menuIcon) {
                        menuIcon.className = 'fas fa-bars';
                    }
                    
                    document.body.style.overflow = '';
                }
                
                setTimeout(() => {
                    scrollToProducts();
                    mobileSearch.value = '';
                    mobileSearch.blur();
                }, 300);
            }
        });
    }

    // Función helper para scroll
    function scrollToProducts() {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const offset = headerHeight + navbarHeight + 20;
        
        const targetPosition = productsSection.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Restablecer productos al cerrar menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (!menuToggle.classList.contains('active')) {
                resetProductsView();
                if (mobileSearch) mobileSearch.value = '';
            }
        });
    }
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

// Modificar la estructura del selectedProducts Map
function updateSelectedProduct(modal) {
    const productTitle = modal.dataset.currentProduct;
    const modelSelect = modal.querySelector('#modalPhoneModel');
    const colorSelected = modal.querySelector('.modal-color-selected');
    const checkbox = modal.querySelector('.select-product');

    if (checkbox.checked) {
        // Crear un nuevo objeto para cada producto
        selectedProducts.set(productTitle, {
            model: modelSelect?.value || '',
            color: getSelectedColorName(colorSelected) || ''
        });
    } else {
        selectedProducts.delete(productTitle);
        resetModalSelections(modal);
    }

    updateButtonsText(modal.querySelectorAll('.modal-btn'));
    updateSelectedProductsList();
}

// Agregar esta función auxiliar
function getSelectedColorName(colorElement) {
    if (!colorElement || !colorElement.style.backgroundColor) return '';
    const rgb = colorElement.style.backgroundColor;
    const hex = rgb2hex(rgb);
    const color = phoneColors.find(c => c.hex.toLowerCase() === hex.toLowerCase());
    return color ? color.name : '';
}

// Agregar esta función auxiliar
function rgb2hex(rgb) {
    if (rgb.startsWith('#')) return rgb;
    const [r, g, b] = rgb.match(/\d+/g);
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

// Modifica la función updateSelectedProductsList
function updateSelectedProductsList() {
    const selectedItems = document.querySelectorAll('.selected-items');
    const selectedCounts = document.querySelectorAll('.selected-count');
    
    selectedCounts.forEach(count => {
        count.textContent = selectedProducts.size;
    });
    
    selectedItems.forEach(container => {
        container.innerHTML = '';
        
        selectedProducts.forEach((details, productName) => {
            const item = document.createElement('div');
            item.className = 'selected-item';
            
            let itemHTML = `<span>${productName}</span>`;
            if (details.model || details.color) {
                itemHTML += '<div class="selected-item-details">';
                if (details.model) itemHTML += `<small>Modelo: ${details.model}</small>`;
                if (details.color) itemHTML += `<small>Color: ${details.color}</small>`;
                itemHTML += '</div>';
            }
            
            item.innerHTML = `
                <div class="selected-item-content">
                    ${itemHTML}
                </div>
                <button class="remove-item" data-product="${productName}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            const removeBtn = item.querySelector('.remove-item');
            if (removeBtn) {
                removeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    selectedProducts.delete(productName);
                    
                    // Actualizar checkbox si el modal está abierto
                    const modal = document.getElementById('productModal');
                    if (modal.style.display === 'block' && 
                        modal.dataset.currentProduct === productName) {
                        const checkbox = modal.querySelector('.select-product');
                        if (checkbox) checkbox.checked = false;
                    }
                    
                    updateSelectedProductsList();
                    updateButtonsText(document.querySelectorAll('.modal-btn'));
                });
            }
            
            container.appendChild(item);
        });
    });
}

// Al inicio del archivo, después de las configuraciones globales
const phoneColors = [
    // Azules
    { name: 'Azul Marino', hex: '#000080' }
    ,{ name: 'Azul Cobalto', hex: '#0047AB' }
    ,{ name: 'Azul Zafiro', hex: '#0F52BA' }
    ,{ name: 'Azul Celeste', hex: '#87CEEB' }

    // Rojos
    ,{ name: 'Rojo Rubí', hex: '#E0115F' }
    ,{ name: 'Rojo Carmesí', hex: '#DC143C' }
    ,{ name: 'Rojo Borgoña', hex: '#800020' }
    ,{ name: 'Rojo Coral', hex: '#FF7F50' }

    // Verdes
    ,{ name: 'Verde Esmeralda', hex: '#50C878' }
    ,{ name: 'Verde Jade', hex: '#00A86B' }
    ,{ name: 'Verde Oliva', hex: '#808000' }
    ,{ name: 'Verde Menta', hex: '#98FF98' }

    // Morados/Violetas
    ,{ name: 'Púrpura Real', hex: '#7851A9' }
    ,{ name: 'Violeta', hex: '#8F00FF' }
    ,{ name: 'Lavanda', hex: '#E6E6FA' }
    ,{ name: 'Amatista', hex: '#9966CC' }

    // Metálicos
    ,{ name: 'Plata', hex: '#C0C0C0' }
    ,{ name: 'Titanio', hex: '#808080' }
    ,{ name: 'Bronce', hex: '#CD7F32' }
    ,{ name: 'Cobre', hex: '#B87333' }

    // Neóns
    ,{ name: 'Verde Neón', hex: '#39FF14' }
    ,{ name: 'Rosa Neón', hex: '#FF6EC7' }
    ,{ name: 'Naranja Neón', hex: '#FF5F1F' }
    ,{ name: 'Amarillo Neón', hex: '#FFFF00' }
    ,{ name: 'Azul Neón', hex: '#1B03A3' }
    ,{ name: 'Rojo Neón', hex: '#FF073A' }

    // Pasteles
    ,{ name: 'Rosa Pastel', hex: '#FFB6C1' }
    ,{ name: 'Azul Pastel', hex: '#AEC6CF' }
    ,{ name: 'Verde Pastel', hex: '#77DD77' }
    ,{ name: 'Amarillo Pastel', hex: '#FDFD96' }
    ,{ name: 'Lavanda Pastel', hex: '#E3E4FA' }
    ,{ name: 'Melocotón Pastel', hex: '#FFD1DC' }
    ,{ name: 'Menta Pastel', hex: '#98FF98' }
    ,{ name: 'Lima Pastel', hex: '#B2D300' }
    ,{ name: 'Lila Pastel', hex: '#D8BFD8' }

    // Negros
    ,{ name: 'Negro Medianoche', hex: '#141414' }
    ,{ name: 'Negro Espacial', hex: '#000000' }
    ,{ name: 'Negro Grafito', hex: '#1C1C1C' }
];

