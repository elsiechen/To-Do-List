import Storage from './storage';

let projectList = localStorage.getItem('projectList');
projectList = projectList? JSON.parse(projectList): [];

const project = (name) => {
    const tasks = [];
    const length = tasks.length;

    return { name, tasks, length }
};

const saveToLocalStorage = () => {
    Storage.save('projectList',project);
};