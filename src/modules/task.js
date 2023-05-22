import { RenderAddTaskBtn, RenderTaskForm } from "./taskForm";

const task = (name, description, dueDay, priority = 'Medium', completed = false) => {
    let _name = name;
    let _description = description;
    let _dueDay = dueDay;
    let _priority = priority;
    let _completed = completed;

    return {
        get name() { return _name; },
        set name(newName) { _name = newName; },
        get description() { return _description; },
        set description(newDescription) { _description = newDescription; },
        get dueDay() { return _dueDay; },
        set dueDay(newDueDay) { _dueDay = newDueDay; },
        get priority() { return _priority; },
        set priority(newPriority) { _priority = newPriority; },
        get completed() { return _completed; },
        set completed(newCompleted) { _completed = newCompleted; },
    }
}; 

const processTaskInput = () => {
    
};

const taskEventListener = () => {
    const addTaskContainer = document.querySelector('.add-task');

    addTaskContainer.addEventListener('click', () => { 
        addTaskContainer.style.display = 'none';
        RenderTaskForm();
        taskFormEventListener();
    });
};

const taskFormEventListener = () => {
    const createTaskBtn = document.querySelector('.createTaskBtn');
    const cancelTaskBtn = document.querySelector('.cancelTaskBtn');
    const addTaskContainer = document.querySelector('.add-task');
    const overlay = document.querySelector('.overlay');

    const taskFormContainer = document.querySelector('.taskFormContainer');

    createTaskBtn.addEventListener('click', () => {
        console.log('create task btn clicked')
        addTaskContainer.style.display = 'block';
        overlay.remove();
        taskFormContainer.remove();
    });
    cancelTaskBtn.addEventListener('click', () => {
        console.log('cancel task btn clicked')
        addTaskContainer.style.display = 'block';
        overlay.remove();
        taskFormContainer.remove();
    })
};

export { taskEventListener };

