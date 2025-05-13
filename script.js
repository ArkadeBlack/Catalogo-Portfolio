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
        defaultImage: '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/18 BLACK.jpg',
        title: 'Funda Silicone Case Apple',
        description: 'Para Diferentes modelos de Apple 13, 14 y 15',
        price: '$10.00',
        colorImages: {
        'Papaya': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/49 PAPAYA.jpg',
        'Verde Menta': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/1 MINT.jpg',
        'Apricot': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/2 APRICOT.jpg',
        'Royal Blue': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/3 ROYAL BLUE.jpg',
        'Yellow': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/4 YELLOW.jpg',
        'Lila': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/5 LILA.jpg',
        'Light Pink': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/6 LIGHT PINK.jpg',
        'Lavander': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/7 LAVANDER.jpg',
        'Dark Blue': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/8 DARK BLUE.jpg',
        'White': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/9 WHITE.jpg',
        'Antique White': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/10 antique white.jpg',
        'Stone': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/11 STONE.jpg',
        'Pink': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/12 PINK.jpg',
        'Orange': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/13 ORANGE.jpg',
        'Red': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/14 RED.jpg',
        'Dark Gray': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/15 DARK GRAY.jpg',
        'Blue': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/16 BLUE.jpg',
        'Turquesa': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/17 TURQUOISE.jpg',
        'Negro': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/18 BLACK.jpg',
        'Pink Sand': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/19 PINK SAND.jpg',
        'Navy Blue': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/20 NAVY BLUE.jpg',
    'Sea Blue': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/21 SEA BLUE.jpg',
    'Offe': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/22 OFFE.jpg',
    'Pebble': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/23 PEBBLE.jpg',
    'Azure': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/24 AZURE.jpg',
    'Carmellia': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/25 CARMELLIA.jpg',
    'Mist Blue': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/26 MIST BLUE.jpg',
    'Flamingo': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/27 FLAMINGO.jpg',
    'Lavander Gray': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/28 LAVANDER GRAY.jpg',
    'Gold': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/29 GOLD.jpg',
    'Peach': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/30 PEACH.jpg',
    'China Red': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/31 CHINA RED.jpg',
    'Green': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/32 GREEN.jpg',
    'Brown': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/33 BROWN.jpg',
    'Purple': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/34 PURPLE.jpg',
    'Dark Olive': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/35 DARK OLIVE.jpg',
    'Cobalto Blue': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/36 BLUE COBALT.jpg',
    'Rose Gold': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/37 ROSE GOLD.jpg',
    'Shiny Pink': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/38 SHINY PINK.jpg',
    'Elegant Purple': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/39 ELEGANT PURPLE.jpg',
    'Shiny Green': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/40 SHINY GREEN.jpg',
    'Flash': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/41 FLASH.jpg',
    'Maroon': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/42 MAROON.jpg',
    'Grape': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/43 GRAPE.jpg',
    'Shiny Blue': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/44 SHINY BLUE.jpg',
    'Army Green': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/45 ARMY GREEN.jpg',
    'Cosmos Blue': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/46 COSMOS BLUE.jpg',
    'Spearmint': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/47 SPEARMINT.jpg',
    'Dragon Fruit': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/48 DRAGON FRUIT.jpg',
    'Mellow Yellow': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/51 MELLOW YELLOW.jpg',
    'Watermelon': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/52 WATERMELON.jpg',
    'Corn Flower': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/53 CORN FLOWER.jpg',
    'Atrovirens': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/54 ATROVIRENS.jpg',
    'Pino Green': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/55 PINE GREEN.jpg',
    'Bluebery': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/56 BLUEBERRY.jpg',
    'Plum': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 13-14-15/57 PLUM.jpg',
        },
        availableColors: [
        'Apricot', 'Royal Blue', 'Yellow', 'Lila', 'Light Pink',
        'Lavander', 'Dark Blue', 'White', 'Antique White', 'Stone',
        'Pink', 'Orange', 'Red', 'Dark Gray', 'Blue', 'Turquesa',
        'Negro', 'Pink Sand', 'Navy Blue', 'Sea Blue', 'Offe',
        'Pebble', 'Azure', 'Carmellia', 'Mist Blue', 'Flamingo',
        'Lavander Gray', 'Gold', 'Peach', 'China Red', 'Green',
        'Brown', 'Purple', 'Dark Olive', 'Cobalto Blue', 'Rose Gold',
        'Shiny Pink', 'Elegant Purple', 'Shiny Green', 'Flash', 
        'Maroon', 'Grape', 'Shiny Blue', 'Army Green', 'Cosmos Blue',
        'Spearmint', 'Dragon Fruit', 'Mellow Yellow', 'Watermelon',
        'Corn Flower', 'Atrovirens', 'Pino Green', 'Bluebery', 'Plum', 'Papaya', 'Verde Menta'

        ],
        availableModels: [
            'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
            'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
            'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 Mini',
        ]
    },{
        id: 2,
        defaultImage: '/assets/Img/product/BIODEGRADABLE/7.jpg',
        title: 'Funda Biodegradable',
        description: 'Para los modelos de iPhone',
        price: '$10.00',
        colorImages: {
            'Vermillion': '/assets/Img/product/BIODEGRADABLE/5.jpg',
            'Rosa Pastel': '/assets/Img/product/BIODEGRADABLE/1.jpg',
            'Amarillo Citrino': '/assets/Img/product/BIODEGRADABLE/8.jpg',
            'Verde Oliva': '/assets/Img/product/BIODEGRADABLE/3.jpg',
            'Verde Menta': '/assets/Img/product/BIODEGRADABLE/2.jpg',
            'Azul Espacial': '/assets/Img/product/BIODEGRADABLE/4.jpg',
            'Negro Onix': '/assets/Img/product/BIODEGRADABLE/6.jpg',
            'Blanco Dirty': '/assets/Img/product/BIODEGRADABLE/7.jpg',

        },
        availableColors: [
            'Vermillion','Rosa Pastel','Amarillo Citrino', 'Verde Oliva','Verde Menta', 'Azul Espacial', 'Negro Onix', 'Blanco Dirty'
        ],
        availableModels: [
            'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
            'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14'
        ]
    },
    {
        id: 3,
        image: '/assets/Img/product/POOF/1.jpg',
        title: 'Funda Poof',
        description: 'Para los modelos de iPhone',
        price: '$99.99',
        colorImages: {
            'Blanco Dirty': '/assets/Img/product/POOF/1.jpg',
            'Papaya': '/assets/Img/product/POOF/3.jpg',
            'Vermillion': '/assets/Img/product/POOF/2.jpg',
            'Verde Menta': '/assets/Img/product/POOF/4.jpg',
            'Diseño Unico': '/assets/Img/product/POOF/E1.jpg'

        },
        availableColors: [
            'Blanco Dirty','Papaya', 'Vermillion','Verde Menta', 'Diseño Unico'
        ],
        availableModels: [
            'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
            'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14'
        ]
    },
    {
        id: 4,
        defaultImage: '/assets/Img/product/WAVE/3.jpg',
        title: 'Funda Wave',
        description: 'Para los modelos de iPhone',
        price: '$10.00',
        colorImages: {
            'Blanco Dirty': '/assets/Img/product/WAVE/1.jpg',
            'Blanco Perla': '/assets/Img/product/WAVE/6.jpg',
            'Negro Espacial': '/assets/Img/product/WAVE/3.jpg',
            'Beige Profundo': '/assets/Img/product/WAVE/2.jpg',
            'Bronze Yellow': '/assets/Img/product/WAVE/4.jpg',
            'Dark Sienna': '/assets/Img/product/WAVE/5.jpg',
            'Medio Purple': '/assets/Img/product/WAVE/7.jpg',
        },
        availableColors: [
            'Blanco Dirty','Blanco Perla','Negro Espacial', 'Beige Profundo','Bronze Yellow', 'Dark Sienna', 'Medio Purple'
        ],
        availableModels: [
            'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
            'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14'
        ]
    },
    {
        id: 5,
        defaultImage: '/assets/Img/product/3en1/3en1.jpg',
        title: 'Funda 3 en 1',
        description: 'Para los modelos variados',
        price: '$10.00',
        colorImages: {
        },
        availableColors: [
            'Diseño Unico'
        ],
        availableModels: [
            'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15'
        ]
    },
    {
        id: 6,
        defaultImage: '/assets/Img/product/TRANSPARENTE/SAMSUNG/samsung.jpg',
        title: 'Funda Transparente Samsung',
        description: 'Para Diferentes modelos de Samsung',
        price: '$10.00',
        colorImages: {
        },
        availableColors: [
            'Transparente'
        ],
        availableModels: [
            'Samsung Galaxy S23 Ultra', 'Samsung Galaxy S23+', 'Samsung Galaxy S23',
        ]
    }, 
    {
        id: 7,
        defaultImage: '/assets/Img/product/TRANSPARENTE/XIAOMI/xiaomi.jpg',
        title: 'Funda Transparente Xiaomi',
        description: 'Para Diferentes modelos de Xiaomi',
        price: '$10.00',
        colorImages: {
        },
        availableColors: [
            'Transparente'
        ],
        availableModels: [
            'Xiaomi 13 Pro', 'Xiaomi 13', 'Xiaomi 13 Lite', 'Xiaomi 12 Pro', 'Xiaomi 12', 'Xiaomi 12 Lite'
        ]
    },
    {
        id: 8,
        defaultImage: '/assets/Img/product/TRANSPARENTE/MOTOROLA/motorola.jpg',
        title: 'Funda Transparente Motorola',
        description: 'Para Diferentes modelos de Motorola',
        price: '$10.00',
        colorImages: {
        },
        availableColors: [
            'Transparente'
        ],
        availableModels: [
            'Motorola Edge 40 Pro', 'Motorola Edge 40', 'Motorola Edge 40 Neo', 'Motorola Edge 30 Ultra', 'Motorola Edge 30 Fusion', 'Motorola Edge 30 Lite', 'Motorola Edge 20 Pro', 'Motorola Edge 20', 'Motorola Edge 20 Lite'
        ]
    },
    {
        id: 9,
        defaultImage: '/assets/Img/product/TRANSPARENTE/HUAWEI/huawei.jpg',
        title: 'Funda Transparente Huawei',
        description: 'Para Diferentes modelos de Huawei',
        price: '$10.00',
        colorImages: {
        },
        availableColors: [
            'Transparente'
        ],
        availableModels: [
            'Huawei P60 Pro', 'Huawei P60', 'Huawei P60 Lite', 'Huawei Mate 50 Pro', 'Huawei Mate 50', 'Huawei Mate 50 Lite'
        ]
    },
    {
        id: 10,
        defaultImage: '/assets/Img/product/TRANSPARENTE/APPLE/MAGSAFE/TM.jpg',
        title: 'Funda Transparente Apple MagSafe',
        description: 'Para Diferentes modelos de Apple MagSafe',
        price: '$10.00',
        colorImages: {
        },
        availableColors: [
            'Transparente'
        ],
        availableModels: [
            'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
        ]
    },
    {
        id: 11,
        defaultImage: '/assets/Img/product/TRANSPARENTE/APPLE/13-14-15-16/apple.jpg',
        title: 'Funda Transparente Apple',
        description: 'Para Diferentes modelos de Apple 13, 14, 15 y 16',
        price: '$10.00',
        colorImages: {
        },
        availableColors: [
            'Transparente'
        ],
        availableModels: [
            'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16',
            'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
            'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
            'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 Mini',
        ]
    },
    {
        id: 12,
        defaultImage: '/assets/Img/product/ACS/1.jpg',
        title: 'Funda Anti golpes con soporte',
        description: 'Para los modelos de iPhone',
        price: '$10.00',
        colorImages: {
            'Negro Onix': '/assets/Img/product/ACS/1.jpg',
        },
        availableColors: [
            'Negro Onix'
        ],
        availableModels: [
            'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
            'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14'
        ]
    },
   {
        id: 13,
        defaultImage: '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/3.jpg',
        title: 'Funda Silicone Case Apple 16',
        description: 'Para Diferentes modelos de Apple 16',
        price: '$10.00',
        colorImages: {
        'Papaya': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/49.jpg',
        'Verde Menta': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/1.jpg',
        'Apricot': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/2.jpg',
        'Royal Blue': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/3.jpg',
        'Yellow': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/4.jpg',
        'Lila': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/5.jpg',
        'Light Pink': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/6.jpg',
        'Lavander': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/7.jpg',
        'Dark Blue': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/8.jpg',
        'White': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/9.jpg',
        'Antique White': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/10.jpg',
        'Stone': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/11.jpg',
        'Pink': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/12.jpg',
        'Orange': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/13.jpg',
        'Red': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/14.jpg',
        'Dark Gray': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/15.jpg',
        'Blue': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/16.jpg',
        'Turquesa': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/17.jpg',
        'Negro': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/18.jpg',
        'Pink Sand': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/19.jpg',
        'Navy Blue': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/20.jpg',
        'Sea Blue': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/21.jpg',
        'Offe': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/22.jpg',
        'Pebble': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/23.jpg',
        'Azure': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/24.jpg',
        'Carmellia': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/25.jpg',
        'Mist Blue': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/26.jpg',
        'Flamingo': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/27.jpg',
        'Lavander Gray': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/28.jpg',
        'Gold': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/29.jpg',
        'Peach': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/30.jpg',
        'China Red': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/31.jpg',
        'Green': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/32.jpg',
        'Brown': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/33.jpg',
        'Purple': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/34.jpg',
        'Dark Olive': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/35.jpg',
        'Cobalto Blue': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/36.jpg',
        'Rose Gold': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/37.jpg',
        'Shiny Pink': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/38.jpg',
        'Elegant Purple': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/39.jpg',
        'Shiny Green': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/40.jpg',
        'Flash': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/41.jpg',
        'Maroon': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/42.jpg',
        'Grape': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/43.jpg',
        'Shiny Blue': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/44.jpg',
        'Army Green': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/45.jpg',
        'Cosmos Blue': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/46.jpg',
        'Spearmint': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/47.jpg',
        'Dragon Fruit': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/48.jpg',
        'Mellow Yellow': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/51.jpg',
        'Watermelon': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/52.jpg',
        'Corn Flower': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/53.jpg',
        'Atrovirens': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/54.jpg',
        'Pino Green': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/55.jpg',
        'Bluebery': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/56.jpg',
        'Plum': '/assets/Img/product/SILICONE CASE/APPLE/IPHONE 16/57.jpg'
        },
        availableColors: [
        'Apricot', 'Royal Blue', 'Yellow', 'Lila', 'Light Pink',
        'Lavander', 'Dark Blue', 'White', 'Antique White', 'Stone',
        'Pink', 'Orange', 'Red', 'Dark Gray', 'Blue', 'Turquesa',
        'Negro', 'Pink Sand', 'Navy Blue', 'Sea Blue', 'Offe',
        'Pebble', 'Azure', 'Carmellia', 'Mist Blue', 'Flamingo',
        'Lavander Gray', 'Gold', 'Peach', 'China Red', 'Green',
        'Brown', 'Purple', 'Dark Olive', 'Cobalto Blue', 'Rose Gold',
        'Shiny Pink', 'Elegant Purple', 'Shiny Green', 'Flash', 
        'Maroon', 'Grape', 'Shiny Blue', 'Army Green', 'Cosmos Blue',
        'Spearmint', 'Dragon Fruit', 'Mellow Yellow', 'Watermelon',
        'Corn Flower', 'Atrovirens', 'Pino Green', 'Bluebery', 'Plum', 'Papaya', 'Verde Menta'

        ],
        availableModels: [
             'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16',
        ]
    },
    {
        id: 14,
        defaultImage: '/assets/Img/product/SILICONE CASE/SAMSUNG/S23-24-25/4.jpg',
        title: 'Funda Silicone Case Samsung 23, 24 y 25',
        description: 'Para Diferentes modelos de Samsung',
        price: '$10.00',
        colorImages: {
            'Red': '/assets/Img/product/SILICONE CASE/SAMSUNG/S23-24-25/1.jpg',
            'Grape': '/assets/Img/product/SILICONE CASE/SAMSUNG/S23-24-25/2.jpg',
            'Pink': '/assets/Img/product/SILICONE CASE/SAMSUNG/S23-24-25/10.jpg',
            'Blanco Perla': '/assets/Img/product/SILICONE CASE/SAMSUNG/S23-24-25/4.jpg',
            'Black': '/assets/Img/product/SILICONE CASE/SAMSUNG/S23-24-25/5.jpg',
            'Verde Menta': '/assets/Img/product/SILICONE CASE/SAMSUNG/S23-24-25/6.jpg',
            'Mellow Yellow': '/assets/Img/product/SILICONE CASE/SAMSUNG/S23-24-25/7.jpg',
            'Drak Blue': '/assets/Img/product/SILICONE CASE/SAMSUNG/S23-24-25/8.jpg',
            'Dark Gray': '/assets/Img/product/SILICONE CASE/SAMSUNG/S23-24-25/9.jpg',
            'Flamingo': '/assets/Img/product/SILICONE CASE/SAMSUNG/S23-24-25/11.jpg',
            'Rosa Pastel': '/assets/Img/product/SILICONE CASE/SAMSUNG/S23-24-25/3.jpg',
            'Corn Flower': '/assets/Img/product/SILICONE CASE/SAMSUNG/S23-24-25/12.jpg',
            'Cosmos Blue': '/assets/Img/product/SILICONE CASE/SAMSUNG/S23-24-25/13.jpg',
            'Green': '/assets/Img/product/SILICONE CASE/SAMSUNG/S23-24-25/14.jpg',
            'Yellow': '/assets/Img/product/SILICONE CASE/SAMSUNG/S23-24-25/15.jpg',
        },
        availableColors: [
            'Red', 'Grape', 'Pink', 'Blanco Perla', 'Black', 'Verde Menta',
            'Mellow Yellow', 'Drak Blue', 'Dark Gray', 'Flamingo', 'Rosa Pastel', 'Corn Flower',
            'Cosmos Blue', 'Green', 'Yellow'
        ],
        availableModels: [
            'Samsung Galaxy S23+', 'Samsung Galaxy S23','Samsung Galaxy S24+',
            'Samsung Galaxy S24','Samsung Galaxy S25+', 'Samsung Galaxy S25',
            'Samsung Galaxy S23 FE', 'Samsung Galaxy S24 FE', 'Samsung Galaxy S25 FE',
        ]
    },
    {
        id: 15,
        defaultImage: '/assets/Img/product/SILICONE CASE/SAMSUNG/S-ULTRA/1.jpg',
        title: 'Funda Silicone Case Samsung Ultra',
        description: 'Para Diferentes modelos de Samsung Ultra',
        price: '$10.00',
        colorImages: {
            'Red': '/assets/Img/product/SILICONE CASE/SAMSUNG/S-ULTRA/1.jpg',
            'Grape': '/assets/Img/product/SILICONE CASE/SAMSUNG/S-ULTRA/2.jpg',
            'Pink': '/assets/Img/product/SILICONE CASE/SAMSUNG/S-ULTRA/10.jpg',
            'Blanco Perla': '/assets/Img/product/SILICONE CASE/SAMSUNG/S-ULTRA/5.jpg',
            'Black': '/assets/Img/product/SILICONE CASE/SAMSUNG/S-ULTRA/4.jpg',
            'Verde Menta': '/assets/Img/product/SILICONE CASE/SAMSUNG/S-ULTRA/6.jpg',
            'Mellow Yellow': '/assets/Img/product/SILICONE CASE/SAMSUNG/S-ULTRA/7.jpg',
            'Drak Blue': '/assets/Img/product/SILICONE CASE/SAMSUNG/S-ULTRA/8.jpg',
            'Dark Gray': '/assets/Img/product/SILICONE CASE/SAMSUNG/S-ULTRA/9.jpg',
            'Flamingo': '/assets/Img/product/SILICONE CASE/SAMSUNG/S-ULTRA/11.jpg',
            'Rosa Pastel': '/assets/Img/product/SILICONE CASE/SAMSUNG/S-ULTRA/3.jpg',
            'Corn Flower': '/assets/Img/product/SILICONE CASE/SAMSUNG/S-ULTRA/12.jpg',
            'Cosmos Blue': '/assets/Img/product/SILICONE CASE/SAMSUNG/S-ULTRA/13.jpg',
            'Green': '/assets/Img/product/SILICONE CASE/SAMSUNG/S-ULTRA/14.jpg',
            'Yellow': '/assets/Img/product/SILICONE CASE/SAMSUNG/S-ULTRA/15.jpg',
            'Lavander Gray': '/assets/Img/product/SILICONE CASE/SAMSUNG/S-ULTRA/16.jpg',
        },
        availableColors: [
            'Red', 'Grape', 'Pink', 'Blanco Perla', 'Black', 'Verde Menta',
            'Mellow Yellow', 'Drak Blue', 'Dark Gray', 'Flamingo', 'Rosa Pastel', 'Corn Flower',
            'Cosmos Blue', 'Green', 'Yellow', 'Lavander Gray'
        ],
        availableModels: [
            'Samsung Galaxy S23 Ultra', 'Samsung Galaxy S24 Ultra', 'Samsung Galaxy S25 Ultra',
            'Samsung Galaxy S23 FE Ultra', 'Samsung Galaxy S24 FE Ultra', 'Samsung Galaxy S25 FE Ultra'
        ]
    }
  
];

