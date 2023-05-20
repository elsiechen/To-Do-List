import  { renderProjectForm, eventListeners }  from './modules/projectForm';
import { renderProjects } from './modules/project';

renderProjects();
renderProjectForm();
eventListeners();

// default: hide projectForm
const projectForm = document.querySelector('.projectForm');
projectForm.style.display = 'none';