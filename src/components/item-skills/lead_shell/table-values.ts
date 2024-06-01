import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "basic", ratio: Constants.dmg, labelFormat: "{text}追加ダメージ"}
    ]
}

export default tableValues;