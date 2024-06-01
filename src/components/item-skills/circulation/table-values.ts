import { TableValues } from "../item-skill";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "basic", ratio: dictionaryValues.dmg}
    ]
}

export default tableValues;