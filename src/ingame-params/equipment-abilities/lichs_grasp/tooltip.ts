import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ importedValues }) => ({
    1: importedValues?.slow as number,
    3: importedValues?.as as number,
    4: importedValues?.duration as number,
    5: importedValues?.cooldown as number
})

export default values;