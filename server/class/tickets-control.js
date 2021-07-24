const fs = require("fs");
const path = require("path");

class TicketsControl {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class Tickets {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.ticket = [];
    this.ultimo4 = [];
    let data = require("../data/data.json");

    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo;
      this.ticket = data.ticket;
      this.ultimo4 = data.ultimo4;
    } else {
      this.ultimo4 = [];
      this.reniciarConteo();
    }
  }

  siguiente() {
    this.ultimo += 1;
    let ticketsControl = new TicketsControl(this.ultimo, null);
    this.ticket.push(ticketsControl);
    this.grabrArchivo();

    return `ticket ${this.ultimo}`;
  }

  reniciarConteo() {
    this.ultimo = 0;
    this.ticket = [];
    this.grabrArchivo();
  }

  grabrArchivo() {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      ticket: this.ticket,
      ultimo4: this.ultimo4,
    };
    let jsonStrin = JSON.stringify(jsonData);
    fs.writeFileSync(path.resolve(__dirname, "../data/data.json"), jsonStrin);

    console.log("Se ha inicializado el sistema");
  }

  atenderTickets(escritorio) {
    if (this.ticket.length === 0) return "No hay tickets para atender";

    let numeroTickets = this.ticket[0].numero;
    this.ticket.shift();

    let atenTickets = new TicketsControl(numeroTickets, escritorio);

    this.ultimo4.unshift(atenTickets);

    console.log(this.ultimo4.length > 4);

    if (this.ultimo4.length > 4) {
      this.ultimo4.splice(-1, 1);
      console.log("eliminar");
    }

    console.log("ultimoas cuatros 74", this.ultimo4);
    this.grabrArchivo();
    return atenTickets;
  }
}

module.exports = {
  Tickets,
};
