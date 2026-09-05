import { EquipmentAbilityDamageTableGenerator, EquipmentAbilityGivenBuffDebuff, EquipmentAbilityModule, EquipmentAbilityPerpetualStatus, EquipmentAbilitySelfBuffDebuff, EquipmentAbilityTooltipValues } from "./type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { EquipmentStatusDictionary } from "core/equipment";

export const modules = import.meta.glob<{ default: EquipmentAbilityModule }>("./**/index.ts", {eager: true})

export const [
    EquipmentAbilityTooltipDictionary,
    EquipmentAbilityDamageTable,
    EquipmentAbilityPerpetualStatusDictionary,
    EquipmentAbilityBuffDebuffDictionary,
    EquipmentAbilityGivenBuffDebuffDictionary
] = Object.entries(modules).reduce(([tooltips, damageTables, perpetuals, buffDebuff, givenBuffDebuff], [path, m]) => {
    if (m.default == undefined || m.default.code == undefined) return [tooltips, damageTables, perpetuals, buffDebuff, givenBuffDebuff];
    const codes = Array.isArray(m.default.code) ? m.default.code : [m.default.code];
    return codes.reduce(([tooltips, damageTables, perpetuals, buffDebuff, givenBuffDebuff], code) => {
        const damageTable = m.default.damageTable;
        const generator: EquipmentAbilityDamageTableGenerator | undefined =
            damageTable == undefined ? undefined :
            typeof damageTable == "function" ? damageTable :
            () => damageTable;

        return [
            {
                ...tooltips,
                [code]: m.default.tooltipValues
            },
            {
                ...damageTables,
                ...(
                    generator ? { [code]: generator} : {}
                )
            },
            {
                ...perpetuals,
                ...(
                    m.default.perpetualStatus ? { [code]: m.default.perpetualStatus} : {}
                )
            },
            {
                ...buffDebuff,
                ...(
                    m.default.buffDebuff ? { [code]: m.default.buffDebuff} : {}
                )
            },
            {
                ...givenBuffDebuff,
                ...(
                    m.default.givenBuffDebuff ? { [code]: m.default.givenBuffDebuff} : {}
                )
            }
        ]
    }, [tooltips, damageTables, perpetuals, buffDebuff, givenBuffDebuff]);
}, [
    {} as Record<number, EquipmentAbilityTooltipValues>,
    {} as Record<number, EquipmentAbilityDamageTableGenerator>,
    {} as Record<number, EquipmentAbilityPerpetualStatus>,
    {} as Record<number, EquipmentAbilitySelfBuffDebuff>,
    {} as Record<number, EquipmentAbilityGivenBuffDebuff>
])

/**
 * 移動速度減少（スロウ）を持つ装備アビリティの一覧（skillCode単位）。`slow-dictionary.ts`の
 * `SlowDictionary`が「辞書」表示のために集約する
 */
export const EquipmentAbilitySlowSourcesDictionary: Record<number, SlowSourceInfo[]> = Object.values(modules)
    .reduce((dict, m) => {
        if (m.default?.slowSources == undefined) return dict;
        const codes = Array.isArray(m.default.code) ? m.default.code : [m.default.code];
        return codes.reduce((dict, code) => ({ ...dict, [code]: m.default.slowSources! }), dict);
    }, {} as Record<number, SlowSourceInfo[]>);

/**
 * 他者（敵）から受けるバフ・デバフの、装備アビリティ由来の全カタログ。`EquipmentAbilityGivenBuffDebuffDictionary`
 * （skillCode単位・未展開の関数）とは別に、全装備アイテムプールを列挙して構築する
 * （`use-item-skills.ts`が「装備中のアイテム」を列挙するのと同じパターンを「全アイテム」に対して行う。
 * 他者バフは自分の装備とは無関係な、任意の敵の装備から受けうるため）。
 *
 * `EquipmentAbilityImportedProps`（アイテムごとの`dmg`/`values`）をここで注入することで、
 * 同一skillCodeを複数アイテムが共有し、かつ内容がアイテムごとに異なる場合でも
 * （例: 装備ごとに固有の攻撃速度減少量を持つ「リッチの掌握」）、アビリティ側は自分がどのアイテムから
 * 呼ばれたか一切知らずに済む。返ってきたローカルidは、このアイテム列挙側で`${itemID}:${localId}`という
 * グローバルに一意なキーへ変換する（`source.ts`の`itemIDFromNamespacedId`がこの形式を前提に発生源を解決する）
 */
export const EquipmentAbilityIncomingBuffDebuffCatalog: Record<string, BuffDebuffDefinition> = Object.entries(EquipmentStatusDictionary)
    .reduce((catalog, [itemIDString, status]) => {
        const itemID = Number(itemIDString);
        return (status.skill ?? []).reduce((catalog, ability) => {
            const givenBuffDebuff = EquipmentAbilityGivenBuffDebuffDictionary[ability.skillCode];
            if (!givenBuffDebuff) return catalog;

            const definitions = givenBuffDebuff({ importedDamage: ability.dmg, importedValues: ability.values });
            return Object.entries(definitions).reduce((catalog, [localId, definition]) => ({
                ...catalog,
                [`${itemID}:${localId}`]: definition
            }), catalog);
        }, catalog);
    }, {} as Record<string, BuffDebuffDefinition>);
