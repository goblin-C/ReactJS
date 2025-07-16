document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.querySelector('.add-task-btn');
    const modal = document.getElementById('task-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const modalSubmitBtn = document.getElementById('modal-submit-btn');
    const taskList = document.querySelector('.task-list');
    const dateElement = document.getElementById('date');
    const toast = document.getElementById('toast');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let isEditing = false;
    let editTaskId = null;

    const showToast = (message) => {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.setAttribute('data-id', task.id);

            taskElement.innerHTML = `
                <div class="task-item">
                    <img src="assets/checkbox-unchecked.svg" alt="checkbox">
                    <span>${task.text}</span>
                </div>
                <div class="task-actions">
                    <img src="assets/edit.svg" alt="edit" class="edit-btn">
                    <img src="assets/delete.svg" alt="delete" class="delete-btn">
                </div>
            `;
            taskList.appendChild(taskElement);
        });
    };

    const addTask = (text) => {
        const newTask = {
            id: Date.now(),
            text,
        };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        showToast('Task added successfully');
    };

    const editTask = (id, newText) => {
        tasks = tasks.map(task => (task.id === id ? { ...task, text: newText } : task));
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        showToast('Task updated successfully');
    };

    const deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        showToast('Task deleted successfully');
    };

    addTaskBtn.addEventListener('click', () => {
        isEditing = false;
        taskInput.value = '';
        modalSubmitBtn.textContent = 'Add Task';
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            showToast('Task cannot be empty');
            return;
        }

        if (isEditing) {
            editTask(editTaskId, taskText);
            isEditing = false;
            editTaskId = null;
        } else {
            addTask(taskText);
        }

        taskInput.value = '';
        modal.style.display = 'none';
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            isEditing = true;
            const taskElement = e.target.closest('.task');
            editTaskId = Number(taskElement.dataset.id);
            const taskText = taskElement.querySelector('span').textContent;
            taskInput.value = taskText;
            modalSubmitBtn.textContent = 'Save Changes';
            modal.style.display = 'block';
        }

        if (e.target.classList.contains('delete-btn')) {
            const taskElement = e.target.closest('.task');
            const taskId = Number(taskElement.dataset.id);
            deleteTask(taskId);
        }
    });

    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString('en-US', options);

    renderTasks();
});