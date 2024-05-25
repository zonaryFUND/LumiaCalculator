import { WeaponTypeID } from "app-types/equipment/weapon";
import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

function table(props: {weaponType?: WeaponTypeID}): DamageTable {
    return {
        basicAttack: [
            "standard",
            {label: "T追加ダメージ", skill: "T", value: Constants.T.damage},
            {label: "R中追加ダメージ", skill: "R", value: Constants.R.damage}
        ],
        skill: [
            [
                {label: "Q1", skill: "Q", value: Constants.Q.first_damage},
                {label: "Q2", skill: "Q", value: Constants.Q.second_damage}
            ],
            ([
                {label: "W回復最小値", skill: "W", value: Constants.W.heal, type: "heal"},
                {label: "W回復最大値", skill: "W", value: Constants.W.heal, multiplier: Constants.W.heal_max_multiplier * 100, type: "heal"}
            ] as SkillValueProps[]).concat(props.weaponType == "dual_swords" ? [
                {label: "R中W回復最小値", skill: "W", value: Constants.W.heal, type: "heal", multiplier: Constants.R.dualsword_w_heal_multiplier * 100},
                {label: "R中W回復最大値", skill: "W", value: Constants.W.heal, multiplier: Constants.W.heal_max_multiplier * Constants.R.dualsword_w_heal_multiplier * 100, type: "heal"}
            ] : [])
            ,
            [{label: "E", skill: "E", value: Constants.E.damage}],
            [
                {label: "R2最小値", skill: "R", value: Constants.R.finish_damage},
                {label: "R2最大値", skill: "R", value: Constants.R.finish_damage, multiplier: Constants.R.finish_multiplier_max * 100}
            ],
            [{label: "T出血固定ダメージ", skill: "T", value: Constants.T.bleeding_damage, type: "true"}]
        ]   
    }   
    }

export default table;