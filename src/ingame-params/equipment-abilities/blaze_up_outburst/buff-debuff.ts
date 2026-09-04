import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.blaze-up-outburst": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.blaze-up-outburst",
        maxStack: Constants.max_stack,
        buff: stack => ({
            attackPower: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/6054000",
                value: {
                    type: "constant",
                    value: Constants.attack * stack
                }
            }],
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6054000",
                value: {
                    type: "constant",
                    value: Constants.attack_speed * stack
                }
            }],
            ...(stack == Constants.max_stack ? {
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/6054010",
                    value: {
                        type: "constant",
                        value: Constants.movement_speed
                    }
                }]
            } : {})
        })
    }
})
