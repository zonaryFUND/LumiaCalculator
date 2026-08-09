import Constants from "./constants.json";
import { EquipmentAbilityDamageTableGenerator, EquipmentAbilityDamageTableUnit } from "../type";

const tableValues: EquipmentAbilityDamageTableUnit[] = [
    { labelIntlID: "item-skill.dot-tick", intlValue: `${Constants.tick}`, value: Constants.damage },
    { labelIntlID: "item-skill.dot-tick-max", intlValue: `${Constants.duration / Constants.tick}`, value: Constants.damage, multiplier: Constants.duration / Constants.tick * 100 }
]

export default tableValues;