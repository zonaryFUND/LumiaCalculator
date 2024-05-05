import { SkillLevels } from "components/subject/use-subject-config";
import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

function table(props: {skillLevels: SkillLevels}): DamageTable {
    return {
        basicAttack: ["standard"],
        skill: [
            [{label: "Q", skill: "Q", damage: Constants.Q.damage}],
            [
                {label: "W単発", skill: "W", damage: Constants.W.damage},
                {label: `W全ヒット(${Constants.W.count[props.skillLevels.W]})`, skill: "W", damage: Constants.W.damage, multiplier: Constants.W.count.map(v => v * 100)}
            ],
            [{label: "E", skill: "E", damage: Constants.E.damage}],
            [{label: "R", skill: "R", damage: Constants.R.damage}]
        ]   
    }
}

export default table;