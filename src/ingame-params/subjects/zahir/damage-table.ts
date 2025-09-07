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
            {label: "Q", origin: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.zahir.q-enhanced"}), origin: "Q", value: Constants.Q.enhanced_damage}
        ],
        [{label: "W", origin: "W", value: Constants.W.damage}],
        [{label: "E", origin: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.zahir.r-first"}), origin: "R", value: Constants.R.first_damage},
            {label: props.intl.formatMessage({id: "subject.zahir.r-second"}), origin: "R", value: Constants.R.second_damage},
            {label: props.intl.formatMessage({id: "subject.zahir.r-max-hit"}, {value: 4}), origin: "R", value: maxR}
        ],
        [{label: "T", origin: "T", value: Constants.T.damage}]
    ]
})

export default table;