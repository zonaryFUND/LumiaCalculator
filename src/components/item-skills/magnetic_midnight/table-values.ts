import { ItemSkillDamageTableGenerator } from "../item-skill";

const tableValues: ItemSkillDamageTableGenerator = (importedValues) => {
    if (importedValues) {
        return [
            {labelIntlID: "item-skill.additional-damage", value: importedValues, triggeredOnBasicAttack: true}
        ]
    } else {
        return []
    }
}

export default tableValues;