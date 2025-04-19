document.addEventListener('DOMContentLoaded', () => {
    const tasks = document.querySelectorAll('.task');
    const lists = document.querySelectorAll('.task-list');

    tasks.forEach(task => {
        task.addEventListener('dragstart', handleDragStart);
    });

    lists.forEach(list => {
        list.addEventListener('dragover', handleDragOver);
        list.addEventListener('drop', handleDrop);
        list.addEventListener('dragenter', handleDragEnter);
        list.addEventListener('dragleave', handleDragLeave);
    });

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.taskId);
        e.target.classList.add('dragging');
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('text/plain');
        const task = document.querySelector(`[data-task-id="${taskId}"]`);
        e.target.closest('.task-list').appendChild(task);
        task.classList.remove('dragging');
    }

    function handleDragEnter(e) {
        e.preventDefault();
        e.target.closest('.task-list').classList.add('hovered');
    }

    function handleDragLeave(e) {
        e.target.closest('.task-list').classList.remove('hovered');
    }
});