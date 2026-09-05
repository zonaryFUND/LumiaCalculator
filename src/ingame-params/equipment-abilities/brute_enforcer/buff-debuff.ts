import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

// 本来は「対象の残り体力が閾値以下」で自動発動する効果（対戦モードでは対象の体力に応じて自動判定する
// 特殊実装が将来的に必要。docs/known-issues.mdの「与えるスキルダメージ増加」の項参照）だが、
// シンプルモードには仮想敵の概念がなく判定しようがないため、現時点では単純なON/OFFの自己バフとして登録し、
// 「発動していたらどうなるか」をユーザーが確認できるようにする。increaseSkillDamageRatioはskillAmpとは
// 別のStatusフィールドで、ダメージ計算への反映は未実装（docs/known-issues.md参照）
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.brute-enforcer": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.brute-enforcer",
        maxStack: 1,
        buff: stack => ({
            increaseSkillDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "item-skill.brute-enforcer",
                value: {
                    type: "constant",
                    value: Constants.effect * stack
                }
            }]
        })
    }
})
