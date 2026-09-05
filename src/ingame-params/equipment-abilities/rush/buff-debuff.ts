import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.rush": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6017000",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6017000",
                value: {
                    type: "constant",
                    value: Constants.attack_speed * stack
                }
            }]
        })
    }
})
