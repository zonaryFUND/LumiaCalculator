import { SubjectCode } from "core/subject-static";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { SelfBuffDefinition } from "@app/ingame-params/buff-debuff/type";
import { DamageTableGenerator, SkillListHook, SubjectGaugeInfo, SubjectModules, SubjectPerpetualStatus, SubjectStackInfo, SummonInfo } from "./type";

const modules = import.meta.glob<{default: SubjectModules}>("./*/index.ts", {eager: true});
export const [
    SubjectSkillListExpressionDictionary,
    SubjectTooltipDictionary,
    SubjectDamageTableDictionary,
    SubjectPerpetualStatusDictionary,
    SubjectSummonInfoDictionary,
    SubjectStackInfoDictionary,
    SubjectGaugeInfoDictionary,
    SubjectWeaponSkillOverrideDictionary,
    SubjectBuffDebuffDictionary
] = Object.entries(modules).reduce(([
        skillLists,
        tooltips,
        damageTables,
        statusOverrides,
        summons,
        stackInfo,
        gaugeInfo,
        weaponSkillOverride,
        buffDebuff
    ], [key, m]) => {
    const subjectCode = m.default.code;
    return [
        {...skillLists, [subjectCode]: m.default.skills.listExpression},
        {...tooltips, ...m.default.skills.tooltip},
        {...damageTables, [subjectCode]: m.default.damageTable},
        {...statusOverrides, ...(m.default.perpetualStatus ? { [subjectCode]: m.default.perpetualStatus } : {}) },
        {...summons, ...(m.default.summoned ? { [subjectCode]: m.default.summoned } : {})},
        {...stackInfo, ...(m.default.stackInfo ? { [subjectCode]: m.default.stackInfo } : {})},
        {...gaugeInfo, ...(m.default.gaugeInfo ? { [subjectCode]: m.default.gaugeInfo } : {})},
        {...weaponSkillOverride, ...(m.default.weaponSkillLevelOverride ? { [subjectCode]: m.default.weaponSkillLevelOverride } : {}) },
        {...buffDebuff, ...(m.default.buffDebuff ? { [subjectCode]: m.default.buffDebuff } : {})}
    ]
}, [
    {} as Record<SubjectCode, SkillListHook>,
    {} as Record<number, SkillTooltipProps>,
    {} as Record<SubjectCode, DamageTableGenerator>,
    {} as Record<SubjectCode, SubjectPerpetualStatus>,
    {} as Record<SubjectCode, SummonInfo[]>,
    {} as Record<SubjectCode, SubjectStackInfo>,
    {} as Record<SubjectCode, SubjectGaugeInfo>,
    {} as Record<SubjectCode, (mastery: number) => number>,
    {} as Record<SubjectCode, Record<string, SelfBuffDefinition>>,
])