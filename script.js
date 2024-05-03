let Button = document.getElementById("button");
var calendarEl = document.getElementById("calendar");
document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ["dayGrid", "timeGrid", "interaction"],
    defaultView: "dayGridMonth",
    header: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    selectable: true,
    selectMirror: true,
    select: function (arg) {
      // Aquí puedes manejar la selección de días o horas
      // arg.start y arg.end contienen la fecha/hora seleccionada
      console.log("Fecha/hora seleccionada:", arg.start, arg.end);
    },
    editable: true, // habilita el arrastrar y soltar de eventos
    eventDrop: function (info) {
      // Aquí puedes manejar el evento de arrastrar y soltar
      // info.event contiene información sobre el evento movido
      console.log("Evento movido:", info.event);
    },
    events: [
      // Aquí puedes agregar eventos al calendario
    ],
  });

  calendar.render();
});

Button.addEventListener("click", () => {
  let date = document.getElementById("exercise-date").value;
  let time = document.getElementById("exercise-time").value;
  let title = document.getElementById("exercise-title").value;
  let note = document.getElementById("exercise-note").value;

  let dateTime = date + "T" + time;

  let newEvent = {
    title: title,
    start: dateTime,
    description: note,
  };
  calendar.addEvent(newEvent);

  document.getElementById("exercise-date").value = "";
  document.getElementById("exercise-time").value = "";
  document.getElementById("exercise-title").value = "";
  document.getElementById("exercise-note").value = "";
});
if (Notification.permission !== "granted") {
  Notification.requestPermission().then(function (permission) {
    if (permission === "granted") {
      // El usuario ha permitido mostrar notificaciones
      console.log("El usuario ha permitido las notificaciones.");
    } else {
      // El usuario ha denegado las notificaciones o la solicitud fue ignorada
      console.log("El usuario ha denegado las notificaciones.");
    }
  });
}
