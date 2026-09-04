import { defineEquipmentAbility } from "../type";
import tooltipValues from "./tooltip";
import Constants from "./constants.json";
import { buffDebuff, LocalID } from "./buff-debuff";

export default defineEquipmentAbility({
    code: [6053001, 6053002],
    tooltipValues,
    buffDebuff,
    // 1スタックごとの「与えるスキルダメージ増加」効果はskillAmpとは別種でこの計算機には未実装のため、
    // 表示専用の宣言に留める（blaze_of_glory/index.tsと同じ理由。docs/known-issues.md参照）。
    // 現在の自身のスタックはconfig.selfBuffsから自分自身（buffDebuffが登録するLocalID）を逆引きして求める
    givenSkillDamageIncrease: config => {
        const stack = config.selfBuffs.find(s => s.id.endsWith(`:${LocalID}`))?.stack ?? 0;
        if (stack == 0) return undefined;

        return {
            nameIntlID: LocalID,
            value: Constants.skill_damage * stack
        };
    }
})