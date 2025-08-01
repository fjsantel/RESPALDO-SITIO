document.addEventListener('DOMContentLoaded', () => {
    const letsCreateContainer = document.getElementById('letsCreateContainer');
    if (!letsCreateContainer) return;

    // Elementos del DOM
    const chatTitle = document.getElementById('chat-title-main');
    const initialStateWrapper = document.getElementById('initial-state-wrapper');
    const startButton = document.getElementById('startConsultationButton');
    const toolIntroduction = document.getElementById('toolIntroduction');
    const continueButton = document.getElementById('continueButton');
    const interactiveWrapper = document.getElementById('interactive-elements-wrapper');
    const idleCube = document.getElementById('idleCube');
    const toolSpecificText = document.getElementById('tool-specific-text');
    const responseOptions = document.getElementById('responseOptions');
    const userInputContainer = document.getElementById('userInputContainer');
    const userInput = document.getElementById('userInput');
    const finalCta = document.getElementById('consultationFinalCta');
    const formspreeForm = document.getElementById('formspree-form');

    const userResponses = {};
    let currentStateName = 'START';
    const QUESTION_READING_DELAY = 1200;
    const RESET_DELAY = 5000;

    const conversationTree = {
        'START': { text: 'Para comenzar, ¿este proyecto es para ti, para tu marca personal o para una empresa?', options: { 'Para mí': 'CONTEXT_PERSONAL', 'Marca Personal': 'CONTEXT_BRAND', 'Empresa': 'CONTEXT_COMPANY' }, responseKey: 'context' },
        'CONTEXT_PERSONAL': { text: 'Genial. ¿Buscas expresar una idea artística, potenciar tu marca o algo más?', options: { 'Idea Artística': 'PURPOSE', 'Potenciar Marca': 'PURPOSE', 'Otro': 'PURPOSE' }, responseKey: 'purpose' },
        'CONTEXT_BRAND': { text: 'Perfecto. ¿El objetivo es comunicacional, de branding o de marketing?', options: { 'Comunicacional': 'PURPOSE', 'Branding': 'PURPOSE', 'Marketing': 'PURPOSE' }, responseKey: 'purpose' },
        'CONTEXT_COMPANY': { text: 'Entendido. ¿El objetivo es para un producto, crear identidad o para redes sociales?', options: { 'Producto': 'PURPOSE', 'Identidad de Marca': 'PURPOSE', 'Redes Sociales': 'PURPOSE' }, responseKey: 'purpose' },
        'PURPOSE': { text: 'Entendido. Y para darle vida a ese objetivo, ¿en qué formato lo has imaginado?', options: { 'Video': 'FORMAT', 'Diseño': 'FORMAT', 'Foto': 'FORMAT', 'Web': 'FORMAT' }, responseKey: 'format' },
        'FORMAT': { text: 'Perfecto. Ahora, descríbelo todo. Estamos a muy poco de verlo realidad.', type: 'textarea', placeholder: 'Describe tu visión aquí...', next: 'CONTACT_INFO', responseKey: 'vision' },
        'CONTACT_INFO': { text: 'Para cerrar el círculo, por favor, déjame tu email o teléfono para poder contactarte.', type: 'textarea', placeholder: 'Tu email o teléfono...', next: 'FINAL', responseKey: 'contact' },
        'FINAL': { text: '¡Gracias! Tu visión ha sido registrada. Te contactaré a la brevedad para explorar cómo podemos materializar tu proyecto.', type: 'final' }
    };

    function show(element) { if (element) element.style.display = 'block'; }
    function hide(element) { if (element) element.style.display = 'none'; }

    function renderState(stateName) {
        currentStateName = stateName;
        const node = conversationTree[stateName];
        if (!node) return;

        hide(responseOptions);
        hide(userInputContainer);
        hide(finalCta);

        toolSpecificText.innerHTML = `<p>${node.text}</p>`;

        setTimeout(() => {
            if (node.options) {
                responseOptions.innerHTML = '';
                for (const optionText in node.options) {
                    const nextStateName = node.options[optionText];
                    const button = document.createElement('button');
                    button.className = 'option-btn';
                    button.textContent = optionText;
                    button.addEventListener('click', () => {
                        userResponses[node.responseKey] = optionText;
                        renderState(nextStateName);
                    });
                    responseOptions.appendChild(button);
                }
                responseOptions.style.display = 'grid';
            } else if (node.type === 'textarea') {
                userInput.value = '';
                userInput.placeholder = node.placeholder;
                userInputContainer.style.display = 'flex';
                userInput.focus();
            } else if (node.type === 'final') {
                finalCta.style.display = 'block';
                submitFormspree();
                setTimeout(resetConsultation, RESET_DELAY);
            }
        }, QUESTION_READING_DELAY);
    }

    function startInteraction() {
        hide(toolIntroduction);
        hide(idleCube);
        show(interactiveWrapper);
        renderState('START');
    }

    function handleTextareaSubmit() {
        const text = userInput.value.trim();
        if (text === '') return;
        const currentNode = conversationTree[currentStateName];
        if (currentNode && currentNode.type === 'textarea' && currentNode.next) {
            userResponses[currentNode.responseKey] = text;
            renderState(currentNode.next);
        }
    }

    function submitFormspree() {
        document.getElementById('form-context').value = userResponses.context || '';
        document.getElementById('form-purpose').value = userResponses.purpose || '';
        document.getElementById('form-format').value = userResponses.format || '';
        document.getElementById('form-vision').value = userResponses.vision || '';
        document.getElementById('form-contact').value = userResponses.contact || '';
        const formData = new FormData(formspreeForm);
        fetch(formspreeForm.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
    }

    function resetConsultation() {
        hide(interactiveWrapper);
        hide(finalCta);
        hide(toolIntroduction);
        show(initialStateWrapper);
        show(idleCube);
        chatTitle.classList.remove('active'); // Desactivar título
        Object.keys(userResponses).forEach(key => delete userResponses[key]);
        currentStateName = 'START';
    }

    startButton.addEventListener('click', () => {
        hide(initialStateWrapper);
        show(toolIntroduction);
        chatTitle.classList.add('active'); // Activar título aquí
        // El cubo sigue visible
    });

    continueButton.addEventListener('click', () => {
        startInteraction();
    });

    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleTextareaSubmit();
        }
    });

    resetConsultation();
});
