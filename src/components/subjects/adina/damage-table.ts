import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q", "skill": "Q", damage: Constants.Q.damage},
            {label: "Q太陽追加ダメージ", "skill": "Q", damage: Constants.Q.sun}
        ],
        [
            {label: "W", "skill": "W", damage: Constants.W.damage},
            {label: "W太陽追加ダメージ", "skill": "W", damage: Constants.W.sun},
            {label: "W星シールド", "skill": "W", damage: Constants.W.star.shield, type: "shield"},
        ],
        [
            {label: "E", "skill": "E", damage: Constants.E.damage},
            {label: "E(2ヒット)", "skill": "E", damage: Constants.E.damage, multiplier: 200},
            {label: "E太陽追加ダメージ", "skill": "E", damage: Constants.E.sun},
            {label: "E太陽追加ダメージ(2ヒット)", "skill": "E", damage: Constants.E.sun, multiplier: 200},
            {label: "E星回復", "skill": "E", damage: Constants.E.damage, multiplier: Constants.E.star, type: "heal"},
        ],
        [
            {label: "太陽コンジャンクション", skill: "R", damage: Constants.R.sun_conjunction},
            {label: "太陽コンジャンクション持続ダメージ合計", skill: "R", damage: Constants.Q.conjunction.damage},
            {label: "月コンジャンクション", skill: "R", damage: Constants.R.moon_conjunction},
            {label: "月コンジャンクション(2ヒット)", skill: "R", damage: Constants.R.moon_conjunction, multiplier: 200},
            {label: "星コンジャンクション体力回復/秒", skill: "R", damage: Constants.R.star_conjunction.hp, type: "heal"},
            {label: "星コンジャンクション体力回復総量", skill: "R", damage: Constants.R.star_conjunction.hp, type: "heal", multiplier: Constants.E.conjunction * 100},
            {label: "星コンジャンクションスタミナ回復/秒", skill: "R", damage: Constants.R.star_conjunction.sp, type: "heal"},
            {label: "星コンジャンクションスタミナ回復総量", skill: "R", damage: Constants.R.star_conjunction.sp, type: "heal", multiplier: Constants.E.conjunction * 100},
        ],
        [
            {label: "T移動速度増加量", skill: "T", damage: Constants.T.movement_speed, type: "ms"}
        ]
    ]
}

export default table;