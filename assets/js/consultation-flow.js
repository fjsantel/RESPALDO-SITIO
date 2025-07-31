// HERRAMIENTA DE CONSULTA - FLUJO ESPECÍFICO SOLICITADO
class ConsultationFlow {
    constructor() {
        this.conversationTree = {
            welcome: {
                message: "Esto no es un chatbot.\n\nEs una herramienta orientada a ayudar a **integrar visiones creativas** para un producto bien acabado y de este modo entender cuáles son las **herramientas más idóneas**.\n\nPoner en palabras lo que quieres crear es fundamental para desarrollar cualquier proyecto exitoso.",
                options: [
                    { text: "Tengo una visión clara que quiero materializar", next: "clear_vision" },
                    { text: "Necesito resolver un desafío creativo específico", next: "creative_challenge" },
                    { text: "Conozco el resultado pero no el proceso", next: "result_no_process" },
                    { text: "Prefiero describir mi proyecto libremente", next: "free_description" }
                ]
            },

            clear_vision: {
                message: "Las visiones claras son la base de productos bien acabados.\n\n¿En qué ámbito se desarrolla tu proyecto?",
                options: [
                    { text: "Comercial: branding, publicidad, lanzamiento", next: "commercial_scope" },
                    { text: "Narrativo: storytelling, documental, contenido", next: "narrative_scope" },
                    { text: "Educativo: explicativo, formativo, divulgativo", next: "educational_scope" },
                    { text: "Artístico: exploración personal, experimental", next: "artistic_scope" }
                ]
            },

            creative_challenge: {
                message: "Los desafíos creativos requieren **herramientas técnicas específicas** y enfoques estratégicos.\n\n¿Cuál es la naturaleza de tu desafío?",
                options: [
                    { text: "Comunicar ideas complejas de forma accesible", next: "complex_communication" },
                    { text: "Generar impacto visual en tiempo limitado", next: "visual_impact" },
                    { text: "Diferenciarse en un mercado saturado", next: "market_differentiation" },
                    { text: "Conectar emocionalmente con audiencia específica", next: "emotional_connection" }
                ]
            },

            result_no_process: {
                message: "Conocer el destino final permite **seleccionar las herramientas más efectivas** para llegar ahí.\n\n¿Cuál es el resultado específico que buscas?",
                options: [
                    { text: "Aumentar conversiones o engagement", next: "increase_conversions" },
                    { text: "Construir o reforzar identidad de marca", next: "brand_identity" },
                    { text: "Educar o informar sobre un tema", next: "educate_inform" },
                    { text: "Generar reconocimiento o viralidad", next: "recognition_viral" }
                ]
            },

            free_description: {
                message: "Cada proyecto tiene **características únicas** que determinan las herramientas más adecuadas.\n\nDescribe tu proyecto, visión o desafío:",
                input: true,
                next: "analyze_description"
            },

            // DESARROLLOS ESPECÍFICOS
            commercial_scope: {
                message: "Los proyectos comerciales exitosos requieren **equilibrio entre creatividad y efectividad**.\n\n**Herramientas clave para tu ámbito:**\n\nEstrategia de mensaje clara y diferenciada\nAnálisis de audiencia objetivo y competencia\nSelección de formatos según plataformas de distribución\nMétricas de éxito definidas desde preproducción\n\n**La creatividad debe servir objetivos comerciales específicos, no solo impresionar visualmente.**",
                final: true
            },

            narrative_scope: {
                message: "Los proyectos narrativos dependen de **decisiones dramatúrgicas sólidas** y herramientas de storytelling.\n\n**Framework narrativo esencial:**\n\nEstructura dramática adaptada al formato\nDesarrollo de personajes o elementos identificables\nRitmo y timing precisos según audiencia\nIntegración orgánica de elementos técnicos\n\n**La técnica debe ser invisible para que la historia sea protagonista.**",
                final: true
            },

            educational_scope: {
                message: "Los proyectos educativos transforman **complejidad en comprensión** mediante herramientas pedagógicas específicas.\n\n**Metodología educativa audiovisual:**\n\nProgresión lógica de conceptos simples a complejos\nRefuerzo visual de ideas clave mediante repetición inteligente\nAdaptación a diferentes estilos de aprendizaje\nTesting de comprensión en cada fase de desarrollo\n\n**El éxito se mide en comprensión real, no en espectacularidad visual.**",
                final: true
            },

            artistic_scope: {
                message: "Los proyectos artísticos son **laboratorios de innovación** donde se desarrollan las herramientas del futuro.\n\n**Metodología de exploración creativa:**\n\nLibertad para experimentar sin restricciones comerciales\nDocumentación del proceso para análisis posterior\nIntegración de nuevas técnicas y tecnologías\nDesarrollo de estilo y voz personal distintiva\n\n**Los experimentos artísticos de hoy son las soluciones comerciales de mañana.**",
                final: true
            },

            complex_communication: {
                message: "Comunicar complejidad requiere **herramientas de simplificación** sin perder profundidad.\n\n**Estrategias de comunicación compleja:**\n\nDeconstrucción en componentes comprensibles\nUso de analogías visuales universales\nJerarquización clara de información\nProgresión controlada de dificultad\n\n**La simplicidad aparente requiere sofisticación técnica real.**",
                final: true
            },

            visual_impact: {
                message: "El impacto visual efectivo combina **técnica precisa** con comprensión psicológica de la percepción.\n\n**Herramientas de impacto visual:**\n\nColor psychology aplicada estratégicamente\nComposición cinematográfica y dirección de mirada\nTiming y ritmo adaptados al contexto de consumo\nContraste calculado para jerarquía de información\n\n**El impacto debe ser memorable pero nunca gratuito.**",
                final: true
            },

            analyze_description: {
                message: "Basándome en tu descripción, identifico elementos clave que determinarán **las herramientas más efectivas**.\n\n¿Cuál de estos aspectos consideras más crítico para el éxito?",
                options: [
                    { text: "Impacto visual y estética memorable", next: "visual_priority" },
                    { text: "Claridad del mensaje principal", next: "message_priority" },
                    { text: "Conexión emocional profunda", next: "emotional_priority" },
                    { text: "Diferenciación competitiva clara", next: "differentiation_priority" }
                ]
            },

            visual_priority: {
                message: "Priorizar el impacto visual requiere **herramientas estéticas avanzadas** y comprensión profunda del lenguaje audiovisual.\n\n**Toolkit visual prioritario:**\n\nColor grading y paletas estratégicas\nComposición dinámica y cinematográfica\nMotion graphics y timing milimétrico\nIntegración 2D/3D según necesidades\n\n**La estética debe ser distintiva pero siempre al servicio del mensaje.**",
                final: true
            },

            message_priority: {
                message: "Priorizar la claridad del mensaje requiere **herramientas de comunicación** precisas y testing constante.\n\n**Framework de claridad comunicativa:**\n\nEstructura narrativa linear y lógica\nEliminación sistemática de ruido visual\nRefuerzo multimodal de conceptos clave\nValidación de comprensión en audiencia real\n\n**Cada elemento debe contribuir a la comprensión, nunca distraer de ella.**",
                final: true
            },

            emotional_priority: {
                message: "Priorizar la conexión emocional requiere **herramientas de empatía** y comprensión psicológica profunda.\n\n**Metodología de conexión emocional:**\n\nStorytelling auténtico y vulnerable\nMusic y sound design como amplificadores emocionales\nPersonalización y proximidad humana\nValores compartidos transmitidos implícitamente\n\n**Las emociones se recuerdan cuando los datos se olvidan.**",
                final: true
            }
        };

        this.currentStep = 'welcome';
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.startButton = document.getElementById('startConsultation');
        this.conversationArea = document.getElementById('consultationConversationArea');
        this.messagesContainer = document.getElementById('consultationMessagesContainer');
        this.typingIndicator = document.getElementById('consultationTypingIndicator');
        this.finalCta = document.getElementById('consultationFinalCta');
        this.triggerSection = document.querySelector('.consultation-trigger-section');
    }

