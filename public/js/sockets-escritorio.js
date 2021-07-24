let socket = io();
let escritorio = document.querySelector("h1");
let button = document.querySelector("button");
let small = document.querySelector("small");
socket.on("connect", () => {
  console.log("connectado");
});

socket.on("disconnect", () => {
  console.log("desconnectado");
});
let hasParams = new URLSearchParams(window.location.search);

if (!hasParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("!upss¡ nos falta parametros");
}

let nameDesktop = hasParams.get("escritorio");

escritorio.textContent = `Escritorio ${nameDesktop}`;

button.addEventListener("click", () => {
  socket.emit("newTicketAtention", { nameDesktop }, (e) => {
    console.log(e);
    if (!e.atenderTickets.numero) {
      small.textContent = `!upss ! Descansa Campeon ${e.atenderTickets}`;
      alert(e.atenderTickets);
      return;
    }
    small.textContent = e.atenderTickets.numero;
  });
});
