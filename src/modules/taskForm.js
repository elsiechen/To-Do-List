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
    
    // solution to problem: if currentProjectId is 0 (first project)
    //  in localStorage, it became [] and typeof object  
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
// const RenderTaskForm = () => {
//     const taskContainer = document.createElement('div');
//     taskContainer.classList.add('taskContainer');

// };




export { RenderTasks, RenderAddTaskBtn };
