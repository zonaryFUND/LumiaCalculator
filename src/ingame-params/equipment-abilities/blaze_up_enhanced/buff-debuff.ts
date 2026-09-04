import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

// blaze_up（予熱）と同一のゲーム内バフ「予熱」（武器種違いの実装。攻撃速度ではなく攻撃力が増加する）。
// 表示名・CharacterStateともに共通のため、ローカルidも合わせる
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.blaze-up": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.blaze-up",
        maxStack: Constants.max_stack,
        buff: stack => ({
            attackPower: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/6052000",
                value: {
                    type: "constant",
                    value: Constants.attack * stack
                }
            }]
        })
    }
})
