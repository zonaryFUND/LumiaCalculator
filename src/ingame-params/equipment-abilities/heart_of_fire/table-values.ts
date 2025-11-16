<<<<<<< HEAD
import { EquipmentAbilityDamageTableUnit } from "../type";
import Constants from "./constants.json";

const tableValues: EquipmentAbilityDamageTableUnit[] = [
    {labelIntlID: "item-skill.dot-tick", intlValue: `${Constants.tick}`, value: Constants.damage},
    {labelIntlID: "item-skill.heal", value: Constants.damage, type: {type: "heal", target: "self"}, damageDependentHeal: Constants.heal}
=======
import Constants from "./constants.json";
import { EquipmentAbilityDamageTableGenerator } from "../type";

const tableValues: EquipmentAbilityDamageTableGenerator = () => [
    {labelIntlID: "item-skill.heart-of-fire-damage", value: Constants.damage},
    {labelIntlID: "item-skill.heart-of-fire-heal", value: Constants.damage, damageDependentHeal: Constants.heal}
>>>>>>> recovery-9.0
]

export default tableValues;