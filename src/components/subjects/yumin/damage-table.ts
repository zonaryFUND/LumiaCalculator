import { WeaponTypeID } from "app-types/equipment/weapon";
import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const qMax = Constants.Q.vortex_duration / Constants.Q.vortex_tick;

const table: DamageTableGenerator = props => {
    return {
        basicAttack: ["standard"],
        skill: [
            [
                {label: "Q", skill: "Q", value: Constants.Q.damage},
                {label: props.intl.formatMessage({id: "subject.yumin.q-maxhit"}, {value: 3}), skill: "Q", value: Constants.Q.damage, multiplier: [{basic: 300}]},
                {label: props.intl.formatMessage({id: "subject.yumin.q-weak"}), skill: "Q", value: Constants.Q.damage, multiplier: [{basic: Constants.Q.second_hit}]},
                {label: props.intl.formatMessage({id: "subject.yumin.q-enhanced-1tick"}), skill: "Q", value: Constants.Q.vortex_damage},
                {label: props.intl.formatMessage({id: "subject.yumin.q-enhanced-maxtick"}, {value: qMax}), skill: "Q", value: Constants.Q.vortex_damage, multiplier: [{basic: qMax * 100}]}
            ],
            [
                {label: "W", skill: "W", value: Constants.W.damage},
                {label: props.intl.formatMessage({id: "subject.yumin.w-enhanced"}), skill: "W", value: Constants.W.enhanced_damage},
            ],
            [{label: "E", skill: "E", value: Constants.E.damage}],
            [
                {label: props.intl.formatMessage({id: "subject.yumin.r-first"}), skill: "R", value: Constants.R.damage},
                {label: props.intl.formatMessage({id: "subject.yumin.r-second"}), skill: "R", value: Constants.R.second_damage}
            ],
            [{label: props.intl.formatMessage({id: "subject.yumin.t-shield"}), skill: "T", value: Constants.T.shield, type: "shield", target: "self"}]
        ]   
    }
}

export default table;