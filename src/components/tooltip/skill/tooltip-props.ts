import { SubjectConfig } from "app-types/subject-dynamic/config"
import { Status } from "app-types/subject-dynamic/status/type"
import { ValueRatio } from "app-types/value-ratio";
import Decimal from "decimal.js"

type TooltipValueUnit = number | number[] | string | ValueRatio;
export type TooltipValue = TooltipValueUnit | TooltipValueToString;
export type TooltipValueToString = { value: TooltipValueUnit, expression: (calculated: string) => string };

export type TooltipValues = {[key: number]: TooltipValue};

export type TooltipProps = {
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
    values: (props: { skillLevel: number, showEquation: boolean, config: SubjectConfig, status: Status }) => TooltipValues
    expansion: (props: { skillLevel: number, config: SubjectConfig, status: Status }) => ExpansionTooltipProps
    calculatorMessage?: string
}

export type ExpansionTooltipProps = {
    tipValues?: TooltipValues
    enumeratedValues: {
        labelIntlID: string
        values: (number | string)[]
        percent?: boolean
    }[]
}