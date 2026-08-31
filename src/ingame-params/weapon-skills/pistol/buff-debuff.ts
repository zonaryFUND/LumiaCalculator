import { WeaponSkillSelfBuffDebuff } from "../type";
import Constants from "./constants";
import { calculateValue } from "core/value-ratio";

export const buffDebuff: WeaponSkillSelfBuffDebuff = (config, status) => {
    const ms = calculateValue(Constants.movement_speed, status, config, "D");

    return {
        "weapon-skill.pistol.movement-speed-up": {
            origin: "skill",
            nameIntlID: "weapon-skill.pistol.movement-speed-up",
            maxStack: 1,
            buff: stack => ({
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/3009000",
                    value: {
                        type: "constant",
                        value: ms.static.toNumber() * stack
                    }
                }]
            })
        },
        "weapon-skill.pistol.attack-speed-up": {
            origin: "skill",
            nameIntlID: "weapon-skill.pistol.attack-speed-up",
            maxStack: 1,
            buff: stack => ({
                attackSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/3009010",
                    value: {
                        type: "constant",
                        value: Constants.attack_speed.effect * stack
                    }
                }]
            })
        }
    }
}