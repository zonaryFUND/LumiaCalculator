import { WeaponTypeID } from "app-types/equipment/weapon";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { WeaponSkillDamageTableGenerator, WeaponSkillModule } from "./type";

const modules = import.meta.glob<{ default: WeaponSkillModule }>("./defs/*/index.ts", {eager: true});

export const [
    WeaponSkillDamageTableDictionary,
    WeaponSkillTooltipDictionary
 ] = Object.entries(modules).reduce(([tables, tooltips], [key, m]) => {
    const tableOrGenerator = m.default.damageTable;
    return [
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
    {} as {[weapon in WeaponTypeID]: WeaponSkillDamageTableGenerator},
    {} as {[code: number]: SkillTooltipProps}
])

