import Decimal from "decimal.js";
import { StatusValueComponent } from "./component";

/*
declare global {
    interface Array<T> {
        calculatedValue(digit?: number): Decimal
        additionalValue(digit?: number): Decimal
    }
}

type Component = StatusValueComponent;

function filterArrayType<T extends Component>(array: Array<T>) {
    if (typeof array[0] !== "object" || !("value" in array[0])) {
        throw new Error("invalid array type for calculatedValue");
    }
}

function groupComponents(components: Component[]): {sum: Component[], mul: Component[],fix: Component[]} {
    return components.reduce((prev, component) => {
        return {
            ...prev, 
            [component.calculationType]: [...prev[component.calculationType], component]
        };
    }, {sum: [], mul: [], fix: []});
}

if (!Array.prototype.calculatedValue) {
    Array.prototype.calculatedValue = function <T extends Component> (digit?: number): Decimal {
        filterArrayType(this);

        const array = this as StatusValueComponent[];
        const {sum, mul, fix} = groupComponents(array);

        const sumResult = Decimal.sum(...sum.map(c => c.value.value));
        const mulResult = sumResult.addPercent(Decimal.sum(...mul.map(c => c.value.value)));

        return fix
            .reduce((prev, current) => new Decimal(current.value.value), mulResult)
            .cut(digit ?? 0, "floor");
    }
}

if (!Array.prototype.additionalValue) {
    Array.prototype.additionalValue = function <T extends Component> (digit?: number): Decimal {
        filterArrayType(this);

        const array = this as StatusValueComponent[];
        const {sum, mul, fix} = groupComponents(array);

        const sumResult = Decimal.sum(...sum.map(c => c.value.value));
        const mulResult = sumResult.addPercent(Decimal.sum(...mul.map(c => c.value.value)));

        return fix
            .reduce((prev, current) => new Decimal(current.value.value), mulResult)
            .cut(digit ?? 0, "floor");
    }
}
*/