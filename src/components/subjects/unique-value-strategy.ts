import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { RatioKeys, ValueRatio } from "app-types/value-ratio";
import Decimal from "decimal.js";

type EquationExpressionUnit = string | { intlID: string } | { ratioKey: RatioKeys }

export type EquationExpression = {labelIntlID?: string, expression: EquationExpressionUnit[]};

export type UniqueValueStrategy = (config: SubjectConfig, status: Status) => {
    value: Decimal | [Decimal, Decimal | undefined, Decimal]
    equationExpression: EquationExpression[]
}
