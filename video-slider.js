// Video Slider Configuration and Functionality
// Configurable video slider with smooth transitions and controls

class VideoSlider {
    constructor(config = {}) {
        // Default configuration
        this.config = {
            autoPlay: true,
            autoPlayDelay: 8000,
            transitionDuration: 800,
            pauseOnHover: true,
            showControls: true,
            showProgress: true,
            loop: true,
            ...config
        };

        this.currentSlide = 0;
        this.totalSlides = 0;
        this.isPlaying = this.config.autoPlay;
        this.progressInterval = null;
        this.autoPlayInterval = null;
        
        this.init();
    }

    init() {
        this.slider = document.getElementById('videoSlider');
        this.slides = document.querySelectorAll('.video-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.progressBar = document.getElementById('progressBar');
        
        this.totalSlides = this.slides.length;
        
        if (this.totalSlides === 0) return;
        
        this.setupEventListeners();
        this.setupVideoEvents();
        
        if (this.config.autoPlay) {
            this.startAutoPlay();
        }
        
        // Initialize first slide
        this.showSlide(0);
    }

    setupEventListeners() {
        // Navigation buttons
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Dots navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === ' ') {
                e.preventDefault();
                this.toggleAutoPlay();
            }
        });
        
        // Mouse hover pause
        if (this.config.pauseOnHover) {
            this.slider.addEventListener('mouseenter', () => this.pauseAutoPlay());
            this.slider.addEventListener('mouseleave', () => {
                if (this.config.autoPlay) this.startAutoPlay();
            });
        }
        
        // Touch/swipe support
        this.setupTouchEvents();
    }

    setupVideoEvents() {
        this.slides.forEach((slide, index) => {
            const video = slide.querySelector('.slide-video');
            if (video) {
                // Ensure video is properly configured
                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                
                // Handle video loading
                video.addEventListener('loadeddata', () => {
                    if (index === this.currentSlide) {
                        video.play().catch(e => console.log('Video autoplay prevented:', e));
                    }
                });
                
                video.addEventListener('error', () => {
                    console.log(`Video error in slide ${index}, showing placeholder`);
                    this.showVideoPlaceholder(slide);
                });
            }
        });
    }

    setupTouchEvents() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        this.slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        this.slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Only trigger if horizontal swipe is dominant
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            }
        });
    }

    showSlide(index) {
        // Ensure index is within bounds
        if (index < 0) index = this.config.loop ? this.totalSlides - 1 : 0;
        if (index >= this.totalSlides) index = this.config.loop ? 0 : this.totalSlides - 1;
        
        // Update current slide
        const prevIndex = this.currentSlide;
        this.currentSlide = index;
        
        // Update slide classes
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev', 'next');
            if (i === index) {
                slide.classList.add('active');
            } else if (i === prevIndex) {
                slide.classList.add(i < index ? 'prev' : 'next');
            }
        });
        
        // Update dots
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Handle videos
        this.handleVideoPlayback(index, prevIndex);
        
        // Reset progress
        this.resetProgress();
        
        // Trigger slide change event
        this.onSlideChange(index, prevIndex);
    }

    handleVideoPlayback(currentIndex, prevIndex) {
        // Handle YouTube iframe videos
        if (prevIndex !== undefined && prevIndex !== currentIndex) {
            const prevVideo = this.slides[prevIndex]?.querySelector('.youtube-embed');
            if (prevVideo) {
                // Pause previous YouTube video by reloading with autoplay=0
                const src = prevVideo.src.replace('autoplay=1', 'autoplay=0');
                prevVideo.src = src;
            }
        }
        
        // Play current YouTube video
        const currentVideo = this.slides[currentIndex]?.querySelector('.youtube-embed');
        if (currentVideo) {
            // Ensure autoplay for current video
            let src = currentVideo.src;
            if (!src.includes('autoplay=1')) {
                src = src.replace('autoplay=0', 'autoplay=1');
                currentVideo.src = src;
            }
        }
        
        // Fallback for regular video elements
        const regularVideo = this.slides[currentIndex]?.querySelector('video');
        if (regularVideo) {
            regularVideo.currentTime = 0;
            regularVideo.play().catch(e => {
                console.log('Video autoplay prevented:', e);
                this.showVideoPlaceholder(this.slides[currentIndex]);
            });
        }
    }

    showVideoPlaceholder(slide) {
        const video = slide.querySelector('.slide-video');
        const placeholder = slide.querySelector('.video-placeholder');
        
        if (video && placeholder) {
            video.style.display = 'none';
            placeholder.style.display = 'flex';
        }
    }

    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    }

    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    }

    goToSlide(index) {
        this.showSlide(index);
    }

    startAutoPlay() {
        if (!this.config.autoPlay) return;
        
        this.pauseAutoPlay(); // Clear any existing interval
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.config.autoPlayDelay);
        
        this.startProgress();
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        this.pauseProgress();
    }

    toggleAutoPlay() {
        if (this.isPlaying) {
            this.pauseAutoPlay();
            this.isPlaying = false;
        } else {
            this.startAutoPlay();
            this.isPlaying = true;
        }
    }

    startProgress() {
        if (!this.config.showProgress || !this.progressBar) return;
        
        this.pauseProgress();
        
        let progress = 0;
        const increment = 100 / (this.config.autoPlayDelay / 50);
        
        this.progressInterval = setInterval(() => {
            progress += increment;
            this.progressBar.style.width = `${Math.min(progress, 100)}%`;
            
            if (progress >= 100) {
                this.pauseProgress();
            }
        }, 50);
    }

    pauseProgress() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    resetProgress() {
        if (this.progressBar) {
            this.progressBar.style.width = '0%';
        }
        if (this.config.autoPlay && this.isPlaying) {
            this.startProgress();
        }
    }

    onSlideChange(currentIndex, prevIndex) {
        // Custom event for slide changes
        const event = new CustomEvent('slideChange', {
            detail: { currentIndex, prevIndex, totalSlides: this.totalSlides }
        });
        document.dispatchEvent(event);
        
        // Re-animate slide content
        const slideContent = this.slides[currentIndex]?.querySelector('.slide-content');
        if (slideContent) {
            slideContent.style.animation = 'none';
            slideContent.offsetHeight; // Trigger reflow
            slideContent.style.animation = 'slideContentIn 1s ease-out 0.3s forwards';
        }
    }

    // Public methods for external control
    destroy() {
        this.pauseAutoPlay();
        this.pauseProgress();
        
        // Remove event listeners
        document.removeEventListener('keydown', this.handleKeydown);
    }

    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        
        if (this.config.autoPlay && !this.isPlaying) {
            this.startAutoPlay();
        } else if (!this.config.autoPlay && this.isPlaying) {
            this.pauseAutoPlay();
        }
    }

    getCurrentSlide() {
        return this.currentSlide;
    }

    getTotalSlides() {
        return this.totalSlides;
    }
}

// Configuration object for easy customization
const sliderConfig = {
    autoPlay: true,
    autoPlayDelay: 8000, // 8 seconds
    transitionDuration: 800,
    pauseOnHover: true,
    showControls: true,
    showProgress: true,
    loop: true
};

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if slider exists
    if (document.getElementById('videoSlider')) {
        window.videoSlider = new VideoSlider(sliderConfig);
        
        // Optional: Listen to slide change events
        document.addEventListener('slideChange', (e) => {
            console.log(`Slide changed to ${e.detail.currentIndex + 1} of ${e.detail.totalSlides}`);
        });
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VideoSlider, sliderConfig };
}