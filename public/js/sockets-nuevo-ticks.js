// Establecer la comunicacion con el servidor
let socket = io();
let label = $("#lblNuevoTicket");

socket.on("connect", function () {
  console.log("Conectado");
});

socket.on("disconnect", function () {
  console.log("desconectado");
});

socket.on("ultimo", function (e) {
  setTimeout(() => {
    label[0].textContent = `ticket ${e.ultimo}`;
  }, 1000);
});

$("button").on("click", function () {
  socket.emit(
    "bottom",
    {
      ok: true,
      message: "he opremido el bottom",
    },
    function (e) {
      label[0].textContent = e;
    }
  );
});
socket.on("bottom", function (e) {
  label[0].textContent = e;
});
