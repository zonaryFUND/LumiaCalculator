import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "skill", ratio: dictionaryValues.dmg, labelFormat: "{text}/秒"}
    ]
}

export default tableValues;