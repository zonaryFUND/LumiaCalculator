import Decimal from "decimal.js";

declare module 'decimal.js' {
    interface Decimal {
        round2(this: Decimal): Decimal
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