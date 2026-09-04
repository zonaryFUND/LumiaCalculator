import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.blaze-up": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.blaze-up",
        maxStack: Constants.max_stack,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6052000",
                value: {
                    type: "constant",
                    value: Constants.attack_speed * stack
                }
            }]
        })
    }
})
