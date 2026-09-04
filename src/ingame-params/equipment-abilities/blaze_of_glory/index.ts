import { defineEquipmentAbility } from "../type";
import tooltipValues from "./tooltip";
import Constants from "./constants.json";

// 「与えるスキルダメージ増加」効果（damage-model.mdの「スキルダメージ増加効果」参照）を持つが、
// この効果種別を計算に反映する仕組みがまだ存在しないため、実際のダメージ計算には反映されない
// （known-issues.md参照）。skillAmp（スキル増幅）は別のステータスであり代用できないため、buffDebuff/
// perpetualStatusは使わず、UI上の可視性のためだけの表示専用宣言（givenSkillDamageIncrease）に留める
export default defineEquipmentAbility({
    code: 6061001,
    tooltipValues,
    givenSkillDamageIncrease: (config, currentHPRatio) => {
        if (currentHPRatio < Constants.hp_threshold) return undefined;

        return {
            nameIntlID: "item-skill.blaze-of-glory",
            value: Constants.damage_amp
        };
    }
})