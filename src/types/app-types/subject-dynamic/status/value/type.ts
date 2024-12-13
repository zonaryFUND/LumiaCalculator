import Decimal from "decimal.js"
import { StatusValueComponent } from "./components"
import { FasterBaseMoveSpeed, MoveSpeedCalculationConstants } from "./move-speed"

export type StatusValue = {
    components: StatusValueComponent[]
    additionalValue: Decimal
    multiplier: Decimal
    calculatedValue: Decimal
    digit: number
    max?: number
}

export const StatusValueDefault: StatusValue = {
    components: [],
    additionalValue: new Decimal(0),
    multiplier: new Decimal(100),
    calculatedValue: new Decimal(0),
    digit: 0
}

export type MovementSpeedValue = {
    components: StatusValueComponent[]
    calculatedValue: Decimal
    rawResult: Decimal
}

export function ValueBeforeFix(components: StatusValueComponent[], digit: number): { 
    base: Decimal, 
    multiplier: Decimal, 
    calculated: Decimal, 
    components: {
        sum: StatusValueComponent[],
        mul: StatusValueComponent[],
        fix: StatusValueComponent[],
    }
} {
    const [sumComponents, mulComponents, fixComponents] = components.reduce(([sum, mul, fix], component) => {
        switch (component.calculationType) {
            case "sum": return [[...sum, component], mul, fix];
            case "mul": return [sum, [...mul, component], fix];
            case "fix": return [sum, mul, [...fix, component]];
        }
    }, [[] as StatusValueComponent[], [] as StatusValueComponent[], [] as StatusValueComponent[]])

    const [baseSum, sum] = (() => {
        const [baseSum, sum] = sumComponents.reduce(([base, sum], current) => {
            switch (current.origin) {
                case "subject-status":
                    return [base.add(current.value.value), sum.add(current.value.value)];
                case "weapon-base":
                    if (current.value.type != "weapon-base") throw new Error("weapon-base status component invalid");
                    return [base.add(current.value.subject), sum.add(current.value.value)];
                default:
                    return [base, sum.add(current.value.value)];
            }
        }, [new Decimal(0), new Decimal(0)])

        return [baseSum.cut(digit, "round"), sum.cut(digit, "round")]
    })();

    const multiplier = mulComponents.reduce((prev, current) => prev.add(current.value.value), new Decimal(100));

    return {
        base: baseSum,
        multiplier: multiplier.sub(100),
        calculated: sum.percent(multiplier).cut(digit, "round"),
        components: {
            sum: sumComponents,
            mul: mulComponents,
            fix: fixComponents
        }
    }
}

export function AddComponent(toOrDigit: StatusValue | number, ...components: (StatusValueComponent | undefined)[]): StatusValue {
    const [to, digit] = typeof toOrDigit == "number" ? [undefined, toOrDigit] : [toOrDigit, toOrDigit.digit];

    const mergedComponents = [...(to?.components ?? []), ...(components.filter((c): c is StatusValueComponent => c != undefined))];
    const beforeFix = ValueBeforeFix(mergedComponents, digit);
   
    const finalValue = beforeFix.components.fix.reduce((prev, current) => new Decimal(current.value.value), beforeFix.calculated).cut(digit, "round");

    return {
        components: [...beforeFix.components.sum, ...beforeFix.components.mul, ...beforeFix.components.fix],
        additionalValue: finalValue.sub(beforeFix.base),
        multiplier: beforeFix.multiplier,
        calculatedValue: to?.max ? finalValue.clamp(0, to.max) : finalValue,
        digit,
        max: to?.max
    }
}

export function AddComponentMovementSpeed(to: MovementSpeedValue | undefined, ...components: (StatusValueComponent | undefined)[]): MovementSpeedValue {
    const [sumComponents, plusMulComponents, minusMulComponents] = [...(to?.components ?? []), ...(components.filter((c): c is StatusValueComponent => c != undefined))].reduce(([sum, plus, minus], component) => {
        switch (component.calculationType) {
            case "sum": return [[...sum, component], plus, minus];
            case "mul": 
                if (new Decimal(component.value.value).greaterThan(0)) {
                    return [sum, [...plus, component], minus];
                } else {
                    return [sum, plus, [...minus, component]];
                }
            case "fix": throw new Error("fix component in movement speed calculation is not allowed")
        }
    }, [[] as StatusValueComponent[], [] as StatusValueComponent[], [] as StatusValueComponent[]])

    const sum = sumComponents.reduce((sum, current) => sum.add(current.value.value), new Decimal(0));
    const plusMultiplier = plusMulComponents.reduce((prev, current) => prev.add(current.value.value), new Decimal(100));
    const minusMultiplier = Decimal.min(...minusMulComponents.map(c => c.value.value), 0)

    const rawResult = sum.percent(plusMultiplier).subPercent(minusMultiplier).round2();


    const calculatedValue = (() => {
        if (rawResult.lessThan(0)) 
            return new Decimal(MoveSpeedCalculationConstants.min);
        if (rawResult.lessThanOrEqualTo(MoveSpeedCalculationConstants.heavySlowDefuse.max)) 
            return new Decimal(MoveSpeedCalculationConstants.min).add(rawResult.percent(MoveSpeedCalculationConstants.heavySlowDefuse.ratio));
        if (rawResult.lessThanOrEqualTo(MoveSpeedCalculationConstants.rawValueMax)) 
            return rawResult;
        if (rawResult.lessThanOrEqualTo(MoveSpeedCalculationConstants.lightFastDefuse.max)) {
            return new Decimal(MoveSpeedCalculationConstants.rawValueMax).add(rawResult.sub(MoveSpeedCalculationConstants.rawValueMax).percent(MoveSpeedCalculationConstants.lightFastDefuse.ratio));
        }

        return new Decimal(FasterBaseMoveSpeed).add(rawResult.sub(MoveSpeedCalculationConstants.lightFastDefuse.max).percent(MoveSpeedCalculationConstants.fasterDefuseRatio));
    })().round2();

    return {
        components: [...sumComponents, ...plusMulComponents, ...minusMulComponents],
        rawResult,
        calculatedValue
    }
}