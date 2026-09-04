import { SubjectConfig } from "core/subject-dynamic/config";
import { EquipmentStatusDictionary } from "core/equipment";
import { EquipmentAbilityGivenSkillDamageIncreaseDictionary } from "@app/ingame-params/equipment-abilities/dictionary";
import { AutoBuffGroup } from "./auto-active-effects";

/**
 * 装備中のアイテムが持つ「与えるスキルダメージ増加」効果の表示専用宣言（`EquipmentAbilityModule.
 * givenSkillDamageIncrease`）を、現在の体力割合で評価して取り出す。**ダメージ計算・Statusのいずれにも
 * 一切影響しない**（docs/known-issues.md「『与えるスキルダメージ増加』効果を計算に反映する仕組みがない」
 * 参照）。`auto-self-buffs.tsx`が`autoActiveEffectsOf`（実際に計算へ反映されている`perpetual_status`）と
 * マージして表示する
 */
export function unresolvedGivenSkillDamageIncreaseEffectsOf(config: SubjectConfig, currentHPRatio: number): AutoBuffGroup[] {
    const { isChestDavid, ...equipment } = config.equipment;

    return Object.values(equipment).flatMap(itemID => {
        if (itemID == null) return [];

        return (EquipmentStatusDictionary[itemID].skill ?? []).flatMap(ability => {
            const fn = EquipmentAbilityGivenSkillDamageIncreaseDictionary[ability.skillCode];
            if (!fn) return [];

            const result = fn(config, currentHPRatio);
            if (!result) return [];

            return [{
                nameIntlID: result.nameIntlID,
                effects: [{ label: "与えるスキルダメージ", value: result.value, percent: true }],
                unresolved: true
            }];
        });
    });
}
