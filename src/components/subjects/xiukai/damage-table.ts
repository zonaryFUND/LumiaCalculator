import { DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [{label: props.intl.formatMessage({id: "subject.xiukai.w-heal"}), skill: "W", value: Constants.W.heal, type: "heal"}],
        [
            {label: "E1", skill: "E", value: Constants.E.first_damage},
            {label: "E2", skill: "E", value: Constants.E.second_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.xiukai.r-1hit"}), skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.xiukai.r-max-hit"}, {value: Constants.R.count}), skill: "R", value: Constants.R.damage, multiplier: [{basic: Constants.R.count * 100}]}
        ]
    ]
})

export default table;