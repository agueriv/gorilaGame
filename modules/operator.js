class Operator {
    constructor() {
        this.sum1 = Math.floor(Math.random() * 20);
        this.sum2 = Math.floor(Math.random() * 20);
        this.resultExpected = this.sum1 + this.sum2;
    }
}

export { Operator };