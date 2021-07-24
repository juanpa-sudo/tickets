let socket = io();

let lblTicket1 = document.querySelector("#lblTicket1");
let lblTicket2 = document.querySelector("#lblTicket2");
let lblTicket3 = document.querySelector("#lblTicket3");
let lblTicket4 = document.querySelector("#lblTicket4");

let lblEscritorio1 = document.querySelector("#lblEscritorio1");
let lblEscritorio2 = document.querySelector("#lblEscritorio2");
let lblEscritorio3 = document.querySelector("#lblEscritorio3");
let lblEscritorio4 = document.querySelector("#lblEscritorio4");

let lblTicket = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];

let lblEscritorio = [
  lblEscritorio1,
  lblEscritorio2,
  lblEscritorio3,
  lblEscritorio4,
];

socket.on("connect", () => {
  console.log("conectado");
});
socket.on("disconnect", () => {
  console.log("Desconectado");
});
socket.on("ultimo", (data) => {
  actualizarHtml(data);
});

socket.on("actualizarTickets", (data) => {
  let audio = new Audio("../audio/new-ticket.mp3");
  audio.play();
  actualizarHtml(data);
});

function actualizarHtml(data) {
  for (let i = 0; i < data.ultimo4.length; i++) {
    lblTicket[i].textContent = `Ticket ${data.ultimo4[i].numero}`;
    lblEscritorio[i].textContent = `Escritorio ${data.ultimo4[i].escritorio}`;
  }
}
