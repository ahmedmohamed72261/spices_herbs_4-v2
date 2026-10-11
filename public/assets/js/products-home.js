/**
 * Products integration for home page
 * Handles the 'Featured Works' and 'Our Projects' sections
 */

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch products from API
        const products = await ApiService.getProducts();
        
        // Get only the first 6 products for display
        const featuredProducts = products.slice(0, 6);
        
        // Update the 'Our Projects' section
        updateProjectsSection(featuredProducts);
        
    } catch (error) {
        console.error('Error loading products on home page:', error);
    }
});

/**
 * Initialize fullscreen preview for the Home 'Featured Works / Our Projects' section
 * Only triggers when clicking the zoom icon; title shown above image, responsive
 */
function initializeHomeFullscreen() {
    try {
        if (typeof $ === 'undefined' || typeof $.magnificPopup === 'undefined') return;
        // Inject styles if not present (shared id)
        if (!document.getElementById('ksh-lightbox-styles')) {
            const style = document.createElement('style');
            style.id = 'ksh-lightbox-styles';
            style.textContent = `
            .ksh-lightbox .mfp-bg { background: rgba(0,0,0,0.92); }
            .ksh-lightbox .mfp-container { padding: 0 16px; }
            .ksh-lightbox img.mfp-img { max-height: calc(100vh - 160px); width: auto; margin: 100px auto 40px; }
            .ksh-lightbox .mfp-figure:after { box-shadow: none; background: transparent; }
            .ksh-lightbox .mfp-title { position: fixed; left: 0; right: 0; top: 0; padding: 14px 20px; font-size: 18px; font-weight: 700; color: #fff; text-align: center; background: linear-gradient(rgba(0,0,0,.85), transparent); }
            .ksh-lightbox .mfp-close { color: #fff; opacity: .95; right: 16px; top: 16px; }
            .ksh-lightbox .mfp-counter { color: #fff; left: 16px; top: 16px; }
            .ksh-lightbox .mfp-arrow { opacity: .95; }
            .ksh-lightbox .mfp-arrow:before, .ksh-lightbox .mfp-arrow:after { border-top-width: 16px; border-bottom-width: 16px; }
            @media (max-width: 576px) {
                .ksh-lightbox img.mfp-img { max-height: calc(100vh - 140px); margin: 90px auto 30px; }
                .ksh-lightbox .mfp-title { font-size: 16px; padding: 12px 14px; }
            }
            `;
            document.head.appendChild(style);
        }

        const $container = $('.portfolio-section .row');
        if (!$container.length) return;

        const zoomSelector = 'a.portfolio-zoom-icon';
        $container.off('click.mfp.home', zoomSelector).on('click.mfp.home', zoomSelector, function (e) {
            e.preventDefault();
            const $cards = $container.find('.product-card');
            const items = $cards.map(function () {
                const card = this;
                const img = card.querySelector('img');
                const titleEl = card.querySelector('.product-title');
                const titleText = titleEl ? titleEl.textContent.trim() : (img?.alt || '');
                return { src: img?.getAttribute('src') || img?.getAttribute('data-src'), title: titleText };
            }).get();
            const clickedCard = e.currentTarget.closest('.product-card');
            const index = $cards.index(clickedCard);
            $.magnificPopup.open({
                items,
                type: 'image',
                gallery: { enabled: true, navigateByImgClick: true, preload: [0,1] },
                mainClass: 'mfp-fade ksh-lightbox',
                removalDelay: 200,
                fixedContentPos: true,
                closeBtnInside: false,
                image: { verticalFit: true, titleSrc: function(item){ return item.data && item.data.title ? item.data.title : item.title; } },
                callbacks: { elementParse: function(item){ item.data = { title: item.title }; } }
            }, index);
        });
    } catch (err) {
        console.error('Error initializing home fullscreen preview:', err);
    }
}

/**
 * Update the Projects section with product data
 * @param {Array} products - Array of products to display
 */
function updateProjectsSection(products) {
    const projectsContainer = document.querySelector('.portfolio-section .row');
    
    // Keep the section title div (first child)
    const sectionTitle = projectsContainer.querySelector('.section-title').parentElement;
    
    // Clear existing portfolio items except the section title
    while (projectsContainer.children.length > 1) {
        projectsContainer.removeChild(projectsContainer.lastChild);
    }
    
    // Add products to the projects section
    products.forEach(product => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'col-lg-4 col-md-6 p-2';
        const productId = product._id || product.id;
        portfolioItem.innerHTML = `
            <div class="portfolio-item product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="portfolio-content-overlay">
                    <h3 class="product-title"><a href="product-details.html?id=${productId}">${product.name}</a></h3>
                    <p>${product.category.name}</p>
                    <div class="portfolio-actions">
                        <a class="portfolio-link-icon" href="product-details.html?id=${productId}" title="View Details"><i class="bi bi-arrow-right"></i></a>
                        <a class="portfolio-zoom-icon" href="#" title="View Fullscreen"><i class="bi bi-arrows-fullscreen"></i></a>
                    </div>
                </div>
            </div>
        `;
        projectsContainer.appendChild(portfolioItem);
    });
    
    // Add 'View All Products' button
    const viewAllContainer = document.createElement('div');
    viewAllContainer.className = 'col-lg-12 col-md-12 text-center mt-4';
    viewAllContainer.innerHTML = `
        <a href="products.html" class="default-btn mt-5">View All Products <span></span></a>
    `;
    projectsContainer.appendChild(viewAllContainer);

    // Enable fullscreen on zoom icon
    initializeHomeFullscreen();
}