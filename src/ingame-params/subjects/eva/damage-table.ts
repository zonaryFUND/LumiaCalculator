import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const rSet = {
    base: Constants.R.damage.base.map((d, i) => d * Constants.R.max_stack + Constants.R.stack_damage.base[i]),
    amp: Constants.R.damage.amp * Constants.R.max_stack + Constants.R.stack_damage.amp
}

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.eva.passive-additional"}), skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.eva.q-pass"}), skill: "Q", value: Constants.Q.first_damage},
            {label: props.intl.formatMessage({id: "subject.eva.q-blast"}), skill: "Q", value: Constants.Q.second_damage},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.eva.w-first"}), skill: "W", value: Constants.W.first_damage},
            {label: props.intl.formatMessage({id: "subject.eva.w-blast"}), skill: "W", value: Constants.W.second_damage},
        ],
        [{label: props.intl.formatMessage({id: "subject.eva.e-additional"}), skill: "E", value: Constants.E.damage}],
        [   
            {label: props.intl.formatMessage({id: "subject.eva.r-base"}), skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.eva.r-additional"}, {value: Constants.R.max_stack}), skill: "R", value: Constants.R.stack_damage},
            {label: props.intl.formatMessage({id: "subject.eva.r-set"}, {value: Constants.R.max_stack, set: Constants.R.max_stack * Constants.R.tick}), skill: "R", value: rSet}
        ]
    ]
})

export default table;