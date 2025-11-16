import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const enhanceQ = {
    base: Constants.Q.damage.base.map((v, i) => v + Constants.Q.additional_damage.base[i]),
    amp: Constants.Q.damage.amp + Constants.Q.additional_damage.amp
}

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.fiora.q-inner"}), origin: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.fiora.q-tip"}), origin: "Q", value: enhanceQ}
        ],
        [
            {label: "W", origin: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.fiora.w-max-hit"}, {value: 2}), origin: "W", value: Constants.W.damage, multiplier: 200}
        ],
        [{label: "E", origin: "E", value: Constants.E.damage}],
        [
            {label: "R", origin: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.fiora.r-finish"}), origin: "R", value: Constants.R.finish_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.fiora.t-damage"}), origin: "T", value: Constants.T.damage},
<<<<<<< HEAD
            {label: props.intl.formatMessage({id: "subject.fiora.t-heal"}), origin: "T", value: Constants.T.heal, type: {type: "heal", target: "self"}}
=======
            {label: props.intl.formatMessage({id: "subject.fiora.t-heal"}), origin: "T", value: Constants.T.heal, type: {type: "heal", target: "self"}},
>>>>>>> recovery-9.0
        ]
    ]   
})

export default table;