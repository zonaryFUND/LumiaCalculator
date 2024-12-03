import { WeaponTypeID } from "app-types/equipment/weapon";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { WeaponSkillDamageTableGenerator, WeaponSkillModule } from "./type";

const modules = import.meta.glob<{ default: WeaponSkillModule }>("./**/index.ts", {eager: true});

export const [
    WeaponSkillCodeDictionary,
    WeaponSkillDamageTableDictionary,
    WeaponSkillTooltipDictionary
 ] = Object.entries(modules).reduce(([codes, tables, tooltips], [key, m]) => {
    const tableOrGenerator = m.default.damageTable;
    return [
        {
            ...codes,
            [m.default.id]: m.default.code
        },
        {
            ...tables,
            ...(
                tableOrGenerator ? 
                { [m.default.id]: typeof tableOrGenerator == "function" ? tableOrGenerator : () => tableOrGenerator } :
                {}
            )
        },
        {
            ...tooltips,
            [m.default.code]: m.default.tooltip
        }
    ]
}, [
    {} as {[weapon in WeaponTypeID]: number},
    {} as {[weapon in WeaponTypeID]: WeaponSkillDamageTableGenerator},
    {} as {[code: number]: SkillTooltipProps}
])

