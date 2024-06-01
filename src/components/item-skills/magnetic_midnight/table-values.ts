import { TableValues } from "../item-skill";

const tableValues: TableValues = (dictionaryValues: any) => {
    if (dictionaryValues.dmg) {
        return [
            {type: "basic", ratio: dictionaryValues.dmg, labelFormat: "{text}追加ダメージ"}
        ]
    } else {
        return []
    }
}

export default tableValues;