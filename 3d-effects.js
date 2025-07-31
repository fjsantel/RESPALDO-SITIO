// 3D Effects and WebGL-inspired animations for Francisco Santelices Portfolio
// Contemporary art website with sophisticated 3D visual elements

class ThreeDEffects {
    constructor() {
        this.init();
        this.setupFloatingParticles();
        this.setupHolographicEffects();
        this.setupParallax3D();
    }

    init() {
        this.canvas = this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.setupEventListeners();
        this.startAnimation();
    }

    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.className = 'threejs-overlay';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.6;
        `;
        document.body.appendChild(canvas);
        this.resizeCanvas(canvas);
        return canvas;
    }

    resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas(this.canvas);
        });

        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Scroll-based 3D effects
        window.addEventListener('scroll', () => {
            this.updateScrollEffects();
        });
    }

    setupFloatingParticles() {
        const particleCount = window.innerWidth > 768 ? 50 : 25;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                z: Math.random() * 1000,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                vz: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                color: this.getParticleColor(),
                pulsePhase: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02
            });
        }
    }

    getParticleColor() {
        const colors = [
            '#2c5aa0', // primary blue
            '#6ba3d6', // light blue
            '#a8c8ec', // pale blue
            '#28ca42', // terminal green
            '#ffffff'  // white
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    setupHolographicEffects() {
        // Add holographic elements to portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            this.addHolographicOverlay(item, index);
        });

        // Terminal holographic effects
        const terminal = document.querySelector('.terminal-container');
        if (terminal) {
            this.addTerminalHologram(terminal);
        }
    }

    addHolographicOverlay(element, index) {
        const overlay = document.createElement('div');
        overlay.className = 'holographic-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                45deg,
                transparent 30%,
                rgba(255, 255, 255, 0.05) 50%,
                transparent 70%
            );
            background-size: 20px 20px;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            animation: hologramScan ${3 + index}s ease-in-out infinite;
        `;
        
        element.style.position = 'relative';
        element.appendChild(overlay);

        element.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
        });

        element.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
        });
    }

    addTerminalHologram(terminal) {
        const hologram = document.createElement('div');
        hologram.className = 'terminal-hologram';
        hologram.style.cssText = `
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, 
                transparent,
                rgba(40, 202, 66, 0.1),
                transparent
            );
            animation: terminalGlow 4s ease-in-out infinite alternate;
            pointer-events: none;
            border-radius: 12px;
        `;
        
        terminal.style.position = 'relative';
        terminal.appendChild(hologram);
    }

    setupParallax3D() {
        const parallaxElements = document.querySelectorAll('.circle, .float-element, .service-item');
        
        parallaxElements.forEach((element, index) => {
            element.style.transformStyle = 'preserve-3d';
            element.dataset.parallaxDepth = Math.random() * 100 + 50;
        });
    }

    updateScrollEffects() {
        const scrollY = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax-depth]');
        
        parallaxElements.forEach(element => {
            const depth = parseFloat(element.dataset.parallaxDepth);
            const moveX = (this.mouse.x - window.innerWidth / 2) * depth * 0.0001;
            const moveY = (this.mouse.y - window.innerHeight / 2) * depth * 0.0001;
            const scrollMove = scrollY * depth * 0.0005;
            
            element.style.transform = `
                translate3d(${moveX}px, ${moveY - scrollMove}px, 0)
                rotateX(${moveY * 0.1}deg)
                rotateY(${moveX * 0.1}deg)
            `;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });

        // Draw connections between nearby particles
        this.drawConnections();
    }

    updateParticle(particle) {
        // Mouse interaction
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
            particle.vx += dx * 0.00005;
            particle.vy += dy * 0.00005;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Pulse effect
        particle.pulsePhase += 0.02;
        particle.currentSize = particle.size * (1 + Math.sin(particle.pulsePhase) * 0.3);

        // Boundaries
        if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
        if (particle.z < 0 || particle.z > 1000) particle.vz *= -1;

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        particle.vz *= 0.99;
    }

    drawParticle(particle) {
        const size = particle.currentSize * (1 - particle.z / 1000);
        const opacity = particle.opacity * (1 - particle.z / 1000);
        
        this.ctx.save();
        this.ctx.globalAlpha = opacity;
        this.ctx.fillStyle = particle.color;
        
        // Add glow effect
        this.ctx.shadowColor = particle.color;
        this.ctx.shadowBlur = size * 2;
        
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.restore();
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = (100 - distance) / 100 * 0.2;
                    
                    this.ctx.save();
                    this.ctx.globalAlpha = opacity;
                    this.ctx.strokeStyle = '#6ba3d6';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }
    }

    startAnimation() {
        const animationLoop = () => {
            this.animate();
            requestAnimationFrame(animationLoop);
        };
        animationLoop();
    }
}

// CSS Animations for 3D effects
const threeDStyles = `
@keyframes hologramScan {
    0%, 100% { 
        background-position: -100% 0; 
        opacity: 0;
    }
    50% { 
        background-position: 100% 0; 
        opacity: 0.3;
    }
}

@keyframes terminalGlow {
    0% { 
        box-shadow: 0 0 5px rgba(40, 202, 66, 0.3);
        opacity: 0.5;
    }
    100% { 
        box-shadow: 0 0 20px rgba(40, 202, 66, 0.6);
        opacity: 1;
    }
}

.holographic-overlay {
    animation: hologramScan 4s ease-in-out infinite !important;
}

/* 3D Transform effects for portfolio items */
.portfolio-item {
    transform-style: preserve-3d;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.portfolio-item:hover {
    transform: translateY(-8px) rotateX(5deg) rotateY(5deg) !important;
}

/* 3D Terminal effects */
.terminal-container {
    transform-style: preserve-3d;
    perspective: 1000px;
}

.terminal-body {
    transform-style: preserve-3d;
}

/* Enhanced circle 3D effects */
.circle {
    transform-style: preserve-3d;
    will-change: transform;
}

/* Service items 3D hover */
.service-item {
    transform-style: preserve-3d;
    perspective: 1000px;
}

.service-item:hover {
    transform: translateY(-5px) scale(1.02) rotateX(2deg) !important;
}

/* Video slider 3D effects */
.video-slide {
    transform-style: preserve-3d;
}

.slide-content {
    transform-style: preserve-3d;
}

/* Responsive 3D effects */
@media (max-width: 768px) {
    .portfolio-item:hover {
        transform: translateY(-4px) rotateX(2deg) !important;
    }
    
    .service-item:hover {
        transform: translateY(-3px) scale(1.01) !important;
    }
}

@media (prefers-reduced-motion: reduce) {
    .holographic-overlay,
    .terminal-hologram {
        animation: none !important;
    }
    
    .threejs-overlay {
        display: none !important;
    }
}
`;

// Inject 3D styles
const styleSheet = document.createElement('style');
styleSheet.textContent = threeDStyles;
document.head.appendChild(styleSheet);

// Initialize 3D effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        new ThreeDEffects();
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThreeDEffects;
}