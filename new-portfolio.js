// FRANCISCO SANTELICES CREATIVE CONTENT - Pharmaceutical + Terminal Interface

document.addEventListener('DOMContentLoaded', () => {
    // Initialize core components
    new NavigationManager();
    new TerminalInterface();
    new ScrollAnimator(); // Initialize our new animations
    new CustomCursor(); // Initialize the custom cursor
    new ChatbotManager(); // Initialize the chatbot
});

class NavigationManager {
    constructor() {
        this.navContainer = document.querySelector('.main-navigation');
        this.navBtns = document.querySelectorAll('.nav-btn');
        this.menuTrigger = document.getElementById('menu-trigger');
        this.isOpen = false;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Handle clicks on navigation buttons
        this.navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleNavClick(e.target);
            });
        });

        // Handle opening/closing the menu
        this.menuTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.isOpen = !this.isOpen;
            this.toggleMenu(this.isOpen);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.navContainer.contains(e.target)) {
                this.isOpen = false;
                this.toggleMenu(false);
            }
        });
    }

    handleNavClick(clickedBtn) {
        // Do not run scroll logic for regular links
        if (!clickedBtn.dataset.section) return;

        this.navBtns.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');
        
        const sectionId = clickedBtn.dataset.section;
        const targetSection = document.getElementById(sectionId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Close menu after selection
        this.isOpen = false;
        this.toggleMenu(false);
    }

    toggleMenu(show) {
        if (show) {
            this.navContainer.classList.add('active');
        } else {
            this.navContainer.classList.remove('active');
        }
    }
}

class TerminalInterface {
    constructor() {
        this.terminalElement = document.createElement('div');
        this.terminalElement.className = 'terminal-section';
        this.isOpen = false;
        
        this.init();
    }

    init() {
        this.createTerminalDOM();
        document.body.appendChild(this.terminalElement);
        this.setupKeybindings();
    }

    createTerminalDOM() {
        this.terminalElement.innerHTML = `
            <div class="terminal-output" id="terminalOutput"></div>
            <div class="terminal-input-line">
                <span class="terminal-prompt">[FSCC@2025 ~]$</span>
                <input type="text" class="terminal-input" id="terminalInput" autofocus>
                <span class="cursor"></span>
            </div>
        `;

        this.outputElement = this.terminalElement.querySelector('#terminalOutput');
        this.inputElement = this.terminalElement.querySelector('#terminalInput');

        this.inputElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.processCommand(this.inputElement.value);
                this.inputElement.value = '';
            }
        });
    }

    setupKeybindings() {
        document.addEventListener('keydown', (e) => {
            // Open/close terminal with Ctrl + Space
            if (e.ctrlKey && e.code === 'Space') {
                this.toggle();
            }
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.terminalElement.style.display = this.isOpen ? 'flex' : 'none';
        if (this.isOpen) {
            this.inputElement.focus();
            this.printWelcomeMessage();
        }
    }

    printWelcomeMessage() {
        this.clearOutput();
        this.printLine('FRANCISCO SANTELICES CREATIVE CONTENT - TERMINAL INTERFACE');
        this.printLine('----------------------------------------------------------');
        this.printLine('Welcome. Type `help` for a list of available commands.');
        this.printLine(' ');
    }

    processCommand(command) {
        this.printLine(`> ${command}`);
        const [cmd, ...args] = command.toLowerCase().split(' ');

        switch (cmd) {
            case 'help':
                this.printHelp();
                break;
            case 'nav':
                this.handleNavigation(args[0]);
                break;
            case 'clear':
                this.clearOutput();
                break;
            case 'exit':
                this.toggle();
                break;
            default:
                this.printLine(`Error: command not found: ${cmd}`);
                break;
        }
        this.outputElement.scrollTop = this.outputElement.scrollHeight;
    }

    printHelp() {
        this.printLine('Available commands:');
        this.printLine('  `help`          - Shows this help message.');
        this.printLine('  `nav [section]` - Navigates to a specific section.');
        this.printLine('                    (e.g., `nav audiovisual`)');
        this.printLine('  `clear`         - Clears the terminal screen.');
        this.printLine('  `exit`          - Closes the terminal.');
    }

    handleNavigation(section) {
        const navButton = document.querySelector(`.nav-btn[data-section="${section}"]`);
        if (navButton) {
            navButton.click();
            this.printLine(`Navigating to ${section}...`);
            setTimeout(() => this.toggle(), 500);
        } else {
            this.printLine(`Error: section not found: ${section}`);
        }
    }

    printLine(text) {
        const newLine = document.createElement('div');
        newLine.textContent = text;
        this.outputElement.appendChild(newLine);
    }

    clearOutput() {
        this.outputElement.innerHTML = '';
    }
}

class ScrollAnimator {
    constructor() {
        gsap.registerPlugin(ScrollTrigger, TextPlugin);
        this.animatePhotoGrid();
        this.animateTypewriter();
    }

    animateTypewriter() {
        const words = ["CREATIVE CONTENT", "DESIGN", "ANIMATION", "PHOTOGRAPHY", "3D", "MUSIC", "WEB", "SOCIAL MEDIA", "ART"];
        const textElement = document.getElementById("typewriter-text");
        const typewriterElement = document.getElementById("typewriter");
        const cursorElement = document.querySelector(".typewriter-cursor");
        
        if (!textElement || !typewriterElement) return;

        let masterTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".animated-text-section",
                start: "top 60%",
                toggleActions: "play pause resume reset"
            },
            repeat: -1,
            repeatDelay: 2
        });

        masterTl.to(cursorElement, { autoAlpha: 0, duration: 0.25, repeat: 3, yoyo: true, ease: "steps(1)" });

        words.forEach(word => {
            masterTl.to(textElement, { text: `_${word}`, duration: word.length * 0.1, ease: "none" })
                    .to(cursorElement, { autoAlpha: 0, duration: 0.25, repeat: 3, yoyo: true, ease: "steps(1)", delay: 1 })
                    .to(textElement, { text: "", duration: 0.5, ease: "none" });
        });
    }

    animatePhotoGrid() {
        gsap.from(".grid-item", {
            scrollTrigger: {
                trigger: ".photography-grid",
                start: "top 80%",
            },
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2
        });
    }
}

