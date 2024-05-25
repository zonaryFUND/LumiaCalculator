import { SkillLevels } from "app-types/subject-dynamic/config";
import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

function table(props: {skillLevels: SkillLevels}): DamageTable {
    return {
        basicAttack: ["standard"],
        skill: [
            [{label: "Q", skill: "Q", value: Constants.Q.damage}],
            [
                {label: "W単発", skill: "W", value: Constants.W.damage},
                {label: `W全ヒット(${Constants.W.count[props.skillLevels.W]})`, skill: "W", value: Constants.W.damage, multiplier: Constants.W.count.map(v => v * 100)}
            ],
            [{label: "E", skill: "E", value: Constants.E.damage}],
            [{label: "R", skill: "R", value: Constants.R.damage}]
        ]   
    }
}

export default table;