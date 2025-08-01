// HERRAMIENTA DE CONSULTA 'LET'S CREATE' - LÓGICA MODULAR (v3 con título activo y firma)
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
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.conversationTree = await response.json();
        } catch (error) {
            console.error("Error loading conversation flow:", error);
            this.messagesContainer.innerHTML = '<p class="consultation-message-content" style="color: #ff5555;">Error: No se pudo cargar la herramienta de consulta. Por favor, inténtalo de nuevo más tarde. <\/p>';
        }
    }

    initializeElements() {
        this.chatContainer = document.querySelector('.chat-container'); // <--- Contenedor principal
        this.triggerSection = document.querySelector('.consultation-trigger-section');
        this.startButton = document.getElementById('startConsultation');
        this.conversationArea = document.getElementById('consultationConversationArea');
        this.messagesContainer = document.getElementById('consultationMessagesContainer');
        this.typingIndicator = document.getElementById('consultationTypingIndicator');
        this.finalCta = document.getElementById('consultationFinalCta');
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
        if (!this.conversationTree) {
            console.error("Conversation flow not loaded yet.");
            return;
        }
        if (this.chatContainer) {
            this.chatContainer.classList.add('title-active'); // <--- ACTIVAR TÍTULO
        }
        this.triggerSection.classList.add('hidden');
        this.conversationArea.classList.add('active');
        
        setTimeout(() => {
            this.displayMessage(this.conversationTree.welcome.message, 'assistant');
            setTimeout(() => this.displayOptions(this.conversationTree.welcome.options), 1000);
        }, 300);
    }

    displayMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `consultation-message ${sender}`;
        const contentDiv = document.createElement('div');
        contentDiv.className = 'consultation-message-content';
        const formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1<\/strong>').replace(/\n\n/g, '<\/p><p>').replace(/\n/g, '<br>');
        contentDiv.innerHTML = `<p>${formattedContent}<\/p>`;
        messageDiv.appendChild(contentDiv);
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    displayOptions(options) {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'consultation-response-options';
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'consultation-response-option';
            button.textContent = option.text;
            this.addCursorEvents(button);
            button.addEventListener('click', () => {
                this.selectOption(option);
                optionsDiv.remove();
            });
            optionsDiv.appendChild(button);
        });
        this.messagesContainer.appendChild(optionsDiv);
        this.scrollToBottom();
    }

    displayInput() {
        const inputDiv = document.createElement('div');
        inputDiv.className = 'consultation-custom-input-section';
        inputDiv.innerHTML = `
            <div class="consultation-input-container">
                <textarea class="consultation-custom-input" placeholder="Describe tu proyecto, visión o desafío..." rows="4"><\/textarea>
                <button class="consultation-send-btn">Enviar<\/button>
            <\/div>
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
                inputDiv.remove();
                this.processUserInput(text);
            }
        };
        sendButton.addEventListener('click', sendInput);
        textarea.addEventListener('keypress', e => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendInput();
            }
        });
        this.messagesContainer.appendChild(inputDiv);
        textarea.focus();
        this.scrollToBottom();
    }

    selectOption(option) {
        this.userResponses.push(option.text);
        this.displayMessage(option.text, 'user');
        this.showTyping();
        setTimeout(() => {
            this.hideTyping();
            this.processStep(option.next);
        }, 1500);
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
        this.showTyping();
        setTimeout(() => {
            this.hideTyping();
            this.processStep('analyze_description');
        }, 1800);
    }

    displayContactForm() {
        const formContainer = document.createElement('div');
        formContainer.className = 'consultation-contact-form-section';
        formContainer.innerHTML = `
            <h3>Perfecto. Tengo una visión clara de tu proyecto.<\/h3>
            <p>Conversemos sobre cómo materializar tu visión creativa.<\/p>
            <form id="consultation-form" action="https://formspree.io/f/mwpqqyja" method="POST">
                <input type="hidden" name="conversation_history" id="conversation-history-input">
                <div class="form-group">
                    <input type="text" name="name" placeholder="Nombre" required class="form-input">
                <\/div>
                <div class="form-group">
                    <input type="email" name="_replyto" placeholder="Email" required class="form-input">
                <\/div>
                <div class="form-group">
                    <textarea name="message" placeholder="Describe brevemente tu proyecto" required class="form-input"><\/textarea>
                <\/div>
                <button type="submit" class="submit-button">Enviar Mensaje<\/button>
            <\/form>
            <div id="form-status"><\/div>
        `;
        this.messagesContainer.appendChild(formContainer);
        formContainer.querySelectorAll('.form-input, .submit-button').forEach(el => this.addCursorEvents(el));
        this.scrollToBottom();
        const form = formContainer.querySelector('#consultation-form');
        form.addEventListener('submit', e => {
            e.preventDefault();
            this.handleFormSubmit(form);
        });
    }

    async handleFormSubmit(form) {
        const historyInput = form.querySelector('#conversation-history-input');
        const formattedHistory = this.userResponses.map((resp, i) => `${i + 1}. ${resp}`).join('\n');
        historyInput.value = `Historial de la Consulta:\n----------------------------\n${formattedHistory}`;

        const status = form.querySelector('#form-status');
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                // <--- AÑADIR FIRMA AQUÍ
                form.innerHTML = '<p>¡Gracias por tu mensaje! Te contactaré pronto.<\/p><p class="consultation-credit">Herramienta desarrollada por Francisco Santelices Ariztía.<\/p>';
            } else {
                const data = await response.json();
                status.innerHTML = data.errors ? data.errors.map(error => error.message).join(', ') : "Oops! Hubo un problema al enviar tu mensaje.";
                status.style.color = 'red';
            }
        } catch (error) {
            status.innerHTML = "Oops! Hubo un problema de red.";
            status.style.color = 'red';
        }
    }

    showTyping() {
        this.typingIndicator.classList.add('visible');
        this.scrollToBottom();
    }

    hideTyping() {
        this.typingIndicator.classList.remove('visible');
    }

    scrollToBottom() {
        setTimeout(() => {
            this.conversationArea.scrollTo({
                top: this.conversationArea.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const consultationFlow = new ConsultationFlow();
    consultationFlow.initialize();
});