import { getStorage, getOneValue } from "./storage";


const content = document.querySelector('.content');
const addTaskBtn = document.querySelector('.add-task');

const RenderTasks = () => {
    const projectList = getStorage('projectList');
    const currentProjectId = getOneValue('currentProjectId');
    let currentProject = projectList[currentProjectId];
    console.log(projectList);
    console.log(currentProjectId);
    console.log(typeof currentProjectId);
    
    // problem: if currentProjectId is 0 (first project)
    //  in localStorage, it became [] and typeof object  
    // cause: [0]?
    // if(typeof currentProjectId !== 'number') {
    //     currentProject = projectList[0];
    //     console.log(currentProject);
    // }
    console.log(`first project: ${projectList[0].name}`);
    console.log(`currentProject: ${currentProject} `)
    console.log(`current project name: ${currentProject.name}`)

    if(currentProject.tasks.length){
        console.log('at least 1 task(s)')
    }
};

const RenderAddTaskBtn = () => {
    const addTaskContainerExist = document.querySelector('.add-task');
    const addTaskContainer = document.createElement('div');
    const svg = document.createElement('div');
    svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px" fill-rule="evenodd"><path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/></svg>
    `;
    const addDiv = document.createElement('div');

    // Clear previous add task btn
    if(addTaskContainerExist !== null){
        addTaskContainerExist.remove();
    }
    // Add new add task btn
    addTaskContainer.classList.add('add-task');
    addDiv.innerHTML = 'ADD TASK';
    addTaskContainer.appendChild(svg);
    addTaskContainer.appendChild(addDiv);

    content.appendChild(addTaskContainer);
};

const RenderTaskForm = () => {
    // const taskFormContainer = document.createElement('div');
    // const form = document.createElement('form');
    // const nameDiv = document.createElement('div');
    // const nameLabel = document.createElement('label');
    // const nameInput = document.createElement('input')
    // const descriptionDiv = document.createElement('div');
    // const descriptionLabel = document.createElement('label');
    // const dueDiv = document.createElement('div');
    // const dueLabel = document.createElement('label');
    // const priorityDiv = document.createElement('div');
    // const priorityLabel = document.createElement('label');
    
    const taskFormContainer = document.createElement('div')
    taskFormContainer.classList.add('taskFormContainer');

    taskFormContainer.innerHTML = `<form action="" method="">
    <div class="form-control">
        <div>
            <label for="first-name">FIRST NAME *</label>
            <input type="text" name="first-name" id="first-name" required placeholder="Jack"
                minlength="2" maxlength="20">
        </div>
        <div>
            <label for="last-name">LAST NAME *</label>
            <input type="text" name="last-name" id="last-name" required 
                placeholder="Ryan" minlength="2" maxlength="20">
        </div>
        <div>
            <label for="email">EMAIL *</label>
            <input type="email" name="email" id="email" required 
                placeholder="example@gmail.com">
        </div>
        <div>
            <label for="phone">PHONE NUMBER</label>
            <input type="tel" name="phone" id="phone" placeholder="860 123 1234" 
                pattern="\d{10}" title="Provide telephone number in this format: 860 123 1234 ">
        </div>
        <div>
            <label for="pwd">PASSWORD *</label>
            <input type="password" name="pwd" id="pwd" required
                minlength="8" maxlength="20">
        </div>
        
    </div>
    <div class="btnContainers">
        <div>
            <button type="button" class="createTaskBtn">CREATE TASK</button>
        </div>
        <div>
            <button type="button" class="cancelTaskBtn">CANCEL</button>
        </div>
    </div>
    `;
    
    content.appendChild(taskFormContainer);
};




export { RenderTasks, RenderAddTaskBtn, RenderTaskForm };