class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('custom-cursor');
        this.interactiveElements = document.querySelectorAll('button, a, .grid-item, #menu-trigger, input');
        this.init();
    }

    init() {
        gsap.set(this.cursor, { autoAlpha: 0 });

        window.addEventListener('mousemove', e => {
            gsap.to(this.cursor, { duration: 0.1, x: e.clientX, y: e.clientY, ease: "power2.out" });
        });

        document.addEventListener('mouseenter', () => {
            gsap.to(this.cursor, { duration: 0.2, autoAlpha: 1 });
        });

        document.addEventListener('mouseleave', () => {
            gsap.to(this.cursor, { duration: 0.2, autoAlpha: 0 });
        });

        this.interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }
}

class ChatbotManager {
    constructor() {
        this.chatContainer = document.querySelector('.chat-container');
        this.chatHistory = document.querySelector('.chat-history');
        this.input = document.getElementById('chat-input');
        this.chatTitleMain = document.getElementById('chat-title-main');
        this.chatTitleSub = document.getElementById('chat-title-sub');
        this.conversationState = 'START';
        this.warningTimer = null;
        this.resetTimer = null;
        this.init();
    }

    init() {
        if (!this.chatContainer || !this.chatHistory || !this.input || !this.chatTitleMain || !this.chatTitleSub) {
            return;
        }

        this.input.addEventListener('focus', () => this.handleFocus(true));
        this.input.addEventListener('blur', () => this.handleFocus(false));
        this.input.addEventListener('keydown', (e) => {
            this.clearTimers();
            if (e.key === 'Enter') this.processInput();
        });

        this.displayBotMessage("Comienza aquí. ¿Cuál es la esencia de tu idea?");
    }

    handleFocus(isFocused) {
        this.clearTimers();
        if (isFocused) {
            this.chatContainer.classList.add('title-active');
        } else {
            if (this.input.value.trim() === '' && this.conversationState !== 'FINISHED') {
                this.startInactivityTimers();
            }
        }
    }

    startInactivityTimers() {
        this.warningTimer = setTimeout(() => {
            this.displayBotMessage("Parece que ya no estás escribiendo. Presiona cualquier tecla para continuar. Voy a reiniciar en 15 segundos.");
            this.resetTimer = setTimeout(() => this.resetChat(true), 15000);
        }, 10000);
    }

    clearTimers() {
        clearTimeout(this.warningTimer);
        clearTimeout(this.resetTimer);
    }

    updateSubTitle(newText) {
        gsap.to(this.chatTitleSub, { 
            opacity: 0, duration: 0.3, 
            onComplete: () => {
                this.chatTitleSub.textContent = newText;
                gsap.to(this.chatTitleSub, { opacity: 1, duration: 0.3 });
            }
        });
    }

    processInput() {
        const userInput = this.input.value.trim();
        if (userInput === '') return;

        this.displayUserMessage(userInput);
        this.input.value = '';
        this.input.disabled = true;

        this.handleStateChange(this.conversationState, userInput);
    }

