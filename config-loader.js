// Configuration Loader for Video Slider
// Loads configuration from JSON and applies it to the slider

class SliderConfigLoader {
    constructor(configPath = 'slider-config.json') {
        this.configPath = configPath;
        this.config = null;
        this.loadConfig();
    }

    async loadConfig() {
        try {
            const response = await fetch(this.configPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.config = await response.json();
            this.applyConfiguration();
        } catch (error) {
            console.warn('Could not load slider configuration:', error);
            this.useDefaultConfig();
        }
    }

    useDefaultConfig() {
        // Fallback configuration if JSON fails to load
        this.config = {
            sliderSettings: {
                autoPlay: true,
                autoPlayDelay: 8000,
                transitionDuration: 800,
                pauseOnHover: true,
                showControls: true,
                showProgress: true,
                loop: true
            },
            slides: [], // Will use existing HTML slides
            customization: {
                colors: {
                    primary: "#2c5aa0",
                    secondary: "#6ba3d6",
                    accent: "#a8c8ec",
                    text: "#ffffff",
                    overlay: "rgba(44, 90, 160, 0.8)"
                }
            }
        };
        this.applyConfiguration();
    }

    applyConfiguration() {
        if (!this.config) return;

        // Apply custom colors to CSS variables
        this.applyColors();
        
        // Apply typography settings
        this.applyTypography();
        
        // Update slider content if slides are defined in config
        if (this.config.slides && this.config.slides.length > 0) {
            this.updateSliderContent();
        }
        
        // Initialize slider with settings
        this.initializeSlider();
    }

    applyColors() {
        const colors = this.config.customization?.colors;
        if (!colors) return;

        const root = document.documentElement;
        if (colors.primary) root.style.setProperty('--primary-blue', colors.primary);
        if (colors.secondary) root.style.setProperty('--light-blue', colors.secondary);
        if (colors.accent) root.style.setProperty('--pale-blue', colors.accent);
    }

    applyTypography() {
        const typography = this.config.customization?.typography;
        if (!typography) return;

        const style = document.createElement('style');
        let css = '';

        if (typography.fontFamily) {
            css += `body { font-family: ${typography.fontFamily}; }`;
        }
        
        if (typography.titleSize) {
            css += `.slide-title { font-size: ${typography.titleSize}; }`;
        }
        
        if (typography.descriptionSize) {
            css += `.slide-description { font-size: ${typography.descriptionSize}; }`;
        }
        
        if (typography.buttonSize) {
            css += `.slide-btn { font-size: ${typography.buttonSize}; }`;
        }

        if (css) {
            style.textContent = css;
            document.head.appendChild(style);
        }
    }

    updateSliderContent() {
        const slider = document.getElementById('videoSlider');
        const dotsContainer = document.getElementById('sliderDots');
        
        if (!slider || !this.config.slides) return;

        // Clear existing slides and dots
        slider.innerHTML = '';
        if (dotsContainer) dotsContainer.innerHTML = '';

        // Create slides from configuration
        this.config.slides.forEach((slideConfig, index) => {
            const slide = this.createSlideElement(slideConfig, index);
            slider.appendChild(slide);

            // Create corresponding dot
            if (dotsContainer) {
                const dot = document.createElement('button');
                dot.className = `dot ${index === 0 ? 'active' : ''}`;
                dot.setAttribute('data-slide', index.toString());
                dotsContainer.appendChild(dot);
            }
        });
    }

    createSlideElement(slideConfig, index) {
        const slide = document.createElement('div');
        slide.className = `video-slide ${index === 0 ? 'active' : ''}`;
        slide.setAttribute('data-video', slideConfig.id);

        // Create video element
        const video = document.createElement('video');
        video.className = 'slide-video';
        video.setAttribute('muted', '');
        video.setAttribute('loop', '');
        video.setAttribute('playsinline', '');
        if (index === 0) video.setAttribute('autoplay', '');

        // Add video source
        if (slideConfig.video && slideConfig.video.src) {
            const source = document.createElement('source');
            source.src = slideConfig.video.src;
            source.type = slideConfig.video.type || 'video/mp4';
            video.appendChild(source);
        }

        // Create placeholder
        const placeholder = this.createPlaceholderElement(slideConfig.placeholder);
        video.appendChild(placeholder);

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'slide-overlay';

        const content = document.createElement('div');
        content.className = 'slide-content';

        // Add title
        const title = document.createElement('h2');
        title.className = 'slide-title';
        title.textContent = slideConfig.title;

        // Add description
        const description = document.createElement('p');
        description.className = 'slide-description';
        description.textContent = slideConfig.description;

        // Add button
        const button = document.createElement('button');
        button.className = 'slide-btn';
        button.textContent = slideConfig.buttonText;
        
        if (slideConfig.buttonAction) {
            button.addEventListener('click', () => {
                if (slideConfig.buttonAction.startsWith('#')) {
                    // Scroll to section
                    const target = document.querySelector(slideConfig.buttonAction);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                } else if (slideConfig.buttonAction.startsWith('http')) {
                    // External link
                    window.open(slideConfig.buttonAction, '_blank');
                } else {
                    // Internal navigation
                    window.location.href = slideConfig.buttonAction;
                }
            });
        }

        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(button);
        overlay.appendChild(content);

        slide.appendChild(video);
        slide.appendChild(overlay);

        return slide;
    }

    createPlaceholderElement(placeholderConfig) {
        if (!placeholderConfig) {
            placeholderConfig = {
                title: 'Video Placeholder',
                subtitle: 'Video content will appear here',
                background: 'linear-gradient(135deg, #2c5aa0, #6ba3d6)'
            };
        }

        const placeholder = document.createElement('div');
        placeholder.className = 'video-placeholder';
        placeholder.style.background = placeholderConfig.background;

        const content = document.createElement('div');
        content.className = 'placeholder-content';

        const title = document.createElement('h3');
        title.textContent = placeholderConfig.title;

        const subtitle = document.createElement('p');
        subtitle.textContent = placeholderConfig.subtitle;

        content.appendChild(title);
        content.appendChild(subtitle);
        placeholder.appendChild(content);

        return placeholder;
    }

    initializeSlider() {
        // Wait a bit for DOM updates, then initialize the slider
        setTimeout(() => {
            if (window.VideoSlider) {
                window.videoSlider = new VideoSlider(this.config.sliderSettings);
            }
        }, 100);
    }

    // Public methods for runtime configuration updates
    updateSliderSettings(newSettings) {
        if (this.config && this.config.sliderSettings) {
            this.config.sliderSettings = { ...this.config.sliderSettings, ...newSettings };
            if (window.videoSlider) {
                window.videoSlider.updateConfig(newSettings);
            }
        }
    }

    getConfig() {
        return this.config;
    }

    reloadConfig() {
        this.loadConfig();
    }
}

// Initialize configuration loader
document.addEventListener('DOMContentLoaded', () => {
    window.sliderConfigLoader = new SliderConfigLoader();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SliderConfigLoader;
}