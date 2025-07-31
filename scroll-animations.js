// Scroll Animations inspired by modern web interactions
// Basado en el análisis de franciscosantelicesa.wixsite.com/fjsantel

class ScrollAnimations {
    constructor() {
        this.init();
        this.setupScrollProgress();
        this.setupParallaxEffects();
        this.setupIntersectionObserver();
    }

    init() {
        // Smooth scrolling for the entire page
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Add scroll snap to main sections
        const container = document.querySelector('.container');
        if (container) {
            container.style.scrollSnapType = 'y mandatory';
        }
        
        // Add scroll snap points to sections
        const snapSections = ['header', 'main-content', 'footer'];
        snapSections.forEach(className => {
            const element = document.querySelector(`.${className}`);
            if (element) {
                element.style.scrollSnapAlign = 'start';
            }
        });
    }

    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
        });
    }

    setupParallaxEffects() {
        const circles = document.querySelectorAll('.circle');
        const floatingElements = document.querySelectorAll('.float-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            const slowParallax = scrolled * 0.1;
            
            // Animate circles with different speeds
            circles.forEach((circle, index) => {
                const speed = 0.2 + (index * 0.1);
                const yPos = -(scrolled * speed);
                const rotation = scrolled * 0.05 * (index + 1);
                
                circle.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
            });
            
            // Animate floating elements
            floatingElements.forEach((element, index) => {
                const speed = 0.15 + (index * 0.05);
                const yPos = -(scrolled * speed);
                const xPos = Math.sin(scrolled * 0.001 + index) * 20;
                
                element.style.transform = `translate(${xPos}px, ${yPos}px)`;
            });
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.scrollDelay || 0;
                    
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, delay * 1000);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with data-scroll attribute
        const scrollElements = document.querySelectorAll('[data-scroll]');
        scrollElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// Advanced scroll effects
class AdvancedScrollEffects {
    constructor() {
        this.setupHoverEffects();
        this.setupMouseParallax();
        this.setupScrollVelocity();
    }

    setupHoverEffects() {
        const serviceItems = document.querySelectorAll('.service-item');
        
        serviceItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateY(-5px) scale(1.02)';
                e.target.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            item.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupMouseParallax() {
        const hero = document.querySelector('.hero-section');
        if (!hero) return;

        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const floatingElements = hero.querySelectorAll('.float-element');
            floatingElements.forEach((element, index) => {
                const moveX = (x - 0.5) * 50 * (index + 1);
                const moveY = (y - 0.5) * 50 * (index + 1);
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                element.style.transition = 'transform 0.3s ease-out';
            });
        });

        hero.addEventListener('mouseleave', () => {
            const floatingElements = hero.querySelectorAll('.float-element');
            floatingElements.forEach(element => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    setupScrollVelocity() {
        let lastScrollTop = 0;
        let scrollVelocity = 0;
        
        window.addEventListener('scroll', () => {
            const currentScrollTop = window.pageYOffset;
            scrollVelocity = currentScrollTop - lastScrollTop;
            lastScrollTop = currentScrollTop;
            
            // Apply velocity-based effects to circles
            const circles = document.querySelectorAll('.circle');
            circles.forEach((circle, index) => {
                const velocityEffect = scrollVelocity * 0.1 * (index + 1);
                const currentTransform = circle.style.transform || '';
                
                if (Math.abs(scrollVelocity) > 1) {
                    circle.style.transform = currentTransform + ` scale(${1 + Math.abs(velocityEffect) * 0.01})`;
                }
            });
        });
    }
}

// Video Slider Integration
class VideoSliderIntegration {
    constructor() {
        this.setupVideoSliderIntegration();
    }

    setupVideoSliderIntegration() {
        // Listen for video slider events
        document.addEventListener('slideChange', (e) => {
            this.onSlideChange(e.detail);
        });

        // Integrate scroll progress with video slider
        this.integrateScrollProgress();
        
        // Add video slider to scroll snap if needed
        this.setupScrollSnap();
    }

    onSlideChange(detail) {
        // Trigger floating elements animation when slide changes
        const floatingElements = document.querySelectorAll('.float-element');
        floatingElements.forEach((element, index) => {
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = `float 6s ease-in-out infinite`;
            element.style.animationDelay = `${index * 2}s`;
        });

        // Update scroll progress to show video progress instead during slider
        this.updateScrollProgressForSlider(detail);
    }

    integrateScrollProgress() {
        const videoSliderContainer = document.querySelector('.video-slider-container');
        const scrollProgress = document.querySelector('.scroll-progress');
        
        if (!videoSliderContainer || !scrollProgress) return;

        // Hide scroll progress during video slider, show slider progress instead
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    scrollProgress.style.opacity = '0';
                } else {
                    scrollProgress.style.opacity = '1';
                }
            });
        }, { threshold: 0.5 });

        observer.observe(videoSliderContainer);
    }

    updateScrollProgressForSlider(detail) {
        const scrollProgress = document.querySelector('.scroll-progress');
        if (scrollProgress && detail) {
            const progress = ((detail.currentIndex + 1) / detail.totalSlides) * 100;
            scrollProgress.style.transform = `scaleX(${progress / 100})`;
        }
    }

    setupScrollSnap() {
        // Add video slider to scroll snap points
        const videoSliderContainer = document.querySelector('.video-slider-container');
        if (videoSliderContainer) {
            videoSliderContainer.style.scrollSnapAlign = 'start';
            videoSliderContainer.style.scrollSnapStop = 'always';
        }
    }
}

// Enhanced scroll effects for video slider integration
class EnhancedScrollEffects extends AdvancedScrollEffects {
    constructor() {
        super();
        this.setupVideoSliderScrollEffects();
    }

    setupVideoSliderScrollEffects() {
        const videoSliderContainer = document.querySelector('.video-slider-container');
        if (!videoSliderContainer) return;

        // Parallax effect on video slider during page scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const containerRect = videoSliderContainer.getBoundingClientRect();
            
            if (containerRect.top < window.innerHeight && containerRect.bottom > 0) {
                const parallaxValue = scrolled * 0.1;
                const activeSlide = videoSliderContainer.querySelector('.video-slide.active');
                
                if (activeSlide) {
                    const video = activeSlide.querySelector('.slide-video');
                    if (video) {
                        video.style.transform = `translateY(${parallaxValue}px) scale(1.05)`;
                    }
                }
            }
        });

        // Smooth transition when scrolling away from video slider
        this.setupSmoothTransition();
    }

    setupSmoothTransition() {
        const videoSliderContainer = document.querySelector('.video-slider-container');
        const container = document.querySelector('.container');
        
        if (!videoSliderContainer || !container) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    // Video slider scrolled out of view
                    container.style.transform = 'translateY(0)';
                    container.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                } else {
                    container.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0 });

        observer.observe(videoSliderContainer);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    new EnhancedScrollEffects();
    new VideoSliderIntegration();
});

// Smooth page transitions
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-out';
});

// Performance optimization
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    // Batch DOM updates here for better performance
    ticking = false;
}