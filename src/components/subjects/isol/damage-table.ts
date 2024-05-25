import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const maxW = Math.ceil(Constants.W.duration / Constants.W.tick);

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q", "skill": "Q", value: Constants.Q.damage},
            {label: "Q追加ダメージ1回分", "skill": "Q", value: Constants.Q.additional_damage}
        ],
        [
            {label: "W", "skill": "W", value: Constants.W.damage},
            {label: `W最大ヒット(${maxW})`, "skill": "W", value: Constants.W.damage, multiplier: maxW * 100}
        ],
        [{label: "E", "skill": "E", value: Constants.E.damage}],
        [{label: "R", "skill": "R", value: Constants.R.damage}],
    ]
}

export default table;