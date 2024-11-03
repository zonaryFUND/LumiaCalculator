import { DamageTableGenerator, SubjectDamageTableUnit } from "../damage-table";
import Constants from "./constants.json";
import extractWeaponTypeID from "app-types/subject-dynamic/config/extract-weapon-type-id";

const table: DamageTableGenerator = props => {
    const weaponType = extractWeaponTypeID(props.config);

    return {
        basicAttack: [
            "standard",
            {label: props.intl.formatMessage({id: "subject.jackie.passive-additional"}), skill: "T", value: Constants.T.damage},
            {label: props.intl.formatMessage({id: "subject.jackie.r-additional"}), skill: "R", value: Constants.R.damage}
        ],
        skill: [
            [
                {label: "Q1", skill: "Q", value: Constants.Q.first_damage},
                {label: "Q2", skill: "Q", value: Constants.Q.second_damage}
            ],
            ([
                {label: props.intl.formatMessage({id: "subject.jackie.w-min"}), skill: "W", value: Constants.W.heal, type: "heal", target: "self"},
                {label: props.intl.formatMessage({id: "subject.jackie.w-max"}), skill: "W", value: Constants.W.heal, multiplier: Constants.W.heal_max_multiplier * 100, type: {type: "heal", target: "self"}}
            ] as SubjectDamageTableUnit[]).concat(weaponType == "dual_swords" ? [
                {label: props.intl.formatMessage({id: "subject.jackie.rw-dualsword-min"}), skill: "W", value: Constants.W.heal, type: {type: "heal", target: "self"}, multiplier: Constants.R.dualsword_w_heal_multiplier * 100},
                {label: props.intl.formatMessage({id: "subject.jackie.rw-dualsword-max"}), skill: "W", value: Constants.W.heal, multiplier: Constants.W.heal_max_multiplier * Constants.R.dualsword_w_heal_multiplier * 100, type: {type: "heal", target: "self"}}
            ] : [])
            ,
            [{label: "E", skill: "E", value: Constants.E.damage}],
            [
                {label: props.intl.formatMessage({id: "subject.jackie.r2-min"}), skill: "R", value: Constants.R.finish_damage},
                {label: props.intl.formatMessage({id: "subject.jackie.r2-max"}), skill: "R", value: Constants.R.finish_damage, multiplier: Constants.R.finish_multiplier_max * 100}
            ],
            [{label: props.intl.formatMessage({id: "subject.jackie.passive-dot-sum"}), skill: "T", value: Constants.T.bleeding_damage, type: {type: "true"}}]
        ]   
    }   
    }

export default table;