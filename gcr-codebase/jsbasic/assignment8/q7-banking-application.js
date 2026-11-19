class BankAccount {
    #balance;

    constructor(initialBalance = 0) {
        if (!Number.isFinite(initialBalance) || initialBalance < 0) {
            throw new Error("Initial balance must be a non-negative number.");
        }
        this.#balance = initialBalance;
    }

    deposit(amount) {
        if (!Number.isFinite(amount) || amount <= 0) {
            throw new Error("Deposit amount must be a positive number.");
        }
        this.#balance += amount;
        return this.#balance;
    }

    withdraw(amount) {
        if (!Number.isFinite(amount) || amount <= 0) {
            throw new Error("Withdrawal amount must be a positive number.");
        }
        if (amount > this.#balance) {
            throw new Error("Insufficient balance for this withdrawal.");
        }
        this.#balance -= amount;
        return this.#balance;
    }

    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount(100);
account.deposit(50);
console.log(`Balance after deposit: $${account.getBalance().toFixed(2)}`);

try {
    account.withdraw(200);
} catch (error) {
    console.error(`Withdrawal failed: ${error.message}`);
}

console.log(`Balance after failed withdrawal: $${account.getBalance().toFixed(2)}`);
