import { EquipmentAbilityDamageTableGenerator } from "../type";

const tableValues: EquipmentAbilityDamageTableGenerator = ({ importedDamage }) => {    
    return [
        {labelIntlID: "item-skill.additional-damage", value: importedDamage!, triggeredOnBasicAttack: true}
    ]
}

export default tableValues;