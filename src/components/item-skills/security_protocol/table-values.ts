import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "shield", ratio: Constants.shield, labelFormat: `{text}シールド`},
        {type: "shield", ratio: Constants.shield, multiplier: 100 + Constants.enhance, labelFormat: `{text}強化シールド`},
    ]
}

export default tableValues;