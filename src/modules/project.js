import { storage, getStorage } from './storage';
import  { hideForm }  from './projectForm';

// let projectList = localStorage.getItem('projectList');
// projectList = projectList? JSON.parse(projectList): [];

const project = (projectName) => {
    const tasks = [];
    const length = tasks.length;
    const name = projectName;

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
    
    for(let i = 0; i < projectList.length; i++){
        const projectContainer = document.createElement('div');
        const projectName = document.createElement('div');
        const projectLength = document.createElement('div');
        const svgContainer = document.createElement('div');

        projectContainer.classList.add('projectContainer');
        
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

export { processProjectInput, renderProjects };