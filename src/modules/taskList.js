import { storage, getStorage, getOneValue } from "./storage";
// 'import circle' instead of 'import { circle }'
import circle from "./imgs/circle.png";
import check from "./imgs/check.png";
import editing from './imgs/editing.png';
import Delete from './imgs/delete.png';
import Close from './imgs/close-cross.png';
import { renderProjects } from "./project";
import { RenderTaskForm } from "./taskForm";
import { formattedDate, task, cancelTaskBtnEvent, overlayEvent, formValidation} from "./task";
import { eventListeners } from "./projectForm";
import { projectEventListener } from "./project";

let content = document.querySelector('.content');
const addTaskBtn = document.querySelector('.add-task');
 
const RenderTaskList = () => {
    let projectList = getStorage('projectList');
    const currentProjectId = getOneValue('currentProjectId');
    let currentProject = projectList[currentProjectId];
    let projectTaskList = currentProject.tasks;
    
    // problem: if currentProjectId is 0 (first project)
    //  in localStorage, it became [] and typeof object  
    // cause: [0]?
    // if(typeof currentProjectId !== 'number') {
    //     currentProject = projectList[0];
    //     console.log(currentProject);
    // }
    console.log(`current project name: ${currentProject.name}`)
    console.log(currentProject)

    let listContainer = document.querySelector('.listContainer');
    const projectNameDiv = document.createElement('div');
    const projectName = document.createElement('div');
    const deleteProject = document.createElement('button');
    const lists = document.createElement('div');

    projectNameDiv.classList.add('projectNameDiv');
    projectName.classList.add('projectName');
    deleteProject.classList.add('deleteProject');
    lists.classList.add('lists');

    // Clear project name and list content
    listContainer.innerHTML = '';

    deleteProject.innerHTML = 'Delete Project';
    // Render new project name and new list content
    projectName.innerHTML = currentProject.name;

    if(!projectTaskList.length){
        lists.innerHTML = 'This project has no task so far.'
    }else{
        for (let i = 0; i < projectTaskList.length; i++){
            const listDiv = document.createElement('div');
            const checkbox = document.createElement('img');
            const title = document.createElement('div');
            const dueDay = document.createElement('div');
            const detail = document.createElement('button');
            const editTask = document.createElement('img');
            const deleteTask = document.createElement('img');
            const priority = projectTaskList[i].priority;
            let completed = projectTaskList[i].completed;

            listDiv.classList.add('listDiv');
            checkbox.classList.add('checkbox');
            dueDay.classList.add('dueDay');
            detail.classList.add('detail');
            editTask.classList.add('editTask');
            deleteTask.classList.add('deleteTask');
            
            checkbox.setAttribute('src', completed === true? check: circle);
            title.innerHTML = projectTaskList[i].title;
            dueDay.innerHTML = projectTaskList[i].dueDay;
            detail.innerHTML = 'DETAIL';
            detail.setAttribute('type', 'button');
            editTask.setAttribute('src', editing);
            editTask.setAttribute('alt', 'Editing');
            deleteTask.setAttribute('src', Delete);
            deleteTask.setAttribute('alt', 'Delete');
            
            // Set data-task-id to identify specific task
            listDiv.setAttribute('data-task-id', i);
            checkbox.setAttribute('data-task-id', i);
            detail.setAttribute('data-task-id', i);
            editTask.setAttribute('data-task-id', i);
            deleteTask.setAttribute('data-task-id', i);

            listDiv.appendChild(checkbox);
            listDiv.appendChild(title);
            listDiv.appendChild(dueDay);
            listDiv.appendChild(detail);
            listDiv.appendChild(editTask);
            listDiv.appendChild(deleteTask);
    
            lists.appendChild(listDiv);
            
            // Set priority style using borderLeftColor
            if(priority === 'HIGH') listDiv.style.borderLeftColor = 'rgb(238, 37, 37)';
            if(priority === 'MEDIUM') listDiv.style.borderLeftColor = 'rgb(8, 131, 149)';
            if(priority === 'LOW') listDiv.style.borderLeftColor = 'rgb(255, 229, 105)';
        }   
    }
    
    projectNameDiv.appendChild(projectName);
    projectNameDiv.appendChild(deleteProject);
    listContainer.appendChild(projectNameDiv);
    listContainer.appendChild(lists);
    
};

