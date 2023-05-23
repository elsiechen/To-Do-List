import { format } from 'date-fns'
import { RenderAddTaskBtn, RenderTaskForm } from "./taskForm";

const task = (title, details, dueDay, priority = 'Medium', completed = false) => {
    let _title = title;
    let _details = details;
    let _dueDay = dueDay;
    let _priority = priority;
    let _completed = completed;
    let formattedDate = () => {
        return format(new Date(_dueDay), 'dd/MM/yyyy');
    }
    
    return {
        get title() { return _title; },
        set title(newTitle) { _title = newTitle; },
        get details() { return _details; },
        set details(newDetails) { _details = newDetails; },
        get dueDay() { return _dueDay; },
        set dueDay(newDueDay) { _dueDay = newDueDay; },
        get priority() { return _priority; },
        set priority(newPriority) { _priority = newPriority; },
        get completed() { return _completed; },
        set completed(newCompleted) { _completed = newCompleted; },
        formattedDate
    }
}; 

const processTaskInput = () => {
    const title = document.querySelector('#title');
    const details = document.querySelector('#details');
    const dueDay = document.querySelector('#due');
    const priority = document.querySelector('input[name="priority"]:checked');
    const newTask = task(title.value,
                         details.value,
                         dueDay.value,
                         priority.value);
    console.log(newTask);
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

    createTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        console.log('create task btn clicked')
        // If form in invalid(return false), return
        if(!formValidation()){
            return;
        }
        processTaskInput();


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
    // if overlay is clicked, remove overlay and form 
    overlay.addEventListener('click', () => {
        addTaskContainer.style.display = 'block';
        overlay.remove();
        taskFormContainer.remove();
    });
};

const formValidation = () => {
    const title = document.querySelector('#title');
    const dueDay = document.querySelector('#due');
    const titleDiv = document.querySelector('.titleDiv');
    const dueDiv = document.querySelector('.dueDiv');
    let titleError = document.createElement('div');
    let dueError = document.createElement('div');
    
    titleError.classList.add('titleError');
    dueError.classList.add('dueError');

    const existedTitleError = document.querySelector('.titleError');
    const existedDueError = document.querySelector('.dueError');
    // Remove previous error msg
    if(existedTitleError) existedTitleError.remove();
    if(existedDueError) existedDueError.remove();
    // Append new error div
    titleDiv.appendChild(titleError);
    dueDiv.appendChild(dueError);
    // Title is invalid: less than two letters
    if(title.value.length < 2) {
        titleError.innerHTML = 'Please enter title for at least two letters.';
        return false;
    }else{
        titleError.innerHTML = '';
    }
    // Due date is invalid: empty
    if(dueDay.value === '') {
        dueError.innerHTML = 'Please enter due date.';
        return false;
    }else{
        dueError.innerHTML = '';
    }
    console.log('Form is valid')
    return true;
};

export { taskEventListener };

