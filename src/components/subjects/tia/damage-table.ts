import { DamageTable, DamageTableGenerator, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const blue = {
    ...Constants.Q.damage,
    base: Constants.Q.damage.base.map((v, i) => v + Constants.Q.b.center_addition.base[i])
}

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.tia.q-yr-b-outer"}), skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.tia.q-b-center"}), skill: "Q", value: blue}
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [{label: "R", skill: "R", value: Constants.R.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.tia.passive-yr"}), skill: "T", value: Constants.T.yr.damage},
            {label: props.intl.formatMessage({id: "subject.tia.passive-rb"}), skill: "T", value: Constants.T.rb.damage},
            {label: props.intl.formatMessage({id: "subject.tia.passive-by"}), skill: "T", value: Constants.T.by.damage}
        ]
    ]   
})

export default table;