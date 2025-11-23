# ConectaVoluntário

Plataforma de voluntariado desenvolvida com Angular 19 e arquitetura baseada em NgModules, reproduzindo fielmente o design do site de referência VoluntáriosBR.

## 🎯 Características

- **Framework**: Angular 19.2.6
- **Arquitetura**: NgModules (Tradicional) - **NÃO usa Standalone Components**
- **Estilização**: CSS Vanilla com CSS Variables
- **UI Kit**: Angular Material (apenas para componentes complexos)
- **Sintaxe**: Control Flow (@if, @for) e inject() nos serviços
- **Estado**: Signals para UI State e RxJS para assincronicidade
- **Backend**: JSON-Server

## 📁 Estrutura do Projeto

```
src/app/
├── core/                    # Serviços singleton, guards e interceptors
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── opportunity.service.ts
│   ├── guards/
│   │   └── auth.guard.ts
│   └── core.module.ts
├── features/                # Módulos de funcionalidades
│   ├── home/
│   │   ├── home.component.ts
│   │   ├── home.component.html
│   │   ├── home.component.css
│   │   └── home.module.ts
│   ├── auth/
│   │   ├── login/
│   │   └── auth.module.ts
│   └── opportunities/
│       ├── opportunities-list/
│       ├── opportunity-detail/
│       └── opportunities.module.ts
├── shared/                  # Componentes e módulos compartilhados
│   ├── components/
│   │   └── header/
│   └── shared.module.ts
├── app-routing.module.ts
├── app.module.ts
└── app.component.ts
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 22.13.0
- npm 10.9.2

### Instalação

```bash
cd conecta-voluntario
npm install
```

### Executar em Desenvolvimento

**Opção 1: Executar tudo junto (recomendado)**
```bash
npm run dev
```

**Opção 2: Executar separadamente**

Terminal 1 - JSON Server:
```bash
npm run api
```

Terminal 2 - Angular:
```bash
npm start
```

A aplicação estará disponível em:
- **Frontend**: http://localhost:4200
- **API**: http://localhost:3000

## 🔑 Credenciais de Login

- **Usuário**: admin
- **Senha**: admin

## 🎨 Design e Paleta de Cores

O projeto reproduz fielmente o design do site de referência com as seguintes cores:

- **Azul Primário**: #4169E1
- **Azul Escuro**: #1E3A8A
- **Roxo/Violeta**: #7B3FF2
- **Gradiente Hero**: linear-gradient(135deg, #1E3A8A 0%, #4169E1 50%, #7B3FF2 100%)

Todas as cores estão definidas como CSS Variables em `src/styles.css`.

## 📋 Funcionalidades Implementadas

### ✅ Autenticação
- Login mock com credenciais fixas (admin/admin)
- Persistência de token no LocalStorage
- AuthGuard para proteção de rotas privadas
- Estado de autenticação com Signals

### ✅ Catálogo de Oportunidades
- Listagem de oportunidades de voluntariado
- Busca por título, organização ou categoria
- Filtro por categoria
- Cards responsivos com imagens

### ✅ Detalhes da Oportunidade
- Visualização completa dos detalhes
- Informações de localização, compromisso e duração
- Sistema de candidatura
- Botões de compartilhamento social

### ✅ Interface Visual
- Header com navegação e estado de login
- Hero Section com gradiente
- Seção de estatísticas
- Cards de "Como Você Pode Ajudar"
- Cards de "Onde Você Pode Atuar"
- CTA final
- Design responsivo

## 🗄️ Banco de Dados (db.json)

O arquivo `db.json` contém:

- **users**: Usuários do sistema
- **opportunities**: Oportunidades de voluntariado (6 exemplos)
- **applications**: Candidaturas enviadas

## 🛠️ Tecnologias Utilizadas

- Angular 19.2.6
- TypeScript 5.7.2
- RxJS 7.8.0
- Angular Material 19
- JSON-Server 1.0.0-beta.3

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos de produção estarão em `dist/conecta-voluntario/`.

## 🎯 Arquitetura e Boas Práticas

### NgModules
- **AppModule**: Módulo raiz com imports de Core e Shared
- **CoreModule**: Singleton services com proteção contra múltiplas importações
- **SharedModule**: Componentes compartilhados exportados
- **Feature Modules**: Lazy loading com RouterModule.forChild()

### Serviços
- Uso de `inject()` para injeção de dependências
- Signals para estado reativo
- RxJS para operações assíncronas (HTTP)
- Separação clara de responsabilidades

### Componentes
- Control Flow syntax (@if, @for)
- CSS Vanilla com variáveis CSS
- Responsividade com media queries
- Pixel-perfect design

## 📝 Notas Importantes

1. **NÃO usa Standalone Components** - Toda a aplicação é baseada em NgModules
2. **CSS Vanilla** - Sem SCSS, Sass ou Tailwind
3. **Angular Material** - Usado apenas quando necessário (modais, datepickers)
4. **Mock Authentication** - Sistema de autenticação fictício para demonstração
5. **JSON-Server** - Backend simulado para desenvolvimento

## 🔄 Próximos Passos (Sugestões)

- [ ] Adicionar mais páginas (Sobre, Contato, Organizações)
- [ ] Implementar perfil de usuário
- [ ] Sistema de notificações
- [ ] Dashboard de candidaturas
- [ ] Integração com backend real
- [ ] Testes unitários e E2E
- [ ] PWA (Progressive Web App)

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de demonstração.

---

**Desenvolvido com ❤️ usando Angular 19**
