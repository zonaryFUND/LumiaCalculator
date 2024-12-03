import { EquipmentAbilityDamageTableUnit } from "../type";
import Constants from "./constants.json";

const maxTick = Constants.duration / Constants.tick;

const tableValues: EquipmentAbilityDamageTableUnit[] = [
    {labelIntlID: "item-skill.dot-tick", intlValue: `${Constants.tick}`, value: Constants.damage},
    {labelIntlID: "item-skill.dot-tick-max", intlValue: `${maxTick}`, value: Constants.damage, multiplier: maxTick * 100}
]

export default tableValues;