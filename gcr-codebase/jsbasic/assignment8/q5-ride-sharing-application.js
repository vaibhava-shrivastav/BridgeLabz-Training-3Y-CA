class User {
    constructor(name, rating) {
        this.name = name;
        this.rating = rating;
    }
}

class Driver extends User {
    constructor(name, rating, vehicle, vehicleNumber) {
        super(name, rating);
        this.vehicle = vehicle;
        this.vehicleNumber = vehicleNumber;
    }
}

class Trip {
    constructor(fromLocation, toLocation, distance) {
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.distance = distance;
    }

    calculateFare() {
        if (this.distance === undefined || this.distance === null || this.distance === "") {
            throw new Error("Trip distance is required to calculate the fare.");
        }
        if (!Number.isFinite(this.distance) || this.distance < 0) {
            throw new Error("Trip distance must be a non-negative number.");
        }
        return this.distance * 2.5;
    }
}

const driver = new Driver("Sam", 4.9, "Sedan", "ABC-123");
const trip = new Trip("Downtown", "Airport", 18);
console.log(
    `${driver.name} (${driver.vehicle}, ${driver.vehicleNumber}) fare: $${trip.calculateFare().toFixed(2)}`
);

try {
    new Trip("Downtown", "Airport", -3).calculateFare();
} catch (error) {
    console.error(`Unable to calculate trip fare: ${error.message}`);
}

try {
    new Trip("Downtown", "Airport").calculateFare();
} catch (error) {
    console.error(`Unable to calculate trip fare: ${error.message}`);
}
