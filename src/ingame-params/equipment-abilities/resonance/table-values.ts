import { EquipmentAbilityDamageTableUnit } from "../type";
import Constants from "./constants.json";

const tableValues: EquipmentAbilityDamageTableUnit[] = [
    {labelIntlID: "item-skill.additional-damage", value: Constants.damage, triggeredOnBasicAttack: true}
]

export default tableValues;