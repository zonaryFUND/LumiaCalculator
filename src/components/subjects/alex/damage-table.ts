import { Status } from "components/subject/status";
import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";
import { WeaponTypeID } from "app-types/equipment/weapon";

function table(props: {status: Status, weaponType: WeaponTypeID}): DamageTable {
    const rMax = Constants.R.later_damage.amount;

    function common(weaponDependent: SkillValueProps[][]): DamageTable {
        return {
            basicAttack: ["standard"],
            skill: [
                ...weaponDependent,
                [
                    {label: "R着弾(外周)", skill: "R", value: Constants.R.first_damage.outer},
                    {label: "R着弾(中央)", skill: "R", value: Constants.R.first_damage.center},
                    {label: "Rパルス1発分(外周)", skill: "R", value: Constants.R.later_damage.outer},
                    {label: "Rパルス1発分(中央)", skill: "R", value: Constants.R.later_damage.center},
                    {label: `Rパルス最大ヒット(${rMax}回、外周)`, skill: "R", value: Constants.R.later_damage.outer, multiplier: rMax * 100},
                    {label: `Rパルス最大ヒット(${rMax}回、中央)`, skill: "R", value: Constants.R.later_damage.center, multiplier: rMax * 100},
                ]
            ]
        }
    }

    if (props.weaponType == "pistol" || props.weaponType == "shuriken") {
        // ranged
        return common([
            [{label: "レンジQ", skill: "Q", value: Constants.RangeQ.damage}],
            [{label: "レンジW", skill: "W", value: Constants.RangeW.damage}],            
            [{label: "レンジE", skill: "E", value: Constants.RangeE.damage}]            
        ])
    } else {
        // melee
        return common([
            [{label: "メレーQ", skill: "Q", value: Constants.MeleeQ.damage}],
            [{label: "メレーW", skill: "W", value: Constants.MeleeW.damage}]
        ])
    }
}

export default table;