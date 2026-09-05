import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";
import { weaponRangeOf } from "core/subject-dynamic/config";

export const buffDebuff: EquipmentAbilitySelfBuffDebuff = ({ config }) => {
    const effect = weaponRangeOf(config) == "melee" ? Constants.movement_speed.melee : Constants.movement_speed.range;

    return {
        "item-skill.quickstep": {
            origin: "equipment-ability",
            nameIntlID: "CharacterState/Group/Name/6035000",
            maxStack: Constants.max_stack,
            buff: stack => ({
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/6035000",
                    value: {
                        type: "constant",
                        value: effect * stack
                    }
                }]
            })
        }
    };
};
