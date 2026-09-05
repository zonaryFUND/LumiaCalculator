import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.tailwind": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6078000",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6078000",
                value: {
                    type: "constant",
                    value: Constants.effect * stack
                }
            }]
        })
    }
})
