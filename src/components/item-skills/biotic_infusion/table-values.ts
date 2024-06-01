import { TableValues } from "../item-skill";

const tableValues: TableValues = (dictionaryValues: any) => {
    return [
        {type: "basic", ratio: dictionaryValues.dmg, labelFormat: "{text}追加ダメージ"}
    ]
}

export default tableValues;