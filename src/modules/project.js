import { storage, getStorage } from './storage';
import  { hideForm }  from './projectForm';

let projectList = localStorage.getItem('projectList');
projectList = projectList? JSON.parse(projectList): [];

const project = (name) => {
    const tasks = [];
    const length = tasks.length;
    const getName = () => name;

    return { name, tasks, length, getName }
};

const processProjectInput = () => {
    const projectInput = document.querySelector('.projectInput');
    let newProject = project(projectInput.value);
    
    console.log(newProject)
    hideForm();
    saveToLocalStorage(newProject);

    // clear project input after save
    projectInput.value = '';
};

const saveToLocalStorage = (project) => {
    console.log(projectList)
    console.log(typeof projectList)
    const newProjectList = projectList.push(project);
    
    storage('projectList', newProjectList).save();
    console.log(projectList)
    
};


export { processProjectInput };