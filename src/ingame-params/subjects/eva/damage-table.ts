import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const rSet = {
    base: Constants.R.damage.base.map((d, i) => d * Constants.R.max_stack + Constants.R.stack_damage.base[i]),
    amp: Constants.R.damage.amp * Constants.R.max_stack + Constants.R.stack_damage.amp
}

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.eva.passive-additional"}), origin: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.eva.q-pass"}), origin: "Q", value: Constants.Q.first_damage},
            {label: props.intl.formatMessage({id: "subject.eva.q-blast"}), origin: "Q", value: Constants.Q.second_damage},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.eva.w-first"}), origin: "W", value: Constants.W.first_damage},
            {label: props.intl.formatMessage({id: "subject.eva.w-blast"}), origin: "W", value: Constants.W.second_damage},
        ],
        [{label: props.intl.formatMessage({id: "subject.eva.e-additional"}), origin: "E", value: Constants.E.damage}],
        [   
            {label: props.intl.formatMessage({id: "subject.eva.r-base"}), origin: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.eva.r-additional"}, {value: Constants.R.max_stack}), origin: "R", value: Constants.R.stack_damage},
            {label: props.intl.formatMessage({id: "subject.eva.r-set"}, {value: Constants.R.max_stack, set: Constants.R.max_stack * Constants.R.tick}), origin: "R", value: rSet}
        ]
    ]
})

export default table;