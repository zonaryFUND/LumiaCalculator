import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.laceration-movement-speed": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6086010",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6086010",
                value: {
                    type: "constant",
                    value: Constants.ms * stack
                }
            }]
        })
    }
})
