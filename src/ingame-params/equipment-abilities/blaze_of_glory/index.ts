import { defineEquipmentAbility } from "../type";
import tooltipValues from "./tooltip";
import perpetualStatus from "./perpetual-status";

// 「与えるスキルダメージ増加」効果（damage-model.mdの「スキルダメージ増加効果」参照）を持つ。
// increaseSkillDamageRatio（skillAmpとは別のStatusフィールド）に反映するが、ダメージ計算側での
// 消費はまだ未実装（docs/known-issues.md参照）
export default defineEquipmentAbility({
    code: 6061001,
    tooltipValues,
    perpetualStatus
})
