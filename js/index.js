const db = firebase.firestore(),
  taskForm = document.getElementById("task-form"),
  taskContainer = document.getElementById("tasks-container"),
  btnCreateTask = document.getElementById("btn-create-task"),
  btnListTasks = document.getElementById("btn-list-tasks"),
  oldForm = taskContainer.innerHTML,
  btnIndex = document.querySelector(".logo p"),
  taskFormContainer = document.getElementById("task-form-container");
const saveTask = (title, time, priority, description) =>
  db
    .collection("tasks")
    .doc()
    .set({
      title,
      time,
      priority,
      description,
    });

const getTasks = () => db.collection("tasks").get();

btnIndex.addEventListener("click", () => {
  taskContainer.innerHTML = oldForm;
});

btnListTasks.addEventListener("click", async (e) => {
  taskContainer.innerHTML = "";
  taskContainer.innerHTML = `<form class="flex flex-col min-w-full justify-center text-center">
    <p class="text-2xl mt-4">Pending Tasks</p>
    <div class="priority-options mt-10">
        <select id="cars" name="cars">
            <option value="high-to-low">High to Low</option>
            <option value="low-to-high">Low to High</option>
            <option value="just-high">High</option>
            <option value="just-normal">Normal</option>
            <option value="just-low">Low</option>
        </select>
    </div>
</form>
<div class="task-list w-full grid lg:grid-cols-2 sm:grid-cols-1 gap-3  mx-auto p-2" id="task-list"></div>`;
  if (taskFormContainer.classList.contains("lg:w-4/12")) {
    taskFormContainer.classList.remove("lg:w-4/12");
    taskFormContainer.classList.add("lg:w-8/12");
  }
  const queriesSnapshot = await getTasks();

  queriesSnapshot.forEach((doc) => {
    const task = doc.data();
    console.log(task.title);
    const taskList = document.getElementById("task-list");
    let colorPriority;
    if (task.priority == "High") {
      colorPriority = "bg-red-500";
    } else if (task.priority == "Normal") {
      colorPriority = "bg-yellow-500";
    } else colorPriority = "bg-green-500";
    const time = task.time;
    taskList.innerHTML += `
      <div class=" task mx-auto bg-gradient-to-r from-gray-500 to-gray-700 m-5 shadow-xl h-72 rounded-b-lg          rounded-t-2xl md:w-full xs:w-full lg:w-full sm:w-full sm:h-full">
        <div
            class="upper-task flex rounded-t-xl p-2 justify-between lg:h-3/12 ${colorPriority} text-white">
            <div class="time-task ml-4">
                <p>${time.substr(0, 10) + " " + time.substr(11, 5)}</p>
            </div>
            <div class="priority-task mr-4">
                <p>${task.priority}</p>
            </div>
        </div>
        <div
            class="task-content text-white w-full shadow-sm flex flex-col justify-center place-items-center">
            <div class="task-title text-center mt-3">
                <p>${task.title}</p>
            </div>
            <div class="h-1 sm:w-32 bg-white w-48 mt-4 "></div>
            <div class="task-desc">
                <p class="text-center mt-5" style="max-width: 200px; word-wrap: break-word;"> ${
                  task.description
                } </p>
            </div>
        </div>
      </div>
    `;
  });
});

btnCreateTask.addEventListener("click", () => {
  taskContainer.innerHTML = oldForm;
  if (taskFormContainer.classList.contains("lg:w-8/12")) {
    taskFormContainer.classList.remove("lg:w-8/12");
    taskFormContainer.classList.add("lg:w-4/12");
  }
});

// window.addEventListener("DOMContentLoaded", async (e) => {
//data
// });

taskContainer.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("task-title");
  const description = document.getElementById("task-description");
  var ele = document.getElementsByName("radio-priority");
  let priority;
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) priority = ele[i].value;
  }
  const timeTask = document.getElementById("time-task");
  //creamos la coleccion(traduccion SQL = tabla) tasks para almacenar las tareas y crear documentos(traduccion a SQL = registros)
  await saveTask(title.value, timeTask.value, priority, description.value);
  console.log(priority);
  document.getElementById("task-form").reset();

  title.focus();
  //para almacenar y tomar los datos usamos problemas(async await)
});
