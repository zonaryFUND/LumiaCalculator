import Decimal from "decimal.js";
import { UniqueValueStrategy } from "../unique-value-strategy";

type Ratio = {
    base: number | number[]
    ninaAttack: number | number[]
}

export function NinaRatioStrategy(skill: "Q" | "W" | "E" | "R" | "T", ratio: Ratio): UniqueValueStrategy {
    return  ({ config, status }) => {
        const level = config.skillLevels[skill];
        const base = Array.isArray(ratio.base) ? ratio.base[level] : ratio.base;
        const ninaAttack = Array.isArray(ratio.ninaAttack) ? ratio.ninaAttack[level] : ratio.ninaAttack;
        const value = new Decimal(base).add(status.summoned![0].status.attackPower.percent(ninaAttack)).floor();

        return {
            value,
            equationExpression: [
                {
                    expression: [
                        `${base} + `,
                        { intlID: "subject.chloe.nina-attack" },
                        `${status.summoned![0].status.attackPower.toString()} x ${ninaAttack}% = ${value}`
                    ]
                }
            ]
        }
    }
}
