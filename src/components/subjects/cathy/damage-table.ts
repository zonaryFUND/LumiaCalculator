import { WeaponTypeID } from "app-types/equipment/weapon";
import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

function table(props: {weaponType: WeaponTypeID}): DamageTable {

    return {
        basicAttack: [
            "standard",
            props.weaponType == "dual_swords" ? {label: "Q効果時基本攻撃力", skill: "Q", value: {attack: Constants.Q.dual_sword}, type: "basic"} : undefined,
            {label: "Q追加ダメージ", skill: "Q", damage: Constants.Q.additional_damage}
        ].filter(v => v) as SkillValueProps[],
        skill: [
            [{label: "Q", skill: "Q", value: Constants.Q.damage}],
            [
                {label: "W内周", skill: "W", value: Constants.W.inner_damage},
                {label: "W外周", skill: "W", value: Constants.W.outer_damage}
            ],
            [
                {label: "E", skill: "E", value: Constants.E.damage},
                {label: "E気絶時追加ダメージ", skill: "E", value: Constants.E.knockback_damage}
            ],
            [
                {label: "R使用・味方蘇生時回復/秒", skill: "R", value: Constants.R.heal, type: "heal"},
                {label: `R使用・味方蘇生時回復最大(${Constants.R.heal_duration})`, skill: "R", value: Constants.R.heal, type: "heal", multiplier: Constants.R.heal_duration * 100},
                {label: "R最小ダメージ", skill: "R", value: Constants.R.min_damage},
                {label: "R最大ダメージ", skill: "R", value: Constants.R.min_damage, multiplier: Constants.R.max_damage_ratio * 100}
            ],
            [
                {label: "T外傷合計固定ダメージ", skill: "T", value: Constants.T.wound, type: "true"},
                {label: "T致命的外傷合計固定ダメージ", skill: "T", value: Constants.T.critical_wound, type: "true"},
                {label: "Tシールド", skill: "T", value: Constants.T.shield, type: "shield"}
            ]
        ]
    }
}

export default table;