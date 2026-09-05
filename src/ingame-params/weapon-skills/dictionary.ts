import { WeaponTypeID } from "core/equipment/weapon";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { WeaponSkillDamageTableGenerator, WeaponSkillModule, WeaponSkillSelfBuffDebuff } from "./type";

const modules = import.meta.glob<{ default: WeaponSkillModule }>("./**/index.ts", {eager: true});

export const [
    WeaponSkillCodeDictionary,
    WeaponSkillDamageTableDictionary,
    WeaponSkillTooltipDictionary,
    WeaponSkillBuffDebuffDictionary,
    WeaponSkillIncomingBuffDebuffCatalog,
    WeaponSkillIncomingBuffDebuffWeaponType
 ] = Object.entries(modules).reduce(([codes, tables, tooltips, buffDebuff, incomingCatalog, incomingWeaponType], [key, m]) => {
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
        },
        {
            ...buffDebuff,
            ...(m.default.buffDebuff ? { [m.default.id]: m.default.buffDebuff } : {})
        },
        {
            ...incomingCatalog,
            ...(m.default.givenBuffDebuff ?? {})
        },
        {
            ...incomingWeaponType,
            ...Object.fromEntries(Object.keys(m.default.givenBuffDebuff ?? {}).map(id => [id, m.default.id]))
        }
    ]
}, [
    {} as {[weapon in WeaponTypeID]: number},
    {} as {[weapon in WeaponTypeID]: WeaponSkillDamageTableGenerator},
    {} as {[code: number]: SkillTooltipProps},
    {} as {[weapon in WeaponTypeID]: WeaponSkillSelfBuffDebuff},
    {} as Record<string, BuffDebuffDefinition>,
    {} as Record<string, WeaponTypeID>
])

/**
 * 移動速度減少（スロウ）を持つ武器スキルの一覧（skillCode単位）。`slow-dictionary.ts`の
 * `SlowDictionary`が「辞書」表示のために集約する
 */
export const WeaponSkillSlowSourcesDictionary: Record<number, SlowSourceInfo[]> = Object.values(modules)
    .reduce((dict, m) => m.default.slowSources == undefined ? dict : { ...dict, [m.default.code]: m.default.slowSources }, {} as Record<number, SlowSourceInfo[]>);

