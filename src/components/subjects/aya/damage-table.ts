import { Status } from "components/subject/status";
import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

function table(props: {status: Status}): DamageTable {
    const wCount = props.status.attackSpeed.multiplier.dividedBy(30).floor().clamp(0, Constants.W.max_bullets - Constants.W.bullets).toNumber() + Constants.W.bullets;

    return {
        basicAttack: [
            "standard"
        ],
        skill: [
            [
                {label: "Q(1発目)", skill: "Q", value: Constants.Q.first_damage, type: "basic"},
                {label: "Q(2発目)", skill: "Q", value: Constants.Q.second_damage}
            ],
            [
                {label: "W", skill: "W", value: Constants.W.damage},
                {label: `W最大ヒット(${wCount})`, skill: "W", value: Constants.W.damage, multiplier: [{basic: wCount * 100}]}
            ],
            [
                {label: "R", skill: "R", value: Constants.R.damage}
            ],
            [
                {label: "Tシールド", skill: "T", value: Constants.T.shield, type: "shield"}
            ]
        ]
    }
}

export default table;