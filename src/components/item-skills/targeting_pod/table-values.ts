import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "skill", ratio: Constants.damage, labelFormat: "{text}追加ダメージ"},
        {type: "heal", ratio: Constants.heal, labelFormat: "{text}回復"}
    ]
}

export default tableValues;