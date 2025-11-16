<<<<<<< HEAD
import { EquipmentAbilityDamageTableUnit } from "../type";
import Constants from "./constants.json";

const tableValues: EquipmentAbilityDamageTableUnit[] = [
=======
import Constants from "./constants.json";
import { EquipmentAbilityDamageTableGenerator } from "../type";

const tableValues: EquipmentAbilityDamageTableGenerator = () => [
>>>>>>> recovery-9.0
    {labelIntlID: "item-skill.shield", value: Constants.shield.effect, type: {type: "shield", target: "self"}}
]

export default tableValues;