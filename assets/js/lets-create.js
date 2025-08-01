// HERRAMIENTA DE CONSULTA 'LET'S CREATE' - LÓGICA MODULAR (v4 Paneles Divididos)
class ConsultationFlow {
    constructor() {
        this.conversationTree = null;
        this.currentStep = 'welcome';
        this.userResponses = [];
        this.initializeElements();
        this.setupEventListeners();
    }

    async initialize() {
        await this.loadConversationFlow();
    }

    async loadConversationFlow() {
        try {
            const response = await fetch('assets/js/conversation-flow.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            this.conversationTree = await response.json();
        } catch (error) {
            console.error("Error loading conversation flow:", error);
            // Asegurarse de que consultationContainer exista antes de intentar modificarlo
            const consultationContainer = document.querySelector('.consultation-container');
            if (consultationContainer) {
                consultationContainer.innerHTML = '<p class="consultation-message-content" style="color: #ff5555;">Error: No se pudo cargar la herramienta de consulta.</p>';
            }
        }
    }

    initializeElements() {
        this.chatContainer = document.querySelector('.chat-container');
        this.consultationContainer = document.querySelector('.consultation-container');
        this.triggerSection = document.querySelector('.consultation-trigger-section');
        this.startButton = document.getElementById('startConsultation');
        // Los paneles se crearán dinámicamente en startConsultation
        this.contextPanel = null;
        this.actionPanel = null;
    }

    setupEventListeners() {
        if (this.startButton) {
            this.addCursorEvents(this.startButton);
            this.startButton.addEventListener('click', () => this.startConsultation());
        }
    }

    addCursorEvents(element) {
        element.addEventListener('mouseover', () => document.body.classList.add('cursor-hover'));
        element.addEventListener('mouseout', () => document.body.classList.remove('cursor-hover'));
    }

    startConsultation() {
        if (!this.conversationTree) return;

        this.chatContainer.classList.add('title-active');
        this.triggerSection.style.display = 'none'; // Ocultar el trigger

        // Crear la estructura de paneles
        this.consultationContainer.innerHTML = `
            <div id="context-panel"></div>
            <div id="action-panel"></div>
        `;
        this.contextPanel = this.consultationContainer.querySelector('#context-panel');
        this.actionPanel = this.consultationContainer.querySelector('#action-panel');

        // Iniciar la conversación secuencialmente
        this.displayMessagesSequentially(this.conversationTree.welcome.messages, () => {
            this.displayOptions(this.conversationTree.welcome.options);
        });
    }

    displayMessagesSequentially(messages, onComplete) {
        let index = 0;
        const displayNext = () => {
            if (index < messages.length) {
                // Añadir clase 'is-welcome' solo a los mensajes de bienvenida
                const isWelcomeMessage = (index === 0 && this.currentStep === 'welcome');
                this.displayMessage(messages[index], 'assistant', isWelcomeMessage);
                index++;
                setTimeout(displayNext, 1800); // Pausa entre mensajes
            } else if (onComplete) {
                onComplete();
            }
        };
        displayNext();
    }

    displayMessage(content, sender, isWelcome = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `consultation-message ${sender}`;
        if (isWelcome) {
            messageDiv.classList.add('is-welcome');
        }
        const formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '</p><p>');
        messageDiv.innerHTML = `<div class="consultation-message-content"><p>${formattedContent}</p></div>`;
        this.contextPanel.appendChild(messageDiv);
        
        // Scroll suave al final del panel de contexto
        setTimeout(() => {
            this.contextPanel.scrollTo({
                top: this.contextPanel.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    }

    displayOptions(options) {
        this.actionPanel.innerHTML = ''; // Limpiar panel de acción
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'consultation-response-options';
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'consultation-response-option';
            button.textContent = option.text;
            this.addCursorEvents(button);
            button.addEventListener('click', () => this.selectOption(option));
            optionsDiv.appendChild(button);
        });
        this.actionPanel.appendChild(optionsDiv);
    }

    displayInput() {
        this.actionPanel.innerHTML = ''; // Limpiar panel de acción
        const inputDiv = document.createElement('div');
        inputDiv.className = 'consultation-custom-input-section';
        inputDiv.innerHTML = `
            <textarea class="consultation-custom-input" placeholder="Describe tu proyecto, visión o desafío..." rows="6"></textarea>
            <button class="consultation-send-btn">Enviar</button>
        `;
        const textarea = inputDiv.querySelector('.consultation-custom-input');
        const sendButton = inputDiv.querySelector('.consultation-send-btn');
        this.addCursorEvents(textarea);
        this.addCursorEvents(sendButton);

        const sendInput = () => {
            const text = textarea.value.trim();
            if (text) {
                this.userResponses.push(`Descripción libre: ${text}`);
                this.displayMessage(text, 'user');
                this.processUserInput(text);
            }
        };
        sendButton.addEventListener('click', sendInput);
        textarea.addEventListener('keypress', e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendInput(); }
        });
        this.actionPanel.appendChild(inputDiv);
        textarea.focus();
    }

