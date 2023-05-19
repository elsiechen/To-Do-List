import  { renderProjectForm, eventListeners }  from './modules/projectForm';

renderProjectForm();
eventListeners();

// default: hide projectForm
const projectForm = document.querySelector('.projectForm');
projectForm.style.display = 'none';