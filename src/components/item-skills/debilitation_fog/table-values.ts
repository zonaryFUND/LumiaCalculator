import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "skill", ratio: Constants.damage, labelFormat: "{text}/秒"},
        {type: "skill", ratio: Constants.damage, multiplier: Constants.duration * 100, labelFormat: `{text}最大ヒット(${Constants.duration}秒)`},
    ]
}

export default tableValues;