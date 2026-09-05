import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.iteration": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6075000",
        maxStack: Constants.max_stack,
        buff: stack => ({
            cooldownReduction: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/6075000",
                value: {
                    type: "constant",
                    value: Constants.cooldown_reduction * stack
                }
            }]
        })
    }
})
