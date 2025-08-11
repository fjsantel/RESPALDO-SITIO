// SEO Breadcrumbs Schema for Francisco Santelices Ariztía
// Director Audiovisual Santiago Chile - Motion Graphics & Producción

function addBreadcrumbSchema(pageName, pageUrl) {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Francisco Santelices - Director Audiovisual Chile",
                "item": "https://www.franciscosantelices.cl/"
            }
        ]
    };

    // Add current page to breadcrumb
    if (pageName && pageUrl) {
        breadcrumbSchema.itemListElement.push({
            "@type": "ListItem", 
            "position": 2,
            "name": pageName,
            "item": pageUrl
        });
    }

    // Create script tag with schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);
}

// Auto-detect page and add appropriate breadcrumb
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    const url = window.location.href;

    switch(path) {
        case '/portfolio.html':
            addBreadcrumbSchema('Portfolio Motion Graphics Chile', url);
            break;
        case '/bio.html':
            addBreadcrumbSchema('Biografía Director Audiovisual', url);
            break;
        case '/design.html':
            addBreadcrumbSchema('Diseño Gráfico Web Santiago', url);
            break;
        case '/photography.html':
            addBreadcrumbSchema('Fotografía Profesional Chile', url);
            break;
        default:
            addBreadcrumbSchema('Director Audiovisual Motion Graphics', url);
    }
});

// Add FAQ Schema for common questions
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "¿Qué servicios de motion graphics ofrece Francisco Santelices en Chile?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Francisco Santelices ofrece servicios completos de motion graphics en Chile incluyendo animación 2D/3D, gráficos en movimiento para videos corporativos, títulos animados, efectos visuales, y postproducción audiovisual profesional en Santiago y toda Chile."
            }
        },
        {
            "@type": "Question", 
            "name": "¿Cuál es la experiencia de Francisco Santelices como director audiovisual?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Francisco Santelices cuenta con más de 10 años de experiencia como director audiovisual en Chile, especializado en producción de documentales, videos corporativos, motion graphics, y contenido multimedia. Ha trabajado con instituciones como INDH y empresas reconocidas."
            }
        },
        {
            "@type": "Question",
            "name": "¿Qué incluye el servicio de producción audiovisual de Francisco Santelices?",
            "acceptedAnswer": {
                "@type": "Answer", 
                "text": "El servicio integral incluye: conceptualización, pre-producción, grabación, dirección audiovisual, postproducción, motion graphics, corrección de color, diseño de sonido y entrega final en formatos HD/4K. Servicio completo desde la idea hasta el producto terminado."
            }
        }
    ]
};

// Add FAQ schema to page
document.addEventListener('DOMContentLoaded', function() {
    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);
});