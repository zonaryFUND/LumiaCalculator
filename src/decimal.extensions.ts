import Decimal from "decimal.js";

declare module 'decimal.js' {
    interface Decimal {
        round2(this: Decimal): Decimal
        percent(this: Decimal, value: Decimal.Value): Decimal
        addPercent(this: Decimal, value: Decimal.Value): Decimal
    }
}
  
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