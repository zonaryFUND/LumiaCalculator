import { Status } from "components/subject/status";
import { DamageTable } from "../damage-table";
import Constants from "./constants.json";
import { SkillLevels } from "components/subject/use-subject-config";

function table(props: {status: Status, skillLevels: SkillLevels}): DamageTable {
    const qt = Constants.Q.damage.attack[props.skillLevels.Q] + Constants.T.damage.attack[props.skillLevels.T] - 100;

    return {
        basicAttack: [
            "standard",
            {label: "Q発動中基本攻撃", skill: "Q", damage: Constants.Q.damage, type: "basic"},
            {label: "Tボールキャッチ後基本攻撃", skill: "T", damage: Constants.T.damage, type: "basic"},
            {label: "Q発動中Tボールキャッチ後基本攻撃", skill: "Q", damage: {attack: qt, basicAttackAmp: 100}, type: "basic"},
        ],
        skill: [
            [{label: "W1ヒット", skill: "W", damage: Constants.W.damage}],
            [{label: "R", skill: "R", damage: Constants.R.damage}]
        ]   
    } 
}


export default table;