const getCurrentProject = () => {
    let projectList = getStorage('projectList');
    const currentProjectId = getOneValue('currentProjectId');
    return projectList[currentProjectId];
};
const getProjectTask = (taskId) => {
    let currentProject = getCurrentProject();
    let projectTaskList = currentProject.tasks;
    return projectTaskList[taskId];
};

const saveUpdatedTaskToLocalStorage = (taskId,updatedTask) => {
    let projectList = getStorage('projectList');
    const currentProjectId = getOneValue('currentProjectId');
    let currentProject = projectList[currentProjectId];
    let projectTaskList = currentProject.tasks;
    // Update task
    projectTaskList[taskId] = updatedTask;
    console.log(projectTaskList[taskId])
    // Update current project in projectList
    projectList[currentProjectId] = currentProject;
    console.log(currentProject);
    // Override old projectList with new one
    storage('projectList', projectList).override();
    let updatedProjectList = getStorage('projectList');
    console.log(updatedProjectList)
};

const checkboxEvent = () => {
    let checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            const taskId = checkbox.getAttribute('data-task-id');
            let currentTask = getProjectTask(taskId);
            let img = checkbox.getAttribute('src');
            console.log(currentTask);

            checkbox.setAttribute('src', img == circle? check: circle);
            console.log('change checkbox img')
            
            currentTask.completed = currentTask.completed == true? false: true;
            console.log(currentTask.completed);
            saveUpdatedTaskToLocalStorage(taskId, currentTask)
            
        });
    });
};

const renderDetail = (e) => {
    console.log(e.target);
    const currentProject = getCurrentProject();
    const taskId = e.target.getAttribute('data-task-id');
    // console.log(taskId);
    let currentTask = getProjectTask(taskId);
    // console.log(currentTask);
    // console.log(currentTask.details)
    const overlay = document.createElement('div');
    let renderDetailDiv = document.createElement('div');
    
    overlay.classList.add('overlay'); 
    renderDetailDiv.classList.add('renderDetailDiv');

    renderDetailDiv.innerHTML = 
    `<div class="detailContainer">
        <img src="${Close}" alt="Close Cross" class="closeBtn">
        <h2>Task: ${currentTask.title}</h2>
        <div>Project: ${currentProject.name}</div>
        <div>Priority: <strong>${currentTask.priority}</strong></div>
        <div>Due Day: <strong>${currentTask.dueDay}</strong></div>
        <div>Details: ${currentTask.details = 
            currentTask.details == ''? 
            'No details provided.': currentTask.details}</div>
    </div>
    `;

    content.appendChild(overlay);
    content.appendChild(renderDetailDiv);
};



const detailEvent = () => {
    let details = document.querySelectorAll('.detail');
    details.forEach(detail => {
        detail.addEventListener('click', (e) => {
            renderDetail(e);
            renderDetailEvent()
        });
    });
};

const renderDetailEvent = () => {
    const closeBtn = document.querySelector('.closeBtn');
    const overlay = document.querySelector('.overlay');
    const renderDetailDiv = document.querySelector('.renderDetailDiv');
    
    closeBtn.addEventListener('click', () => {
        overlay.remove();
        renderDetailDiv.remove();
    });

    // if overlay is clicked, remove overlay and form 
    overlay.addEventListener('click', () => {
        overlay.remove();
        renderDetailDiv.remove();
    });
};

const deleteEvent = () => {
    let deleteBtns = document.querySelectorAll('.deleteTask');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let projectList = getStorage('projectList');
            let currentProjectId = getStorage('currentProjectId');
            let currentProject = getCurrentProject();
            // let projectTaskList = currentProject.tasks;
            const taskId = e.target.getAttribute('data-task-id');
            console.log(taskId)
            console.log(currentProject.tasks)
            // Delete task from current project
            currentProject.tasks.splice(taskId, 1);
            // Update tasks length in current project
            currentProject.length -= 1;
            console.log(currentProject.length)
            // Update current project in project list
            projectList[currentProjectId] = currentProject;
            // Save updated projectList to localStorage
            storage('projectList', projectList).override();
            console.log('delete event');
            RenderTaskList();
            renderProjects();
        });
    });
    

};

