import { Operator } from './operator.js';

class Game {
    constructor() {
        this.suma = new Operator();
        this.roberto = 0;
        this.gorila = 10;
        this.time = 5000;
        this.points = 0;
    }

    nuevaSuma() {
        this.suma = new Operator();
    }

    checkSend(answer) {
        let check = true;
        if (answer != this.suma.resultExpected) {
            check = false;
        }
        return check;
    }
}

export { Game };