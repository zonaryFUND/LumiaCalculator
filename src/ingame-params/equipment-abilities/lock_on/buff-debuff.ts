import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.lock-on-movement-speed": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6092020",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6092020",
                value: {
                    type: "constant",
                    value: Constants.ms.effect * stack
                }
            }]
        })
    }
})
