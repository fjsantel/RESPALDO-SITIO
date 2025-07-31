class ConsultationFlow {
    constructor() {
        this.currentStep = 0;
        this.userResponses = {};
        this.isActive = false;
        this.conversationData = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupConsultationFlow();
    }

    setupEventListeners() {
        // Botón iniciar consulta
        const triggerBtn = document.querySelector('.consultation-trigger');
        if (triggerBtn) {
            triggerBtn.addEventListener('click', () => this.startConsultation());
        }

        // Input de consulta
        const input = document.querySelector('.consultation-input');
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleUserInput();
                }
            });

            input.addEventListener('input', () => {
                this.toggleSendButton();
            });
        }

        // Botón enviar
        const sendBtn = document.querySelector('.send-button');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.handleUserInput());
        }
    }

    setupConsultationFlow() {
        this.consultationSteps = [
            {
                type: 'system',
                message: 'Esta herramienta está diseñada para ayudarte a estructurar y desarrollar tu visión creativa audiovisual. No soy un chatbot, sino una guía metodológica para proyectos profesionales.',
                delay: 1000
            },
            {
                type: 'consultation',
                message: '¿Cuál es la naturaleza de tu proyecto audiovisual?',
                options: ['motion-graphics', 'animation', 'commercial', 'branding', 'experimental'],
                delay: 2000
            }
        ];

        this.flowSteps = {
            'motion-graphics': [
                {
                    question: '¿Qué tipo de motion graphics necesitas desarrollar?',
                    subQuestions: [
                        'Duración aproximada del proyecto',
                        'Estilo visual preferido (minimalista, orgánico, geométrico)',
                        'Plataforma de destino (web, redes sociales, presentación)'
                    ]
                },
                {
                    question: '¿Cuáles son los elementos clave de tu marca o mensaje?',
                    subQuestions: [
                        'Colores corporativos o paleta preferida',
                        'Tono de comunicación (profesional, creativo, dinámico)',
                        'Público objetivo'
                    ]
                }
            ],
            'animation': [
                {
                    question: '¿Qué estilo de animación buscas?',
                    subQuestions: [
                        'Técnica preferida (2D, 3D, motion capture, mixta)',
                        'Referencias visuales o artísticas',
                        'Nivel de complejidad deseado'
                    ]
                },
                {
                    question: '¿Cuál es la narrativa o concepto central?',
                    subQuestions: [
                        'Historia o mensaje a transmitir',
                        'Personajes o elementos principales',
                        'Emociones a evocar'
                    ]
                }
            ],
            'commercial': [
                {
                    question: '¿Cuáles son los objetivos comerciales del proyecto?',
                    subQuestions: [
                        'KPIs o métricas de éxito esperadas',
                        'Mercado objetivo específico',
                        'Presupuesto y timeline disponible'
                    ]
                },
                {
                    question: '¿Cómo se integrará en tu estrategia de marketing?',
                    subQuestions: [
                        'Canales de distribución planificados',
                        'Campañas complementarias',
                        'Análisis de competencia'
                    ]
                }
            ],
            'branding': [
                {
                    question: '¿Qué aspectos de tu identidad visual necesitas desarrollar?',
                    subQuestions: [
                        'Logo, tipografía, paleta de colores',
                        'Aplicaciones específicas requeridas',
                        'Personalidad de marca deseada'
                    ]
                },
                {
                    question: '¿Cómo quieres diferenciarte en tu mercado?',
                    subQuestions: [
                        'Propuesta de valor única',
                        'Análisis de competencia directa',
                        'Posicionamiento estratégico'
                    ]
                }
            ],
            'experimental': [
                {
                    question: '¿Qué técnicas o conceptos quieres explorar?',
                    subQuestions: [
                        'Tecnologías emergentes de interés',
                        'Límites artísticos a explorar',
                        'Resultado esperado o hipótesis'
                    ]
                },
                {
                    question: '¿Cuál es el propósito de esta experimentación?',
                    subQuestions: [
                        'Desarrollo personal o profesional',
                        'Investigación para proyectos futuros',
                        'Innovación en tu portafolio'
                    ]
                }
            ]
        };
    }

    startConsultation() {
        this.isActive = true;
        
        // Ocultar botón iniciar
        const triggerBtn = document.querySelector('.consultation-trigger');
        if (triggerBtn) {
            triggerBtn.classList.add('hidden');
        }

        // Mostrar interfaz de consulta
        const interface = document.querySelector('.consultation-interface');
        if (interface) {
            interface.classList.add('active');
        }

        // Iniciar flujo de mensajes
        this.startMessageFlow();
    }

    startMessageFlow() {
        this.consultationSteps.forEach((step, index) => {
            setTimeout(() => {
                this.addMessage(step.message, step.type);
                if (index === this.consultationSteps.length - 1) {
                    this.enableInput();
                }
            }, step.delay);
        });
    }

    addMessage(content, type = 'consultation', animate = true) {
        const conversationArea = document.querySelector('.conversation-area');
        if (!conversationArea) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = content;

        if (animate) {
            messageDiv.style.animationDelay = '0.1s';
        }

        conversationArea.appendChild(messageDiv);
        this.scrollToBottom();
    }

    handleUserInput() {
        const input = document.querySelector('.consultation-input');
        if (!input || !input.value.trim()) return;

        const userMessage = input.value.trim();
        
        // Agregar mensaje del usuario
        this.addMessage(userMessage, 'user');
        
        // Limpiar input
        input.value = '';
        this.toggleSendButton();

        // Mostrar indicador de typing
        this.showTypingIndicator();

        // Procesar respuesta
        setTimeout(() => {
            this.processUserResponse(userMessage);
        }, 1500);
    }

    processUserResponse(response) {
        this.hideTypingIndicator();
        
        // Detectar categoría del proyecto
        const category = this.detectProjectCategory(response);
        
        if (category && this.flowSteps[category]) {
            this.currentStep = 0;
            this.userResponses.category = category;
            this.continueWithCategory(category);
        } else {
            // Respuesta general o clarificación
            this.addMessage('Basándome en tu descripción, necesito entender mejor algunos aspectos específicos para ofrecerte la mejor orientación metodológica.');
            
            setTimeout(() => {
                this.addMessage('¿Podrías especificar si tu proyecto se enfoca en: Motion Graphics, Animación, Contenido Comercial, Branding Visual, o Experimentación Audiovisual?');
            }, 1000);
        }
    }

    detectProjectCategory(response) {
        const keywords = {
            'motion-graphics': ['motion', 'graphics', 'logo', 'animado', 'kinetic', 'tipografía', 'after effects'],
            'animation': ['animación', 'personaje', 'historia', 'narrativa', '2d', '3d', 'cartoon'],
            'commercial': ['comercial', 'publicidad', 'marketing', 'ventas', 'producto', 'servicio', 'marca'],
            'branding': ['branding', 'identidad', 'marca', 'logo', 'corporate', 'empresa', 'negocio'],
            'experimental': ['experimental', 'innovador', 'técnica', 'explorar', 'nuevo', 'investigar']
        };

        const responseLower = response.toLowerCase();
        
        for (const [category, keywordList] of Object.entries(keywords)) {
            if (keywordList.some(keyword => responseLower.includes(keyword))) {
                return category;
            }
        }
        
        return null;
    }

    continueWithCategory(category) {
        const steps = this.flowSteps[category];
        
        if (steps && steps[this.currentStep]) {
            const currentQuestion = steps[this.currentStep];
            
            setTimeout(() => {
                this.addMessage(currentQuestion.question);
                
                if (currentQuestion.subQuestions) {
                    setTimeout(() => {
                        currentQuestion.subQuestions.forEach((subQ, index) => {
                            setTimeout(() => {
                                this.addMessage(`• ${subQ}`, 'system');
                            }, (index + 1) * 500);
                        });
                    }, 1000);
                }
            }, 800);
        }
    }

    showTypingIndicator() {
        const indicator = document.querySelector('.typing-indicator');
        if (indicator) {
            indicator.classList.add('active');
        }
    }

    hideTypingIndicator() {
        const indicator = document.querySelector('.typing-indicator');
        if (indicator) {
            indicator.classList.remove('active');
        }
    }

    enableInput() {
        const input = document.querySelector('.consultation-input');
        if (input) {
            input.disabled = false;
            input.focus();
        }
    }

    toggleSendButton() {
        const input = document.querySelector('.consultation-input');
        const sendBtn = document.querySelector('.send-button');
        
        if (input && sendBtn) {
            if (input.value.trim()) {
                sendBtn.classList.add('visible');
            } else {
                sendBtn.classList.remove('visible');
            }
        }
    }

    scrollToBottom() {
        const conversationArea = document.querySelector('.conversation-area');
        if (conversationArea) {
            setTimeout(() => {
                conversationArea.scrollTop = conversationArea.scrollHeight;
            }, 100);
        }
    }

    generateSummary() {
        // Generar resumen metodológico del proyecto
        const summary = {
            category: this.userResponses.category,
            responses: this.userResponses,
            recommendations: this.getRecommendations(),
            nextSteps: this.getNextSteps()
        };
        
        return summary;
    }

    getRecommendations() {
        // Recomendaciones específicas basadas en la categoría
        const recommendations = {
            'motion-graphics': [
                'Define un sistema de grid y timing consistente',
                'Establece una paleta limitada pero efectiva',
                'Considera la jerarquía visual en cada frame'
            ],
            'animation': [
                'Desarrolla un storyboard detallado antes de animar',
                'Define el timing y spacing de los movimientos clave',
                'Establece un pipeline de producción claro'
            ],
            'commercial': [
                'Alinea cada decisión creativa con objetivos de negocio',
                'Prueba el concepto con el público objetivo',
                'Mide el impacto y optimiza iterativamente'
            ],
            'branding': [
                'Asegura coherencia en todas las aplicaciones',
                'Diseña pensando en escalabilidad futura',
                'Documenta las decisiones de diseño'
            ],
            'experimental': [
                'Documenta el proceso tanto como el resultado',
                'Define métricas de éxito específicas',
                'Mantén un enfoque iterativo y reflexivo'
            ]
        };
        
        return recommendations[this.userResponses.category] || [];
    }

    getNextSteps() {
        return [
            'Revisar y refinar los objetivos del proyecto',
            'Desarrollar un timeline realista',
            'Establecer puntos de revisión y feedback',
            'Contactar para discutir implementación específica'
        ];
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Solo inicializar si existen los elementos de consulta
    if (document.querySelector('.consultation-container')) {
        new ConsultationFlow();
    }
});

// Prevenir conflictos con otros scripts
window.ConsultationFlow = ConsultationFlow;