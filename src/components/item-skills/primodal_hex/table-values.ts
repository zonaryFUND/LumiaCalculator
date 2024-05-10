import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "true", constant: dictionaryValues.dmg}
    ]
}

export default tableValues;