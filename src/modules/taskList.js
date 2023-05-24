import { getStorage, getOneValue } from "./storage";


const content = document.querySelector('.content');
const addTaskBtn = document.querySelector('.add-task');

const RenderTaskList = () => {
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

export { RenderTaskList };