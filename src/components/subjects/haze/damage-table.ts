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
        {label: "T追加ダメージ", skill: "T", damage: Constants.T.damage},
        {label: "R中追加ダメージ", skill: "R", damage: Constants.R.area_damage}
    ],
    skill: [
        [
            {label: "Q外周", skill: "Q", damage: Constants.Q.outer_damage},
            {label: "Q中心", skill: "Q", damage: Constants.Q.center_damage}
        ],
        [{label: "W", skill: "W", damage: Constants.W.damage}],
        [
            {label: "E1発分", skill: "E", damage: Constants.E.damage},
            {label: `E全ヒット(${Constants.E.ammo})`, skill: "E", damage: Constants.E.damage, multiplier: Constants.E.ammo * 100},
            {label: "E中Q最小(余り弾数1)", skill: "Q", damage: oneAmmoQ},
            {label: `E中Q最大(余り弾数${Constants.E.ammo})`, skill: "Q", damage: fullAmmoQ}
        ],
        [
            {label: "R切り替え", skill: "R", damage: Constants.R.switch_damage},
            {label: "R中Q", skill: "Q", damage: Constants.Q3.damage},
            {label: "R中Q強化", skill: "Q", damage: Constants.Q3.damage, multiplier: 100 + Constants.Q3.enhance}
        ]
    ]   
}

export default table;