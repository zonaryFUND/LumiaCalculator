import Constants from "./constants.json";
import { EquipmentAbilityGivenBuffDebuff, EquipmentAbilitySelfBuffDebuff } from "../type";

// [粉砕]効果（敵への防御力割合減少デバフ、最大5スタック）
export const givenBuffDebuff: EquipmentAbilityGivenBuffDebuff = () => ({
    "item-skill.pulverization": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6028000",
        maxStack: Constants.max_stack,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6028000",
                value: {
                    type: "constant",
                    value: -Constants.armor * stack
                }
            }]
        })
    }
})

// [粉砕]効果が適用されている対象にダメージを与えた際の、自身の移動速度固定値増加バフ
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.pulverization-movement-speed": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6028010",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/6028010",
                value: {
                    type: "constant",
                    value: Constants.ms.effect * stack
                }
            }]
        })
    }
})
