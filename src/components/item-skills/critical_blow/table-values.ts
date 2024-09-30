import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "basic", ratio: Constants.damage},
        {type: "heal", ratio: Constants.heal}
    ]
}

export default tableValues;