// Al inicio del archivo, después de las configuraciones globales
const phoneColors = [
    // Colores que sí están siendo utilizados
    { name: 'Azul Espacial', hex: '#1E3956' },
    { name: 'Vermillion', hex:'#d53f4b' },
    { name: 'Beige Profundo', hex: '#8d7f6f'},
    { name: 'Dark Sienna', hex: '#3f0e12' },
    { name: 'Amarillo Citrino', hex: '#dac70c' },
    { name: 'Papaya', hex: '#FF8000' },
    { name: 'Bronze Yellow', hex: '#7c740a' },
    { name: 'Verde Oliva', hex: '#565944' },
    { name: 'Verde Menta', hex: '#48b08b' },
    { name: 'Medio Purple', hex: '#db81b7' },
    { name: 'Rosa Pastel', hex: '#d9b39c' },
    { name: 'Negro Espacial', hex: '#000000' },
    { name: 'Negro Onix', hex: '#32353a' },
    { name: 'Blanco Dirty', hex: '#e0e2cd' },
    { name: 'Blanco Perla', hex: '#f5f5dc' },
    
    // Colores especiales
    { name: 'Transparente', hex: '' },
    { name: 'Diseño Unico', hex: '' },

    // Nuevos colores solicitados
    { name: 'Apricot', hex: '#FBCEB1' },
    { name: 'Royal Blue', hex: '#4169E1' },
    { name: 'Yellow', hex: '#ffe889' },
    { name: 'Lila', hex: '#C8A2C8' },
    { name: 'Light Pink', hex: '#FFB6C1' },
    { name: 'Lavander', hex: '#e6c2bb' },
    { name: 'Dark Blue', hex: '#00008B' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Antique White', hex: '#FAEBD7' },
    { name: 'Stone', hex: '#928E85' },
    { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Dark Gray', hex: '#312f30' },
    { name: 'Blue', hex: '#04b4ee' },
    { name: 'Turquesa', hex: '#40E0D0' },
    { name: 'Negro', hex: '#000000' },
    { name: 'Pink Sand', hex: '#F8C8B6' },
    { name: 'Navy Blue', hex: '#000080' },
    { name: 'Sea Blue', hex: '#04d6e1' },
    { name: 'Offe', hex: '#342e30' },
    { name: 'Pebble', hex: '#988d82' },
    { name: 'Azure', hex: '#007FFF' },
    { name: 'Carmellia', hex: '#FF6B81' },
    { name: 'Mist Blue', hex: '#B2FFFF' },
    { name: 'Flamingo', hex: '#fba887' },
    { name: 'Lavander Gray', hex: '#9284a5' },
    { name: 'Gold', hex: '#FFD700' },
    { name: 'Peach', hex: '#fb878a' },
    { name: 'China Red', hex: '#A8201A' },
    { name: 'Green', hex: '#88c88a' },
    { name: 'Brown', hex: '#844828' },
    { name: 'Purple', hex: '#1f1d6e' },
    { name: 'Dark Olive', hex: '#3b4b47' },
    { name: 'Cobalto Blue', hex: '#132866' },
    { name: 'Rose Gold', hex: '#B76E79' },
    { name: 'Shiny Pink', hex: '#FF69B4' },
    { name: 'Elegant Purple', hex: '#6A0DAD' },
    { name: 'Shiny Green', hex: '#00FF7F' },
    { name: 'Flash', hex: '#cae352' },
    { name: 'Maroon', hex: '#803740' },
    { name: 'Grape', hex: '#6F2DA8' },
    { name: 'Shiny Blue', hex: '#053ea4' },
    { name: 'Army Green', hex: '#4B5320' },
    { name: 'Cosmos Blue', hex: '#26619C' },
    { name: 'Spearmint', hex: '#3EB489' },
    { name: 'Dragon Fruit', hex: '#FD5DA8' },
    { name: 'Mellow Yellow', hex: '#F8DE7E' },
    { name: 'Watermelon', hex: '#FC6C85' },
    { name: 'Corn Flower', hex: '#6495ED' },
    { name: 'Atrovirens', hex: '#2F4F4F' },
    { name: 'Pino Green', hex: '#01796F' },
    { name: 'Bluebery', hex: '#fbbffb' },
    { name: 'Plum', hex: '#8E4585' }
];

// ================ FUNCIONES DEL MODAL ================
function openModal(productCard) {
    const modal = document.getElementById('productModal');
    const modalImg = modal.querySelector('.modal-img');
    const modalTitle = modal.querySelector('.modal-details h2');
    const modalDescription = modal.querySelector('.modal-description');
    const modalPrice = modal.querySelector('.modal-price');
    const checkbox = modal.querySelector('.select-product');
    
    // Resetear todas las selecciones primero
    resetModalSelections(modal);
    
    // Obtener datos del producto desde la card
    const img = productCard.querySelector('img');
    const productId = productCard.dataset.productId;
    const product = products.find(p => p.id == productId);
    const title = productCard.querySelector('h3');
    const description = productCard.querySelector('.product-details p:not(.price)');
    const price = productCard.querySelector('.price');
    
    // Actualizar contenido del modal
    modalImg.src = product ? (product.defaultImage || product.image) : img.src;
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


function resetModalSelections(modal) {
    // Resetear selector de modelo
    const modelSelect = modal.querySelector('#modalPhoneModel');
    if (modelSelect) {
        // Si hay options, seleccionar el primero
        if (modelSelect.options.length > 0) {
            modelSelect.selectedIndex = 0;
        }
    }

    // Resetear selector de color
    const colorSelected = modal.querySelector('.modal-color-selected');
    if (colorSelected) {
        colorSelected.style.backgroundColor = '';
        colorSelected.dataset.color = '';
    }
    
    // Resetear texto del color seleccionado
    const colorPreviewText = modal.querySelector('.modal-color-preview span');
    if (colorPreviewText) {
        colorPreviewText.textContent = 'Seleccionar color';
    }

    // Cerrar panel de colores si está abierto
    const colorPanel = modal.querySelector('.modal-color-panel');
    if (colorPanel) {
        colorPanel.classList.remove('active');
    }

    // Resetear la imagen a la original si existe
    const modalImg = modal.querySelector('.modal-img');
    if (modalImg && modalImg.dataset.originalSrc) {
        modalImg.src = modalImg.dataset.originalSrc;
        delete modalImg.dataset.originalSrc;
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

    // Buscar el producto actual para obtener sus opciones disponibles
    const currentProduct = products.find(p => p.title === productTitle);
    
    // Cargar modelos específicos para este producto
    if (currentProduct && currentProduct.availableModels && modelSelect) {
        // Limpiar opciones existentes
        modelSelect.innerHTML = '';
        
        // Agrupar modelos por marca (opcionalmente)
        const groupedModels = {};
        
        currentProduct.availableModels.forEach(model => {
            const brand = model.split(' ')[0]; // Obtener la marca
            if (!groupedModels[brand]) {
                groupedModels[brand] = [];
            }
            groupedModels[brand].push(model);
        });
        
        // Crear optgroups y options
        Object.entries(groupedModels).forEach(([brand, models]) => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = brand;
            
            models.forEach(model => {
                const option = document.createElement('option');
                option.value = model.toLowerCase().replace(/\s+/g, '-');
                option.textContent = model;
                optgroup.appendChild(option);
            });
            
            modelSelect.appendChild(optgroup);
        });
    }
    
    // El código existente para colores

    // Obtén una referencia al span antes de reemplazar el elemento
    const colorPreviewSpan = colorPreview.querySelector('span');

    // Primero resetear las selecciones
    resetModalSelections(modal);

    // 1. Eliminar listeners existentes para prevenir duplicación
    const newColorPreview = colorPreview.cloneNode(true);
    colorPreview.parentNode.replaceChild(newColorPreview, colorPreview);

    // 2. Agregar el evento de clic al nuevo elemento
    newColorPreview.addEventListener('click', function(e) {
        e.stopPropagation();
        colorPanel.classList.toggle('active');
    });
    
    // 3. Obtener los colores disponibles del producto actual
    let availableColors = phoneColors; // Por defecto, todos los colores
    
    // Si el producto tiene colores específicos, filtrarlos
    if (currentProduct && currentProduct.availableColors) {
        availableColors = phoneColors.filter(color => 
            currentProduct.availableColors.includes(color.name)
        );
    }
    
    // Vaciar el grid de colores
    if (colorsGrid) {
        colorsGrid.innerHTML = '';
        
        // Agrupar colores por categorías
        const colorCategories = {
            "Neón": [],
            "Básicos": []
        };
        
        // Clasificar colores disponibles en categorías
        availableColors.forEach(color => {
            if (color.name.includes('Neón')) {
                colorCategories["Neón"].push(color);
            } else {
                colorCategories["Básicos"].push(color);
            }
        });
        
        // Generar HTML para cada categoría que tenga colores
        for (const [category, colors] of Object.entries(colorCategories)) {
            if (colors.length > 0) {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'color-category';
                
                categoryDiv.innerHTML = `
                    <h4>${category}</h4>
                    <div class="color-options-row">
                        ${colors.map(color => `
                            <div class="color-option" 
                                style="background-color: ${color.hex}" 
                                data-color="${color.name}"
                                title="${color.name}">
                            </div>
                        `).join('')}
                    </div>
                `;
                
                colorsGrid.appendChild(categoryDiv);
            }
        }
        
        // Agregar listeners para los colores
        colorsGrid.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', function() {
                const colorName = this.dataset.color;
                const colorObject = phoneColors.find(c => c.name === colorName);
                
                if (colorObject) {
                    // Obtener referencia actualizada al elemento de color seleccionado
                    const updatedColorSelected = modal.querySelector('.modal-color-selected');
                    
                    // Actualizar color seleccionado con estilo importante
                    updatedColorSelected.style.cssText = `background-color: ${colorObject.hex} !important`;
                    updatedColorSelected.dataset.color = colorName;
                    
                    // Usar el nuevo objeto DOM
                    const newSpan = newColorPreview.querySelector('span');
                    if (newSpan) newSpan.textContent = colorName;

                    // NUEVO: Actualizar la imagen del producto según el color
                    updateProductImage(modal, colorName);
                    
                    // Cerrar el panel
                    colorPanel.classList.remove('active');
                }
            });
        });
    }

    // Remover listeners globales anteriores
    document.removeEventListener('click', window.colorClickOutsideHandler);
    
   // 3. Configurar un único listener global para cerrar al hacer clic fuera
   window.colorClickOutsideHandler = function(e) {
    if (!colorSelector.contains(e.target)) {
        colorPanel.classList.remove('active');
    }
};

