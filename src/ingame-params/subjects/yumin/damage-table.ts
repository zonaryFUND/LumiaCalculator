import { WeaponTypeID } from "app-types/equipment/weapon";
import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const qMax = Constants.Q.vortex_duration / Constants.Q.vortex_tick;

const table: DamageTableGenerator = props => {
    return {
        basicAttack: ["standard"],
        skill: [
            [
                {label: "Q", origin: "Q", value: Constants.Q.damage},
                {label: props.intl.formatMessage({id: "subject.yumin.q-maxhit"}, {value: 3}), origin: "Q", value: Constants.Q.damage, multiplier: 300},
                {label: props.intl.formatMessage({id: "subject.yumin.q-weak"}), origin: "Q", value: Constants.Q.damage, multiplier: Constants.Q.second_hit},
                {label: props.intl.formatMessage({id: "subject.yumin.q-enhanced-1tick"}), origin: "Q", value: Constants.Q.vortex_damage},
                {label: props.intl.formatMessage({id: "subject.yumin.q-enhanced-maxtick"}, {value: qMax}), origin: "Q", value: Constants.Q.vortex_damage, multiplier: qMax * 100}
            ],
            [
                {label: "W", origin: "W", value: Constants.W.damage},
                {label: props.intl.formatMessage({id: "subject.yumin.w-enhanced"}), origin: "W", value: Constants.W.enhanced_damage},
            ],
            [{label: "E", origin: "E", value: Constants.E.damage}],
            [
                {label: props.intl.formatMessage({id: "subject.yumin.r-first"}), origin: "R", value: Constants.R.damage},
                {label: props.intl.formatMessage({id: "subject.yumin.r-second"}), origin: "R", value: Constants.R.second_damage}
            ], 
            [{label: props.intl.formatMessage({id: "subject.yumin.t-shield"}), origin: "T", value: Constants.T.shield, type: { type: "shield", target: "self"  }}]
        ]   
    }
}

export default table;