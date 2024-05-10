import { TableValues } from "../item-skill";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "dot", constant: dictionaryValues.dmg}
    ]
}

export default tableValues;