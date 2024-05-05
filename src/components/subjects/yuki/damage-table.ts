import { WeaponTypeID } from "@app/entity/equipment";
import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

function table(props: {weaponType: WeaponTypeID}): DamageTable {
    return {
        basicAttack: [
            "standard",
            {label: "T追加ダメージ", skill: "T", damage: Constants.T.damage, type: "true"},
            props.weaponType == "dual_swords" ? 
            {label: "Q中基本攻撃(双剣)", skill: "Q", damage: Constants.Q.dual_sword_damage, type: "basic"} :
            {label: "Q中基本攻撃", skill: "Q", damage: Constants.Q.damage, type: "basic"}
        ],
        skill: [
            [{label: "E", skill: "E", damage: Constants.E.damage}],
            [
                {label: "R切り", skill: "R", damage: Constants.R.damage},
                {label: "R刻印爆発", skill: "R", damage: Constants.R.mark_damage, type: "true"}
            ]
        ]   
    }
}

export default table;