document.addEventListener("DOMContentLoaded", function () {
  const habitForm = document.getElementById("habit-form");
  const habitList = document.getElementById("habit-list");

  habitForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const habitInput = document.getElementById("habit-input");
    const habitColor = document.getElementById("habit-color");
    const habitTime = document.getElementById("habit-time");

    const newHabit = habitInput.value.trim();
    const newColor = habitColor.value;
    const newTime = habitTime.value;

    if (newHabit !== "" && newTime !== "" && !isNaN(newTime)) {
      const newListItem = document.createElement("li");
      newListItem.innerHTML = `
              <input type="checkbox" id="habit-${
                habitList.children.length + 1
              }">
              <label for="habit-${
                habitList.children.length + 1
              }" style="color: ${newColor}">${newHabit} - ${newTime} minutos</label>
              <button class="delete-btn">Eliminar</button>
          `;
      habitList.appendChild(newListItem);
      habitInput.value = "";
      habitTime.value = "";
    }
  });
});
var modal = document.getElementById("welcomeModal");

// Obtener el botón que abre el modal
var btn = document.getElementById("openModalBtn");

// Obtener el elemento de cierre del modal
var span = document.getElementsByClassName("close")[0];

// Cuando se hace clic en el botón, se muestra el modal
btn.onclick = function () {
  modal.style.display = "block";
};

// Cuando se hace clic en el elemento de cierre, se oculta el modal
span.onclick = function () {
  modal.style.display = "none";
};

// Cuando el usuario hace clic fuera del modal, este se cierra
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
