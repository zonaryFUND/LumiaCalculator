import { weaponTypeIDOf } from "app-types/subject-dynamic/config";
import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => {
    const rMax = Constants.R.later_damage.amount;
    const weaponType = weaponTypeIDOf(props.config);

    function common(weaponDependent: SubjectDamageTableUnit[][]): DamageTable {
        return {
            basicAttack: ["standard"],
            skill: [
                ...weaponDependent,
                [
                    {label: props.intl.formatMessage({id: "subject.alex.r-first-outer"}), origin: "R", value: Constants.R.first_damage.outer},
                    {label: props.intl.formatMessage({id: "subject.alex.r-first-center"}), origin: "R", value: Constants.R.first_damage.center},
                    {label: props.intl.formatMessage({id: "subject.alex.r-pulse-outer"}), origin: "R", value: Constants.R.later_damage.outer},
                    {label: props.intl.formatMessage({id: "subject.alex.r-pulse-center"}), origin: "R", value: Constants.R.later_damage.center},
                    {label: props.intl.formatMessage({id: "subject.alex.r-pulse-outer-max-hit"}, {value: rMax}), origin: "R", value: Constants.R.later_damage.outer, multiplier: rMax * 100},
                    {label: props.intl.formatMessage({id: "subject.alex.r-pulse-center-max-hit"}, {value: rMax}), origin: "R", value: Constants.R.later_damage.center, multiplier: rMax * 100},
                ]
            ]
        }
    }

    if (weaponType == "Pistol" || weaponType == "DirectFire") {
        // ranged
        return common([
            [{label: props.intl.formatMessage({id: "subject.alex.rangeq"}), origin: "Q", value: Constants.RangeQ.damage}],
            [{label: props.intl.formatMessage({id: "subject.alex.rangew"}), origin: "W", value: Constants.RangeW.damage}],            
            [{label: props.intl.formatMessage({id: "subject.alex.rangee"}), origin: "E", value: Constants.RangeE.damage}]            
        ])
    } else {
        // melee
        return common([
            [{label: props.intl.formatMessage({id: "subject.alex.meleeq"}), origin: "Q", value: Constants.MeleeQ.damage}],
            [{label: props.intl.formatMessage({id: "subject.alex.meleew"}), origin: "W", value: Constants.MeleeW.damage}]
        ])
    }
}

export default table;