import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "shield", ratio: Constants.shield, labelFormat: "{text}シールド量"}
    ]
}

export default tableValues;