import { storage } from './storage';
import  { hideForm }  from './projectForm';

let projectList = localStorage.getItem('projectList');
projectList = projectList? JSON.parse(projectList): [];

const project = (name) => {
    const tasks = [];
    const length = tasks.length;

    return { name, tasks, length }
};

const processProjectInput = () => {
    const projectInput = document.querySelector('.projectInput');
    const newProject = project(projectInput.value);

    hideForm();
    saveToLocalStorage(newProject);
};

const saveToLocalStorage = (project) => {
    console.log(typeof storage())
    storage('projectList',project).save();
};

export { processProjectInput };