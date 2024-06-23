import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "basic", ratio: Constants.damage, labelFormat: "{text}追加ダメージ"},
        {type: "heal", ratio: Constants.heal, labelFormat: "{text}回復量"}
    ]
}

export default tableValues;