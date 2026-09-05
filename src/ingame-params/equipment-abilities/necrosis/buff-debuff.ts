import Constants from "./constants.json";
import { EquipmentAbilityGivenBuffDebuff } from "../type";

export const givenBuffDebuff: EquipmentAbilityGivenBuffDebuff = () => ({
    "item-skill.necrosis": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6021000",
        maxStack: Constants.max_stack,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6021000",
                value: {
                    type: "constant",
                    value: -Constants.armor * stack
                }
            }]
        })
    }
})
