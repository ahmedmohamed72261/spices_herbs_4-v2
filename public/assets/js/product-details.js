/**
 * Product details page integration
 * Handles displaying product details and share functionality
 */

class ProductDetailsManager {
    /**
     * Initialize the product details manager
     */
    constructor() {
        this.product = null;
        this.productId = null;
        this.elements = {};
        this.isLoading = true;
    }

    /**
     * Initialize the product details page
     */
    async init() {
        try {
            // Check if we're on the product details page
            if (!window.location.pathname.includes('product-details.html')) {
                return;
            }
            
            // Show loading indicator
            this.showLoading();
            
            // Cache DOM elements
            this.cacheElements();
            
            // Get product ID from URL
            const urlParams = new URLSearchParams(window.location.search);
            this.productId = urlParams.get('id');
            
            if (!this.productId) {
                console.error('Product ID not found in URL');
                this.hideLoading();
                this.showError('Product not found. Please check the URL and try again.<br><br>Try visiting the <a href="products.html" class="default-btn">Products Page</a> to select a product.');
                return;
            }
            
            // Fetch product details
            this.product = await ApiService.getProductById(this.productId);
            
            if (!this.product) {
                console.error('Product not found');
                this.hideLoading();
                this.showError('Product not found. It may have been removed or is temporarily unavailable.');
                return;
            }
            
            // Update the page with product details
            this.updateProductDetails();
            
            // Setup share button
            this.setupShareButton();
            
            // Load related products
            await this.loadRelatedProducts();
            
            // Hide loading indicator
            this.hideLoading();
            
            // Refresh AOS to detect new elements
            this.refreshAOS();
        } catch (error) {
            console.error('Error initializing product details page:', error);
            
            // Hide loading indicator in case of error
            this.hideLoading();
            this.showError('An error occurred while loading the product details. Please try again later.');
        }
    }

    /**
     * Cache DOM elements for better performance
     */
    cacheElements() {
        this.elements.pageTitle = document.querySelector('.page-title-content h2');
        this.elements.breadcrumb = document.querySelector('.page-title-content ul li:last-child');
        this.elements.detailsSection = document.querySelector('.portfolio-details-area');
        this.elements.relatedContainer = document.querySelector('.portfolio-details-overview + .row');
        
        // Log element cache status for debugging
        console.log('Element cache status:', {
            pageTitle: !!this.elements.pageTitle,
            breadcrumb: !!this.elements.breadcrumb,
            detailsSection: !!this.elements.detailsSection,
            relatedContainer: !!this.elements.relatedContainer
        });
    }

    /**
     * Show loading state
     */
    showLoading() {
        this.isLoading = true;
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
        this.isLoading = false;
        if (window.loadingManager) {
            window.loadingManager.hideMainLoader();
        } else {
            this.removeCustomLoader();
        }
        
        // Remove any loading placeholders from the page
        const loadingPlaceholders = document.querySelectorAll('.loading-placeholder');
        loadingPlaceholders.forEach(placeholder => {
            placeholder.remove();
        });
        
        // Remove any duplicate loading spinners that might appear after footer
        const duplicateSpinners = document.querySelectorAll('.loading-spinner:not(#main-loader .loading-spinner)');
        duplicateSpinners.forEach(spinner => {
            // Only remove if it's not part of the main loader or related products loading
            const parent = spinner.closest('.loading-container, .loading-placeholder, .custom-loader');
            if (parent && !parent.id.includes('main-loader') && !parent.closest('.portfolio-details-area')) {
                parent.remove();
            }
        });
    }

