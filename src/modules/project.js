import { storage, getStorage } from './storage';
import  { hideForm }  from './projectForm';
import { RenderAddTaskBtn } from './taskForm';
import { taskEventListener } from './task';
import { RenderTaskList, listEventListener } from './taskList';
import circle from "./imgs/circle.png";
import check from "./imgs/check.png";

const project = (projectName) => {
    let tasks = [];
    let length = tasks.length;
    let name = projectName;

    return { name, tasks, length }
};

const processProjectInput = () => {
    const projectInput = document.querySelector('.projectInput');
    let newProject = project(projectInput.value);
    
    console.log(newProject)
    console.log(typeof newProject);
    hideForm();
    saveToLocalStorage(newProject);
    renderProjects();
    projectEventListener();
    // clear project input after save
    projectInput.value = '';
};

const saveToLocalStorage = (project) => {
    storage('projectList', project).save();
    console.log(`save ${project.name} to local storage`)  
};

const renderProjects = () => {
    let projectList = getStorage('projectList');

    const projectContent = document.querySelector('.projectContent');
    // clear project content
    projectContent.innerHTML = '';
    // render new project content
    for(let i = 0; i < projectList.length; i++){
        const projectContainer = document.createElement('div');
        const projectName = document.createElement('div');
        const projectLength = document.createElement('div');
        const svgContainer = document.createElement('div');

        projectContainer.classList.add('projectContainer');
        // set project id to specific project container
        projectContainer.setAttribute('data-project-id', i);

        projectName.textContent = projectList[i].name;
        projectLength.textContent = projectList[i].length;
        projectLength.classList.add('projectLength');
        // append svg 

        svgContainer.innerHTML = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="16" y1="24" x2="38" y2="24"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="16" y1="34" x2="38" y2="34"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="16" y1="44" x2="38" y2="44"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="16" y1="54" x2="38" y2="54"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="12" y1="24" x2="8" y2="24"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="12" y1="34" x2="8" y2="34"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="12" y1="44" x2="8" y2="44"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="12" y1="54" x2="8" y2="54"></line> <polyline fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" points="14,8 1,8 1,63 45,63 45,8 32,8 "></polyline> <polygon fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" points="27,5 27,1 19,1 19,5 15,5 13,13 33,13 31,5 "></polygon> <polygon fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" points="55,1 55,54 59,62 63,54 63,1 "></polygon> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="55" y1="11" x2="63" y2="11"></line> </g></svg>`;
        projectContainer.appendChild(svgContainer);
        // projectContainer.appendChild(<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="16" y1="24" x2="38" y2="24"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="16" y1="34" x2="38" y2="34"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="16" y1="44" x2="38" y2="44"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="16" y1="54" x2="38" y2="54"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="12" y1="24" x2="8" y2="24"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="12" y1="34" x2="8" y2="34"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="12" y1="44" x2="8" y2="44"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="12" y1="54" x2="8" y2="54"></line> <polyline fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" points="14,8 1,8 1,63 45,63 45,8 32,8 "></polyline> <polygon fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" points="27,5 27,1 19,1 19,5 15,5 13,13 33,13 31,5 "></polygon> <polygon fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" points="55,1 55,54 59,62 63,54 63,1 "></polygon> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="55" y1="11" x2="63" y2="11"></line> </g></svg>);
        projectContainer.appendChild(projectName);
        projectContainer.appendChild(projectLength);

        projectContent.appendChild(projectContainer);
    }
};

const projectEventListener = () => {
    let projectList = getStorage('projectList');
    let projects = document.querySelectorAll('.projectContainer');
    projects.forEach(project => {
        let currentProjectId = project.getAttribute('data-project-id');
         
        project.addEventListener('click', () => {
            // save current project id to local storage 
            storage('currentProjectId', currentProjectId).override();
            console.log(`save ${currentProjectId} to local storage`) 
            RenderTaskList();
            RenderAddTaskBtn();
            taskEventListener();
            listEventListener();
        });
    });
};

const RenderAllTask = () => {
    let projectList = getStorage('projectList');
    let listContainer = document.querySelector('.listContainer');
    const projectNameDiv = document.createElement('div');
    const projectName = document.createElement('div');
    const lists = document.createElement('div');

    projectNameDiv.classList.add('projectNameDiv');
    projectName.classList.add('projectName');
    lists.classList.add('lists');

    // Clear project name and list content
    listContainer.innerHTML = '';

    projectName.innerHTML = 'ALL TASKS';
    
    if(!projectList.length){
        lists.innerHTML = 'There is no project created so far.'
    }else{
        for(let i = 0; i < projectList.length; i++){
            let subProjectDiv = document.createElement('div');
            let subProjectName = document.createElement('div');
            const goToProject = document.createElement('button');
            let subList = document.createElement('div');

            subProjectDiv.classList.add('projectDiv');
            subProjectName.classList.add('subProjectName');
            goToProject.classList.add('goToProject');
            subList.classList.add('subList');
            // set data-project-id to identify specific project
            goToProject.setAttribute('data-project-id', i);
            // render innerHTML
            subProjectName.innerHTML = projectList[i].name;
            goToProject.innerHTML = 'Go To Project';

            if(!projectList[i].tasks.length){
                subList.innerHTML = 'This project has no task so far.';
            }else{
                for(let j = 0; j < projectList[i].tasks.length; j++){
                    const subListDiv = document.createElement('div');
                    const checkbox = document.createElement('img');
                    const title = document.createElement('div');
                    const dueDay = document.createElement('div');
                    const priority = projectList[i].tasks[j].priority;
                    let completed = projectList[i].tasks[j].completed;

                    subListDiv.classList.add('subListDiv');
                    checkbox.classList.add('subCheckbox');
                    dueDay.classList.add('dueDay');

                    checkbox.setAttribute('src', completed === true? check: circle);
                    title.innerHTML = projectList[i].tasks[j].title;
                    dueDay.innerHTML = projectList[i].tasks[j].dueDay;
            
                    subListDiv.appendChild(checkbox);
                    subListDiv.appendChild(title);
                    subListDiv.appendChild(dueDay);

                    subList.appendChild(subListDiv);

                    // Set priority style using borderLeftColor
                    if(priority === 'HIGH') subListDiv.style.borderLeftColor = 'rgb(238, 37, 37)';
                    if(priority === 'MEDIUM') subListDiv.style.borderLeftColor = 'rgb(8, 131, 149)';
                    if(priority === 'LOW') subListDiv.style.borderLeftColor = 'rgb(255, 229, 105)';
                }
                
            }

            subProjectDiv.appendChild(subProjectName);
            subProjectDiv.appendChild(goToProject);
            lists.appendChild(subProjectDiv);
            lists.appendChild(subList);
            
        }
    }

    projectNameDiv.appendChild(projectName);
    listContainer.appendChild(projectNameDiv);
    listContainer.appendChild(lists);
};

const GoToProjectEvent = ()=> {
    const goToProjectBtns = document.querySelectorAll('.goToProject');
    goToProjectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = e.target.getAttribute('data-project-id');
            const projects = document.querySelectorAll('.projectContainer');
            const clickedProject = projects[projectId];
            clickedProject.click();
        });
    });
};

const allTaskEventListener = () => {
    const allTask = document.querySelector('.all');
    allTask.addEventListener('click', () => {
        // Remove add task btn
        const addTaskBtn = document.querySelector('.add-task');
        if(addTaskBtn) addTaskBtn.remove();

        RenderAllTask();
        GoToProjectEvent();
    });
    
};

export { processProjectInput, renderProjects, projectEventListener, allTaskEventListener };