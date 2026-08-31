import { EquipmentAbilityGivenBuffDebuff } from "../type";
import Constants from "./constants";

export const givenBuffDebuff: EquipmentAbilityGivenBuffDebuff = props => ({
    "item-skill.debilitation-fog": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.debilitation-fog",
        maxStack: 1,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6043000",
                value: {
                    type: "constant",
                    value: Constants.defenseDown * -1 * stack
                }
            }]
        })
    }
})