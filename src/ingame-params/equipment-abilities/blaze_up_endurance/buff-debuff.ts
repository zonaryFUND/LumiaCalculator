import Constants from "./constants"
import { EquipmentAbilitySelfBuffDebuff } from "../type";

export const buffDebuff: EquipmentAbilitySelfBuffDebuff = props => ({
    "item-skill.blaze-up-endurance": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.blaze-up-endurance",
        maxStack: Constants.max_stack,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6054100",
                value: {
                    type: "constant",
                    value: Constants.defense * stack
                }
            }],
            ...(stack == Constants.max_stack ? {
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/6054110",
                    value: {
                        type: "constant",
                        value: Constants.movement_speed
                    }
                }]
            } : {})
        })
    }
})