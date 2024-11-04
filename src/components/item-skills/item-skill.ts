import { DamageTableUnit } from "app-types/damage-table/unit";
import { ValueRatio } from "app-types/value-ratio";

export type ItemSkillProps = {
    values: any
}

const tooltipContext = require.context("./", true, /\.\/.*\/tooltip\.tsx/);
export const ItemSkillTooltipDefinitions = tooltipContext.keys().reduce((skills: any, path) => {
    const pathComponents = path.split("/");
    const key = pathComponents[1];
    return {
        ...skills,
        [key]: tooltipContext(path).default
    }
}, {})

export type ItemSkillDamageTableUnit = Omit<DamageTableUnit, "label" | "value"> & { labelIntlID?: string, intlValue?: string, value: ValueRatio | {melee: ValueRatio, range: ValueRatio} };
export type ItemSkillDamageTableGenerator = (importedValues: any | {melee: any, range: any}) => ItemSkillDamageTableUnit[];

const damageTableContext = require.context("./", true, /\.\/.*\/table-values\.ts/);
/*
export const ItemSkillDefinition = context.keys().reduce((skills: any, path) => {
    const pathComponents = path.split("/");
    const key = pathComponents[1];
    if (pathComponents[2] == "tooltip.tsx") {
        skills[key] = {
            ...(skills[key] ?? {}),
            tooltip: context(path).default
        }
    }
    if (pathComponents[2] == "table-values.ts") {
        skills[key] = {
            ...(skills[key] ?? {}),
            values: context(path).default
        }
    }
    return skills;
}, {}) as {[id: string]: {tooltip?: React.FC<ItemSkillProps>, values?: TableValues}}
*/

export const ItemSkillDamageTable = damageTableContext.keys().reduce((skills: any, path) => {
    const pathComponents = path.split("/");
    const key = pathComponents[1];
    return {
        ...skills,
        [key]: damageTableContext(path).default
    };
}, {}) as {[id: string]: ItemSkillDamageTableUnit[] | ItemSkillDamageTableGenerator}