const deleteProjectEvent = () => {
    const deleteProjectBtn = document.querySelector('.deleteProject');
    
    deleteProjectBtn.addEventListener('click', () => {
        let projectList = getStorage('projectList');
        let currentProjectId = getStorage('currentProjectId');
        let listContainer = document.querySelector('.listContainer');
        
        // Delete current project from projectList
        projectList.splice(currentProjectId, 1);
        // Update projectList in localStorage
        storage('projectList', projectList).override();
        // Update current project id to empty
        storage('currentProjectId', '').override();
        renderProjects();
        // Clear listContainer
        listContainer.innerHTML = '';
    });
};

const renderTaskFormToEdit = (e) => {
    const taskId = e.target.getAttribute('data-task-id');
    const currentTask = getProjectTask(taskId);
    console.log(currentTask)
    // Render task form to edit
    RenderTaskForm();

    let title = document.querySelector('#title');
    let details = document.querySelector('#details');
    let due = document.querySelector('#due');
    let priority = document.querySelector('input[name="priority"]:checked');
    let createTaskBtn = document.querySelector('.createTaskBtn');

    // Fill form with existed values
    title.value = currentTask.title;
    details.value = currentTask.details;
    due.value = currentTask.dueDay;
    priority.value = currentTask.priority;

    // Change create btn text to edit
    createTaskBtn.innerHTML = 'EDIT TASK';
    // Set data-task-id to edit task btn
    createTaskBtn.setAttribute('data-task-id', taskId);
};

const processTaskInput = (taskId) => {
    const title = document.querySelector('#title');
    const details = document.querySelector('#details');
    const dueDay = document.querySelector('#due');
    const priority = document.querySelector('input[name="priority"]:checked');
    
    // const taskId = title.getAttribute('data-task-id');
    
    let editedTask = task(title.value,
                         details.value,
                         dueDay.value,
                         priority.value);
    
    const formatted = formattedDate(editedTask.dueDay);
    console.log(formatted);
    saveToLocalStorage(editedTask, taskId);
    RenderTaskList();
    console.log('edit: render task list')
    listEventListener();
    console.log('edit: list event listener')
};

const saveToLocalStorage = (editedTask, taskId) => {
    console.log(editedTask);
    console.log(taskId)
    let projectList = getStorage('projectList');
    const currentProjectId = getOneValue('currentProjectId');
    let currentProject = projectList[currentProjectId];
    // Update editedTask in currentProject
    currentProject.tasks[taskId] = editedTask;
    // Update current project in projectList
    projectList[currentProjectId] = currentProject;
    // Override old projectList with new one
    storage('projectList', projectList).override();
};

const editTaskBtnEvent = () => {
    const createTaskBtn = document.querySelector('.createTaskBtn');
    const addTaskContainer = document.querySelector('.add-task');
    const overlay = document.querySelector('.overlay');
    const taskFormContainer = document.querySelector('.taskFormContainer');

    createTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target) // <button type="button" class="createTaskBtn">EDIT TASK</button>
        const taskId = e.target.getAttribute('data-task-id');
        
        console.log(taskId)
        console.log('edit task btn clicked')
        // If form in invalid(return false), return
        if(!formValidation()){
            return;
        }
        processTaskInput(taskId);

        addTaskContainer.style.display = 'block';
        overlay.remove();
        taskFormContainer.remove();
    });
};

// Edit old task
const editTaskEvent = () => {
    const editTaskBtns = document.querySelectorAll('.editTask');
    
    editTaskBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            renderTaskFormToEdit(e);
            editTaskBtnEvent();
            cancelTaskBtnEvent();
            overlayEvent();
        });
    });
    
};


const listEventListener = () => {
    checkboxEvent();
    detailEvent();
    deleteEvent();
    deleteProjectEvent();
    editTaskEvent();

    eventListeners();
    projectEventListener();
};

export { RenderTaskList, listEventListener };