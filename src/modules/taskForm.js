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
    
    const overlay = document.createElement('div');
    const taskFormContainer = document.createElement('div')
    
    overlay.classList.add('overlay'); 
    taskFormContainer.classList.add('taskFormContainer');

    taskFormContainer.innerHTML = 
    `<form action="" method="">
        <div class="form-control">
            <div>
                <label for="title">TITLE: *</label>
                <input type="text" name="title" id="title" required placeholder="LeetCode"
                    minlength="2" maxlength="20" autofocus>
            </div>
            <div>
                <label for="details">DETAILS: </label>
                <textarea name="details" id="details" rows="4" cols="50">
                </textarea>
            </div>
            <div>
                <label for="due">DUE DAY: *</label>
                <input type="date" name="due" id="due" required 
                    placeholder="05/22/2023">
            </div>
            <div>
                <label for="priority">PRIORITY: *</label>
                <div class="priority">
                    <input type="radio" id="high" name="priority" value="HIGH">
                    <label for="high">HIGH</label>
                    <input type="radio" id="medium" name="priority" value="MEDIUM" checked>
                    <label for="medium">MEDIUM</label>
                    <input type="radio" id="low" name="priority" value="LOW">
                    <label for="low">LOW</label>
                </div>
            </div>
            <div class="btnContainer">
                <div>
                    <button type="button" class="createTaskBtn">CREATE TASK</button>
                </div>
                <div>
                    <button type="button" class="cancelTaskBtn">CANCEL</button>
                </div>
            </div>
        </div>
    
    </div>
    `;
    
    content.appendChild(overlay);
    content.appendChild(taskFormContainer);
};
// <button type="button" class="priorityBtn" data-priority="HIGH">HIGH</button>
// <button type="button" class="priorityBtn" data-priority="MEDIUM">MEDIUM</button>
// <button type="button" class="priorityBtn" data-priority="LOW">LOW</button>
                    



export { RenderTasks, RenderAddTaskBtn, RenderTaskForm };
