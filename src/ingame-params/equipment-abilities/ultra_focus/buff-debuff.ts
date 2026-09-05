import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.ultra-focus": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6070000",
        maxStack: Constants.max_stack,
        buff: stack => ({
            basicAttackDamageFinalCorrectionRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/6070000",
                value: {
                    type: "constant",
                    value: Constants.basic_attack_amp * stack
                }
            }]
        })
    }
});
