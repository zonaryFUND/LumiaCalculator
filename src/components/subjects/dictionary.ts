import { SubjectConfig } from "app-types/subject-dynamic/config";
import { DamageTableGenerator } from "./damage-table"
import { StatusOverrideFunc } from "./status-override";
import { SubjectCode } from "app-types/subject-static";
import { Status, SummonedStatus } from "app-types/subject-dynamic/status/type";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";

type SkillListHook = (config: SubjectConfig) => Record<"Q" | "W" | "E" | "R" | "T", number | number[] | {
    maxLevel?: number | "none",
    code: number | number[]
}>;

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
        tooltip: Record<number, TooltipProps>
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
    {} as Record<number, TooltipProps>,
    {} as Record<SubjectCode, DamageTableGenerator>,
    {} as Record<SubjectCode, StatusOverrideFunc>,
    {} as Record<SubjectCode, SummonInfo[]>,
    {} as Record<SubjectCode, SubjectStackInfo>
])