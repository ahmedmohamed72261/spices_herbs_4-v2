/**
 * Certificates page integration
 * Handles certificates listing and filtering
 */

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Initialize certificates page
        if (window.location.pathname.includes('certificates.html')) {
            initializeCertificatesPage();
        }
    } catch (error) {
        console.error('Error initializing certificates page:', error);
    }
});

/* ============================
   Certificates Page
=============================== */
async function initializeCertificatesPage() {
    try {
        // Show loading while fetching (fallback if no loadingManager)
        const portfolioSectionRow = document.querySelector('.portfolio-section .container .row');
        let loadingContainer;
        if (portfolioSectionRow && !window.loadingManager) {
            loadingContainer = document.createElement('div');
            loadingContainer.className = 'loading-container is-loading col-12';
            loadingContainer.innerHTML = `
                <div class="loading-overlay">
                    <div class="loading-spinner"></div>
                    <div class="loading-text">Loading Certificates...</div>
                </div>
            `;
            portfolioSectionRow.appendChild(loadingContainer);
        } else if (window.loadingManager) {
            window.loadingManager.showMainLoader?.();
        }

        const certificates = await ApiService.getCertificates();
        
        // Only show active certificates
        const activeCertificates = certificates.filter(cert => cert.isActive);
        
        updatePageTitle('Certificates');
        displayCertificates(activeCertificates);

        if (window.loadingManager) {
            window.loadingManager.hideMainLoader?.();
        } else if (loadingContainer) {
            loadingContainer.classList.remove('is-loading');
            setTimeout(() => loadingContainer.remove(), 300);
        }
    } catch (error) {
        console.error('Error loading certificates page:', error);
        if (window.loadingManager) {
            window.loadingManager.hideMainLoader?.();
        } else {
            const loaders = document.querySelectorAll('.loading-container');
            loaders.forEach(l => { l.classList.remove('is-loading'); setTimeout(() => l.remove(), 300); });
        }
        const portfolioContainer = document.querySelector('.portfolio-section .row');
        if (portfolioContainer) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'col-12 text-center my-5';
            errorMessage.innerHTML = '<p>Sorry, there was an error loading certificates. Please try again later.</p>';
            portfolioContainer.appendChild(errorMessage);
        }
    }
}

function updatePageTitle(title) {
    const pageTitleElement = document.querySelector('.page-title-content h2');
    if (pageTitleElement) pageTitleElement.textContent = title;

    const breadcrumbElement = document.querySelector('.page-title-content ul li:last-child');
    if (breadcrumbElement) breadcrumbElement.textContent = title;
}

function displayCertificates(certificates) {
    const portfolioContainer = document.querySelector('.portfolio-section .row');
    if (!portfolioContainer) return;

    const sectionTitle = portfolioContainer.querySelector('.section-title').parentElement;

    // Remove old items except title
    while (portfolioContainer.children.length > 1) {
        portfolioContainer.removeChild(portfolioContainer.lastChild);
    }

    if (certificates.length === 0) {
        const noCertificatesMsg = document.createElement('div');
        noCertificatesMsg.className = 'col-12 text-center';
        noCertificatesMsg.innerHTML = '<p>No certificates available at the moment.</p>';
        portfolioContainer.appendChild(noCertificatesMsg);
        return;
    }

    certificates.forEach(certificate => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'col-lg-4 col-md-6';

        portfolioItem.innerHTML = `
            <div class="portfolio-item product-card" data-description="${certificate.description}" data-details='["Certificate", "Quality Assurance", "${certificate.name}"]'>
                <img src="${certificate.image}" alt="${certificate.name}">
                <div class="portfolio-content-overlay">
                    <h3 class="product-title">${certificate.name}</h3>
                    <p>${certificate.description.substring(0, 100)}${certificate.description.length > 100 ? '...' : ''}</p>
                    <div class="portfolio-actions">
                        <a class="portfolio-zoom-icon" href="#" title="View Fullscreen">
                            <i class="bi bi-arrows-fullscreen"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        portfolioContainer.appendChild(portfolioItem);
    });

    // Enable fullscreen preview for certificate cards (reuse product card handler if available)
    if (typeof initializeProductCardFullscreen === 'function') {
        initializeProductCardFullscreen();
    } else if (typeof $ !== 'undefined' && typeof $.magnificPopup !== 'undefined') {
        // Fallback local binding to entire card with improved styles and captions
        // Inject enhanced lightbox styles once
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

        const $container = $('.portfolio-section .row');
        const zoomSelector = 'a.portfolio-zoom-icon';
        $container.off('click.mfp', zoomSelector).on('click.mfp', zoomSelector, function (e) {
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
            $.magnificPopup.open({ items, type: 'image', gallery: { enabled: true }, mainClass: 'mfp-fade ksh-lightbox', image: { verticalFit: true, titleSrc: function(item){ return item.data && item.data.title ? item.data.title : item.title; } }, callbacks: { elementParse: function(item){ item.data = { title: item.title }; } } }, index);
        });
    }
}