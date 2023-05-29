import { format, parseISO } from 'date-fns';
import { RenderTaskForm } from './taskForm';
import { storage, getStorage, getOneValue } from './storage';
import { RenderTaskList, listEventListener } from './taskList';

const task = (title, details, dueDay, priority, completed = false) => {
    let _title = title;
    let _details = details;
    let _dueDay = dueDay;
    let _priority = priority;
    let _completed = completed;
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
    };
};

const formattedDate = (dueDay) => format(parseISO(dueDay), 'MM/dd');

const processTaskInput = () => {
    const title = document.querySelector('#title');
    const details = document.querySelector('#details');
    const dueDay = document.querySelector('#due');
    const priority = document.querySelector('input[name="priority"]:checked');
    const newTask = task(
                        title.value,
                         details.value,
                         dueDay.value,
                         priority.value,
                     );
    const formatted = formattedDate(newTask.dueDay);

    saveToLocalStorage(newTask);
    RenderTaskList();
    listEventListener();
};

const saveToLocalStorage = (newTask) => {
    const projectList = getStorage('projectList');
    const currentProjectId = getOneValue('currentProjectId');
    const currentProject = projectList[currentProjectId];
    // Get current project tasks array
    const taskArray = currentProject.tasks;
    // Push new task to current project tasks array
    taskArray.push(newTask);
    // Set current project tasks array as new array
    currentProject.tasks = taskArray;
    // Update tasks length in project object
    currentProject.length = currentProject.tasks.length;
    // Update current project in projectList
    projectList[currentProjectId] = currentProject;
    // Override old projectList with new one
    storage('projectList', projectList).override();
};

const createTaskBtnEvent = () => {
    const createTaskBtn = document.querySelector('.createTaskBtn');
    const addTaskContainer = document.querySelector('.add-task');
    const overlay = document.querySelector('.overlay');
    const taskFormContainer = document.querySelector('.taskFormContainer');

    createTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // If form in invalid(return false), return
        if (!formValidation()) {
            return;
        }
        processTaskInput();

        addTaskContainer.style.display = 'block';
        overlay.remove();
        taskFormContainer.remove();
    });
};

const cancelTaskBtnEvent = () => {
    const cancelTaskBtn = document.querySelector('.cancelTaskBtn');
    const addTaskContainer = document.querySelector('.add-task');
    const overlay = document.querySelector('.overlay');
    const taskFormContainer = document.querySelector('.taskFormContainer');

    cancelTaskBtn.addEventListener('click', () => {
        addTaskContainer.style.display = 'block';
        overlay.remove();
        taskFormContainer.remove();
    });
};

const overlayEvent = () => {
    const addTaskContainer = document.querySelector('.add-task');
    const overlay = document.querySelector('.overlay');
    const taskFormContainer = document.querySelector('.taskFormContainer');

    // if overlay is clicked, remove overlay and form
    overlay.addEventListener('click', () => {
        addTaskContainer.style.display = 'block';
        overlay.remove();
        taskFormContainer.remove();
    });
};
// Create new task
const taskEventListener = () => {
    const addTaskContainer = document.querySelector('.add-task');

    addTaskContainer.addEventListener('click', () => {
        addTaskContainer.style.display = 'none';
        RenderTaskForm();
        // taskFormEventListener();
        createTaskBtnEvent();
        cancelTaskBtnEvent();
        overlayEvent();
    });
};

const formValidation = () => {
    const title = document.querySelector('#title');
    const dueDay = document.querySelector('#due');
    const titleDiv = document.querySelector('.titleDiv');
    const dueDiv = document.querySelector('.dueDiv');
    const titleError = document.createElement('div');
    const dueError = document.createElement('div');
    
    titleError.classList.add('titleError');
    dueError.classList.add('dueError');

    const existedTitleError = document.querySelector('.titleError');
    const existedDueError = document.querySelector('.dueError');
    // Remove previous error msg
    if (existedTitleError) existedTitleError.remove();
    if (existedDueError) existedDueError.remove();
    // Append new error div
    titleDiv.appendChild(titleError);
    dueDiv.appendChild(dueError);
    // Title is invalid: less than two letters
    if (title.value.length < 2) {
        titleError.innerHTML = 'Please enter title for at least two letters.';
        return false;
    } else {
        titleError.innerHTML = '';
    }
    // Due date is invalid: empty
    if (dueDay.value === '') {
        dueError.innerHTML = 'Please enter due date.';
        return false;
    } else {
        dueError.innerHTML = '';
    }
    return true;
};

export {
    formattedDate, task, taskEventListener, cancelTaskBtnEvent, overlayEvent, formValidation
};
