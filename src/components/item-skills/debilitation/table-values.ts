import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "dot", constant: Constants.dmg},
        {type: "dot", constant: Constants.dmg, multiplier: 200, additionalLabel: `最大スタック(${Constants.max_stack})`},
    ]
}

export default tableValues;