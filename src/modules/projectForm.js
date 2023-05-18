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

export default projectForm;