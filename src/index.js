import  { renderProjectForm, eventListeners }  from './modules/projectForm';
import { renderProjects, projectEventListener } from './modules/project';

renderProjects();
renderProjectForm();

eventListeners();
projectEventListener();

// default: hide projectForm
const projectForm = document.querySelector('.projectForm');
projectForm.style.display = 'none';