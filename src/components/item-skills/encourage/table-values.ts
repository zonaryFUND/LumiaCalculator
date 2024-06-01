import { TableValues } from "../item-skill";
import Constants from "./constants.json";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "status", ratio: Constants.adaptive, labelFormat: "{text}適合型能力値増加"}
    ]
}

export default tableValues;