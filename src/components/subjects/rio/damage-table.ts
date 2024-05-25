import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    //basicAttack: ["rio"],
    basicAttack: ["standard"],
    skill: [
        [
            {label: "短弓W", skill: "W", value: Constants.W.hankyu_damage},
            {label: "短弓W(最大ヒット)", skill: "W", value: Constants.W.hankyu_damage, multiplier: 100 + 4 * Constants.W.multiple_hit},
        ],
        [
            {label: "和弓W", skill: "W", value: Constants.W.daikyu_damage},
            {label: "和弓W貫通", skill: "W", value: Constants.W.daikyu_behind_damage}
        ],
        [
            {label: "短弓E", skill: "E", value: Constants.E.hankyu_damage},
            {label: "短弓E2ヒット", skill: "E", value: Constants.E.hankyu_damage, multiplier: 200}
        ],
        [
            {label: "和弓E", skill: "E", value: Constants.E.daikyu_damage},
            {label: "和弓E拡散", skill: "E", value: Constants.E.daikyu_range_damage}
        ],
        [
            {label: "短弓R1", skill: "R", value: Constants.R.hankyu_first_damage},
            {label: `短弓R1全ヒット(3)`, skill: "R", value: Constants.R.hankyu_first_damage, multiplier: 300},
            {label: `短弓R2`, skill: "R", value: Constants.R.hankyu_second_damage}
        ],
        [
            {label: "和弓R", skill: "R", value: Constants.R.daikyu_damage},
            {label: "和弓R強化", skill: "R", value: Constants.R.daikyu_damage, multiplier: Constants.R.daikyu_enhance.damage + 100}
        ]
    ]   
}

export default table;