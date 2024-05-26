import { Status } from "components/subject/status";
import { DamageTable } from "../damage-table";
import Constants from "./constants.json";
import { SkillLevels } from "app-types/subject-dynamic/config";

function table(props: {status: Status, skillLevels: SkillLevels}): DamageTable {
    const qt = Constants.Q.damage.attack[props.skillLevels.Q] + Constants.T.damage.attack[props.skillLevels.T] - 100;

    return {
        basicAttack: [
            "standard",
            {label: "Q発動中基本攻撃", skill: "Q", value: Constants.Q.damage, type: "basic"},
            {label: "Tボールキャッチ後基本攻撃", skill: "T", value: Constants.T.damage, type: "basic"},
            {label: "Q発動中Tボールキャッチ後基本攻撃", skill: "Q", value: {attack: qt, basicAttackAmp: 100}, type: "basic"},
        ],
        skill: [
            [  
                {label: "W", skill: "W", value: Constants.W.damage},
                {label: "W2ヒット", skill: "W", value: Constants.W.damage, multiplier: [{basic: 200}]}
            ],
            [{label: "R", skill: "R", value: Constants.R.damage}]
        ]   
    } 
}


export default table;