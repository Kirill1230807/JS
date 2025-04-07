let tasks = [];

// Створення HTML елементу завдання
const createTaskElement = (task) => {
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');
    if (task.completed) {
        listItem.classList.add('completed');
    }
    listItem.dataset.id = task.id;

    const taskTextElement = document.createElement('span');
    taskTextElement.classList.add('task-text');
    taskTextElement.textContent = task.text;
    taskTextElement.addEventListener('click', () => toggleTask(task.id));

    const actionsElement = document.createElement('div');
    actionsElement.classList.add('task-actions');

    const editButton = document.createElement('button');
    editButton.textContent = 'Редагувати';
    editButton.addEventListener('click', () => startEdit(task.id));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Видалити';
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    actionsElement.appendChild(editButton);
    actionsElement.appendChild(deleteButton);

    listItem.appendChild(taskTextElement);
    listItem.appendChild(actionsElement);

    return listItem;
};

// Оновлення відображення списку завдань
const renderTasks = (currentTasks) => {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Очищаємо попередній список
    currentTasks.forEach(task => {
        taskList.appendChild(createTaskElement(task));
    });
};

// Додавання нового завдання (pure function)
const addTaskPure = (currentTasks, newTaskText) => {
    if (!newTaskText.trim()) {
        return currentTasks;
    }
    const newTask = {
        id: Date.now(),
        text: newTaskText,
        completed: false,
        addedAt: new Date(),
        updatedAt: new Date()
    };
    return [...currentTasks, newTask];
};

// Видалення завдання
const deleteTaskPure = (currentTasks, taskId) => {
    return currentTasks.filter(task => task.id !== taskId);
};

// Перемикання статусу виконання завдання
const toggleTaskPure = (currentTasks, taskId) => {
    return currentTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed, updatedAt: new Date() } : task
    );
};

// Початок редагування завдання
const startEdit = (taskId) => {
    const taskItem = document.querySelector(`li[data-id="${taskId}"]`);
    const taskTextElement = taskItem.querySelector('.task-text');
    const currentText = taskTextElement.textContent;

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.classList.add('edit-input');
    inputElement.value = currentText;

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Зберегти';
    saveButton.addEventListener('click', () => saveEdit(taskId, inputElement.value));

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Скасувати';
    cancelButton.addEventListener('click', () => renderTasks(tasks)); // Просто перемальовуємо список

    taskItem.innerHTML = '';
    taskItem.appendChild(inputElement);
    taskItem.appendChild(saveButton);
    taskItem.appendChild(cancelButton);
    inputElement.focus();
};

// Збереження відредагованого завдання
const saveEditPure = (currentTasks, taskId, newText) => {
    return currentTasks.map(task =>
        task.id === taskId ? { ...task, text: newText, updatedAt: new Date() } : task
    );
};

// Обробники подій
const handleAddTask = () => {
    const newTaskInput = document.getElementById('newTask');
    const newTaskText = newTaskInput.value;
    tasks = addTaskPure(tasks, newTaskText);
    renderTasks(tasks);
    newTaskInput.value = '';
};

const deleteTask = (taskId) => {
    tasks = deleteTaskPure(tasks, taskId);
    renderTasks(tasks);
};

const toggleTask = (taskId) => {
    tasks = toggleTaskPure(tasks, taskId);
    renderTasks(tasks);
};

const saveEdit = (taskId, newText) => {
    tasks = saveEditPure(tasks, taskId, newText);
    renderTasks(tasks);
};

const handleSortChange = (event) => {
    const sortBy = event.target.value;
    let sortedTasks = [...tasks]; // Створюємо копію масиву

    switch (sortBy) {
        case 'added':
            sortedTasks.sort((a, b) => a.addedAt - b.addedAt);
            break;
        case 'status':
            sortedTasks.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
            break;
        case 'updated':
            sortedTasks.sort((a, b) => b.updatedAt - a.updatedAt);
            break;
        default:
            break;
    }
    renderTasks(sortedTasks);
};

document.getElementById('addTaskBtn').addEventListener('click', handleAddTask);
document.getElementById('sortBy').addEventListener('change', handleSortChange);

renderTasks(tasks);