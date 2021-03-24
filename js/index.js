import swal from "sweetalert2";
window.Swal = swal;
const db = firebase.firestore(),
  taskForm = document.getElementById("task-form"),
  taskContainer = document.getElementById("tasks-container"),
  btnCreateTask = document.getElementById("btn-create-task"),
  btnListTasks = document.getElementById("btn-list-tasks"),
  oldForm = taskContainer.innerHTML,
  btnIndex = document.querySelector(".logo p"),
  taskFormContainer = document.getElementById("task-form-container"),
  selectPriority = document.getElementById("priority-select");
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

const getTasks = () =>
  db
    .collection("tasks")
    .orderBy("time")
    .get();

btnIndex.addEventListener("click", () => {
  const formPriority = document.getElementById("form-select-priority");
  const taskList = document.getElementById("task-list");
  const formCreateTask = document.getElementById("form-create-task");
  if (formCreateTask.classList.contains("invisible")) {
    formCreateTask.classList.toggle("invisible");
    formCreateTask.classList.toggle("hidden");
    formPriority.classList.toggle("invisible");
    formPriority.classList.toggle("hidden");
    taskList.classList.toggle("hidden");
    taskList.classList.toggle("invisible");
  }

  if (taskFormContainer.classList.contains("lg:w-8/12")) {
    taskFormContainer.classList.remove("lg:w-8/12");
    taskFormContainer.classList.add("lg:w-4/12");
  }
});

let statusPriority = 1;

