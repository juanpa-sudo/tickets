const { Tickets } = require("../class/tickets-control");
const { io } = require("../server");

const tickets = new Tickets();
io.on("connection", (client) => {
  console.log("Usuario conectado");
  let ticketsUltimos = { ultimo: tickets.ultimo, ultimo4: tickets.ultimo4 };
  client.emit("ultimo", ticketsUltimos);

  client.on("disconnect", () => {
    console.log("Usuario desconectado");
  });

  client.on("newTicketAtention", (e, callback) => {
    console.log(e);
    if (!e.nameDesktop) {
      callback({ err: true, message: "el escritorio es necesario" });
    }
    let atenderTickets = tickets.atenderTickets(e.nameDesktop);
    callback({ err: false, atenderTickets });

    client.broadcast.emit("actualizarTickets", ticketsUltimos);
  });

  // new tickets
  client.on("bottom", (e, callback) => {
    let nextTicket = tickets.siguiente();
    console.log(nextTicket);
    console.log(e);
    client.broadcast.emit("bottom", nextTicket);

    callback(nextTicket);
  });
});
