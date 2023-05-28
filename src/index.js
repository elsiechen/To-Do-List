import  { renderProjectForm, eventListeners }  from './modules/projectForm';
import { renderProjects, projectEventListener, allTaskEventListener } from './modules/project';

renderProjects();
renderProjectForm();

allTaskEventListener();
eventListeners();
projectEventListener();

// default: hide projectForm
const projectForm = document.querySelector('.projectForm');
projectForm.style.display = 'none';