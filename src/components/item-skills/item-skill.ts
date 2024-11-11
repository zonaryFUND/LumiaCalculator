import * as React from "react";
import { DamageTableUnit } from "app-types/damage-table/unit";
import { ValueRatio } from "app-types/value-ratio";

export type ItemSkillProps = {
    values: any
}

const tooltipModules = import.meta.glob<{
    default: React.FC<ItemSkillProps>
}>("./**/tooltip.tsx", {eager: true});

export const ItemSkillTooltipDefinitions = Object.entries(tooltipModules).reduce((skills, [path, m]) => {
    const pathComponents = path.split("/");
    const key = pathComponents[1];
    return {
        ...skills,
        [key]: m.default
    }
}, {} as {[key: string]: React.FC<ItemSkillProps>})

export type ItemSkillDamageTableUnit = Omit<DamageTableUnit, "label" | "value"> & { labelIntlID?: string, intlValue?: string, value: ValueRatio | {melee: ValueRatio, range: ValueRatio} };
export type ItemSkillDamageTableGenerator = (importedValues: any | {melee: any, range: any}) => ItemSkillDamageTableUnit[];

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