import { getStorage, getOneValue } from "./storage";
// 'import circle' instead of 'import { circle }'
import circle from "./imgs/circle.png";
import editing from './imgs/editing.png';
import Delete from './imgs/delete.png';

let content = document.querySelector('.content');
const addTaskBtn = document.querySelector('.add-task');

const RenderTaskList = () => {
    let projectList = getStorage('projectList');
    const currentProjectId = getOneValue('currentProjectId');
    let currentProject = projectList[currentProjectId];
    let projectTaskList = currentProject.tasks;
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
    console.log(`current project name: ${currentProject.name}`)
    console.log(currentProject)

    if(currentProject.tasks.length){
        console.log('at least 1 task(s)')
    }

    let listContainer = document.querySelector('.listContainer');
    const projectName = document.createElement('div');
    const lists = document.createElement('div');

    projectName.classList.add('projectName');
    lists.classList.add('lists');

    // Clear project name and list content
    listContainer.innerHTML = '';

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

            listDiv.classList.add('listDiv');
            checkbox.classList.add('checkbox');
            dueDay.classList.add('dueDay');
            detail.classList.add('detail');
            editTask.classList.add('editTask');
            deleteTask.classList.add('deleteTask');
    
            checkbox.setAttribute('src', circle);
            checkbox.setAttribute('alt', 'Empty Checkbox');
            title.innerHTML = projectTaskList[i].title;
            dueDay.innerHTML = projectTaskList[i].dueDay;
            detail.innerHTML = 'DETAIL';
            detail.setAttribute('type', 'button');
            editTask.setAttribute('src', editing);
            editTask.setAttribute('alt', 'Editing');
            deleteTask.setAttribute('src', Delete);
            deleteTask.setAttribute('alt', 'Delete');
    
            listDiv.appendChild(checkbox);
            listDiv.appendChild(title);
            listDiv.appendChild(dueDay);
            listDiv.appendChild(detail);
            listDiv.appendChild(editTask);
            listDiv.appendChild(deleteTask);
    
            lists.appendChild(listDiv);
        }
    }
    
    listContainer.appendChild(projectName);
    listContainer.appendChild(lists);
    
};

export { RenderTaskList };