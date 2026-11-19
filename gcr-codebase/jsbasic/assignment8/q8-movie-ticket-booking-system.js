class MovieTicket {
    constructor(movieName, seatNo, price) {
        this.movieName = movieName;
        this.seatNo = seatNo;
        this.price = price;
    }
}

MovieTicket.prototype.printTicket = function () {
    return `Movie: ${this.movieName}, Seat: ${this.seatNo}, Ticket price: $${this.price.toFixed(2)}`;
};

class OnlineTicket extends MovieTicket {
    constructor(movieName, seatNo, price, convenienceFee) {
        super(movieName, seatNo, price);
        this.convenienceFee = convenienceFee;
    }

    getTotalAmount() {
        return this.price + this.convenienceFee;
    }
}

const onlineTicket = new OnlineTicket("The Great Adventure", "B12", 14, 2.5);
console.log(onlineTicket.printTicket());
console.log(`Total including convenience fee: $${onlineTicket.getTotalAmount().toFixed(2)}`);
