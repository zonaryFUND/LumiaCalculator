import Decimal from "decimal.js"

export type TemporaryStatusEffect = {
    incomingDamage?: {
        increase?: Decimal
        decrease?: Decimal
    }
    outgoingDamage?: {
        increase?: Decimal
        decrease?: Decimal
    }
}

export type TemporaryStatuts = {
    duration: number
    effect: TemporaryStatusEffect
}
