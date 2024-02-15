// app.js

// Inicio de sesión con Google
function signInWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    console.log("Usuario registrado con Google:", user);
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error("Error en autenticación con Google:", errorCode, errorMessage);
  });
}

// Función para añadir una tarea
function addTask() {
  var taskInput = document.getElementById("newTask");
  var newTask = taskInput.value.trim();
  if (newTask) {
    var li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    li.textContent = newTask;

    // Crear botón de borrar para cada tarea
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Borrar";
    deleteBtn.classList.add("btn", "btn-danger", "btn-sm");
    deleteBtn.onclick = function() {
      li.remove();
    };

    li.appendChild(deleteBtn);
    document.getElementById("taskList").appendChild(li);
    taskInput.value = '';
  } else {
    alert("Por favor, escribe el nombre de la tarea.");
  }
}

// Mostrar u ocultar la aplicación de tareas basado en el estado de autenticación y mostrar el icono de la cuenta de Google
firebase.auth().onAuthStateChanged((user) => {
  const userImage = document.getElementById("userImage");
  if (user) {
    document.getElementById("todoApp").style.display = "block";
    if (user.photoURL) {
      userImage.src = user.photoURL;
      userImage.style.display = "inline-block";
    } else {
      userImage.style.display = "none";
    }
  } else {
    document.getElementById("todoApp").style.display = "none";
    userImage.style.display = "none";
  }
});