    selectOption(option) {
        this.userResponses.push(option.text);
        this.displayMessage(option.text, 'user');
        this.showTypingIndicator();
        setTimeout(() => this.processStep(option.next), 1500);
    }

    showTypingIndicator() {
        this.actionPanel.innerHTML = '<div class="consultation-typing-indicator visible">Analizando tu respuesta...</div>';
    }

    processStep(stepKey) {
        const step = this.conversationTree[stepKey];
        if (!step) return;

        this.displayMessage(step.message, 'assistant');
        setTimeout(() => {
            if (step.final) {
                this.displayContactForm();
            } else if (step.input) {
                this.displayInput();
            } else if (step.options) {
                this.displayOptions(step.options);
            }
        }, 1200);
    }

    processUserInput(text) {
        this.showTypingIndicator();
        setTimeout(() => this.processStep('analyze_description'), 1800);
    }

    displayContactForm() {
        this.actionPanel.innerHTML = ''; // Limpiar panel de acción
        const formContainer = document.createElement('div');
        formContainer.className = 'consultation-contact-form-section';
        formContainer.innerHTML = `
            <h4>Perfecto.</h4>
            <p>Para materializar tu visión, conversemos.</p>
            <form id="consultation-form" action="https://formspree.io/f/mwpqqyja" method="POST">
                <input type="hidden" name="conversation_history" id="conversation-history-input">
                <div class="form-group"><input type="text" name="name" placeholder="Nombre" required class="form-input"></div>
                <div class="form-group"><input type="email" name="_replyto" placeholder="Email" required class="form-input"></div>
                <div class="form-group"><textarea name="message" placeholder="Tu mensaje" required class="form-input"></textarea></div>
                <button type="submit" class="submit-button">Enviar</button>
            </form>
            <div id="form-status"></div>
        `;
        this.actionPanel.appendChild(formContainer);
        formContainer.querySelectorAll('.form-input, .submit-button').forEach(el => this.addCursorEvents(el));
        const form = formContainer.querySelector('#consultation-form');
        form.addEventListener('submit', e => { e.preventDefault(); this.handleFormSubmit(form); });
    }

    async handleFormSubmit(form) {
        const historyInput = form.querySelector('#conversation-history-input');
        const formattedHistory = this.userResponses.map((resp, i) => `${i + 1}. ${resp}`).join('\n');
        historyInput.value = `Historial de la Consulta:\n----------------------------\n${formattedHistory}`;

        const status = form.querySelector('#form-status');
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
            if (response.ok) {
                this.actionPanel.innerHTML = '<div class="form-success"><p>¡Gracias por tu mensaje! Te contactaré pronto.</p><p class="consultation-credit">Herramienta desarrollada por Francisco Santelices Ariztía.</p></div>';
            } else {
                const data = await response.json();
                status.innerHTML = data.errors ? data.errors.map(e => e.message).join(', ') : "Oops! Hubo un problema.";
                status.style.color = 'red';
            }
        } catch (error) {
            status.innerHTML = "Oops! Hubo un problema de red.";
            status.style.color = 'red';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const consultationFlow = new ConsultationFlow();
    consultationFlow.initialize();
});