document.addEventListener('click', window.colorClickOutsideHandler);

    // Restaurar valores si el producto está seleccionado
    if (selectedProducts.has(productTitle)) {
    const savedProduct = selectedProducts.get(productTitle);
    
    if (modelSelect && savedProduct.model) {
        // Buscar la opción que coincide con el modelo guardado
        for (let i = 0; i < modelSelect.options.length; i++) {
            if (modelSelect.options[i].textContent === savedProduct.model) {
                modelSelect.selectedIndex = i;
                break;
            }
        }
    }
    
        if (colorSelected && savedProduct.color) {
            const savedColor = phoneColors.find(c => c.name === savedProduct.color);
            if (savedColor) {
            colorSelected.style.backgroundColor = savedColor.hex;
            colorSelected.dataset.color = savedProduct.color;
            const newSpan = newColorPreview.querySelector('span');
            if (newSpan) newSpan.textContent = savedProduct.color;
            }
        }
    }
}

function updateProductImage(modal, colorName) {
    const productTitle = modal.dataset.currentProduct;
    const modalImg = modal.querySelector('.modal-img');
    const currentProduct = products.find(p => p.title === productTitle);
    
    // Si el producto no existe, salir
    if (!currentProduct) return;
    
    // Guardar la imagen original solo la primera vez
    if (!modalImg.dataset.originalSrc) {
        modalImg.dataset.originalSrc = currentProduct.defaultImage || currentProduct.image || modalImg.src;
    }
    
    if (currentProduct.colorImages && currentProduct.colorImages[colorName]) {
        // Cambiar a la imagen del color
        modalImg.src = currentProduct.colorImages[colorName];
    } else if (modalImg.dataset.originalSrc) {
        // Si no hay imagen para este color, volver a la original
        modalImg.src = modalImg.dataset.originalSrc;
    }
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

    // Usar siempre defaultImage y tener una imagen de respaldo
    const imagePath = product.defaultImage || product.image || '/assets/Img/placeholder.jpg';
    
   card.innerHTML = `
        <img src="${imagePath}" alt="${product.title}">
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
            desktop: './assets/Img/carousel/desktop/Desktop (1).webp',    // 1920x800
            netbook: '/assets/Img/carousel/netbook/Netbook (1).webp',    // 1280x600
            laptop: '/assets/Img/carousel/laptop/Laptop (1).webp',     // 1024x500
            tablet: '/assets/Img/carousel/tablet/Tablet (1).webp',     // 768x400
            mobileL: '/assets/Img/carousel/mobileL/Mobile L.webp',      // 425x350
            mobileM: '/assets/Img/carousel/mobileM/Mobile M.webp',      // 375x300
            mobileS: '/assets/Img/carousel/mobileS/Mobile S.webp'       // 320x250
        },
        {
            desktop: './assets/Img/carousel/desktop/Desktop.webp',    // 1920x800
            netbook: '/assets/Img/carousel/netbook/Netbook.webp',    // 1280x600
            laptop: '/assets/Img/carousel/laptop/Laptop.webp',     // 1024x500
            tablet: '/assets/Img/carousel/tablet/Tablet.webp',     // 768x400
            mobileL: '/assets/Img/carousel/mobileL/Mobile-L.webp',      // 425x350
            mobileM: '/assets/Img/carousel/mobileM/Mobile-M.webp',      // 375x300
            mobileS: '/assets/Img/carousel/mobileS/Mobile-S_1.webp'       // 320x250
        },
        {
            desktop: './assets/Img/carousel/desktop/Desktop2.webp',    // 1920x800
            netbook: '/assets/Img/carousel/netbook/Netbook2.webp',    // 1280x600
            laptop: '/assets/Img/carousel/laptop/Laptop2.webp',     // 1024x500
            tablet: '/assets/Img/carousel/tablet/Tablet2.webp',     // 768x400
            mobileL: '/assets/Img/carousel/mobileL/Mobilel2.webp',      // 425x350
            mobileM: '/assets/Img/carousel/mobileM/Mobilem2.webp',      // 375x300
            mobileS: '/assets/Img/carousel/mobileS/Mobiles2.webp'       // 320x250
        },
    ];

    // Actualizar la estructura HTML con el nuevo breakpoint
    carousel.innerHTML = `
    <button class="carousel-arrow prev">&#10094;</button>
    ${slides.map(slide => `
        <div class="carousel-item">
            <picture>
                <source media="(max-width: 320px)" srcset="${slide.mobileS}">
                <source media="(max-width: 375px)" srcset="${slide.mobileM}">
                <source media="(max-width: 425px)" srcset="${slide.mobileL}">
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
        if (modal && window.getComputedStyle(modal).display !== 'none') {
            const checkbox = modal.querySelector('.select-product');
            if (checkbox) checkbox.checked = false;
            
            // Limpiar selecciones visuales del modal
            resetModalSelections(modal);
        }
        
        // Limpiar selección visual en todas las product cards
        document.querySelectorAll('.product-card').forEach(card => {
            card.classList.remove('selected');
        });
    
        // Actualizar texto de los botones en el modal
        const modalButtons = document.querySelectorAll('.modal-btn');
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
            model: modelSelect?.options[modelSelect.selectedIndex]?.textContent || '',
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
                // Agregar un salto de línea antes del color
                if (details.color) itemHTML += `<small style="display: block;">Color: ${details.color}</small>`;
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

    updateMobileCart();
    updateButtonsText(document.querySelectorAll('.modal-btn'));
}

// Manejo del carrito móvil
document.addEventListener('DOMContentLoaded', function() {
    const mobileCartToggle = document.querySelector('.mobile-menu .mobile-cart-toggle');
    const mobileDropdownContent = document.querySelector('.mobile-menu .mobile-dropdown-content');
    
    if (mobileCartToggle && mobileDropdownContent) {
        mobileCartToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que se cierre el menú hamburguesa
            mobileDropdownContent.classList.toggle('active');
            mobileCartToggle.classList.toggle('active');
            
            // Actualizar los items del carrito móvil
            updateMobileCart();
        });
        
        // Manejar clics dentro del dropdown para evitar propagación
        mobileDropdownContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Configurar el botón para limpiar selección
        const mobileClear = mobileDropdownContent.querySelector('.clear-all');
        if (mobileClear) {
        mobileClear.addEventListener('click', function(e) {
        e.stopPropagation();
        // Llamar a la función existente de limpieza
        selectedProducts.clear();
        updateSelectedProductsList();
        
        // Actualizar checkbox en modal si está abierto
        const modal = document.getElementById('productModal');
        if (modal && window.getComputedStyle(modal).display !== 'none') {
            const checkbox = modal.querySelector('.select-product');
            if (checkbox) checkbox.checked = false;
            
            // Limpiar selecciones visuales del modal
            resetModalSelections(modal);
        }
        
        // Limpiar selección visual en product cards
        document.querySelectorAll('.product-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Cerrar el dropdown
        mobileDropdownContent.classList.remove('active');
        mobileCartToggle.classList.remove('active');

        updateButtonsText(document.querySelectorAll('.modal-btn'));
    });
}
        
        // Configurar el botón para consultar por WhatsApp
        const mobileConsult = mobileDropdownContent.querySelector('.consult-selected');
        if (mobileConsult) {
            mobileConsult.addEventListener('click', function(e) {
                e.stopPropagation();
                // Llamar a la función existente para enviar WhatsApp
                if (selectedProducts.size > 0) {
                    const message = WHATSAPP_CONFIG.template(selectedProducts);
                    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
                }
                mobileDropdownContent.classList.remove('active');
                mobileCartToggle.classList.remove('active');
            });
        }
    }
});

function updateMobileCart() {
    const mobileSelectedItems = document.querySelector('.mobile-menu .selected-items');
    const desktopSelectedItems = document.querySelector('.dropdown-content .selected-items');
    
    if (mobileSelectedItems && desktopSelectedItems) {
        // Sincronizar contenido
        mobileSelectedItems.innerHTML = desktopSelectedItems.innerHTML;
        
        // Volver a añadir listeners a los botones de eliminar
        mobileSelectedItems.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const productName = this.dataset.product;
                
                // Eliminar producto
                selectedProducts.delete(productName);
                
                // Actualizar ambos carritos
                updateSelectedProductsList();
                
                // Actualizar checkbox en modal si está abierto
                const modal = document.getElementById('productModal');
                if (modal && window.getComputedStyle(modal).display !== 'none' && 
                    modal.dataset.currentProduct === productName) {
                    const checkbox = modal.querySelector('.select-product');
                    if (checkbox) checkbox.checked = false;
                    
                    // Limpiar selecciones visuales del modal
                    resetModalSelections(modal);
                }
                
                // Actualizar product cards
                document.querySelectorAll('.product-card').forEach(card => {
                    const cardTitle = card.querySelector('h3')?.textContent;
                    if (cardTitle === productName) {
                        card.classList.remove('selected');
                    }
                });
            });
        });
    }
    
    // Sincronizar contadores
    const mobileCounts = document.querySelectorAll('.mobile-cart .selected-count');
    const desktopCount = document.querySelector('.nav-actions .selected-count');
    
    if (desktopCount && mobileCounts.length) {
        const count = desktopCount.textContent;
        mobileCounts.forEach(counter => {
            counter.textContent = count;
        });
    }
}