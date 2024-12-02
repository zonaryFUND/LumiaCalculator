import { ItemSkillTooltipValuesHook } from "../item-skill";

const values: ItemSkillTooltipValuesHook = (_, values) => ({
    1: values?.slow as number,
    3: values?.as as number,
    4: values?.duration as number,
    5: values?.cooldown as number
})

export default values;