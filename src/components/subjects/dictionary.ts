import { SubjectConfig } from "app-types/subject-dynamic/config";
import { DamageTableGenerator } from "./damage-table"
import { StatusOverrideFunc } from "./status-override";
import { SummonedStatusFunc } from "./summoned-status";
import { SubjectCode } from "app-types/subject-static";
import { ValueRatio } from "app-types/value-ratio";
import Decimal from "decimal.js";
import { Status } from "app-types/subject-dynamic/status/type";

export type SkillCode = number
export type SkillKey = "Q" | "W" | "E" | "R" | "T";
export type SkillListHook = () => Record<SkillKey, SkillCode | SkillCode[]>;
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
    cooldown?: number | number[] | { constant: number | number[] } | (() => Decimal)
    charge?: {
        time: number | number[] | { constant: number | number[] },
        max: number
    }
    values: (props: { skillLevel: number, showEquation: boolean, config: SubjectConfig, status: Status }) => TooltipValues
    expansion: () => ExpansionTooltipProps
}

export type SubjectModules = {
    code: number
    damageTable: DamageTableGenerator

    skills: {
        listExpression: SkillListHook // | React.FC<SkillsStandardProps>
        tooltip: Record<SkillCode, TooltipInfo>
    }

    statusOverride?: StatusOverrideFunc
    summonedStatus?: SummonedStatusFunc
    stackInfo?: {
        nameIntlID: string
        max: number
    }
}

export function defineSubject(module: SubjectModules): SubjectModules { return module };

const modules = import.meta.glob<{default: SubjectModules}>("./*/index.ts", {eager: true});
export const [
    SubjectSkillListExpressionDictionary,
    SubjectTooltipDictionary,
    SubjectDamageTableDictionary,
    SubjectStatusOverrideDictionary
] = Object.entries(modules).reduce(([lists, tooltips, damageTables, statusOverrides], [key, m]) => {
    const subjectCode = m.default.code;
    return [
        {...lists, [subjectCode]: m.default.skills.listExpression},
        {...tooltips, ...m.default.skills.tooltip},
        {...damageTables, [subjectCode]: m.default.damageTable},
        {...statusOverrides, ...(m.default.statusOverride ? { [subjectCode]: m.default.statusOverride} : {}) }
    ]
}, [
    {} as Record<SubjectCode, SkillListHook>,
    {} as Record<SkillCode, TooltipInfo>,
    {} as Record<SubjectCode, DamageTableGenerator>,
    {} as Record<SubjectCode, StatusOverrideFunc>
])