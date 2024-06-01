import { TableValues } from "../item-skill";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "skill", ratio: dictionaryValues.dmg, labelFormat: "{text}/秒"}
    ]
}

export default tableValues;