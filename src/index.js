import ProjectForm from './modules/projectForm';

const sidebar = document.querySelector('.sidebar');
const addProjectBtn = document.querySelector('.add-project');


addProjectBtn.addEventListener('click', showForm);

function showForm() {
    // Hide addProjectBtn
    addProjectBtn.style.display = 'none';
    // Append form to projectContent
    sidebar.appendChild(ProjectForm);

    const createBtn = document.querySelector('.createBtn');
    const cancelBtn = document.querySelector('.cancelBtn');

    createBtn.addEventListener('click', hideForm);
    cancelBtn.addEventListener('click', hideForm);
}

function hideForm() {
    // If project has been appended to sidebar
    if(sidebar.lastChild === ProjectForm){
        // Show addProjectBtn
        addProjectBtn.style.display = 'block';
        // Remove form from sidebar
        sidebar.removeChild(sidebar.lastChild);
    }
}