    /**
     * Create a custom loader if loading manager is not available
     */
    createCustomLoader() {
        // Check if loader already exists
        if (document.querySelector('.custom-loader')) return;
        
        const loader = document.createElement('div');
        loader.className = 'custom-loader';
        
        // Add styles if not already added
        if (!document.getElementById('custom-loader-styles')) {
            const style = document.createElement('style');
            style.id = 'custom-loader-styles';
            style.textContent = `
                .custom-loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(255, 255, 255, 0.8);
                    z-index: 9999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .loading-overlay {
                    text-align: center;
                }
                .loading-spinner {
                    border: 5px solid #f3f3f3;
                    border-top: 5px solid #3498db;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                }
                .loading-text {
                    margin-top: 10px;
                    font-size: 16px;
                    color: #333;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(loader);
    }

    /**
     * Remove the custom loader
     */
    removeCustomLoader() {
        const loader = document.querySelector('.custom-loader');
        if (loader) {
            loader.remove();
        }
    }

    /**
     * Show error message
     * @param {string} message - Error message to display
     */
    showError(message) {
        // Create error container if not exists
        if (!document.querySelector('.error-container')) {
            const errorContainer = document.createElement('div');
            errorContainer.className = 'error-container';
            errorContainer.style.cssText = 'padding: 20px; margin: 20px auto; max-width: 800px; background-color: #fff3f3; border-left: 4px solid #ff5252; color: #333;';
            
            // Find a suitable container to append the error
            const container = this.elements.detailsSection || document.querySelector('.portfolio-details-area') || document.querySelector('.container');
            if (container) {
                container.innerHTML = '';
                container.appendChild(errorContainer);
            } else {
                // If no suitable container found, append to body
                document.body.appendChild(errorContainer);
            }
        }
        
        // Update error message
        const errorContainer = document.querySelector('.error-container');
        errorContainer.innerHTML = `
            <h3 style="margin-top: 0; color: #ff5252;">Error</h3>
            <p>${message}</p>
            <a href="products.html" class="default-btn">Back to Products <span></span></a>
        `;
    }

    /**
     * Update the page with product details
     */
    updateProductDetails() {
        try {
            // Update page title
            document.title = `${this.product.name} - Kingdom Spices Herbs`;
            
            // Update breadcrumb
            if (this.elements.pageTitle) {
                this.elements.pageTitle.textContent = this.product.name;
            }
            
            if (this.elements.breadcrumb) {
                this.elements.breadcrumb.textContent = this.product.name;
            }
            
            // Render the whole details section
            this.renderProductDetailsSection();

            // Enable fullscreen preview for main image
            this.enableDetailsImageFullscreen();
            
            // Add structured data for SEO
            this.addProductStructuredData();
        } catch (error) {
            console.error('Error updating product details:', error);
            this.showError('Error displaying product details. Please try again later.');
        }
    }
    
    /**
     * Add structured data for product SEO
     */
    addProductStructuredData() {
        // Create structured data for product
        const structuredData = {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": this.product.name,
            "image": this.product.image,
            "description": this.product.description,
            "brand": {
                "@type": "Brand",
                "name": "Kingdom Spices Herbs"
            },
            "category": this.product.category ? this.product.category.name : "Herbs and Spices",
            "offers": {
                "@type": "Offer",
                "url": window.location.href,
                "priceCurrency": "USD",
                "availability": this.product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            }
        };
        
        // Add the structured data to the page
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    /**
     * Render the product details section
     */
    renderProductDetailsSection() {
        try {
            if (!this.elements.detailsSection) return;

            // Animate the section only once
            this.elements.detailsSection.setAttribute('data-aos', 'fade-up');
            this.elements.detailsSection.setAttribute('data-aos-once', 'true');

            const firstParagraph = (this.product.description || '').split('\r\n')[0];
            const formattedDescription = (this.product.description || '').replace(/\r\n/g, '<br>');
            const categoryName = this.product.category?.name || this.product.category || '';

            this.elements.detailsSection.innerHTML = `
                <div class="container">
                    <div class="row portfolio-details-overview">
                        <div class="col-lg-12 col-md-12">
                            <div class="portfolio-details-image">
                                <img src="${this.product.image}" alt="${this.product.name}">
                            </div>
                        </div>
                        <div class="col-lg-12 col-md-12">
                            <div class="portfolio-details-desc">
                                <h3>${this.product.name}</h3>
                                <div class="full-description mt-4">
                                    <h4>Product Description</h4>
                                    <p>${formattedDescription}</p>
                                </div>
                                <div class="portfolio-details-info mt-4">
                                    <div class="info-list">
                                        <ul>
                                            <li><span class="fs-6 fw-bolder">Category:</span> ${categoryName}</li>
                                            <li><span class="fs-6 fw-bolder">Added:</span> ${ApiService.formatDate(this.product.createdAt)}</li>
                                        </ul>
                                    </div>
                                    <div class="share-btn mt-4">
                                        <button id="shareButton" class="default-btn">Share Product <span></span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } catch (e) {
            console.error('Error rendering product details section:', e);
        }
    }

