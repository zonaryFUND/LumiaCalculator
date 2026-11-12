import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

// 本来の発動条件（対象の体力が閾値以上）は計算機側で判定できないため、選択式の自己バフとして実装する。
// increaseDamageRatio（与えるダメージ増加）を使う（docs/known-issues.md参照。Combatモードへは未配線）
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.whittle": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.whittle",
        maxStack: 1,
        buff: stack => ({
            increaseDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "item-skill.whittle",
                value: {
                    type: "constant",
                    value: Constants.damage_amp * stack
                }
            }]
        })
    }
})
