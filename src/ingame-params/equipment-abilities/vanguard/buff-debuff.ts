import Constants from "./constants.json";
import { EquipmentAbilityGivenBuffDebuff, EquipmentAbilitySelfBuffDebuff } from "../type";
import { weaponRangeOf } from "core/subject-dynamic/config";

export const buffDebuff: EquipmentAbilitySelfBuffDebuff = ({ config }) => {
    const reduction = weaponRangeOf(config) == "melee" ? Constants.damage_mitigation.melee : Constants.damage_mitigation.range;

    return {
        "item-skill.vanguard-buff": {
            origin: "equipment-ability",
            nameIntlID: "CharacterState/Group/Name/6027010",
            maxStack: 1,
            buff: stack => ({
                preventDamageRatio: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/6027010",
                    value: {
                        type: "constant",
                        value: reduction * stack
                    }
                }]
            })
        }
    };
};

export const givenBuffDebuff: EquipmentAbilityGivenBuffDebuff = () => ({
    "item-skill.vanguard-debuff": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6027020",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6027020",
                value: {
                    type: "constant",
                    value: -Constants.as * stack
                }
            }]
        })
    }
});
