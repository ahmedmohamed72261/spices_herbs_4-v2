/**
 * Products Page Manager - Professional Implementation
 * Handles product listing, category filtering, and product interactions
 * Fixes: Loading issues, filtering problems, and duplicate product displays
 */

class ProductsPageManager {
    constructor() {
        this.products = [];
        this.categories = [];
        this.currentFilter = 'all';
        this.isLoading = false;
        this.initialized = false;
        
        // DOM element cache
        this.elements = {
            portfolioContainer: null,
            categoryFilters: null,
            sectionTitle: null
        };
        
        // Bind methods to preserve context
        this.handleCategoryFilter = this.handleCategoryFilter.bind(this);
        this.handleProductZoom = this.handleProductZoom.bind(this);
    }

    /**
     * Initialize the products page
     */
    async init() {
        if (this.initialized) return;
        
        try {
            this.cacheElements();
            if (!this.elements.portfolioContainer) {
                console.warn('Portfolio container not found');
                return;
            }

            this.showLoading();
            await this.loadData();
            this.createCategoryFilters();
            this.renderProducts();
            this.setupEventListeners();
            this.initializeLightbox();
            this.hideLoading();
            
            this.initialized = true;
            console.log('Products page initialized successfully');
        } catch (error) {
            console.error('Error initializing products page:', error);
            this.showError('Failed to load products. Please refresh the page.');
            this.hideLoading();
        }
    }

    /**
     * Cache DOM elements for better performance
     */
    cacheElements() {
        this.elements.portfolioContainer = document.querySelector('#products-grid');
        this.elements.categoryFilters = document.querySelector('.category-filters');
        
        // Find section title element
        const sectionTitleEl = document.querySelector('.section-title');
        this.elements.sectionTitle = sectionTitleEl ? sectionTitleEl.parentElement : null;
        
        // Log element cache status for debugging
        console.log('Element cache status:', {
            portfolioContainer: !!this.elements.portfolioContainer,
            categoryFilters: !!this.elements.categoryFilters,
            sectionTitle: !!this.elements.sectionTitle
        });
    }

    /**
     * Load products and categories data
     */
    async loadData() {
        const [products, categories] = await Promise.all([
            ApiService.getProducts(),
            ApiService.getCategories()
        ]);
        
        this.products = products || [];
        this.categories = categories || [];
        
        if (this.products.length === 0) {
            throw new Error('No products found');
        }
    }

    /**
     * Create category filter buttons
     */
    createCategoryFilters() {
        if (!this.elements.categoryFilters) {
            // If category filters element doesn't exist, try to find it again
            this.elements.categoryFilters = document.querySelector('.category-filters');
            if (!this.elements.categoryFilters) {
                console.error('Category filters container not found');
                return;
            }
        }
        
        // Clear existing filters
        this.elements.categoryFilters.innerHTML = '';
        
        // Create "All Products" button
        const allButton = this.createFilterButton('all', 'All Products', this.products.length, true);
        this.elements.categoryFilters.appendChild(allButton);
        
        // Create category buttons
        this.categories.forEach(category => {
            const count = this.products.filter(p => p.category.slug === category.slug).length;
            const button = this.createFilterButton(category.slug, category.name, count, false);
            this.elements.categoryFilters.appendChild(button);
        });
        
        console.log('Category filters created successfully');
    }

    /**
     * Create a single filter button
     */
    createFilterButton(slug, name, count, isActive) {
        const button = document.createElement('button');
        button.className = `category-filter-btn ${isActive ? 'active' : ''}`;
        button.setAttribute('data-category', slug);
        button.textContent = `${name} (${count})`;
        return button;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Category filter events (using event delegation)
        if (this.elements.categoryFilters) {
            this.elements.categoryFilters.addEventListener('click', this.handleCategoryFilter);
        }
        
        // Product zoom events (using event delegation)
        if (this.elements.portfolioContainer) {
            this.elements.portfolioContainer.addEventListener('click', this.handleProductZoom);
        }
    }

