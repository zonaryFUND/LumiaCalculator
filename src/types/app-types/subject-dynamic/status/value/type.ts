import Decimal from "decimal.js"
import { StatusValueComponent } from "./components"

export type StatusValue = {
    components: StatusValueComponent[]
    additionalValue: Decimal
    calculatedValue: Decimal
}

export const StatusValueDefault: StatusValue = {
    components: [],
    additionalValue: new Decimal(0),
    calculatedValue: new Decimal(0)
}

export function AddComponent(to: StatusValue, ...components: StatusValueComponent[]): StatusValue {
    const [sumComponents, mulComponents, fixComponents] = [...to.components, ...components].reduce(([sum, mul], component) => {
        if (component.calculationType == "sum")   
    }, [[], []])
    const [additionalValue, calculatedValue] = concatComponents.reduce((prev, component) => {

    }, [new Decimal(0), new Decimal(0)]);
    return {
        components: concatComponents,
        additionalValue: concatComponents.reduce((prev, component) => {
            
        }, new Decimal(0))
    }
}

