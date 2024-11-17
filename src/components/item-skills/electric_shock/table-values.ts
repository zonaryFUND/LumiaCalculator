import { ValueRatio } from "app-types/value-ratio";
import { ItemSkillDamageTableGenerator } from "../item-skill";

const tableValues: ItemSkillDamageTableGenerator = (dmg, _) => {    
    const constant = ["melee", "range"].map(key => {
        const damage = (dmg as any)[key];

        return {
            base: damage.levelProp.from,
            level: (damage.levelProp.to - damage.levelProp.from) / 19,
            targetMaxHP: damage.targetMaxHP
        };
    });

    return [
        {labelIntlID: "item-skill.additional-damage", value: {melee: constant[0], range: constant[1]}, triggeredOnBasicAttack: true}
    ]
}

export default tableValues;