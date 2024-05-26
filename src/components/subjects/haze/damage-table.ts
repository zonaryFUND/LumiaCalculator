import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const oneAmmoQ = {
    base: Constants.Q2.damage.base,
    amp: Constants.Q2.damage.amp + Constants.Q2.damage.amp_per_ammo
    
}

const fullAmmoQ = {
    base: Constants.Q2.damage.base,
    amp: Constants.Q2.damage.amp + Constants.Q2.damage.amp_per_ammo * Constants.E.ammo
}

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", value: Constants.T.damage},
        {label: "R中追加ダメージ", skill: "R", value: Constants.R.area_damage}
    ],
    skill: [
        [
            {label: "Q外周", skill: "Q", value: Constants.Q.outer_damage},
            {label: "Q中心", skill: "Q", value: Constants.Q.center_damage}
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [
            {label: "E1発分", skill: "E", value: Constants.E.damage},
            {label: `E全ヒット(${Constants.E.ammo})`, skill: "E", value: Constants.E.damage, multiplier: [{basic: Constants.E.ammo * 100}]},
            {label: "E中Q最小(余り弾数1)", skill: "Q", value: oneAmmoQ},
            {label: `E中Q最大(余り弾数${Constants.E.ammo})`, skill: "Q", value: fullAmmoQ}
        ],
        [
            {label: "R切り替え", skill: "R", value: Constants.R.switch_damage},
            {label: "R中Q", skill: "Q", value: Constants.Q3.damage},
            {label: "R中Q強化", skill: "Q", value: Constants.Q3.damage, multiplier: [{basic: 100 + Constants.Q3.enhance}]}
        ]
    ]   
}

export default table;