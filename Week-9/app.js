
'use strict';

class TicketItem {
    constructor(quantity, ticketType, movieTitle) {
        this.quantity = parseInt(quantity);
        this.ticketType = ticketType;
        this.movieTitle = movieTitle;
    }

    cost() {
        let price = 0;

        if (this.ticketType === "Regular") price = 10;
        if (this.ticketType === "Student") price = 8;
        if (this.ticketType === "VIP") price = 15;

        return this.quantity * price;
    }

    row(doc, index, booking) {

        const tr = doc.createElement("tr");

        const qty = doc.createElement("td");
        qty.textContent = this.quantity;

        const type = doc.createElement("td");
        type.textContent = this.ticketType;

        const movie = doc.createElement("td");
        movie.textContent = this.movieTitle;

        const action = doc.createElement("td");
        const btn = doc.createElement("button");
        btn.textContent = "Delete";

        btn.addEventListener("click", () => {
            booking.delete(index);
        });

        action.appendChild(btn);

        tr.appendChild(qty);
        tr.appendChild(type);
        tr.appendChild(movie);
        tr.appendChild(action);

        return tr;
    }
}

class Booking {

    constructor() {
        this.orderedItems = [];
    }

    add(item) {
        this.orderedItems.push(item);
    }

    delete(index) {
        this.orderedItems.splice(index, 1);
        updateUI();
    }

    cost() {
        return this.orderedItems.reduce((total, item) => total + item.cost(), 0);
    }

    tbody(doc) {

        const tbody = doc.createElement("tbody");

        this.orderedItems.forEach((item, index) => {
            tbody.appendChild(item.row(doc, index, this));
        });

        return tbody;
    }
}

let booking;
let updateUI;

window.addEventListener("load", () => {

    booking = new Booking();

    updateUI = () => {

        const table = document.getElementById("ticketTable");

        const oldBody = table.querySelector("tbody");
        if (oldBody) oldBody.remove();

        table.appendChild(booking.tbody(document));

        document.getElementById("totalCost").textContent =
            "Total: $" + booking.cost().toFixed(2);
    };

    document.getElementById("ticketForm").addEventListener("submit", (event) => {

        event.preventDefault();

        const quantity = document.getElementById("quantity").value;
        const ticketType = document.getElementById("ticketType").value;
        const movieTitle = document.getElementById("movieTitle").value;

        const item = new TicketItem(quantity, ticketType, movieTitle);

        booking.add(item);

        updateUI();

        document.getElementById("ticketForm").reset();
    });

});