    /**
     * Enable fullscreen (lightbox) on the product details main image
     */
    enableDetailsImageFullscreen() {
        try {
            if (typeof $ === 'undefined' || typeof $.magnificPopup === 'undefined') return;

            // Reuse/add improved lightbox styles
            if (!document.getElementById('ksh-lightbox-styles')) {
                const style = document.createElement('style');
                style.id = 'ksh-lightbox-styles';
                style.textContent = `
                .ksh-lightbox .mfp-bg { background: rgba(0,0,0,0.92); }
                .ksh-lightbox .mfp-container { padding: 0 16px; }
                .ksh-lightbox img.mfp-img { max-height: calc(100vh - 180px); width: auto; margin: 80px auto 80px; }
                .ksh-lightbox .mfp-figure:after { box-shadow: none; background: transparent; }
                .ksh-lightbox .mfp-title { position: fixed; left: 0; right: 0; bottom: 0; padding: 14px 20px; font-size: 18px; font-weight: 600; color: #fff; text-align: center; background: linear-gradient(transparent, rgba(0,0,0,.7)); }
                .ksh-lightbox .mfp-close { color: #fff; opacity: .95; right: 16px; top: 16px; }
                .ksh-lightbox .mfp-counter { color: #fff; left: 16px; top: 16px; }
                .ksh-lightbox .mfp-arrow { opacity: .95; }
                .ksh-lightbox .mfp-arrow:before, .ksh-lightbox .mfp-arrow:after { border-top-width: 16px; border-bottom-width: 16px; }
                @media (max-width: 576px) {
                    .ksh-lightbox img.mfp-img { max-height: calc(100vh - 140px); margin: 60px auto 60px; }
                    .ksh-lightbox .mfp-title { font-size: 16px; padding: 12px 14px; }
                }
                `;
                document.head.appendChild(style);
            }

            const $img = $('.portfolio-details-image img');
            if (!$img.length) return;

            // Wrap image in an anchor for lightbox if not already
            if (!$img.parent('a.mfp-item').length) {
                $img.wrap('<a class="mfp-item" href="' + ($img.attr('src') || this.product.image) + '" title="' + (this.product?.name || $img.attr('alt') || '') + '"></a>');
            } else {
                $img.parent('a.mfp-item').attr('href', $img.attr('src'));
            }

            $('.portfolio-details-image').magnificPopup({
                delegate: 'a.mfp-item',
                type: 'image',
                gallery: { enabled: false },
                mainClass: 'mfp-fade ksh-lightbox',
                removalDelay: 200,
                fixedContentPos: true,
                closeBtnInside: false,
                image: { verticalFit: true, titleSrc: function(item){ return this.product?.name || item.el?.attr('title') || ''; }.bind(this) }
            });
        } catch (err) {
            console.error('Error enabling fullscreen on product details image:', err);
        }
    }

