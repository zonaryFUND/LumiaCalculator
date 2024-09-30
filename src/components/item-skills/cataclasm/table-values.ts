import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "skill", ratio: Constants.damage}
    ]
}

export default tableValues;