/**
 * QUIZ JURÍDICO INTERATIVO
 * Martins & Associados Advocacia
 * 
 * Funcionalidades:
 * - Quiz de múltiplas etapas com 6 perguntas
 * - Captura de leads no início
 * - Algoritmo de pontuação por área
 * - Resultado personalizado com recomendações
 * - Integração com WhatsApp
 * - Animações e transições suaves
 */

const quizApp = {
    // Estado do quiz
    currentStep: 0,
    userData: {
        name: '',
        email: '',
        phone: '',
        city: ''
    },
    answers: [],
    scores: {
        trabalhista: 0,
        civil: 0,
        familia: 0,
        empresarial: 0,
        penal: 0,
        tributario: 0
    },

    // Configuração das perguntas
    questions: [
        {
            id: 1,
            question: "Qual é a natureza principal da sua demanda?",
            subtitle: "Selecione a opção que melhor descreve sua situação",
            options: [
                { 
                    id: 'trabalhista', 
                    icon: 'fa-briefcase', 
                    title: 'Trabalhista', 
                    description: 'Demissão, rescisão, assédio, acidente de trabalho, FGTS',
                    scores: { trabalhista: 3, civil: 1 }
                },
                { 
                    id: 'civil', 
                    icon: 'fa-home', 
                    title: 'Civil / Consumidor', 
                    description: 'Contratos, imóveis, compras, serviços, indenizações',
                    scores: { civil: 3, empresarial: 1 }
                },
                { 
                    id: 'familia', 
                    icon: 'fa-users', 
                    title: 'Família', 
                    description: 'Divórcio, guarda, pensão, inventário, adoção',
                    scores: { familia: 3, civil: 1 }
                },
                { 
                    id: 'empresarial', 
                    icon: 'fa-building', 
                    title: 'Empresarial', 
                    description: 'Sociedade, contratos empresariais, recuperação judicial',
                    scores: { empresarial: 3, tributario: 1, civil: 1 }
                },
                { 
                    id: 'penal', 
                    icon: 'fa-gavel', 
                    title: 'Penal', 
                    description: 'Processo criminal, defesa, habeas corpus, flagrante',
                    scores: { penal: 3 }
                },
                { 
                    id: 'tributario', 
                    icon: 'fa-calculator', 
                    title: 'Tributário', 
                    description: 'Impostos, taxas, fiscalização, planejamento tributário',
                    scores: { tributario: 3, empresarial: 1 }
                }
            ]
        },
        {
            id: 2,
            question: "Qual é a urgência da sua situação?",
            subtitle: "Isso nos ajuda a priorizar seu atendimento",
            options: [
                { 
                    id: 'emergencia', 
                    icon: 'fa-exclamation-triangle', 
                    title: 'Emergência', 
                    description: 'Preciso de atendimento imediato (prazo processual, flagrante)',
                    scores: { penal: 2, trabalhista: 1, civil: 1 }
                },
                { 
                    id: 'urgente', 
                    icon: 'fa-clock', 
                    title: 'Urgente', 
                    description: 'Situação grave que precisa ser resolvida em poucos dias',
                    scores: { trabalhista: 2, familia: 2, penal: 1 }
                },
                { 
                    id: 'normal', 
                    icon: 'fa-calendar', 
                    title: 'Normal', 
                    description: 'Posso aguardar alguns dias para iniciar o processo',
                    scores: { civil: 1, empresarial: 1, tributario: 1 }
                },
                { 
                    id: 'planejamento', 
                    icon: 'fa-chart-line', 
                    title: 'Planejamento', 
                    description: 'Quero me prevenir ou planejar algo para o futuro',
                    scores: { empresarial: 2, tributario: 2, familia: 1 }
                }
            ]
        },
        {
            id: 3,
            question: "Você é pessoa física ou jurídica?",
            subtitle: "Identificamos o melhor especialista para seu perfil",
            options: [
                { 
                    id: 'pf', 
                    icon: 'fa-user', 
                    title: 'Pessoa Física', 
                    description: 'Sou cidadão comum, funcionário, consumidor ou cônjuge',
                    scores: { trabalhista: 2, civil: 2, familia: 2, penal: 1 }
                },
                { 
                    id: 'pj', 
                    icon: 'fa-building', 
                    title: 'Pessoa Jurídica', 
                    description: 'Represento uma empresa, sociedade ou organização',
                    scores: { empresarial: 3, tributario: 2, trabalhista: 1, civil: 1 }
                },
                { 
                    id: 'ambos', 
                    icon: 'fa-user-tie', 
                    title: 'Empresário Individual', 
                    description: 'Tenho empresa mas também sou pessoa física',
                    scores: { empresarial: 2, tributario: 2, civil: 1, trabalhista: 1 }
                }
            ]
        },
        {
            id: 4,
            question: "Qual é o valor envolvido no caso?",
            subtitle: "Estimativa aproximada (não precisa ser exato)",
            options: [
                { 
                    id: 'ate_10k', 
                    icon: 'fa-coins', 
                    title: 'Até R$ 10.000', 
                    description: 'Causas de menor complexidade financeira',
                    scores: { civil: 2, consumidor: 2 }
                },
                { 
                    id: '10k_50k', 
                    icon: 'fa-money-bill-wave', 
                    title: 'R$ 10.000 a R$ 50.000', 
                    description: 'Causas de média complexidade',
                    scores: { trabalhista: 2, civil: 2, familia: 1 }
                },
                { 
                    id: '50k_200k', 
                    icon: 'fa-hand-holding-usd', 
                    title: 'R$ 50.000 a R$ 200.000', 
                    description: 'Causas de alta complexidade',
                    scores: { empresarial: 2, tributario: 2, familia: 2 }
                },
                { 
                    id: 'acima_200k', 
                    icon: 'fa-landmark', 
                    title: 'Acima de R$ 200.000', 
                    description: 'Causas de alta complexidade e valor elevado',
                    scores: { empresarial: 3, tributario: 2, familia: 2, civil: 1 }
                },
                { 
                    id: 'sem_valor', 
                    icon: 'fa-balance-scale', 
                    title: 'Não envolve valor financeiro', 
                    description: 'Direitos, liberdade, guarda, criminal',
                    scores: { penal: 3, familia: 2, trabalhista: 1 }
                }
            ]
        },
        {
            id: 5,
            question: "Você já tentou resolver de outra forma?",
            subtitle: "Isso nos ajuda a entender o histórico do caso",
            options: [
                { 
                    id: 'nao_tentou', 
                    icon: 'fa-question-circle', 
                    title: 'Não, estou começando agora', 
                    description: 'Primeira vez buscando ajuda jurídica',
                    scores: { civil: 1, trabalhista: 1, familia: 1 }
                },
                { 
                    id: 'negociacao', 
                    icon: 'fa-handshake', 
                    title: 'Tentei negociar diretamente', 
                    description: 'Conversei com a outra parte mas não resolveu',
                    scores: { civil: 2, empresarial: 2, trabalhista: 1 }
                },
                { 
                    id: 'mediacao', 
                    icon: 'fa-comments', 
                    title: 'Tentei mediação/conciliação', 
                    description: 'Fui em órgãos como PROCON, DRT, ou similar',
                    scores: { civil: 2, trabalhista: 2, consumidor: 2 }
                },
                { 
                    id: 'processo_andamento', 
                    icon: 'fa-gavel', 
                    title: 'Já existe processo em andamento', 
                    description: 'Preciso de advogado para assumir ou auxiliar',
                    scores: { civil: 2, trabalhista: 2, familia: 2, penal: 2 }
                },
                { 
                    id: 'perdeu_prazo', 
                    icon: 'fa-exclamation-circle', 
                    title: 'Perdi prazo ou fui condenado', 
                    description: 'Preciso de medida emergencial ou recurso',
                    scores: { civil: 2, trabalhista: 2, penal: 2 }
                }
            ]
        },
        {
            id: 6,
            question: "Qual é sua principal expectativa?",
            subtitle: "O que você mais deseja com essa ação?",
            options: [
                { 
                    id: 'indenizacao', 
                    icon: 'fa-money-check-alt', 
                    title: 'Receber indenização ou valores', 
                    description: 'Quero ser compensado financeiramente',
                    scores: { civil: 3, trabalhista: 2, consumidor: 2 }
                },
                { 
                    id: 'direito', 
                    icon: 'fa-balance-scale-right', 
                    'title': 'Fazer valer meu direito', 
                    description: 'Quero justiça e reconhecimento do meu direito',
                    scores: { trabalhista: 2, civil: 2, familia: 1 }
                },
                { 
                    id: 'protecao', 
                    icon: 'fa-shield-alt', 
                    title: 'Proteção/prevenção', 
                    description: 'Quero me proteger de problemas futuros',
                    scores: { empresarial: 3, tributario: 2, familia: 1 }
                },
                { 
                    id: 'resolver_conflito', 
                    icon: 'fa-handshake', 
                    title: 'Resolver um conflito', 
                    description: 'Quero acabar com uma disputa ou problema',
                    scores: { familia: 3, civil: 2, empresarial: 2 }
                },
                { 
                    id: 'liberdade', 
                    icon: 'fa-key', 
                    title: 'Liberdade / Inocência', 
                    description: 'Preciso provar inocência ou sair da cadeia',
                    scores: { penal: 3 }
                }
            ]
        }
    ],

    // Configuração das áreas de resultado
    areas: {
        trabalhista: {
            name: 'Direito do Trabalho',
            icon: 'fa-briefcase',
            description: 'Com base nas suas respostas, identificamos que você precisa de um advogado especialista em <strong>Direito do Trabalho</strong>.',
            reasons: [
                'Você mencionou questões relacionadas à relação de emprego',
                'Há possíveis violações de direitos trabalhistas na sua situação',
                'O valor e urgência indicam necessidade de ação trabalhista',
                'Você se encaixa no perfil de trabalhador com direitos a reaver'
            ],
            nextSteps: [
                { number: 1, text: 'Reunião inicial para entender detalhes do contrato' },
                { number: 2, text: 'Análise de documentos (CTPS, contracheques, TRCT)' },
                { number: 3, text: 'Cálculo de verbas rescisórias e danos' },
                { number: 4, text: 'Entrada com reclamação trabalhista' }
            ],
            color: '#e11d48'
        },
        civil: {
            name: 'Direito Civil',
            icon: 'fa-home',
            description: 'Com base nas suas respostas, identificamos que você precisa de um advogado especialista em <strong>Direito Civil</strong>.',
            reasons: [
                'Sua demanda envolve relações entre particulares',
                'Questões contratuais ou responsabilidade civil identificadas',
                'Possíveis danos materiais ou morais a serem reparados',
                'Necessidade de tutela de direitos individuais'
            ],
            nextSteps: [
                { number: 1, text: 'Análise detalhada dos contratos e documentos' },
                { number: 2, text: 'Cálculo de prejuízos e danos' },
                { number: 3, text: 'Notificação extrajudicial à parte contrária' },
                { number: 4, text: 'Propositura da ação civil competente' }
            ],
            color: '#2563eb'
        },
        familia: {
            name: 'Direito de Família',
            icon: 'fa-users',
            description: 'Com base nas suas respostas, identificamos que você precisa de um advogado especialista em <strong>Direito de Família</strong>.',
            reasons: [
                'Sua situação envolve questões de relacionamento familiar',
                'Direitos de cônjuges, filhos ou parentes em jogo',
                'Necessidade de proteção do vínculo familiar ou seu desfazimento',
                'Questões patrimoniais familiares identificadas'
            ],
            nextSteps: [
                { number: 1, text: 'Conversa inicial sobre histórico familiar' },
                { number: 2, text: 'Inventário de bens e análise patrimonial' },
                { number: 3, text: 'Tentativa de acordo (mediação quando possível)' },
                { number: 4, text: 'Ação judicial de família ou sucessão' }
            ],
            color: '#7c3aed'
        },
        empresarial: {
            name: 'Direito Empresarial',
            icon: 'fa-building',
            description: 'Com base nas suas respostas, identificamos que você precisa de um advogado especialista em <strong>Direito Empresarial</strong>.',
            reasons: [
                'Você representa ou possui interesses empresariais',
                'Questões societárias ou contratos empresariais identificados',
                'Necessidade de proteção do negócio ou resolução de conflito societário',
                'Alto valor envolvido sugere complexidade empresarial'
            ],
            nextSteps: [
                { number: 1, text: 'Diagnóstico jurídico da empresa' },
                { number: 2, text: 'Análise de contratos e obrigações' },
                { number: 3, text: 'Estratégia de negociação ou contencioso' },
                { number: 4, text: 'Ação judicial ou recuperação judicial se necessário' }
            ],
            color: '#059669'
        },
        penal: {
            name: 'Direito Penal',
            icon: 'fa-gavel',
            description: 'Com base nas suas respostas, identificamos que você precisa de um advogado especialista em <strong>Direito Penal</strong>.',
            reasons: [
                'Situação envolve possível infração penal',
                'Urgência extrema indicativa de prisão ou flagrante',
                'Necessidade de defesa em processo criminal',
                'Libertade em jogo exige atuação imediata'
            ],
            nextSteps: [
                { number: 1, text: 'Atendimento imediato (presencial se necessário)' },
                { number: 2, text: 'Análise do flagrante ou mandado' },
                { number: 3, text: 'Pedido de habeas corpus ou relaxamento' },
                { number: 4, text: 'Acompanhamento processual criminal' }
            ],
            color: '#dc2626'
        },
        tributario: {
            name: 'Direito Tributário',
            icon: 'fa-calculator',
            description: 'Com base nas suas respostas, identificamos que você precisa de um advogado especialista em <strong>Direito Tributário</strong>.',
            reasons: [
                'Questões fiscais e tributárias identificadas',
                'Você possui empresa ou patrimônio sujeito a tributação',
                'Necessidade de planejamento ou defesa fiscal',
                'Alto valor envolvido sugere complexidade tributária'
            ],
            nextSteps: [
                { number: 1, text: 'Análise de débitos e certidões fiscais' },
                { number: 2, text: 'Diagnóstico tributário completo' },
                { number: 3, text: 'Planejamento ou defesa administrativa' },
                { number: 4, text: 'Ação judicial se necessário' }
            ],
            color: '#0891b2'
        }
    },

    // Inicialização
    init() {
        this.bindEvents();
        this.setupPhoneMask();
    },

    // Event listeners
    bindEvents() {
        // Formulário de lead
        const leadForm = document.getElementById('lead-form');
        if (leadForm) {
            leadForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveLeadData();
            });
        }

        // Formulário de contato
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitContact();
            });
        }
    },

    // Máscara de telefone
    setupPhoneMask() {
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.slice(0, 11);
                
                if (value.length > 2) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                }
                if (value.length > 10) {
                    value = `${value.slice(0, 10)}-${value.slice(10)}`;
                }
                
                e.target.value = value;
            });
        });
    },

    // Navegação entre telas
    showScreen(screenId) {
        document.querySelectorAll('.quiz-screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // Iniciar quiz
    startQuiz() {
        this.showScreen('lead-screen');
    },

    // Salvar dados do lead
    saveLeadData() {
        const name = document.getElementById('lead-name').value.trim();
        const email = document.getElementById('lead-email').value.trim();
        const phone = document.getElementById('lead-phone').value.trim();
        const city = document.getElementById('lead-city').value.trim();

        if (!name || !email || !phone || !city) {
            this.showToast('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (!this.validateEmail(email)) {
            this.showToast('Por favor, informe um e-mail válido.');
            return;
        }

        this.userData = { name, email, phone, city };
        this.currentStep = 0;
        this.answers = [];
        this.resetScores();
        
        this.showQuestion();
    },

    // Validar email
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // Resetar pontuações
    resetScores() {
        this.scores = {
            trabalhista: 0,
            civil: 0,
            familia: 0,
            empresarial: 0,
            penal: 0,
            tributario: 0
        };
    },

    // Mostrar pergunta atual
    showQuestion() {
        const question = this.questions[this.currentStep];
        const screen = document.getElementById('question-screen');
        
        // Atualizar progresso
        const progress = ((this.currentStep + 2) / 8) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('step-indicator').textContent = `Passo ${this.currentStep + 2} de 8`;
        
        // Atualizar texto da pergunta
        document.getElementById('question-text').textContent = question.question;
        
        // Atualizar subtítulo
        const subtitle = screen.querySelector('.question-subtitle');
        if (subtitle) {
            subtitle.textContent = question.subtitle;
        }
        
        // Renderizar opções
        const container = document.getElementById('options-container');
        container.innerHTML = question.options.map((option, index) => `
            <div class="option-card" onclick="quizApp.selectOption(${index})" data-index="${index}">
                <div class="option-icon">
                    <i class="fas ${option.icon}"></i>
                </div>
                <div class="option-text">
                    <h4>${option.title}</h4>
                    <p>${option.description}</p>
                </div>
                <i class="fas fa-chevron-right option-arrow"></i>
            </div>
        `).join('');
        
        // Mostrar/esconder botão voltar
        const backBtn = document.getElementById('btn-back');
        if (this.currentStep === 0) {
            backBtn.style.visibility = 'hidden';
        } else {
            backBtn.style.visibility = 'visible';
        }
        
        this.showScreen('question-screen');
    },

    // Selecionar opção
    selectOption(index) {
        const question = this.questions[this.currentStep];
        const option = question.options[index];
        
        // Marcar como selecionado visualmente
        document.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-index="${index}"]`).classList.add('selected');
        
        // Salvar resposta
        this.answers.push({
            questionId: question.id,
            optionId: option.id,
            scores: option.scores
        });
        
        // Adicionar pontuações
        Object.entries(option.scores).forEach(([area, points]) => {
            if (this.scores[area] !== undefined) {
                this.scores[area] += points;
            }
        });
        
        // Pequeno delay para animação
        setTimeout(() => {
            this.nextQuestion();
        }, 300);
    },

    // Próxima pergunta
    nextQuestion() {
        this.currentStep++;
        
        if (this.currentStep < this.questions.length) {
            this.showQuestion();
        } else {
            this.showProcessing();
        }
    },

    // Pergunta anterior
    previousQuestion() {
        if (this.currentStep > 0) {
            // Remover pontuações da resposta anterior
            const lastAnswer = this.answers.pop();
            if (lastAnswer && lastAnswer.scores) {
                Object.entries(lastAnswer.scores).forEach(([area, points]) => {
                    if (this.scores[area] !== undefined) {
                        this.scores[area] -= points;
                    }
                });
            }
            
            this.currentStep--;
            this.showQuestion();
        } else {
            // Voltar para tela de lead
            this.showScreen('lead-screen');
        }
    },

    // Tela de processamento
    showProcessing() {
        this.showScreen('processing-screen');
        
        // Animar passos
        setTimeout(() => {
            document.getElementById('proc-step-1').classList.add('active');
        }, 500);
        
        setTimeout(() => {
            document.getElementById('proc-step-2').classList.add('active');
        }, 1500);
        
        setTimeout(() => {
            document.getElementById('proc-step-3').classList.add('active');
        }, 2500);
        
        // Mostrar resultado
        setTimeout(() => {
            this.calculateAndShowResult();
        }, 3500);
    },

    // Calcular e mostrar resultado
    calculateAndShowResult() {
        // Encontrar área com maior pontuação
        let maxScore = 0;
        let resultArea = 'civil';
        
        Object.entries(this.scores).forEach(([area, score]) => {
            if (score > maxScore) {
                maxScore = score;
                resultArea = area;
            }
        });
        
        const area = this.areas[resultArea];
        const totalPossible = this.questions.length * 3;
        const matchPercentage = Math.round((maxScore / totalPossible) * 100);
        
        // Preencher dados do resultado
        document.getElementById('result-area').textContent = area.name;
        document.getElementById('match-percentage').textContent = `${matchPercentage}%`;
        document.getElementById('result-description').innerHTML = `<p>${area.description}</p>`;
        
        // Preencher razões
        const reasonsList = document.getElementById('result-reasons-list');
        reasonsList.innerHTML = area.reasons.map(reason => `
            <li>${reason}</li>
        `).join('');
        
        // Preencher próximos passos
        const stepsList = document.getElementById('next-steps-list');
        stepsList.innerHTML = area.nextSteps.map(step => `
            <div class="step-card">
                <span class="step-number">${step.number}</span>
                <span class="step-text">${step.text}</span>
            </div>
        `).join('');
        
        // Atualizar badge
        const badge = document.querySelector('.result-badge');
        badge.innerHTML = `<i class="fas ${area.icon}"></i><span>Área Recomendada</span>`;
        
        // Preencher formulário de contato
        document.getElementById('contact-area').value = area.name;
        document.getElementById('contact-name').value = this.userData.name;
        document.getElementById('contact-phone').value = this.userData.phone;
        document.getElementById('contact-email').value = this.userData.email;
        
        this.showScreen('result-screen');
        
        // Enviar dados para analytics (simulação)
        this.trackResult(resultArea, matchPercentage);
    },

    // Mostrar formulário de contato
    showContactForm() {
        this.showScreen('contact-screen');
    },

    // Enviar formulário de contato
    submitContact() {
        const priority = document.getElementById('contact-priority').value;
        const message = document.getElementById('contact-message').value.trim();
        const whatsapp = document.getElementById('contact-whatsapp').checked;
        
        if (!message) {
            this.showToast('Por favor, descreva brevemente seu caso.');
            return;
        }
        
        // Simular envio
        const submitBtn = document.querySelector('#contact-form button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            this.showScreen('confirmation-screen');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Enviar dados para servidor (simulação)
            this.sendToCRM({
                ...this.userData,
                area: document.getElementById('contact-area').value,
                priority,
                message,
                whatsapp,
                answers: this.answers,
                scores: this.scores
            });
        }, 1500);
    },

    // Reiniciar quiz
    restartQuiz() {
        this.currentStep = 0;
        this.answers = [];
        this.userData = { name: '', email: '', phone: '', city: '' };
        this.resetScores();
        
        // Limpar formulários
        document.getElementById('lead-form').reset();
        document.getElementById('contact-form').reset();
        
        this.showScreen('welcome-screen');
    },

    // Toast notification
    showToast(message) {
        const toast = document.getElementById('toast');
        document.getElementById('toast-message').textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    },

    // Tracking (simulação)
    trackResult(area, percentage) {
        console.log('Quiz Result:', {
            area,
            percentage,
            userData: this.userData,
            timestamp: new Date().toISOString()
        });
        
        // Aqui você integraria com Google Analytics, Facebook Pixel, etc.
        if (typeof gtag !== 'undefined') {
            gtag('event', 'quiz_completed', {
                event_category: 'Quiz',
                event_label: area,
                value: percentage
            });
        }
    },

    // Enviar para CRM (simulação)
    sendToCRM(data) {
        console.log('Lead Data:', data);
        
        // Aqui você faria uma requisição AJAX para seu backend
        // fetch('/api/leads', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
    }
};

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    quizApp.init();
});

// Exportar para uso global
window.quizApp = quizApp;