    /**
     * Load related products for the current product
     */
    async loadRelatedProducts() {
        try {
            if (!this.elements.relatedContainer) {
                // Create related products container if it doesn't exist
                const relatedContainer = document.createElement('div');
                relatedContainer.className = 'row mt-5';
                relatedContainer.innerHTML = `
                    <div class="col-12">
                        <h3 class="related-products-title">Related Products</h3>
                    </div>
                `;
                
                // Append to the details section container
                const container = this.elements.detailsSection.querySelector('.container');
                if (container) {
                    container.appendChild(relatedContainer);
                    this.elements.relatedContainer = relatedContainer;
                } else {
                    return;
                }
            }
            
            // Show loading indicator for related products
            const loadingContainer = document.createElement('div');
            loadingContainer.className = 'loading-placeholder col-12 text-center';
            loadingContainer.innerHTML = `
                <div class="loading-spinner" style="margin: 20px auto;"></div>
                <p>Loading Related Products...</p>
            `;
            this.elements.relatedContainer.appendChild(loadingContainer);
            
            // Fetch all products
            const allProducts = await ApiService.getProducts();
            const currentCategory = this.product.category?.slug || this.product.category?.name || this.product.category;

            // Filter related products (same category, different ID)
            const relatedProducts = allProducts.filter(p => {
                const pCategory = p.category?.slug || p.category?.name || p.category;
                const pId = p._id || p.id;
                return pCategory === currentCategory && pId !== (this.product._id || this.product.id);
            });

            // Remove loading placeholder
            loadingContainer.remove();
            
            // Clear previous related products
            const existingProducts = this.elements.relatedContainer.querySelectorAll('.col-lg-4');
            existingProducts.forEach(el => el.remove());
            
            // Create title if it doesn't exist
            if (!this.elements.relatedContainer.querySelector('.related-products-title')) {
                const titleRow = document.createElement('div');
                titleRow.className = 'col-12';
                titleRow.innerHTML = '<h3 class="related-products-title">Related Products</h3>';
                this.elements.relatedContainer.appendChild(titleRow);
            }

            // Display up to 3 related products
            const displayRelated = relatedProducts.slice(0, 3);

            // Create HTML for each related product
            displayRelated.forEach(rp => {
                const rpId = rp._id || rp.id;
                const rpCategory = rp.category?.name || rp.category;
                const col = document.createElement('div');
                col.className = 'col-lg-4 col-md-6';
                col.setAttribute('data-aos', 'fade-up');
                col.innerHTML = `
                    <div class="portfolio-details-thumb">
                        <a href="product-details.html?id=${rpId}">
                            <img src="${rp.image}" alt="${rp.name}">
                            <div class="product-info">
                                <div class="product-category">${rpCategory}</div>
                                <div class="product-name">${rp.name}</div>
                            </div>
                        </a>
                    </div>
                `;
                this.elements.relatedContainer.appendChild(col);
            });

            // Show message if no related products found
            if (displayRelated.length === 0) {
                const noRelatedMsg = document.createElement('div');
                noRelatedMsg.className = 'col-12 text-center';
                noRelatedMsg.innerHTML = '<p>No related products found.</p>';
                this.elements.relatedContainer.appendChild(noRelatedMsg);
            }
            
            // Add enhanced styles for related products if not already added
            if (!document.getElementById('related-products-styles')) {
                const style = document.createElement('style');
                style.id = 'related-products-styles';
                style.textContent = `
                    .related-products-title {
                        margin-bottom: 30px;
                        padding-bottom: 15px;
                        border-bottom: 2px solid #28a745;
                        font-size: 28px;
                        font-weight: 700;
                        color: #333;
                        position: relative;
                    }
                    .related-products-title::after {
                        content: '';
                        position: absolute;
                        bottom: -2px;
                        left: 0;
                        width: 60px;
                        height: 2px;
                        background: linear-gradient(45deg, #28a745, #20c997);
                    }
                    .portfolio-details-thumb {
                        margin-bottom: 30px;
                        border-radius: 12px;
                        overflow: hidden;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                        background: #fff;
                        position: relative;
                    }
                    .portfolio-details-thumb:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 12px 40px rgba(0,0,0,0.15);
                    }
                    .portfolio-details-thumb img {
                        width: 100%;
                        height: 220px;
                        object-fit: cover;
                        transition: transform 0.4s ease;
                    }
                    .portfolio-details-thumb:hover img {
                        transform: scale(1.05);
                    }
                    .portfolio-details-thumb .product-info {
                        padding: 20px;
                        text-align: center;
                        background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
                    }
                    .portfolio-details-thumb .product-category {
                        font-size: 12px;
                        color: #28a745;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        margin-bottom: 8px;
                    }
                    .portfolio-details-thumb .product-name {
                        font-size: 16px;
                        font-weight: 600;
                        color: #333;
                        line-height: 1.4;
                        margin: 0;
                        transition: color 0.3s ease;
                    }
                    .portfolio-details-thumb:hover .product-name {
                        color: #28a745;
                    }
                    .portfolio-details-thumb a {
                        text-decoration: none;
                        color: inherit;
                        display: block;
                    }
                    .portfolio-details-thumb::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: linear-gradient(135deg, rgba(40, 167, 69, 0.1) 0%, rgba(32, 201, 151, 0.1) 100%);
                        opacity: 0;
                        transition: opacity 0.3s ease;
                        pointer-events: none;
                    }
                    .portfolio-details-thumb:hover::before {
                        opacity: 1;
                    }
                    @media (max-width: 768px) {
                        .related-products-title {
                            font-size: 24px;
                            margin-bottom: 20px;
                        }
                        .portfolio-details-thumb {
                            margin-bottom: 20px;
                        }
                        .portfolio-details-thumb img {
                            height: 180px;
                        }
                        .portfolio-details-thumb .product-info {
                            padding: 15px;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        } catch (error) {
            console.error('Error loading related products:', error);
        }
    }

    /**
     * Setup share button functionality
     */
    setupShareButton() {
        // Add event listener after a short delay to ensure the button exists
        setTimeout(() => {
            const shareButton = document.getElementById('shareButton');
            if (shareButton) {
                shareButton.addEventListener('click', function() {
                    // Copy current URL to clipboard
                    navigator.clipboard.writeText(window.location.href)
                        .then(() => {
                            // Show success message
                            const originalText = shareButton.textContent;
                            shareButton.textContent = 'Link Copied!';
                            
                            // Reset button text after 2 seconds
                            setTimeout(() => {
                                shareButton.textContent = originalText;
                            }, 2000);
                        })
                        .catch(err => {
                            console.error('Failed to copy link: ', err);
                        });
                });
            }
        }, 500);
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
}

// Initialize the product details manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const productDetailsManager = new ProductDetailsManager();
    productDetailsManager.init();
});