    /**
     * Handle category filter clicks
     */
    async handleCategoryFilter(event) {
        const button = event.target.closest('.category-filter-btn');
        if (!button || this.isLoading) return;
        
        event.preventDefault();
        
        const category = button.getAttribute('data-category');
        if (category === this.currentFilter) return;
        
        try {
            this.isLoading = true;
            this.currentFilter = category;
            
            // Update active button
            this.elements.categoryFilters.querySelectorAll('.category-filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // Show loading and render filtered products
            this.showLoading();
            await this.renderProducts();
            this.hideLoading();
        } catch (error) {
            console.error('Error filtering products:', error);
            this.showError('Failed to filter products. Please try again.');
            this.hideLoading();
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Handle product zoom clicks
     */
    handleProductZoom(event) {
        const zoomButton = event.target.closest('.portfolio-zoom-icon');
        if (!zoomButton) return;
        
        event.preventDefault();
        // Magnific Popup will handle the rest via its own event system
    }

    /**
     * Render products based on current filter
     */
    async renderProducts() {
        if (!this.elements.portfolioContainer) return;
        
        // Get filtered products
        const filteredProducts = this.getFilteredProducts();
        
        // Clear existing products (preserve section title)
        this.clearProducts();
        
        if (filteredProducts.length === 0) {
            this.showNoProducts();
            return;
        }
        
        // Create document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        filteredProducts.forEach(product => {
            const productElement = this.createProductElement(product);
            fragment.appendChild(productElement);
        });
        
        // Append all products at once
        this.elements.portfolioContainer.appendChild(fragment);
        
        // Refresh AOS animations
        this.refreshAOS();
        
        // Re-initialize lightbox for new elements
        this.initializeLightbox();
    }

    /**
     * Get filtered products based on current filter
     */
    getFilteredProducts() {
        if (this.currentFilter === 'all') {
            return this.products;
        }
        return this.products.filter(product => product.category.slug === this.currentFilter);
    }

    /**
     * Clear existing products while preserving section title
     */
    clearProducts() {
        const children = Array.from(this.elements.portfolioContainer.children);
        children.forEach(child => {
            // Keep section title and category filters
            if (child !== this.elements.sectionTitle && 
                !child.classList.contains('category-filters') &&
                !child.classList.contains('loading-container')) {
                child.remove();
            }
        });
    }

    /**
     * Create a single product element
     */
    createProductElement(product) {
        const productId = product._id || product.id;
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 px-2 mb-4';
        col.setAttribute('data-category', product.category.slug);
        col.setAttribute('data-aos', 'fade-up');
        
        col.innerHTML = `
            <div class="portfolio-item product-card" 
                 data-description="${this.escapeHtml(product.description || 'High-quality product from Kingdom Spices Herbs')}" 
                 data-details='["Premium Quality", "Export Grade", "${this.escapeHtml(product.category.name)}"]'>
                <img src="${product.image}" 
                     alt="${this.escapeHtml(product.name)}" 
                     onerror="this.src='assets/img/placeholder.jpg'">
                <div class="portfolio-content-overlay">
                    <h3 class="product-title">
                        <a href="product-details.html?id=${productId}">${this.escapeHtml(product.name)}</a>
                    </h3>
                    <p>${this.escapeHtml(product.category.name)}</p>
                    <div class="portfolio-actions">
                        <a class="portfolio-link-icon" 
                           href="product-details.html?id=${productId}" 
                           title="View Details">
                            <i class="bi bi-arrow-right"></i>
                        </a>
                        <a class="portfolio-zoom-icon" 
                           href="${product.image}" 
                           title="View Fullscreen">
                            <i class="bi bi-arrows-fullscreen"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        return col;
    }

    /**
     * Show loading state
     */
    showLoading() {
        if (window.loadingManager) {
            window.loadingManager.showMainLoader();
        } else {
            this.createCustomLoader();
        }
    }

    /**
     * Hide loading state
     */
    hideLoading() {
        if (window.loadingManager) {
            window.loadingManager.hideMainLoader();
        } else {
            this.removeCustomLoader();
        }
        
        // Also remove any loading placeholders in the products grid
        const loadingPlaceholder = document.querySelector('.loading-placeholder');
        if (loadingPlaceholder) {
            loadingPlaceholder.remove();
        }
    }

    /**
     * Create custom loading indicator
     */
    createCustomLoader() {
        let loader = this.elements.portfolioContainer.querySelector('.loading-container');
        if (!loader) {
            loader = document.createElement('div');
            loader.className = 'loading-container col-12 text-center py-5';
            loader.innerHTML = `
                <div class="loading-spinner"></div>
                <div class="loading-text mt-3">Loading products...</div>
            `;
            this.elements.portfolioContainer.appendChild(loader);
        }
        loader.style.display = 'block';
    }

    /**
     * Remove custom loading indicator
     */
    removeCustomLoader() {
        const loader = this.elements.portfolioContainer.querySelector('.loading-container');
        if (loader) {
            loader.remove();
        }
    }

    /**
     * Show no products message
     */
    showNoProducts() {
        const message = document.createElement('div');
        message.className = 'col-12 text-center py-5';
        message.innerHTML = `
            <div class="no-products-message">
                <i class="bi bi-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h4>No products found</h4>
                <p>No products available in this category.</p>
            </div>
        `;
        this.elements.portfolioContainer.appendChild(message);
    }

    /**
     * Show error message
     */
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'col-12 text-center py-5';
        errorDiv.innerHTML = `
            <div class="error-message text-danger">
                <i class="bi bi-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h4>Error</h4>
                <p>${this.escapeHtml(message)}</p>
                <button class="btn btn-primary mt-3" onclick="location.reload()">Retry</button>
            </div>
        `;
        this.elements.portfolioContainer.appendChild(errorDiv);
    }

    /**
     * Initialize Magnific Popup for product images
     */
    initializeLightbox() {
        if (typeof $ === 'undefined' || typeof $.magnificPopup === 'undefined') {
            console.warn('Magnific Popup not available');
            return;
        }

        // Inject styles first
        this.injectLightboxStyles();

        // Use event delegation for dynamic content
        const $container = $('.portfolio-section .container .row');
        const zoomSelector = 'a.portfolio-zoom-icon';
        
        // Remove existing handlers to prevent duplicates
        $container.off('click.mfp', zoomSelector);
        
        // Add new click handler with event delegation
        $container.on('click.mfp', zoomSelector, function (e) {
            e.preventDefault();
            
            const $cards = $container.find('.product-card');
            const items = $cards.map(function () {
                const card = this;
                const img = card.querySelector('img');
                const titleEl = card.querySelector('.product-title a') || card.querySelector('.product-title');
                const categoryEl = card.querySelector('.portfolio-content-overlay p');
                const titleText = titleEl ? titleEl.textContent.trim() : (img?.alt || '');
                const categoryText = categoryEl ? categoryEl.textContent.trim() : '';
                
                return { 
                    src: img?.getAttribute('src') || img?.getAttribute('data-src'), 
                    title: `<div class="preview-title">${titleText}</div><div class="preview-category">${categoryText}</div>`
                };
            }).get();
            
            const clickedCard = e.currentTarget.closest('.product-card');
            const index = $cards.index(clickedCard);
            
            $.magnificPopup.open({
                items: items,
                type: 'image',
                gallery: { 
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1]
                },
                mainClass: 'mfp-fade ksh-lightbox',
                removalDelay: 200,
                fixedContentPos: true,
                closeBtnInside: false,
                image: {
                    verticalFit: true,
                    titleSrc: function(item) {
                        return item.data && item.data.title ? item.data.title : item.title;
                    }
                },
                callbacks: {
                    elementParse: function(item) {
                        item.data = { title: item.title };
                    }
                }
            }, index);
        });
    }

    /**
     * Inject custom lightbox styles
     */
    injectLightboxStyles() {
        if (document.getElementById('ksh-lightbox-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'ksh-lightbox-styles';
        style.textContent = `
            .ksh-lightbox .mfp-bg { background: rgba(0,0,0,0.92); }
            .ksh-lightbox .mfp-container { padding: 0 16px; }
            .ksh-lightbox img.mfp-img { 
                max-height: calc(100vh - 160px); 
                width: auto; 
                margin: 100px auto 40px; 
            }
            .ksh-lightbox .mfp-figure:after { 
                box-shadow: none; 
                background: transparent; 
            }
            .ksh-lightbox .mfp-title { 
                position: fixed; 
                left: 0; 
                right: 0; 
                top: 0; 
                padding: 14px 20px; 
                font-size: 18px; 
                font-weight: 700; 
                color: #fff; 
                text-align: center; 
                background: linear-gradient(rgba(0,0,0,.85), transparent); 
            }
            .ksh-lightbox .mfp-title .preview-title {
                font-size: 20px;
                font-weight: 700;
                margin-bottom: 5px;
                color: #fff;
            }
            .ksh-lightbox .mfp-title .preview-category {
                font-size: 14px;
                font-weight: 400;
                color: #ccc;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .ksh-lightbox .mfp-close { 
                color: #fff; 
                opacity: .95; 
                right: 16px; 
                top: 16px; 
            }
            .ksh-lightbox .mfp-counter { 
                color: #fff; 
                left: 16px; 
                top: 16px; 
            }
            .ksh-lightbox .mfp-arrow { opacity: .95; }
            @media (max-width: 576px) {
                .ksh-lightbox img.mfp-img { 
                    max-height: calc(100vh - 140px); 
                    margin: 90px auto 30px; 
                }
                .ksh-lightbox .mfp-title { 
                    font-size: 16px; 
                    padding: 12px 14px; 
                }
                .ksh-lightbox .mfp-title .preview-title {
                    font-size: 18px;
                }
                .ksh-lightbox .mfp-title .preview-category {
                    font-size: 12px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Refresh AOS animations
     */
    refreshAOS() {
        if (typeof AOS !== 'undefined') {
            setTimeout(() => {
                AOS.refresh();
            }, 100);
        }
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Update page title
     */
    updatePageTitle(title) {
        const pageTitleElement = document.querySelector('.page-title-content h2');
        if (pageTitleElement) pageTitleElement.textContent = title;

        const breadcrumbElement = document.querySelector('.page-title-content ul li:last-child');
        if (breadcrumbElement) breadcrumbElement.textContent = title;
    }
}

// Homepage Recent Work Section Handler
class RecentWorkManager {
    static async init() {
        try {
            const container = document.getElementById('recent-products-container');
            if (!container) return;

            const products = await ApiService.getProducts();
            const displayProducts = products.slice(0, 6);

            container.innerHTML = '';
            const fragment = document.createDocumentFragment();

            displayProducts.forEach(product => {
                const productId = product._id || product.id;
                const col = document.createElement('div');
                col.className = 'col-lg-4 col-md-6 my-5';
                col.setAttribute('data-aos', 'fade-up');

                col.innerHTML = `
                    <div class="protfolio-single-box">
                        <div class="protfolio-thumb">
                            <img src="${product.image}" 
                                 alt="${RecentWorkManager.escapeHtml(product.name)}"
                                 onerror="this.src='assets/img/placeholder.jpg'">
                            <div class="protfolio-icon">
                                <a href="product-details.html?id=${productId}">
                                    <img src="assets/img/work-icon.png" alt="work icon">
                                </a>
                            </div>
                        </div>
                        <div class="protfolio-content">
                            <div class="protfolio-title">
                                <h3><a href="product-details.html?id=${productId}">${RecentWorkManager.escapeHtml(product.name)}</a></h3>
                            </div>
                            <div class="protfolio-description">
                                <p>${RecentWorkManager.escapeHtml(product.category.name)} - ${RecentWorkManager.formatDate(product.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                `;
                fragment.appendChild(col);
            });

            container.appendChild(fragment);
            
            // Refresh AOS
            if (typeof AOS !== 'undefined') {
                setTimeout(() => AOS.refresh(), 100);
            }
        } catch (error) {
            console.error('Error initializing Recent Work section:', error);
        }
    }

    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    static formatDate(dateString) {
        try {
            return new Date(dateString).toLocaleDateString();
        } catch {
            return 'Recent';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Initialize homepage recent work section
        if (document.getElementById('recent-work-section')) {
            await RecentWorkManager.init();
        }

        // Initialize products page
        if (window.location.pathname.includes('products.html')) {
            const productsManager = new ProductsPageManager();
            await productsManager.init();
            
            // Make manager globally available for debugging
            window.productsManager = productsManager;
        }
    } catch (error) {
        console.error('Error initializing page:', error);
        
        // Hide any loading indicators
        if (window.loadingManager) {
            window.loadingManager.hideAllLoaders();
        }
    }
});
