import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "shield", ratio: Constants.shield, labelFormat: "{text}シールド獲得/秒"},
        {type: "shield", ratio: Constants.max_shield, labelFormat: "{text}シールド最大値"}
    ]
}

export default tableValues;