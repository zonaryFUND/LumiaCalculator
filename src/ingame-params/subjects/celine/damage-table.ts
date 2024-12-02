import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.celine.passive-additional"}), skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [...Array(Constants.Q.max_bomb)].map((_, i) => ({
            label: props.intl.formatMessage({id: "subject.celine.q"}, {value: i + 1}), skill: "Q", value: Constants.Q.damage, multiplier: i == 0 ? undefined : (100 + Constants.Q.multiple_bomb_damage_multiplier * i)
        })),
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [...Array(Constants.R.max_level)].map((_, i) => ({
            label: props.intl.formatMessage({id: "subject.celine.r"}, {value: i + 1}), skill: "R", value: Constants.R.damage, multiplier: i == 0 ? undefined : ((i + 1) * 100)
        }))
    ]   
})

export default table;