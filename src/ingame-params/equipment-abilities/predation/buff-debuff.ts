import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.predation": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6074020",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6074020",
                value: {
                    type: "constant",
                    value: Constants.movement_speed.effect * stack
                }
            }]
        })
    }
})
