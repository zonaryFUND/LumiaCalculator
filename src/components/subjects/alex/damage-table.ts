import { DamageTable, DamageTableGenerator, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => {
    const rMax = Constants.R.later_damage.amount;

    function common(weaponDependent: SkillValueProps[][]): DamageTable {
        return {
            basicAttack: ["standard"],
            skill: [
                ...weaponDependent,
                [
                    {label: props.intl.formatMessage({id: "subject.alex.r-first-outer"}), skill: "R", value: Constants.R.first_damage.outer},
                    {label: props.intl.formatMessage({id: "subject.alex.r-first-center"}), skill: "R", value: Constants.R.first_damage.center},
                    {label: props.intl.formatMessage({id: "subject.alex.r-pulse-outer"}), skill: "R", value: Constants.R.later_damage.outer},
                    {label: props.intl.formatMessage({id: "subject.alex.r-pulse-center"}), skill: "R", value: Constants.R.later_damage.center},
                    {label: props.intl.formatMessage({id: "subject.alex.r-pulse-outer-max-hit"}, {value: rMax}), skill: "R", value: Constants.R.later_damage.outer, multiplier: rMax * 100},
                    {label: props.intl.formatMessage({id: "subject.alex.r-pulse-center-max-hit"}, {value: rMax}), skill: "R", value: Constants.R.later_damage.center, multiplier: rMax * 100},
                ]
            ]
        }
    }

    if (props.weaponType == "pistol" || props.weaponType == "shuriken") {
        // ranged
        return common([
            [{label: props.intl.formatMessage({id: "subject.alex.rangeq"}), skill: "Q", value: Constants.RangeQ.damage}],
            [{label: props.intl.formatMessage({id: "subject.alex.rangew"}), skill: "W", value: Constants.RangeW.damage}],            
            [{label: props.intl.formatMessage({id: "subject.alex.rangee"}), skill: "E", value: Constants.RangeE.damage}]            
        ])
    } else {
        // melee
        return common([
            [{label: props.intl.formatMessage({id: "subject.alex.meleeq"}), skill: "Q", value: Constants.MeleeQ.damage}],
            [{label: props.intl.formatMessage({id: "subject.alex.meleew"}), skill: "W", value: Constants.MeleeW.damage}]
        ])
    }
}

export default table;