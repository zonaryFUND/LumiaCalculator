import { TableValues } from "../item-skill";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "basic", constant: dictionaryValues.dmg}
    ]
}

export default tableValues;