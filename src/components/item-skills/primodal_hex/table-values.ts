import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "true", ratio: dictionaryValues.dmg, labelFormat: "{text}固定ダメージ"}
    ]
}

export default tableValues;