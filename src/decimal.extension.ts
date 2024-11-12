import Decimal from "decimal.js";

declare module 'decimal.js' {
    interface Decimal {
        cut(this: Decimal, digit: number, method: "round" | "floor"): Decimal
        floor2(this: Decimal): Decimal
        round2(this: Decimal): Decimal
        percent(this: Decimal, value: Decimal.Value): Decimal
        addPercent(this: Decimal, value: Decimal.Value): Decimal
        subPercent(this: Decimal, value: Decimal.Value): Decimal
    }
}

Object.defineProperty(Decimal.prototype, "cut", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (this: Decimal, digit: number, method: "round" | "floor") {
        const pre = this.times(10**digit);
        return (method == "round" ? pre.round() : pre.floor()).dividedBy(10**digit);
    }
})

Object.defineProperty(Decimal.prototype, "floor2", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (this: Decimal) {
        return this.times(100).floor().dividedBy(100)
    }
})
  
Object.defineProperty(Decimal.prototype, "round2", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (this: Decimal) {
        return this.times(100).round().dividedBy(100)
    }
})

Object.defineProperty(Decimal.prototype, "percent", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (this: Decimal, value: Decimal.Value) {
        return this.times(value).dividedBy(100);
    }
})

Object.defineProperty(Decimal.prototype, "addPercent", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (this: Decimal, value: Decimal.Value) {
        return this.times(new Decimal(100).add(value)).dividedBy(100);
    }
})

Object.defineProperty(Decimal.prototype, "subPercent", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (this: Decimal, value: Decimal.Value) {
        return this.times(new Decimal(100).sub(value)).dividedBy(100);
    }
})