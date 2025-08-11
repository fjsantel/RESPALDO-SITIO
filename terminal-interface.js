// Interactive Terminal Interface for Francisco Santelices Portfolio
// Contemporary art website terminal simulation with portfolio commands

class TerminalInterface {
    constructor() {
        this.commands = {
            'help': () => this.showHelp(),
            'about': () => this.showAbout(),
            'services': () => this.showServices(),
            'portfolio': () => this.showPortfolio(),
            'contact': () => this.showContact(),
            'instagram': () => this.openInstagram(),
            'linkedin': () => this.openLinkedIn(),
            'clear': () => this.clearTerminal(),
            'ls': () => this.listFiles(),
            'cat': (args) => this.catFile(args),
            'cd': (args) => this.changeDirectory(args),
            'whoami': () => this.whoAmI(),
            'date': () => this.showDate(),
            'pwd': () => this.showPath(),
            'tree': () => this.showTree(),
            'skills': () => this.showSkills(),
            'experience': () => this.showExperience(),
            'collaboration': () => this.showCollaboration()
        };
        
        this.currentPath = '/home/francisco';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.init();
    }

    init() {
        this.terminalBody = document.querySelector('.terminal-body');
        this.setupEventListeners();
        this.typeWelcomeMessage();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleEnter();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory('down');
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.handleTab();
            } else if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Space') {
                this.handleTyping(e);
            }
        });

        // Make file items clickable
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('file-item')) {
                const fileName = e.target.textContent.split(' ').pop().replace('/', '');
                this.executeCommand(`cd ${fileName}`);
            }
        });
    }

    handleTyping(e) {
        const input = document.getElementById('terminalInput');
        if (!input) return;

        if (e.key === 'Backspace') {
            input.textContent = input.textContent.slice(0, -1);
        } else if (e.key === ' ') {
            input.textContent += ' ';
        } else if (e.key.length === 1) {
            input.textContent += e.key;
        }
    }

    handleEnter() {
        const input = document.getElementById('terminalInput');
        if (!input) return;

        const command = input.textContent.trim();
        if (command) {
            this.commandHistory.push(command);
            this.historyIndex = this.commandHistory.length;
            this.executeCommand(command);
        }
        
        input.textContent = '';
        this.createNewPrompt();
    }

    navigateHistory(direction) {
        const input = document.getElementById('terminalInput');
        if (!input) return;

        if (direction === 'up' && this.historyIndex > 0) {
            this.historyIndex--;
            input.textContent = this.commandHistory[this.historyIndex];
        } else if (direction === 'down' && this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
            input.textContent = this.commandHistory[this.historyIndex];
        } else if (direction === 'down' && this.historyIndex === this.commandHistory.length - 1) {
            this.historyIndex = this.commandHistory.length;
            input.textContent = '';
        }
    }

    handleTab() {
        const input = document.getElementById('terminalInput');
        if (!input) return;

        const partial = input.textContent.trim();
        const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(partial));
        
        if (matches.length === 1) {
            input.textContent = matches[0];
        } else if (matches.length > 1) {
            this.addOutput(`Available commands: ${matches.join(', ')}`);
        }
    }

    executeCommand(commandLine) {
        // Log the executed command
        this.addCommandLine(commandLine);
        
        const [command, ...args] = commandLine.toLowerCase().split(' ');
        
        if (this.commands[command]) {
            this.commands[command](args);
        } else {
            this.addOutput(`Command not found: ${command}. Type 'help' for available commands.`);
        }
        
        this.scrollToBottom();
    }

    addCommandLine(command) {
        const commandDiv = document.createElement('div');
        commandDiv.className = 'terminal-line executed';
        commandDiv.innerHTML = `
            <span class="prompt">visitor@francisco-portfolio:${this.currentPath}$</span>
            <span class="command">${command}</span>
        `;
        
        // Remove active class from current line
        const activeLine = document.querySelector('.terminal-line.active');
        if (activeLine) {
            activeLine.classList.remove('active');
        }
        
        this.terminalBody.insertBefore(commandDiv, activeLine);
    }

    addOutput(content, className = '') {
        const outputDiv = document.createElement('div');
        outputDiv.className = `terminal-output ${className}`;
        
        if (typeof content === 'string') {
            outputDiv.innerHTML = content;
        } else {
            outputDiv.appendChild(content);
        }
        
        const activeLine = document.querySelector('.terminal-line.active');
        this.terminalBody.insertBefore(outputDiv, activeLine);
    }

    createNewPrompt() {
        const activeLine = document.querySelector('.terminal-line.active');
        if (activeLine) {
            activeLine.remove();
        }
        
        const newLine = document.createElement('div');
        newLine.className = 'terminal-line active';
        newLine.innerHTML = `
            <span class="prompt">visitor@francisco-portfolio:${this.currentPath}$</span>
            <span class="command-input" id="terminalInput"></span>
            <span class="cursor">_</span>
        `;
        
        this.terminalBody.appendChild(newLine);
    }

    scrollToBottom() {
        setTimeout(() => {
            this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
        }, 100);
    }

    // Command implementations
    showHelp() {
        const helpContent = `
            <div class="help-content">
                <p><strong>Available Commands:</strong></p>
                <p><span style="color: #28ca42;">about</span> - Learn about Francisco Santelices</p>
                <p><span style="color: #28ca42;">services</span> - View creative services offered</p>
                <p><span style="color: #28ca42;">portfolio</span> - Browse portfolio sections</p>
                <p><span style="color: #28ca42;">skills</span> - Technical and creative skills</p>
                <p><span style="color: #28ca42;">experience</span> - Professional background</p>
                <p><span style="color: #28ca42;">contact</span> - Get in touch</p>
                <p><span style="color: #28ca42;">instagram</span> - Visit Instagram profile</p>
                <p><span style="color: #28ca42;">linkedin</span> - Visit LinkedIn profile</p>
                <p><span style="color: #28ca42;">collaboration</span> - Learn about working together</p>
                <p><span style="color: #28ca42;">clear</span> - Clear terminal</p>
                <p><span style="color: #28ca42;">ls</span> - List directory contents</p>
                <p><span style="color: #28ca42;">tree</span> - Show project structure</p>
                <p><span style="color: #6ba3d6;">Use Tab for autocomplete, ↑↓ for command history</span></p>
            </div>
        `;
        this.addOutput(helpContent);
    }

    showAbout() {
        const aboutContent = `
            <div class="about-content">
                <p><strong>Francisco Santelices Ariztía</strong></p>
                <p>Professional alias: <strong>THOMAS JOSHWELL©️</strong></p>
                <p></p>
                <p>Contemporary digital artist specializing in multimedia experiences</p>
                <p>Based in Chile, available for worldwide collaboration</p>
                <p>1,172+ Instagram followers with cross-platform distribution</p>
                <p></p>
                <p>Bridging traditional artistic expression with cutting-edge technology</p>
                <p>Multi-disciplinary practice spanning creative content creation,</p>
                <p>video production, photography, visual design, and sound work.</p>
            </div>
        `;
        this.addOutput(aboutContent);
    }

    showServices() {
        const servicesContent = `
            <div class="services-content">
                <p><strong>Creative Services Offered:</strong></p>
                <p></p>
                <p><span style="color: #ff6b6b;">📹 Video Production</span></p>
                <p>   Cinematographic storytelling, commercial content, artistic installations</p>
                <p></p>
                <p><span style="color: #4ecdc4;">🎯 3D Design & Mounting</span></p>
                <p>   Three-dimensional modeling, installation design, spatial experiences</p>
                <p></p>
                <p><span style="color: #45b7d1;">📸 Photography & Visual Design</span></p>
                <p>   Professional photography, image composition, visual identity</p>
                <p></p>
                <p><span style="color: #96ceb4;">🎵 Image & Sound Work</span></p>
                <p>   Audio-visual integration, sound design, multimedia experiences</p>
            </div>
        `;
        this.addOutput(servicesContent);
    }

    showPortfolio() {
        const portfolioContent = `
            <div class="portfolio-content">
                <p><strong>Portfolio Sections:</strong></p>
                <p></p>
                <p>📁 <span style="color: #28ca42;">video_production/</span></p>
                <p>   └── commercial_projects/</p>
                <p>   └── artistic_installations/</p>
                <p>   └── documentation/</p>
                <p></p>
                <p>📁 <span style="color: #28ca42;">3d_design/</span></p>
                <p>   └── modeling_projects/</p>
                <p>   └── spatial_installations/</p>
                <p>   └── technical_drawings/</p>
                <p></p>
                <p>📁 <span style="color: #28ca42;">photography/</span></p>
                <p>   └── professional_shoots/</p>
                <p>   └── artistic_compositions/</p>
                <p>   └── client_work/</p>
                <p></p>
                <p>📁 <span style="color: #28ca42;">sound_work/</span></p>
                <p>   └── audio_visual_integration/</p>
                <p>   └── sound_design/</p>
                <p>   └── multimedia_experiences/</p>
                <p></p>
                <p>Type: cd [folder_name] to explore sections</p>
            </div>
        `;
        this.addOutput(portfolioContent);
    }

    showSkills() {
        const skillsContent = `
            <div class="skills-content">
                <p><strong>Technical & Creative Skills:</strong></p>
                <p></p>
                <p><span style="color: #ff6b6b;">Creative Software:</span></p>
                <p>Adobe Creative Suite, Cinema 4D, Blender, Final Cut Pro</p>
                <p></p>
                <p><span style="color: #4ecdc4;">Photography:</span></p>
                <p>Professional lighting, composition, post-processing</p>
                <p></p>
                <p><span style="color: #45b7d1;">Audio/Visual:</span></p>
                <p>Sound design, audio mixing, multimedia integration</p>
                <p></p>
                <p><span style="color: #96ceb4;">Digital Art:</span></p>
                <p>Contemporary aesthetics, installation design, visual identity</p>
            </div>
        `;
        this.addOutput(skillsContent);
    }

    showContact() {
        const contactContent = `
            <div class="contact-content">
                <p><strong>Get in Touch:</strong></p>
                <p></p>
                <p>📧 Email: franciscosantelices@creative.com</p>
                <p>📱 Instagram: @franciscosantelices (1,172+ followers)</p>
                <p>💼 LinkedIn: Francisco Santelices Ariztía</p>
                <p>🌍 Based in Chile, available worldwide</p>
                <p></p>
                <p><span style="color: #28ca42;">Available for:</span></p>
                <p>• Creative collaboration projects</p>
                <p>• Commercial video production</p>
                <p>• Artistic installations</p>
                <p>• Photography services</p>
                <p>• Multimedia experiences</p>
            </div>
        `;
        this.addOutput(contactContent);
    }

    showTree() {
        const treeContent = `
            <div class="tree-content">
                <p>francisco-santelices-portfolio/</p>
                <p>├── about/</p>
                <p>│   ├── bio.txt</p>
                <p>│   └── artistic_statement.md</p>
                <p>├── services/</p>
                <p>│   ├── video_production/</p>
                <p>│   ├── 3d_design/</p>
                <p>│   ├── photography/</p>
                <p>│   └── sound_work/</p>
                <p>├── portfolio/</p>
                <p>│   ├── recent_projects/</p>
                <p>│   ├── client_work/</p>
                <p>│   └── artistic_installations/</p>
                <p>├── collaboration/</p>
                <p>│   ├── process.md</p>
                <p>│   └── availability.txt</p>
                <p>└── contact/</p>
                <p>    ├── email.txt</p>
                <p>    ├── social_media.links</p>
                <p>    └── location.info</p>
            </div>
        `;
        this.addOutput(treeContent);
    }

    whoAmI() {
        this.addOutput('visitor (guest user exploring Francisco Santelices portfolio)');
    }

    showDate() {
        const now = new Date();
        this.addOutput(now.toString());
    }

    showPath() {
        this.addOutput(this.currentPath);
    }

    clearTerminal() {
        const lines = this.terminalBody.querySelectorAll('.terminal-line:not(.active), .terminal-output');
        lines.forEach(line => line.remove());
    }

    openInstagram() {
        window.open('https://instagram.com/franciscosantelices', '_blank');
        this.addOutput('Opening Instagram profile...');
    }

    openLinkedIn() {
        window.open('https://linkedin.com/in/franciscosantelicesariztia', '_blank');
        this.addOutput('Opening LinkedIn profile...');
    }

    listFiles() {
        const files = `
            <div class="file-list">
                <div class="file-item">drwxr-xr-x about/</div>
                <div class="file-item">drwxr-xr-x services/</div>
                <div class="file-item">drwxr-xr-x portfolio/</div>
                <div class="file-item">drwxr-xr-x collaboration/</div>
                <div class="file-item">-rw-r--r-- README.md</div>
                <div class="file-item">-rw-r--r-- contact.txt</div>
            </div>
        `;
        this.addOutput(files);
    }

    showCollaboration() {
        const collabContent = `
            <div class="collaboration-content">
                <p><strong>Creative Collaboration Process:</strong></p>
                <p></p>
                <p><span style="color: #28ca42;">1. Initial Consultation</span></p>
                <p>   Discuss project vision, goals, and creative direction</p>
                <p></p>
                <p><span style="color: #6ba3d6;">2. Concept Development</span></p>
                <p>   Develop artistic concepts and technical approaches</p>
                <p></p>
                <p><span style="color: #ff6b6b;">3. Production Phase</span></p>
                <p>   Execute project with professional standards and artistic vision</p>
                <p></p>
                <p><span style="color: #96ceb4;">4. Delivery & Support</span></p>
                <p>   Final delivery with ongoing support as needed</p>
                <p></p>
                <p>Available for remote collaboration worldwide</p>
                <p>Specializing in multimedia experiences that bridge</p>
                <p>traditional art with contemporary digital innovation</p>
            </div>
        `;
        this.addOutput(collabContent);
    }

    typeWelcomeMessage() {
        setTimeout(() => {
            const welcomeContent = `
                <div class="welcome-message">
                    <p style="color: #28ca42;">Welcome to Francisco Santelices Digital Portfolio</p>
                    <p>Contemporary Artist / THOMAS JOSHWELL©️ / Multimedia Creator</p>
                    <p></p>
                    <p>Type <span style="color: #6ba3d6;">'help'</span> to see available commands</p>
                    <p>Use Tab for autocomplete, ↑↓ arrows for command history</p>
                </div>
            `;
            this.addOutput(welcomeContent);
        }, 1000);
    }
}

// Initialize terminal interface when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TerminalInterface();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TerminalInterface;
}