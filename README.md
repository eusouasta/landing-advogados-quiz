# 🎯 Quiz Jurídico Interativo - Martins & Associados

Landing page interativa em formato de quiz para captação de leads qualificados de escritório de advocacia.

## 📋 Funcionalidades

### Quiz Inteligente
- **6 perguntas estratégicas** que avaliam a situação do usuário
- **Algoritmo de pontuação** que identifica a área de direito ideal
- **Resultado personalizado** com compatibilidade percentual
- **Recomendações específicas** baseadas nas respostas

### Captura de Leads
- Formulário de captura no início do quiz
- Validação de dados em tempo real
- Máscara de telefone automática
- Dados preenchidos automaticamente no formulário final

### Experiência do Usuário
- Design elegante (azul marinho + dourado)
- Animações suaves entre telas
- Barra de progresso visual
- Processamento simulado com animação
- 100% responsivo (mobile, tablet, desktop)

### Conversão
- Botão WhatsApp flutuante
- CTA direto para agendamento
- Integração com WhatsApp pré-preenchida
- Confirmação de envio com próximos passos

## 🎨 Áreas de Atuação Identificadas

1. **Direito do Trabalho** - Rescisões, assédio, acidentes
2. **Direito Civil** - Contratos, imóveis, consumidor
3. **Direito de Família** - Divórcio, guarda, inventário
4. **Direito Empresarial** - Sociedades, contratos empresariais
5. **Direito Penal** - Defesa criminal, habeas corpus
6. **Direito Tributário** - Impostos, fiscalização, planejamento

## 🚀 Como Usar

### Localmente
```bash
# Navegue até a pasta do projeto
cd E:\tst2\2

# Abra diretamente no navegador
start index.html

# Ou use um servidor local
npx serve .
```

### Personalização

#### Alterar Dados do Escritório
Edite o arquivo `index.html`:
- Nome do escritório (logo)
- Telefone/WhatsApp
- Endereço
- E-mail

#### Modificar Perguntas
Edite `assets/js/main.js`:
```javascript
questions: [
    {
        id: 1,
        question: "Sua pergunta aqui",
        options: [...]
    }
]
```

#### Alterar Cores
Edite `assets/css/style.css`:
```css
:root {
    --primary: #sua-cor;
    --accent: #sua-cor-destaque;
}
```

## 📁 Estrutura

```
📁 assets/
├── 📁 css/
│   └── style.css          # Estilos completos
├── 📁 js/
│   └── main.js            # Lógica do quiz
└── 📁 images/             # Pasta para imagens
📄 index.html              # Página principal
📄 README.md               # Documentação
```

## 🔧 Integrações Sugeridas

### Google Analytics
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Facebook Pixel
```javascript
fbq('track', 'Lead', {
    content_name: 'Quiz Juridico',
    content_category: document.getElementById('result-area').textContent
});
```

### Webhook para CRM
```javascript
fetch('https://seu-crm.com/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData)
});
```

## 📱 Responsividade

- **Desktop**: Layout completo com cards lado a lado
- **Tablet**: Adaptação automática
- **Mobile**: Design otimizado para toque

## ⚡ Performance

- CSS e JS minificados (pronto para produção)
- Imagens otimizadas
- Lazy loading de componentes
- Animações com GPU acceleration

## 🚀 Deploy

### Opção 1: Vercel (Recomendado - Grátis)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/eusouasta/landing-advogados-quiz)

Ou via CLI:
```bash
# Instale a CLI (se não tiver)
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### Opção 2: GitHub Pages
1. Vá em **Settings** > **Pages** no repositório
2. Source: **Deploy from a branch**
3. Branch: **main** / **root**
4. Salve e aguarde o link

### Opção 3: Netlify
```bash
# Instale a CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir .
```

---

## 📝 Licença

Projeto desenvolvido para Martins & Associados Advocacia.

---

**Dúvidas ou sugestões?** Entre em contato pelo WhatsApp (11) 99999-9999
