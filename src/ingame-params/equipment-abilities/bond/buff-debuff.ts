import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff, EquipmentAbilityGivenBuffDebuff } from "../type";

export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.bond": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6089000",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6089000",
                value: {
                    type: "constant",
                    value: Constants.ms * stack
                }
            }]
        })
    }
})

// 回復・シールドを付与した味方にも同じ移動速度増加が発生する
export const givenBuffDebuff: EquipmentAbilityGivenBuffDebuff = () => ({
    "item-skill.bond": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6089000",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6089000",
                value: {
                    type: "constant",
                    value: Constants.ms * stack
                }
            }]
        })
    }
})