    handleStateChange(currentState, userInput = '') {
        let nextState = currentState;

        switch (currentState) {
            case 'START':
                this.updateSubTitle("[ PASO 1: EL CONTEXTO ]");
                this.displayBotMessage("Para empezar, ¿este proyecto es para ti, para tu marca personal, o para una empresa?");
                nextState = 'AWAITING_CONTEXT';
                break;

            case 'AWAITING_CONTEXT':
                this.handleContextResponse(userInput);
                return; // handleContextResponse will set the next state

            case 'AWAITING_PURPOSE':
                this.updateSubTitle("[ PASO 3: EL FORMATO ]");
                this.displayBotMessage("Entendido. Y para darle vida a ese objetivo, ¿en qué formato lo has imaginado? ¿VIDEO, DISEÑO, FOTO, WEB?");
                nextState = 'AWAITING_FORMAT';
                break;

            case 'AWAITING_FORMAT':
                this.updateSubTitle("[ PASO 4: TU VISIÓN ]");
                this.displayBotMessage("Perfecto. Ahora, descríbelo todo. Estamos a muy poco de verlo realidad.");
                nextState = 'AWAITING_FINAL_DESCRIPTION';
                break;

            case 'AWAITING_FINAL_DESCRIPTION':
                this.updateSubTitle("[ ÚLTIMO PASO: TU CONTACTO ]");
                this.displayBotMessage("Para cerrar el círculo, por favor, déjame tu email o teléfono para poder contactarte.");
                nextState = 'AWAITING_CONTACT';
                break;

            case 'AWAITING_CONTACT':
                this.updateSubTitle("[ TRANSMISIÓN COMPLETA ]");
                this.displayBotMessage("[ REGISTRO ENVIADO ] Gracias. Te contactaré en breve.");
                setTimeout(() => this.displayBotMessage("El chat se reiniciará en 10 segundos..."), 1500);
                setTimeout(() => this.resetChat(true), 10000);
                nextState = 'FINISHED';
                break;
        }
        this.conversationState = nextState;
        this.input.disabled = false;
        this.input.focus();
    }

    handleContextResponse(userInput) {
        const input = userInput.toLowerCase();
        this.updateSubTitle("[ PASO 2: EL PROPÓSITO ]");
        if (input.includes('empresa')) {
            this.displayBotMessage("Perfecto. ¿El objetivo es comunicacional (lanzar un producto), de branding (crear o renovar la identidad), o de marketing (contenido para redes, web)?");
        } else {
            this.displayBotMessage("Genial. ¿Buscas expresar una idea artística, potenciar tu marca, o algo más?");
        }
        this.conversationState = 'AWAITING_PURPOSE';
        this.input.disabled = false;
        this.input.focus();
    }

    resetChat(withAnimation) {
        this.clearTimers();
        if (withAnimation) {
            const resetContainer = document.getElementById('reset-animation-container');
            const outline = resetContainer.querySelector('.reset-triangle-outline');
            const solid = resetContainer.querySelector('.reset-triangle-solid');

            gsap.to(this.chatContainer, { 
                opacity: 0, duration: 0.5, 
                onComplete: () => {
                    gsap.to(resetContainer, { opacity: 1, duration: 0.2 });
                    gsap.fromTo(outline, 
                        { scale: 0.5, rotation: -45 }, 
                        { scale: 1, rotation: 0, duration: 1, ease: "power2.out" }
                    );
                    gsap.fromTo(solid, 
                        { scale: 0.5, rotation: 45 }, 
                        { scale: 1, rotation: 0, duration: 1.2, ease: "power2.out" }
                    );
                    gsap.to(resetContainer, { 
                        opacity: 0, duration: 1, delay: 2.5, ease: "power2.in",
                        onComplete: () => this.resetInterface()
                    });
                }
            });
        } else {
            this.resetInterface();
        }
    }

    resetInterface(){
        this.chatHistory.innerHTML = '';
        this.conversationState = 'START';
        this.updateSubTitle("");
        this.chatContainer.classList.remove('title-active');
        this.input.disabled = false;
        this.input.placeholder = "Describe tu proyecto...";
        this.displayBotMessage("Comienza aquí. ¿Cuál es la esencia de tu idea?");
        gsap.to(this.chatContainer, { opacity: 1, duration: 0.5 });
    }

    displayUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message user';
        messageElement.textContent = message;
        this.chatHistory.appendChild(messageElement);
        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
    }

    displayBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message bot';
        messageElement.textContent = message;
        this.chatHistory.appendChild(messageElement);
        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
    }
}