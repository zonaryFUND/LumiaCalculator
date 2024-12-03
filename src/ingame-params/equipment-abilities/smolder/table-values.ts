import { EquipmentAbilityDamageTableGenerator } from "../type";
import Constants from "./constants.json";

const tableValues: EquipmentAbilityDamageTableGenerator = ({ importedDamage }) => {
    return [
        {labelIntlID: "item-skill.dot-1-stack-true", value: importedDamage!, labelFormat: "{text}1スタック時固定ダメージ/秒", type: {type: "true"}},
        {labelIntlID: "item-skill.dot-max-stack-true", intlValue: `${Constants.max_stack}`, value: importedDamage!, multiplier: Constants.max_stack * 100, type: {type: "true"}}
    ]
}

export default tableValues;