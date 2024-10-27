import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const enhanceQ = {
    base: Constants.Q.damage.base.map((v, i) => v + Constants.Q.additional_damage.base[i]),
    amp: Constants.Q.damage.amp + Constants.Q.additional_damage.amp
}

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.fiora.q-inner"}), skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.fiora.q-tip"}), skill: "Q", value: enhanceQ}
        ],
        [
            {label: "W", skill: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.fiora.w-max-hit"}, {value: 2}), skill: "W", value: Constants.W.damage, multiplier: 200}
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: "R", skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.fiora.r-finish"}), skill: "R", value: Constants.R.finish_damage}
        ],
        [{label: "T", skill: "T", value: Constants.T.damage}]
    ]   
})

export default table;