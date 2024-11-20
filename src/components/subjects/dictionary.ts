import { SubjectConfig } from "app-types/subject-dynamic/config";
import { DamageTableGenerator } from "./damage-table"
import { StatusOverrideFunc } from "./status-override";
import { SubjectCode } from "app-types/subject-static";
import { ValueRatio } from "app-types/value-ratio";
import Decimal from "decimal.js";
import { Status, SummonedStatus } from "app-types/subject-dynamic/status/type";

export type SkillCode = number
export type SkillKey = "Q" | "W" | "E" | "R" | "T";
export type SkillListHook = (config: SubjectConfig) => Record<SkillKey, SkillCode | SkillCode[] | {
    maxLevel?: number | "none",
    code: SkillCode | SkillCode[]
}>;
type TooltipValues = Record<number, number | string | ValueRatio>;

export type ExpansionTooltipProps = {
    tipValues?: TooltipValues
    enumeratedValues: {
        labelIntlID: string
        values: (number | string)[]
        percent?: boolean
    }[]
}

export type TooltipInfo = {
    skill: SkillKey
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
    expansion: (props: { skillLevel: number, config: SubjectConfig }) => ExpansionTooltipProps
}

export type SummonedStatusFunc = (masterStatus: Status, config: SubjectConfig) => SummonedStatus;
type SummonInfo = {
    status: SummonedStatusFunc,
    nameIntlID: string
}

type SubjectStackInfo = {
    nameIntlID: string
    max: number
}

export type SubjectModules = {
    code: number
    damageTable: DamageTableGenerator

    skills: {
        listExpression: SkillListHook // | React.FC<SkillsStandardProps>
        tooltip: Record<SkillCode, TooltipInfo>
    }

    statusOverride?: StatusOverrideFunc
    summoned?: SummonInfo[]
    stackInfo?: SubjectStackInfo
}

export function defineSubject(module: SubjectModules): SubjectModules { return module };

const modules = import.meta.glob<{default: SubjectModules}>("./*/index.ts", {eager: true});
export const [
    SubjectSkillListExpressionDictionary,
    SubjectTooltipDictionary,
    SubjectDamageTableDictionary,
    SubjectStatusOverrideDictionary,
    SubjectSummonInfoDictionary,
    SubjectStackInfoDictionary
] = Object.entries(modules).reduce(([
        skillLists, 
        tooltips, 
        damageTables, 
        statusOverrides, 
        summons,
        stackInfo
    ], [key, m]) => {
    const subjectCode = m.default.code;
    return [
        {...skillLists, [subjectCode]: m.default.skills.listExpression},
        {...tooltips, ...m.default.skills.tooltip},
        {...damageTables, [subjectCode]: m.default.damageTable},
        {...statusOverrides, ...(m.default.statusOverride ? { [subjectCode]: m.default.statusOverride } : {}) },
        {...summons, ...(m.default.summoned ? { [subjectCode]: m.default.summoned } : {})},
        {...stackInfo, ...(m.default.stackInfo ? { [subjectCode]: m.default.stackInfo } : {})}
    ]
}, [
    {} as Record<SubjectCode, SkillListHook>,
    {} as Record<SkillCode, TooltipInfo>,
    {} as Record<SubjectCode, DamageTableGenerator>,
    {} as Record<SubjectCode, StatusOverrideFunc>,
    {} as Record<SubjectCode, SummonInfo[]>,
    {} as Record<SubjectCode, SubjectStackInfo>
])