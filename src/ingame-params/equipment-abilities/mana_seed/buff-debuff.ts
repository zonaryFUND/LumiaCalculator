import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.mana-seed": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6064000",
        maxStack: Constants.max_stack,
        buff: stack => ({
            skillAmp: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/6064000",
                value: {
                    type: "constant",
                    value: Constants.amp_per_stack * stack
                }
            }],
            ...(stack == Constants.max_stack ? {
                cooldownReduction: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/6064010",
                    value: {
                        type: "constant",
                        value: Constants.cooldown_reduction
                    }
                }]
            } : {})
        })
    }
})
