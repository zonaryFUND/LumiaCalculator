import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const maxTick = Constants.duration / Constants.tick;

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "skill", ratio: Constants.damage, labelFormat: `{text}/${Constants.tick}秒`},
        {type: "skill", ratio: Constants.damage, multiplier: maxTick * 100, labelFormat: `{text}最大ヒット(${maxTick})`},
    ]
}

export default tableValues;