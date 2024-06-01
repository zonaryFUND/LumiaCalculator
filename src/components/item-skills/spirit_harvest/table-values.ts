import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "skill", ratio: Constants.first_damage, labelFormat: "{text}刻印付与時追加ダメージ"},
        {type: "skill", ratio: Constants.second_damage, labelFormat: "{text}刻印消化時追加ダメージ"}
    ]
}

export default tableValues;