selectPriority.addEventListener("change", async (e) => {
  statusPriority = selectPriority.value;
  console.log(statusPriority);
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  const queriesSnapshot = await getTasks();

  if (statusPriority == 1) {
    //high to low
    queriesSnapshot.forEach((doc) => {
      const task = doc.data();

      const time = task.time;
      let colorPriority;
      if (task.priority == "High") {
        colorPriority = "bg-red-500";
        taskList.innerHTML += `
        <div class=" task mx-auto bg-gradient-to-r from-gray-500 to-gray-700 m-5 shadow-xl h-72 rounded-b-lg          rounded-t-2xl md:w-full xs:w-full lg:w-full sm:w-full sm:h-full">
          <div
              class="upper-task flex rounded-t-xl p-2 justify-between lg:h-3/12 ${colorPriority} text-white">
              <div class="time-task ml-4">
                  <p>${time.substr(0, 10)} ${time.substr(11, 5)}</p>
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
      }

      // else if (task.priority == "Normal") {
      // colorPriority = "bg-yellow-500";
      // } else colorPriority = "bg-green-500";
    });
    queriesSnapshot.forEach((doc) => {
      const task = doc.data();

      const time = task.time;
      let colorPriority;
      if (task.priority == "Normal") {
        colorPriority = "bg-yellow-500";
        taskList.innerHTML += `
        <div class=" task mx-auto bg-gradient-to-r from-gray-500 to-gray-700 m-5 shadow-xl h-72 rounded-b-lg          rounded-t-2xl md:w-full xs:w-full lg:w-full sm:w-full sm:h-full">
          <div
              class="upper-task flex rounded-t-xl p-2 justify-between lg:h-3/12 ${colorPriority} text-white">
              <div class="time-task ml-4">
                  <p>${time.substr(0, 10)} ${time.substr(11, 5)}</p>
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
      }

      // else if (task.priority == "Normal") {
      // colorPriority = "bg-yellow-500";
      // } else colorPriority = "bg-green-500";
    });
    queriesSnapshot.forEach((doc) => {
      const task = doc.data();

      const time = task.time;
      let colorPriority;
      if (task.priority == "Low") {
        colorPriority = "bg-green-500";
        taskList.innerHTML += `
        <div class=" task mx-auto bg-gradient-to-r from-gray-500 to-gray-700 m-5 shadow-xl h-72 rounded-b-lg          rounded-t-2xl md:w-full xs:w-full lg:w-full sm:w-full sm:h-full">
          <div
              class="upper-task flex rounded-t-xl p-2 justify-between lg:h-3/12 ${colorPriority} text-white">
              <div class="time-task ml-4">
                  <p>${time.substr(0, 10)} ${time.substr(11, 5)}</p>
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
      }

      // else if (task.priority == "Normal") {
      // colorPriority = "bg-yellow-500";
      // } else colorPriority = "bg-green-500";
    });
  } else if (statusPriority == 2) {
    //low to high
    queriesSnapshot.forEach((doc) => {
      const task = doc.data();

      const time = task.time;
      let colorPriority;
      if (task.priority == "Low") {
        colorPriority = "bg-green-500";
        taskList.innerHTML += `
        <div class=" task mx-auto bg-gradient-to-r from-gray-500 to-gray-700 m-5 shadow-xl h-72 rounded-b-lg          rounded-t-2xl md:w-full xs:w-full lg:w-full sm:w-full sm:h-full">
          <div
              class="upper-task flex rounded-t-xl p-2 justify-between lg:h-3/12 ${colorPriority} text-white">
              <div class="time-task ml-4">
                  <p>${time.substr(0, 10)} ${time.substr(11, 5)}</p>
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
      }

      // else if (task.priority == "Normal") {
      // colorPriority = "bg-yellow-500";
      // } else colorPriority = "bg-green-500";
    });

    queriesSnapshot.forEach((doc) => {
      const task = doc.data();

      const time = task.time;
      let colorPriority;
      if (task.priority == "Normal") {
        colorPriority = "bg-yellow-500";
        taskList.innerHTML += `
        <div class=" task mx-auto bg-gradient-to-r from-gray-500 to-gray-700 m-5 shadow-xl h-72 rounded-b-lg          rounded-t-2xl md:w-full xs:w-full lg:w-full sm:w-full sm:h-full">
          <div
              class="upper-task flex rounded-t-xl p-2 justify-between lg:h-3/12 ${colorPriority} text-white">
              <div class="time-task ml-4">
                  <p>${time.substr(0, 10)} ${time.substr(11, 5)}</p>
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
      }

      // else if (task.priority == "Normal") {
      // colorPriority = "bg-yellow-500";
      // } else colorPriority = "bg-green-500";
    });
    queriesSnapshot.forEach((doc) => {
      const task = doc.data();

      const time = task.time;
      let colorPriority;
      if (task.priority == "High") {
        colorPriority = "bg-red-500";
        taskList.innerHTML += `
        <div class=" task mx-auto bg-gradient-to-r from-gray-500 to-gray-700 m-5 shadow-xl h-72 rounded-b-lg          rounded-t-2xl md:w-full xs:w-full lg:w-full sm:w-full sm:h-full">
          <div
              class="upper-task flex rounded-t-xl p-2 justify-between lg:h-3/12 ${colorPriority} text-white">
              <div class="time-task ml-4">
                  <p>${time.substr(0, 10)} ${time.substr(11, 5)}</p>
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
      }

      // else if (task.priority == "Normal") {
      // colorPriority = "bg-yellow-500";
      // } else colorPriority = "bg-green-500";
    });
  } else {
    //3 = high, 4 = normal, 5 = low
    if (statusPriority == 3) {
      queriesSnapshot.forEach((doc) => {
        const task = doc.data();

        const time = task.time;
        let colorPriority;
        if (task.priority == "High") {
          colorPriority = "bg-red-500";
          taskList.innerHTML += `
          <div class=" task mx-auto bg-gradient-to-r from-gray-500 to-gray-700 m-5 shadow-xl h-72 rounded-b-lg          rounded-t-2xl md:w-full xs:w-full lg:w-full sm:w-full sm:h-full">
            <div
                class="upper-task flex rounded-t-xl p-2 justify-between lg:h-3/12 ${colorPriority} text-white">
                <div class="time-task ml-4">
                    <p>${time.substr(0, 10)} ${time.substr(11, 5)}</p>
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
        }

        // else if (task.priority == "Normal") {
        // colorPriority = "bg-yellow-500";
        // } else colorPriority = "bg-green-500";
      });
    } else if (statusPriority == 4) {
      queriesSnapshot.forEach((doc) => {
        const task = doc.data();

        const time = task.time;
        let colorPriority;
        if (task.priority == "Normal") {
          colorPriority = "bg-yellow-500";
          taskList.innerHTML += `
          <div class=" task mx-auto bg-gradient-to-r from-gray-500 to-gray-700 m-5 shadow-xl h-72 rounded-b-lg          rounded-t-2xl md:w-full xs:w-full lg:w-full sm:w-full sm:h-full">
            <div
                class="upper-task flex rounded-t-xl p-2 justify-between lg:h-3/12 ${colorPriority} text-white">
                <div class="time-task ml-4">
                    <p>${time.substr(0, 10)} ${time.substr(11, 5)}</p>
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
        }

        // else if (task.priority == "Normal") {
        // colorPriority = "bg-yellow-500";
        // } else colorPriority = "bg-green-500";
      });
    } else {
      queriesSnapshot.forEach((doc) => {
        const task = doc.data();

        const time = task.time;
        let colorPriority;
        if (task.priority == "Low") {
          colorPriority = "bg-green-500";
          taskList.innerHTML += `
          <div class=" task mx-auto bg-gradient-to-r from-gray-500 to-gray-700 m-5 shadow-xl h-72 rounded-b-lg          rounded-t-2xl md:w-full xs:w-full lg:w-full sm:w-full sm:h-full">
            <div
                class="upper-task flex rounded-t-xl p-2 justify-between lg:h-3/12 ${colorPriority} text-white">
                <div class="time-task ml-4">
                    <p>${time.substr(0, 10)} ${time.substr(11, 5)}</p>
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
        }

        // else if (task.priority == "Normal") {
        // colorPriority = "bg-yellow-500";
        // } else colorPriority = "bg-green-500";
      });
    }
  }
});

btnListTasks.addEventListener("click", () => {
  if (taskFormContainer.classList.contains("lg:w-4/12")) {
    taskFormContainer.classList.remove("lg:w-4/12");
    taskFormContainer.classList.add("lg:w-8/12");
  }

  const formPriority = document.getElementById("form-select-priority");
  const formCreateTask = document.getElementById("form-create-task");
  const taskList = document.getElementById("task-list");
  const dropDown = document.getElementById("priority-select");
  dropDown.selectedIndex = 0;
  if (formPriority.classList.contains("invisible")) {
    formCreateTask.classList.toggle("invisible");
    formCreateTask.classList.toggle("hidden");
    formPriority.classList.toggle("invisible");
    formPriority.classList.toggle("hidden");
    if (taskList.classList.contains("invisible")) {
      taskList.classList.toggle("hidden");
      taskList.classList.toggle("invisible");
      taskList.innerHTML = "";
    }
  }
});

btnCreateTask.addEventListener("click", () => {
  const formPriority = document.getElementById("form-select-priority");
  const taskList = document.getElementById("task-list");
  const formCreateTask = document.getElementById("form-create-task");

  if (formCreateTask.classList.contains("invisible")) {
    formCreateTask.classList.toggle("invisible");
    formCreateTask.classList.toggle("hidden");
    formPriority.classList.toggle("invisible");
    formPriority.classList.toggle("hidden");
    if (!taskList.classList.contains("invisible")) {
      taskList.classList.toggle("hidden");
      taskList.classList.toggle("invisible");
    }
  }

  if (taskFormContainer.classList.contains("lg:w-8/12")) {
    taskFormContainer.classList.remove("lg:w-8/12");
    taskFormContainer.classList.add("lg:w-4/12");
  }
});

// window.addEventListener("DOMContentLoaded", async (e) => {
//data
// });

// const title = document.getElementById("task-title");
// const description = document.getElementById("task-description");
// const ele = document.querySelector('#task-form input[name="radio-priority"]');
// const timeTask = document.getElementById("#task-form time-task");

const validationInputs = (title, description, ele, timeTask) => {
  if (
    title.value == "" ||
    description.value == "" ||
    ele == "" ||
    timeTask.value == ""
  )
    return false;
  return true;
};

taskContainer.addEventListener("submit", async (e) => {
  //creamos la coleccion(traduccion SQL = tabla) tasks para almacenar las tareas y crear documentos(traduccion a SQL = registros)
  let ele = [
    taskForm.high.checked,
    taskForm.normal.checked,
    taskForm.low.checked,
  ];
  let priorities = ["High", "Normal", "Low"];
  let priority = "";
  for (i = 0; i < 3; i++) {
    if (ele[i]) priority = priorities[i];
  }
  console.log(
    taskForm.taskTitle.value,
    taskForm.taskDescription.value,
    priority,
    taskForm.timeTask.value
  );
  e.preventDefault();
  if (
    validationInputs(
      taskForm.taskTitle,
      taskForm.taskDescription,
      priority,
      taskForm.timeTask
    )
  ) {
    Swal.fire(
      "Congratulations",
      `Your task named ${taskForm.taskTitle.value} was added`,
      "success"
    );
    await saveTask(
      taskForm.taskTitle.value,
      taskForm.taskDescription.value,
      priority,
      taskForm.timeTask.value
    );
    document.getElementById("task-form").reset();
  } else {
    Swal.fire("Oops...", "Something went wrong!", "error");
  }

  taskForm.taskTitle.focus();
  //para almacenar y tomar los datos usamos problemas(async await)
});