    setupEventListeners() {
        if (this.startButton) {
            this.startButton.addEventListener('click', () => {
                this.startConsultation();
            });
        }
    }

    startConsultation() {
        // Ocultar trigger y mostrar área de conversación
        if (this.triggerSection) {
            this.triggerSection.style.display = 'none';
        }
        if (this.conversationArea) {
            this.conversationArea.classList.add('active');
            // Scroll suave a la conversación sin ir al final de la página
            setTimeout(() => {
                this.conversationArea.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 400);
        }
        
        // Iniciar con mensaje de bienvenida específico
        setTimeout(() => {
            this.displayMessage(this.conversationTree.welcome.message, 'assistant');
            setTimeout(() => {
                this.displayOptions(this.conversationTree.welcome.options);
            }, 1000);
        }, 300);
    }

    displayMessage(content, sender) {
        if (!this.messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `consultation-message ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'consultation-message-content';
        
        // Convertir markdown básico
        const formattedContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');
        
        contentDiv.innerHTML = `<p>${formattedContent}</p>`;
        messageDiv.appendChild(contentDiv);
        this.messagesContainer.appendChild(messageDiv);
        
        this.scrollToBottom();
    }

    displayOptions(options) {
        if (!this.messagesContainer) return;
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'consultation-response-options';
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'consultation-response-option';
            button.textContent = option.text;
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
        if (!this.messagesContainer) return;
        
        const inputDiv = document.createElement('div');
        inputDiv.className = 'consultation-custom-input-section';
        
        inputDiv.innerHTML = `
            <div class="consultation-input-container">
                <textarea class="consultation-custom-input" placeholder="Describe tu proyecto, visión o desafío..." rows="4"></textarea>
                <button class="consultation-send-btn">Enviar</button>
            </div>
        `;
        
        const textarea = inputDiv.querySelector('.consultation-custom-input');
        const sendButton = inputDiv.querySelector('.consultation-send-btn');
        
        const sendInput = () => {
            const text = textarea.value.trim();
            if (text) {
                this.displayMessage(text, 'user');
                inputDiv.remove();
                this.processUserInput(text);
            }
        };
        
        sendButton.addEventListener('click', sendInput);
        textarea.addEventListener('keypress', (e) => {
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
                this.showFinalCta();
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

    showTyping() {
        if (this.typingIndicator) {
            this.typingIndicator.classList.add('visible');
        }
        this.scrollToBottom();
    }

    hideTyping() {
        if (this.typingIndicator) {
            this.typingIndicator.classList.remove('visible');
        }
    }

    showFinalCta() {
        if (this.finalCta) {
            setTimeout(() => {
                this.finalCta.classList.add('show');
            }, 1000);
        }
    }

    scrollToBottom() {
        setTimeout(() => {
            // Scroll suave dentro del área de conversación si es necesario
            if (this.messagesContainer) {
                const lastMessage = this.messagesContainer.lastElementChild;
                if (lastMessage) {
                    lastMessage.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }
            }
        }, 100);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Verificar que existan los elementos necesarios
    const consultationContainer = document.querySelector('.consultation-container');
    if (consultationContainer) {
        new ConsultationFlow();
    }
});