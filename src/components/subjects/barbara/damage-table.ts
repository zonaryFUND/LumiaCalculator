import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const eMax = Constants.E.duration / Constants.E.tick;

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "セントリーガン基本攻撃", skill: "Q", damage: Constants.Q.sentry_damage}
    ],
    skill: [
        [{label: "Qセントリーガン設置ダメージ", skill: "Q", damage: Constants.Q.damage}],
        [
            {label: "Wレーザー", skill: "W", damage: Constants.W.damage},
            {label: "Wセントリーガンレールガン", skill: "W", damage: Constants.W.sentry_damage}
        ],
        [
            {label: "E持続", skill: "E", damage: Constants.E.damage},
            {label: `E持続全ヒット(${eMax})`, skill: "E", damage: Constants.E.damage, multiplier: eMax * 100},
            {label: "E爆発", skill: "E", damage: Constants.E.finish_damage}
        ],
        [
            {label: "RQセントリーガン自縛", skill: "R", damage: Constants.R.Q.blast_damage},
            {label: "RQ瞬間移動", skill: "R", damage: Constants.R.Q.warp_damage}
        ]
    ]   
}

export default table;