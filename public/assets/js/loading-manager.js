/**
 * Loading Manager for Kingdom Spices Herbs
 * Handles preloader and loading indicators across the site
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create global loading manager if it doesn't exist
    if (!window.loadingManager) {
        window.loadingManager = {
            hideAllLoaders: function() {
                document.querySelectorAll('.loading-container.is-loading').forEach(container => {
                    container.classList.remove('is-loading');
                    container.style.display = 'none';
                });
            },
            showMainLoader: function() {
                const mainLoader = document.querySelector('.preloader');
                if (mainLoader) {
                    mainLoader.style.display = 'block';
                }
            },
            hideMainLoader: function() {
                const mainLoader = document.querySelector('.preloader');
                if (mainLoader) {
                    mainLoader.style.display = 'none';
                }
            }
        };
    }
    
    // Hide the main preloader after content is loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            window.loadingManager.hideMainLoader();
            window.loadingManager.hideAllLoaders();
        }, 500); // Small delay to ensure everything is loaded
    });
    
    // Fallback to ensure preloader is hidden even if something goes wrong
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        if (preloader && getComputedStyle(preloader).display !== 'none') {
            preloader.style.display = 'none';
        }
    }, 5000); // 5 second maximum loading time
});