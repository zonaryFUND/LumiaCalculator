import { DamageTableUnit } from "app-types/damage-table/unit";
import { ValueRatio } from "app-types/value-ratio";

export type ItemSkillTooltipValues = {[key: number]: string | number | ValueRatio}
export type ItemSkillTooltipValuesHook = (damage?: ValueRatio | {melee: ValueRatio, range: ValueRatio}, values?: Record<string, unknown>) => ItemSkillTooltipValues;

export type ItemSkillDamageTableUnit = Omit<DamageTableUnit, "label" | "value"> & { labelIntlID?: string, intlValue?: string, value: ValueRatio | {melee: ValueRatio, range: ValueRatio} };
export type ItemSkillDamageTableGenerator = (damage?: ValueRatio | {melee: ValueRatio, range: ValueRatio}, values?: Record<string, any>) => ItemSkillDamageTableUnit[];

export const modules = import.meta.glob<{
    SkillCode: number | number[]
    tooltip: ItemSkillTooltipValues | ItemSkillTooltipValuesHook,
    damageTable?: ItemSkillDamageTableUnit[] | ItemSkillDamageTableGenerator
}>("./**/index.ts", {eager: true})

export const [ItemSkillTooltipDictionary, ItemSkillDamageTable] = Object.entries(modules).reduce((prev, [path, m]) => {
    const tooltip: ItemSkillTooltipValuesHook = typeof m.tooltip == "function" ? m.tooltip : () => m.tooltip as ItemSkillTooltipValues;
    const damageTable: ItemSkillDamageTableGenerator | undefined = m.damageTable == undefined ? undefined :
        typeof m.damageTable == "function" ? m.damageTable : () => m.damageTable as ItemSkillDamageTableUnit[];

    const codes = Array.isArray(m.SkillCode) ? m.SkillCode : [m.SkillCode];
    return codes.reduce(([tooltips, damageTables], code) => {
        return [
            {...tooltips, [code]: tooltip},
            damageTable ? {...damageTables, [code]: damageTable} : damageTables
        ]
    }, prev);
}, [
    {} as Record<number, ItemSkillTooltipValuesHook>,
    {} as Record<number, ItemSkillDamageTableGenerator>
]) 
