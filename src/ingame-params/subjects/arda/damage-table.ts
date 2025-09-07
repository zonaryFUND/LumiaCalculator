import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [{label: "Q", origin: "Q", value: Constants.Q.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.arda.w-appear"}), origin: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.arda.w-disappear"}), origin: "W", value: Constants.W.vanish_damage},
        ],
        [{label: "E", origin: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.arda.rq-character"}), origin: "R", value: Constants.R.Q.damage},
            {label: props.intl.formatMessage({id: "subject.arda.rw-wall"}), origin: "R", value: Constants.R.W.damage},
            {label: props.intl.formatMessage({id: "subject.arda.rw-wall-max-hit"}, {value: 4}), origin: "R", value: Constants.R.W.damage, multiplier: 400},
            {label: props.intl.formatMessage({id: "subject.arda.rw-inner-max-hit"}, {value: 4}), origin: "R", value: Constants.W.damage, multiplier: 400}
        ],
        [{label: props.intl.formatMessage({id: "subject.arda.passive-heal"}), origin: "T", value: Constants.T.heal, type: {type: "heal", target: "any"}}]
    ]
})


export default table;