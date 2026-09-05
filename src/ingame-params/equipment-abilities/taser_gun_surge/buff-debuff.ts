import Constants from "./constants.json";
import { EquipmentAbilityGivenBuffDebuff } from "../type";

export const givenBuffDebuff: EquipmentAbilityGivenBuffDebuff = () => ({
    "item-skill.taser-gun-surge": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6051020",
        maxStack: 1,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6051020",
                value: {
                    type: "constant",
                    value: -Constants.defense_down.effect * stack
                }
            }]
        })
    }
})
