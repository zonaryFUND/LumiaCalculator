import { SubjectConfig } from "app-types/subject-dynamic/config"
import { Status } from "app-types/subject-dynamic/status/type"
import { ValueRatio } from "app-types/value-ratio";
import Decimal from "decimal.js"

export type RangeDependentValueRatio = { melee: ValueRatio, range: ValueRatio }
type TooltipValueUnit = number | number[] | string | ValueRatio | RangeDependentValueRatio | { intlID: string, values?: TooltipValues };
export type TooltipValue = TooltipValueUnit | TooltipValueToString;
export type TooltipValueToString = { value: TooltipValueUnit, expression: (calculated: string) => string };

export type TooltipValues = {[key: number]: TooltipValue};

export type SkillTooltipProps = {
    skillKey: "Q" | "W" | "E" | "R" | "T" | "D" 
    consumption?: {
        type: "sp" | "hp" | "hp-ratio"
        value: number | number[]
    }
    cooldown?: number | number[] | { constant: number | number[] } | ((props: {config: SubjectConfig, status: Status}) => Decimal)
    charge?: {
        time: number | number[] | { constant: number | number[] },
        max: number | number[]
    }
    overrideIntlID?: {
        desc?: string
        coef?: string
    }
    values: (props: { showEquation: boolean, config: SubjectConfig, status: Status }) => TooltipValues
    expansion: (props: { skillLevel: number, config: SubjectConfig, status: Status }) => SkillExpansionTooltipProps
    calculatorMessage?: string
}

export type SkillExpansionTooltipProps = {
    tipValues?: TooltipValues
    enumeratedValues: {
        labelIntlID: string
        values: (number | string)[]
        percent?: boolean
    }[]
}