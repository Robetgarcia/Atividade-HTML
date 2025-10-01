# Atividade-HTML
Uma aplicação web responsiva para gerenciamento de tarefas, construída com HTML5, CSS3 e JavaScript ES6+. Permite adicionar, listar, marcar como concluída, remover tarefas com confirmação, filtrar por status e persistir dados no Local Storage.

## Funcionalidades Implementadas

### Obrigatórias
- **Adicionar Tarefa**: Formulário com título e descrição (validação HTML5).
- **Listar Tarefas**: Exibição em lista com animações CSS.
- **Marcar como Concluída**: Toggle para completar/reativar tarefas.
- **Remover Tarefa**: Botão com confirmação via `confirm()`.
- **Filtrar Tarefas**: Botões para "Todas", "Pendentes" e "Concluídas".
- **Persistência**: Dados salvos no Local Storage.

### Bônus
- **Editar Tarefas**: Clique em "Editar" para pré-preencher o formulário.
- **Tema Escuro/Claro**: Botão no header para alternar (persistido no Local Storage).

## Requisitos Técnicos
- **HTML5**: Estrutura semântica com `<header>`, `<main>`, `<section>` e validação de formulários.
- **CSS3**: Design responsivo com Flexbox, animações (`@keyframes`), transições e media queries para mobile/desktop.
- **JavaScript ES6+**: Classe `TaskManager` para organização, manipulação do DOM, event listeners e Local Storage.

## Como Usar
1. Clone o repositório ou baixe os arquivos.
2. Abra `index.html` em um navegador moderno.
3. Adicione tarefas via formulário.
4. Use filtros e ações nos botões das tarefas.
5. Ative o tema escuro clicando no ícone no header.

## Deploy
- Crie um repositório GitHub público.
- Faça upload dos arquivos: `index.html`, `style.css`, `script.js` e este `README.md`.
- Ative GitHub Pages nas configurações do repositório (branch `main`).
- Acesse via URL: `https://seuusuario.github.io/todo/`.

## Estrutura de Arquivos
todo/
    index.html
    style.css
    script.js
    README.md
