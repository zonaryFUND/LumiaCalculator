import { WeaponTypeID } from "app-types/equipment/weapon";
import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

function table(props: {weaponType: WeaponTypeID}): DamageTable {
    return {
        basicAttack: [
            "standard",
            {label: "T追加ダメージ", skill: "T", value: Constants.T.damage, type: "true"},
            props.weaponType == "dual_swords" ? 
            {label: "Q中基本攻撃(双剣)", skill: "Q", value: Constants.Q.dual_sword_damage, type: "basic"} :
            {label: "Q中基本攻撃", skill: "Q", value: Constants.Q.damage, type: "basic"}
        ],
        skill: [
            [{label: "E", skill: "E", value: Constants.E.damage}],
            [
                {label: "R切り", skill: "R", value: Constants.R.damage},
                {label: "R刻印爆発", skill: "R", value: Constants.R.mark_damage, type: "true"}
            ]
        ]   
    }
}

export default table;