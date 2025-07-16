// Seleziona elementi dal DOM
const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskStatus = document.getElementById("task-status");
const taskList = document.getElementById("tasks");
const filterSelect = document.getElementById("filter-select");

const statTodo = document.getElementById("stat-todo");
const statInProgress = document.getElementById("stat-in-progress");
const statDone = document.getElementById("stat-done");

// Array per salvare le attività
let tasks = [];

// Aggiunge una nuova attività al submit del form
taskForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Impedisce il refresh della pagina

  // Crea oggetto attività
  const task = {
    title: taskTitle.value,
    status: taskStatus.value
  };

  // Aggiunge al vettore
  tasks.push(task);

  // Reset campi form
  taskTitle.value = "";
  taskStatus.value = "todo";

  // Aggiorna la vista
  updateTaskList();
  updateStats();
});

// Filtra le attività in base alla selezione
filterSelect.addEventListener("change", function() {
  updateTaskList();
});

// Mostra la lista attività in base al filtro
function updateTaskList() {
  taskList.innerHTML = ""; // Pulisce lista

  const selectedFilter = filterSelect.value;

  tasks.forEach((task, index) => {
    // Se il filtro è "all" o corrisponde allo stato della task
    if (selectedFilter === "all" || task.status === selectedFilter) {
      const li = document.createElement("li"); // Crea nuovo elemento <li>
      li.textContent = `${task.title} (${getStatusLabel(task.status)})`;

      // Aggiunge l’elemento alla lista
      taskList.appendChild(li);
    }
  });
}

// Mostra le statistiche delle attività
function updateStats() {
  const counts = {
    todo: 0,
    in_progress: 0,
    done: 0
  };

  tasks.forEach(task => {
    counts[task.status]++;
  });

  // Aggiorna valori
  statTodo.textContent = counts.todo;
  statInProgress.textContent = counts.in_progress;
  statDone.textContent = counts.done;
}

// Funzione per etichette leggibili
function getStatusLabel(status) {
  switch (status) {
    case "todo":
      return "Da fare";
    case "in_progress":
      return "In corso";
    case "done":
      return "Completata";
    default:
      return "";
  }
}

