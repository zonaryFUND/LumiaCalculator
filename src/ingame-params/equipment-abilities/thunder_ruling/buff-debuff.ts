import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.thunder-ruling-penetration": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6068000",
        maxStack: 1,
        buff: stack => ({
            penetrationDefense: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/6068000",
                value: {
                    type: "constant",
                    value: Constants.penetration * stack
                }
            }]
        })
    },
    "item-skill.thunder-ruling-movement-speed": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6068010",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6068010",
                value: {
                    type: "constant",
                    value: Constants.movement_speed_up.effect * stack
                }
            }]
        })
    }
})
