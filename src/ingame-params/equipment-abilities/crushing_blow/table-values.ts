import { EquipmentAbilityDamageTableUnit } from "../type";
import Constants from "./constants.json";

const tableValues: EquipmentAbilityDamageTableUnit[] = [
    {labelIntlID: "item-skill.additional-damage", value: Constants.damage, triggeredOnBasicAttack: true},
    {labelIntlID: "item-skill.heal", value: Constants.heal, triggeredOnBasicAttack: true, type: {type: "heal", target: "self"}}
]

export default tableValues;