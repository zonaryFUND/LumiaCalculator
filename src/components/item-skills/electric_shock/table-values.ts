import { TableValues } from "../item-skill";

const tableValues: TableValues = (dictionaryValues: any) => {
    const constant = ["melee", "range"].map(key => {
        const damage = dictionaryValues.dmg[key];

        return {
            base: damage.levelProp.from,
            level: (damage.levelProp.to - damage.levelProp.from) / 19,
            targetMaxHP: damage.targetMaxHP
        };
    });

    return [
        {type: "basic", ratio: {melee: constant[0], range: constant[1]}, labelFormat: "{text}追加ダメージ"}
    ]
}

export default tableValues;