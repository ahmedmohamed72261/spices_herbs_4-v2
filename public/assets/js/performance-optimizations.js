/**
 * Performance optimizations for Kingdom Spices Herbs website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Optimize image loading
    optimizeImageLoading();
    
    // Optimize scroll performance
    optimizeScrollPerformance();
    
    // Optimize slider performance
    optimizeSliderPerformance();
});

/**
 * Optimize image loading with lazy loading and proper sizing
 */
function optimizeImageLoading() {
    // Add lazy loading to images that don't already have it
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
    
    // Prevent layout shifts by setting dimensions where missing
    const undimensionedImages = document.querySelectorAll('img:not([width]):not([height])');
    undimensionedImages.forEach(img => {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    });
}

}
    // Create a global loading manager
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
    
    // Hide the main preloader after content is loaded
    window.addEventListener('load', function() {
        window.loadingManager.hideMainLoader();
        window.loadingManager.hideAllLoaders();
    });
}

/**
 * Optimize scroll performance with throttling and passive event listeners
 */
function optimizeScrollPerformance() {
    // Use passive scroll listeners
    const supportsPassive = checkPassiveSupport();
    const wheelOpt = supportsPassive ? { passive: true } : false;
    
    // Add passive listeners to common events
    window.addEventListener('scroll', scrollHandler, wheelOpt);
    window.addEventListener('touchmove', scrollHandler, wheelOpt);
    window.addEventListener('wheel', scrollHandler, wheelOpt);
    
    // Throttle scroll events
    let scrollTimeout;
    function scrollHandler() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
                // Handle scroll events here if needed
            }, 100);
        }
    }
}

/**
 * Optimize slider performance
 */
function optimizeSliderPerformance() {
    // Reduce animation complexity on mobile
    if (window.innerWidth < 768) {
        // Disable background animations on mobile for better performance
        const sliderElements = document.querySelectorAll('.slide-zoom-in, .slide-pan-right, .slide-pan-up');
        sliderElements.forEach(el => {
            el.style.animation = 'none';
        });
        
        // Force enable content animations on mobile
        const contentElements = document.querySelectorAll('.slide-content-animation, .slide-text-animation');
        contentElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        
        // Ensure animations play correctly on active slide
        const activeSlide = document.querySelector('.swiper-slide-active');
        if (activeSlide) {
            const animations = activeSlide.querySelectorAll('.slide-content-animation, .slide-text-animation, .slide-title-animation, .slide-heading-animation, .slide-btn-animation');
            animations.forEach(el => {
                el.style.animationPlayState = 'running';
                el.style.opacity = '1';
            });
        }
    }
    
    // Optimize swiper slider if it exists
    if (typeof Swiper !== 'undefined' && document.querySelector('.swiper-container')) {
        // Swiper is already initialized in main.js, but we can add additional optimizations
        document.addEventListener('visibilitychange', function() {
            // Pause animations when tab is not visible
            const swiperContainer = document.querySelector('.swiper-container');
            if (swiperContainer && swiperContainer.swiper) {
                if (document.hidden) {
                    swiperContainer.swiper.autoplay.stop();
                } else {
                    swiperContainer.swiper.autoplay.start();
                }
            }
        });
        
        // Add event listener for slide change to ensure animations work on mobile
        if (window.innerWidth < 768 && document.querySelector('.swiper-container').swiper) {
            document.querySelector('.swiper-container').swiper.on('slideChangeTransitionEnd', function() {
                const activeSlide = document.querySelector('.swiper-slide-active');
                if (activeSlide) {
                    const animations = activeSlide.querySelectorAll('.slide-content-animation, .slide-text-animation, .slide-title-animation, .slide-heading-animation, .slide-btn-animation');
                    animations.forEach(el => {
                        el.style.animationPlayState = 'running';
                        el.style.opacity = '1';
                    });
                }
            });
        }
    }
}

/**
 * Check if browser supports passive event listeners
 */
function checkPassiveSupport() {
    let supportsPassive = false;
    try {
        const opts = Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassive = true;
                return true;
            }
        });
        window.addEventListener('testPassive', null, opts);
        window.removeEventListener('testPassive', null, opts);
    } catch (e) {}
    return supportsPassive;
}