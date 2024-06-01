import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "skill", ratio: Constants.dmg, labelFormat: "{text}1スタック/秒"},
        {type: "skill", ratio: Constants.dmg, multiplier: 200, labelFormat: `{text}最大スタック(${Constants.max_stack})/秒`},
    ]
}

export default tableValues;