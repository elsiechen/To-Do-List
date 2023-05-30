const content = document.querySelector(".content");

const RenderAddTaskBtn = () => {
  const addTaskContainerExist = document.querySelector(".add-task");
  const addTaskContainer = document.createElement("div");
  const svg = document.createElement("div");
  svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="16px" height="16px" fill-rule="evenodd"><path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/></svg>
    `;
  const addDiv = document.createElement("div");

  // Clear previous add task btn
  if (addTaskContainerExist !== null) {
    addTaskContainerExist.remove();
  }
  // Add new add task btn
  addTaskContainer.classList.add("add-task");
  addDiv.classList.add("add-div");
  addDiv.innerHTML = "ADD TASK";
  addTaskContainer.appendChild(svg);
  addTaskContainer.appendChild(addDiv);

  content.appendChild(addTaskContainer);
};

const RenderTaskForm = () => {
  const overlay = document.createElement("div");
  const taskFormContainer = document.createElement("div");

  overlay.classList.add("overlay");
  taskFormContainer.classList.add("taskFormContainer");

  taskFormContainer.innerHTML = `<form action="" method="" id="taskForm">
        <div class="form-control">
            <div class="titleDiv">
                <label for="title">TITLE: *</label>
                <input type="text" name="title" id="title" required placeholder="LeetCode"
                    minlength="2" maxlength="20" autofocus>
            </div>
            <div>
                <label for="details">DETAILS: </label>
                <textarea name="details" id="details" rows="4" cols="50"></textarea>
            </div>
            <div class="dueDiv">
                <label for="due">DUE DATE: *</label>
                <input type="date" name="due" id="due" required 
                    placeholder="05/22/2023">
            </div>
            <div>
                <label for="priority">PRIORITY: *</label>
                <div class="priority">
                    <input type="radio" id="high" name="priority" value="HIGH">
                    <label for="high">HIGH</label>
                    <input type="radio" id="medium" name="priority" value="MEDIUM" checked>
                    <label for="medium">MEDIUM</label>
                    <input type="radio" id="low" name="priority" value="LOW">
                    <label for="low">LOW</label>
                </div>
            </div>
            <div class="taskBtnContainer">
                <button type="button" class="createTaskBtn">CREATE TASK</button>
                <button type="button" class="cancelTaskBtn">CANCEL</button>
                <!--Use input type="submit" to enable form built-in validations-->
                <!--input type="submit" class="createTaskBtn" value="CREATE TASK"-->
            </div>
        </div>
    </form>`;

  content.appendChild(overlay);
  content.appendChild(taskFormContainer);
};

export { RenderAddTaskBtn, RenderTaskForm };
