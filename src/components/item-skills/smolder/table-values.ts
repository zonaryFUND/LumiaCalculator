import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "true-dot", constant: dictionaryValues.dmg},
        {type: "true-dot", constant: dictionaryValues.dmg, multiplier: Constants.max_stack * 100, additionalLabel: `最大スタック(${Constants.max_stack})`},
    ]
}

export default tableValues;