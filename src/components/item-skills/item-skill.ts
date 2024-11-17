import * as React from "react";
import { DamageTableUnit } from "app-types/damage-table/unit";
import { ValueRatio } from "app-types/value-ratio";
import { EquipmentSkill } from "app-types/equipment";

const tooltipModules = import.meta.glob<{
    default: React.FC<EquipmentSkill>
}>("./**/tooltip.tsx", {eager: true});

export const ItemSkillTooltipDefinitions = Object.entries(tooltipModules).reduce((skills, [path, m]) => {
    const pathComponents = path.split("/");
    const key = pathComponents[1];
    return {
        ...skills,
        [key]: m.default
    }
}, {} as {[key: string]: React.FC<EquipmentSkill>})

export type ItemSkillTooltipValues = {[key: number]: string | number | ValueRatio}
export type ItemSkillTooltipValuesHook = (damage?: ValueRatio | {melee: ValueRatio, range: ValueRatio}, values?: Record<string, unknown>) => ItemSkillTooltipValues;

export const modules = import.meta.glob<{
    SkillCode: number | number[]
    tooltip: ItemSkillTooltipValues | ItemSkillTooltipValuesHook
}>("./**/index.ts", {eager: true})

export const ItemSkillDictionary = Object.entries(modules).reduce((dictionary, [path, m]) => {
    console.log({path, m})
    const tooltip = m.tooltip;
    const entry = {
        tooltip: typeof tooltip == "function" ? tooltip : () => tooltip
    }

    const codes = Array.isArray(m.SkillCode) ? m.SkillCode : [m.SkillCode];
    return codes.reduce((prev, code) => {
        return {...prev, [code]: entry}
    }, dictionary);
}, {} as Record<number, {
    tooltip: ItemSkillTooltipValuesHook
}>) 


export type ItemSkillDamageTableUnit = Omit<DamageTableUnit, "label" | "value"> & { labelIntlID?: string, intlValue?: string, value: ValueRatio | {melee: ValueRatio, range: ValueRatio} };
export type ItemSkillDamageTableGenerator = (damage?: ValueRatio | {melee: ValueRatio, range: ValueRatio}, values?: Record<string, any>) => ItemSkillDamageTableUnit[];

const damageTableModules = import.meta.glob<{
    default: ItemSkillDamageTableUnit[] | ItemSkillDamageTableGenerator
}>("./**/table-values.ts", {eager: true});

export const ItemSkillDamageTable = Object.entries(damageTableModules).reduce((skills, [path, m]) => {
    const pathComponents = path.split("/");
    const key = pathComponents[1];
    const tableOrGenerator = m.default
    return {
        ...skills,
        [key]: typeof tableOrGenerator == "function" ? tableOrGenerator : () => tableOrGenerator
    };
}, {} as {[key: string]: ItemSkillDamageTableGenerator})