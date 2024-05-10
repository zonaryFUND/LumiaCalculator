import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "effect", constant: Constants.adaptive}
    ]
}

export default tableValues;