import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "true", ratio: dictionaryValues.dmg, labelFormat: "{text}1スタック時固定ダメージ/秒"},
        {type: "true", ratio: dictionaryValues.dmg, multiplier: Constants.max_stack * 100, labelFormat: `{text}最大スタック(${Constants.max_stack})時固定ダメージ/秒`},
    ]
}

export default tableValues;