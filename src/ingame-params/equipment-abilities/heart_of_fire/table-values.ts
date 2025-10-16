import { EquipmentAbilityDamageTableUnit } from "../type";
import Constants from "./constants.json";

const tableValues: EquipmentAbilityDamageTableUnit[] = [
    {labelIntlID: "item-skill.dot-tick", intlValue: `${Constants.tick}`, value: Constants.damage},
    {labelIntlID: "item-skill.heal", value: Constants.damage, type: {type: "heal", target: "self"}, damageDependentHeal: Constants.heal}
]

export default tableValues;