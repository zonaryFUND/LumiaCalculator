import { SubjectCode } from "app-types/subject-static";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { DamageTableGenerator, SkillListHook, StatusOverrideFunc, SubjectGaugeInfo, SubjectModules, SubjectStackInfo, SummonInfo } from "./type";

const modules = import.meta.glob<{default: SubjectModules}>("./*/index.ts", {eager: true});
export const [
    SubjectSkillListExpressionDictionary,
    SubjectTooltipDictionary,
    SubjectDamageTableDictionary,
    SubjectStatusOverrideDictionary,
    SubjectSummonInfoDictionary,
    SubjectStackInfoDictionary,
    SubjectGaugeInfoDictionary
] = Object.entries(modules).reduce(([
        skillLists, 
        tooltips, 
        damageTables, 
        statusOverrides, 
        summons,
        stackInfo,
        gaugeInfo
    ], [key, m]) => {
    const subjectCode = m.default.code;
    return [
        {...skillLists, [subjectCode]: m.default.skills.listExpression},
        {...tooltips, ...m.default.skills.tooltip},
        {...damageTables, [subjectCode]: m.default.damageTable},
        {...statusOverrides, ...(m.default.statusOverride ? { [subjectCode]: m.default.statusOverride } : {}) },
        {...summons, ...(m.default.summoned ? { [subjectCode]: m.default.summoned } : {})},
        {...stackInfo, ...(m.default.stackInfo ? { [subjectCode]: m.default.stackInfo } : {})},
        {...gaugeInfo, ...(m.default.gaugeInfo ? { [subjectCode]: m.default.gaugeInfo } : {})}
    ]
}, [
    {} as Record<SubjectCode, SkillListHook>,
    {} as Record<number, SkillTooltipProps>,
    {} as Record<SubjectCode, DamageTableGenerator>,
    {} as Record<SubjectCode, StatusOverrideFunc>,
    {} as Record<SubjectCode, SummonInfo[]>,
    {} as Record<SubjectCode, SubjectStackInfo>,
    {} as Record<SubjectCode, SubjectGaugeInfo>
])