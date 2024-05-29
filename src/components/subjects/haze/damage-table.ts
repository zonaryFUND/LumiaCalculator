import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const oneAmmoQ = {
    base: Constants.Q2.damage.base,
    amp: Constants.Q2.damage.amp + Constants.Q2.damage.amp_per_ammo
    
}

const fullAmmoQ = {
    base: Constants.Q2.damage.base,
    amp: Constants.Q2.damage.amp + Constants.Q2.damage.amp_per_ammo * Constants.E.ammo
}

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.haze.passive-additional"}), skill: "T", value: Constants.T.damage},
        {label: props.intl.formatMessage({id: "subject.haze.r-additional"}), skill: "R", value: Constants.R.area_damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.haze.q-outer"}), skill: "Q", value: Constants.Q.outer_damage},
            {label: props.intl.formatMessage({id: "subject.haze.q-center"}), skill: "Q", value: Constants.Q.center_damage}
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.haze.e-1hit"}), skill: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.haze.e-max-hit"}, {value: Constants.E.ammo}), skill: "E", value: Constants.E.damage, multiplier: [{basic: Constants.E.ammo * 100}]},
            {label: props.intl.formatMessage({id: "subject.haze.eq-1ammo"}), skill: "Q", value: oneAmmoQ},
            {label: props.intl.formatMessage({id: "subject.haze.eq-max-ammo"}, {value: Constants.E.ammo}), skill: "Q", value: fullAmmoQ}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.haze.r-swap"}), skill: "R", value: Constants.R.switch_damage},
            {label: props.intl.formatMessage({id: "subject.haze.rq"}), skill: "Q", value: Constants.Q3.damage},
            {label: props.intl.formatMessage({id: "subject.haze.rq-enhanced"}), skill: "Q", value: Constants.Q3.damage, multiplier: [{basic: 100 + Constants.Q3.enhance}]}
        ]
    ]   
})

export default table;