document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var currentDate = new Date();
  var selectedCell = null; // Variable para almacenar la celda seleccionada

  // Objeto para almacenar los eventos
  var eventos = {};

  // Obtener los modales
  var addEventModal = document.getElementById("add-event-modal");
  var editEventModal = document.getElementById("edit-event-modal");
  var deleteEventModal = document.getElementById("delete-event-modal");

  // Obtener los botones que abren los modales
  var addEventBtn = document.getElementById("add-event-btn");
  var editEventBtn = document.getElementById("edit-event-btn");
  var deleteEventBtn = document.getElementById("delete-event-btn");

  // Obtener el botón para cerrar el modal
  var closeBtns = document.querySelectorAll(".close");

  // Función para mostrar el modal
  function showModal(modal) {
    modal.style.display = "block";
  }

  // Función para cerrar el modal
  function closeModal(modal) {
    modal.style.display = "none";
  }

  // Event listeners para abrir modales
  if (addEventBtn) {
    addEventBtn.onclick = function () {
      showModal(addEventModal);
    };
  }
  if (editEventBtn) {
    editEventBtn.onclick = function () {
      showModal(editEventModal);
    };
  }
  if (deleteEventBtn) {
    deleteEventBtn.onclick = function () {
      showModal(deleteEventModal);
    };
  }

  // Event listener para cerrar modals
  if (closeBtns) {
    closeBtns.forEach(function (closeBtn) {
      closeBtn.onclick = function () {
        var modal = this.parentElement.parentElement;
        closeModal(modal);
      };
    });
  }

  function renderCalendar(year, month) {
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var firstDayOfMonth = new Date(year, month, 1).getDay();
    var calendarHTML =
      "<table><thead><tr><th>D</th><th>L</th><th>M</th><th>X</th><th>J</th><th>V</th><th>S</th></tr></thead><tbody>";

    var currentDate = 1 - firstDayOfMonth;
    for (var i = 0; i < 6; i++) {
      calendarHTML += "<tr>";
      for (var j = 0; j < 7; j++) {
        if (currentDate > 0 && currentDate <= daysInMonth) {
          var cellClass = "";
          var eventDay = year + "-" + (month + 1) + "-" + currentDate;
          if (eventos[eventDay]) {
            cellClass = "has-event"; // Marcar días con eventos
          }
          calendarHTML +=
            '<td class="' +
            cellClass +
            '" data-day="' +
            currentDate +
            '">' +
            currentDate +
            "</td>";
        } else {
          calendarHTML += "<td></td>";
        }
        currentDate++;
      }
      calendarHTML += "</tr>";
    }

    calendarHTML += "</tbody></table>";
    calendarEl.innerHTML = calendarHTML;

    // Actualizar indicación del mes y año
    document.getElementById("current-month-year").textContent =
      obtenerNombreMes(month) + " " + year;

    // Añadir evento de clic a las celdas de las fechas
    var cells = document.querySelectorAll("#calendar td[data-day]");
    cells.forEach(function (cell) {
      cell.addEventListener("click", function () {
        // Remover la clase de la celda previamente seleccionada
        if (selectedCell) {
          selectedCell.classList.remove("selected-day");
        }
        // Asignar la celda actual como la celda seleccionada
        selectedCell = this;
        // Agregar la clase a la celda seleccionada
        selectedCell.classList.add("selected-day");
        var selectedDay = parseInt(this.getAttribute("data-day")); // Convertir a número
        mostrarEventos(selectedDay);
      });
    });
  }

  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());

  // Botón para ir al día de hoy
  document.getElementById("today-btn").addEventListener("click", function () {
    currentDate = new Date(); // Obtener fecha actual
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
    mostrarEventos(currentDate.getDate()); // Mostrar eventos del día actual
  });

  // Función para mostrar los eventos del día seleccionado
  function mostrarEventos(selectedDay) {
    // Obtener fecha actual
    var today = new Date();
    var currentDay = today.getDate();
    var currentMonth = today.getMonth();
    var currentYear = today.getFullYear();

    var dayEventsEl = document.getElementById("day-events");
    dayEventsEl.innerHTML = ""; // Limpiar eventos anteriores

    if (selectedDay === currentDay) {
      // Si el día seleccionado es el día actual
      // Aquí puedes implementar la lógica para mostrar los eventos del día actual
      // Por ahora, simplemente mostraremos un mensaje
      var message = "Eventos de hoy:";
      var listItem = document.createElement("li");
      listItem.textContent = message;
      dayEventsEl.appendChild(listItem);
    } else {
      // Si el día seleccionado no es el día actual, mostrar un mensaje indicando que no hay eventos
      var message = "No hay eventos para el día " + selectedDay + ".";
      var listItem = document.createElement("li");
      listItem.textContent = message;
      dayEventsEl.appendChild(listItem);
    }
  }

  // Botones de navegación
  document.getElementById("prev-month").addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
  });

  document.getElementById("next-month").addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
  });

  // Función para obtener el nombre del mes
  function obtenerNombreMes(month) {
    var meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return meses[month];
  }
});
