import { SubjectConfig } from "core/subject-dynamic/config";
import { Status } from "core/subject-dynamic/status/type";
import { ValueRatio } from "core/value-ratio";
import Decimal from "decimal.js";

type EquationExpressionUnit = string | { intlID: string } | { ratioKey: keyof ValueRatio }

export type EquationExpression = {labelIntlID?: string, expression: EquationExpressionUnit[]};

export type UniqueValueStrategy = (props: { config: SubjectConfig, status: Status, hp: number }) => {
    value: {
        type: "standard",
        value: Decimal
    } | {
        type: "critical",
        values: [Decimal, Decimal | undefined, Decimal | undefined]
    }
    equationExpression: EquationExpression[]
}
