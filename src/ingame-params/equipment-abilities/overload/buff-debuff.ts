import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

// 「クールダウンが早く回復する」効果（cooldown_recovery）はクールダウン減少とは別物で、計算に反映しない
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.overload": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6083010",
        maxStack: 1,
        buff: stack => ({
            skillAmp: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6083010",
                value: {
                    type: "constant",
                    value: Constants.amp * stack
                }
            }]
        })
    }
})
