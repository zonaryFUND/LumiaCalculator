import { EquipmentAbilityDamageTableGenerator } from "../type";

const tableValues: EquipmentAbilityDamageTableGenerator = ({ importedDamage }) => {
    if (importedDamage) {
        return [
            {labelIntlID: "item-skill.additional-damage", value: importedDamage, triggeredOnBasicAttack: true}
        ]
    } else {
        return []
    }
}

export default tableValues;