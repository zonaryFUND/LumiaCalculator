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

    console.log(constant)

    return [
        {type: "basic", constant: {melee: constant[0], range: constant[1]}}
    ]
}

export default tableValues;