import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "basic", constant: dictionaryValues.dmg, additionalLabel: "最大値"}
    ]
}

export default tableValues;