import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const rChaseMax = Constants.R.total_count - 1;
const maxR = {
    base: Constants.R.first_damage.base.map((v, i) => v + Constants.R.second_damage.base[i] * rChaseMax),
    amp: Constants.R.first_damage.amp + Constants.R.second_damage.amp * rChaseMax
}

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.zahir.q-enhanced"}), skill: "Q", value: Constants.Q.enhanced_damage}
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.zahir.r-first"}), skill: "R", value: Constants.R.first_damage},
            {label: props.intl.formatMessage({id: "subject.zahir.r-second"}), skill: "R", value: Constants.R.second_damage},
            {label: props.intl.formatMessage({id: "subject.zahir.r-max-hit"}, {value: 4}), skill: "R", value: maxR}
        ],
        [{label: "T", skill: "T", value: Constants.T.damage}]
    ]
})

export default table;