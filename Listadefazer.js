class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.currentFilter = 'all';
        this.editingId = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
        this.loadTheme();
    }

    bindEvents() {
        const form = document.getElementById('taskForm');
        form.addEventListener('submit', (e) => this.handleSubmit(e));

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });

        document.getElementById('toggleTheme').addEventListener('click', () => this.toggleTheme());
        document.getElementById('tasks').addEventListener('click', (e) => this.handleTaskAction(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();

        if (!title || !description) return;

        if (this.editingId) {
            this.tasks = this.tasks.map(task => 
                task.id === this.editingId 
                    ? { ...task, title, description } 
                    : task
            );
            this.editingId = null;
            document.querySelector('#addTask h2').textContent = 'Adicionar Nova Tarefa';
        } else {
            const newTask = {
                id: Date.now(),
                title,
                description,
                completed: false,
                createdAt: new Date().toISOString()
            };
            this.tasks.push(newTask);
        }

        this.save();
        this.render();
        e.target.reset();
    }

    handleFilter(e) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
        this.render();
    }

    handleTaskAction(e) {
        const taskItem = e.target.closest('.task-item');
        if (!taskItem) return;

        const id = parseInt(taskItem.dataset.id);
        const task = this.tasks.find(t => t.id === id);

        if (e.target.classList.contains('btn-toggle')) {
            task.completed = !task.completed;
            this.save();
            this.render();
        } else if (e.target.classList.contains('btn-edit')) {
            this.editTask(id);
        } else if (e.target.classList.contains('btn-delete')) {
            if (confirm(`Deseja remover a tarefa "${task.title}"?`)) {
                this.tasks = this.tasks.filter(t => t.id !== id);
                this.save();
                this.render();
            }
        }
    }

    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        document.getElementById('title').value = task.title;
        document.getElementById('description').value = task.description;
        document.getElementById('title').focus();

        this.editingId = id;
        document.querySelector('#addTask h2').textContent = 'Editar Tarefa';
        document.getElementById('taskForm').scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        const tasksContainer = document.getElementById('tasks');
        let filteredTasks = this.tasks;

        if (this.currentFilter === 'pending') {
            filteredTasks = this.tasks.filter(task => !task.completed);
        } else if (this.currentFilter === 'completed') {
            filteredTasks = this.tasks.filter(task => task.completed);
        }

        tasksContainer.innerHTML = filteredTasks.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div>
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                </div>
                <div class="task-actions">
                    <button class="btn-toggle ${task.completed ? 'btn-reactivate' : ''}">
                        ${task.completed ? 'Des-Concluir' : 'Concluir'}
                    </button>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Remover</button>
                </div>
            </li>
        `).join('');
    }

    save() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        document.getElementById('toggleTheme').textContent = isDark ? '☀️' : '🌙';
    }

    loadTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            document.getElementById('toggleTheme').textContent = '☀️';
        }
    }
}

new TaskManager();