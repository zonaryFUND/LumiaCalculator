import { TableValues } from "../item-skill";

const tableValues: TableValues = (dictionaryValues: any) => {
    if (dictionaryValues.dmg) {
        return [
            {type: "basic", constant: dictionaryValues.dmg}
        ]
    } else {
        return []
    }
}

export default tableValues;