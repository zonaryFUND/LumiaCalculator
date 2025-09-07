import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { ValueRatio } from "app-types/value-ratio";
import Decimal from "decimal.js";

type EquationExpressionUnit = string | { intlID: string } | { ratioKey: keyof ValueRatio }

export type EquationExpression = {labelIntlID?: string, expression: EquationExpressionUnit[]};

export type UniqueValueStrategy = (props: { config: SubjectConfig, status: Status, hp: number }) => {
    value: Decimal | [Decimal, Decimal | undefined, Decimal | undefined]
    equationExpression: EquationExpression[]
}
