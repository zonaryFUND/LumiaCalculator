import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "basic", ratio: dictionaryValues.dmg, labelFormat: "{text}最大追加ダメージ"}
    ]
}

export default tableValues;