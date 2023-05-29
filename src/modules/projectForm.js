import { processProjectInput } from "./project";

const ProjectForm = () => {
    const projectForm = document.createElement('div');
    const input = document.createElement('input');
    const btnContainer = document.createElement('div');
    const createBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');

    projectForm.classList.add('projectForm');
    btnContainer.classList.add('btnContainer');

    input.setAttribute('type', 'text');
    input.classList.add('projectInput');
    input.placeholder = 'Project Name';

    createBtn.textContent = 'Create';
    createBtn.setAttribute('type', 'button');
    createBtn.classList.add('createBtn');

    cancelBtn.textContent = 'Cancel';
    cancelBtn.setAttribute('type', 'button');
    cancelBtn.classList.add('cancelBtn');

    btnContainer.appendChild(createBtn);
    btnContainer.appendChild(cancelBtn);
    projectForm.appendChild(input);
    projectForm.appendChild(btnContainer);

    return { projectForm };
};

const renderProjectForm = () => {
    const sidebar = document.querySelector('.sidebar');

    // Append form to projectContent
    sidebar.appendChild(ProjectForm().projectForm);
};

function showForm() {
    const addProjectBtn = document.querySelector('.add-project');
    const projectForm = document.querySelector('.projectForm');

    // Hide addProjectBtn
    addProjectBtn.style.display = 'none';
    // show form
    projectForm.style.display = 'block';
}

function hideForm() {
    const addProjectBtn = document.querySelector('.add-project');
    const projectForm = document.querySelector('.projectForm');

    // Hide addProjectBtn
    addProjectBtn.style.display = 'block';
    // show form
    projectForm.style.display = 'none';
}

const eventListeners = () => {
    const addProjectBtn = document.querySelector('.add-project');
    addProjectBtn.addEventListener('click',showForm);

    const createBtn = document.querySelector('.createBtn');
    createBtn.addEventListener('click', processProjectInput);

    const cancelBtn = document.querySelector('.cancelBtn');
    cancelBtn.addEventListener('click', hideForm);
};

export { renderProjectForm, hideForm, eventListeners };
