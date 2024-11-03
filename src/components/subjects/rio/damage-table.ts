import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";
import { RioTStrategy } from "./t";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        {label: props.intl.formatMessage({id: "subject.rio.hankyu-aa"}), skill: "Q", value: RioTStrategy("hankyu"), type: {type: "basic", critical: "none"}},
        {label: props.intl.formatMessage({id: "subject.rio.hankyu-aa-2hit"}), skill: "Q", value: RioTStrategy("hankyu-2"), type: {type: "basic", critical: "none"}},
        {label: props.intl.formatMessage({id: "subject.rio.daikyu-aa"}), skill: "Q", value: RioTStrategy("daikyu"), type: {type: "basic", critical: "none"}}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.rio.hankyu-w"}), skill: "W", value: Constants.W.hankyu_damage},
            {label: props.intl.formatMessage({id: "subject.rio.hankyu-w-2hit"}), skill: "W", value: Constants.W.hankyu_damage, multiplier: 100 + 4 * Constants.W.multiple_hit},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.rio.daikyu-w"}), skill: "W", value: Constants.W.daikyu_damage},
            {label: props.intl.formatMessage({id: "subject.rio.daikyu-w-penetrate"}), skill: "W", value: Constants.W.daikyu_behind_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.rio.hankyu-e"}), skill: "E", value: Constants.E.hankyu_damage},
            {label: props.intl.formatMessage({id: "subject.rio.hankyu-e-2hit"}), skill: "E", value: Constants.E.hankyu_damage, multiplier: 200}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.rio.daikyu-e"}), skill: "E", value: Constants.E.daikyu_damage},
            {label: props.intl.formatMessage({id: "subject.rio.daikyu-e-splash"}), skill: "E", value: Constants.E.daikyu_range_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.rio.hankyu-r1"}), skill: "R", value: Constants.R.hankyu_first_damage},
            {label: props.intl.formatMessage({id: "subject.rio.hankyu-r1-max-hit"}, {value: 3}), skill: "R", value: Constants.R.hankyu_first_damage, multiplier: 300},
            {label: props.intl.formatMessage({id: "subject.rio.hankyu-r2"}), skill: "R", value: Constants.R.hankyu_second_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.rio.daikyu-r"}), skill: "R", value: Constants.R.daikyu_damage},
            {label: props.intl.formatMessage({id: "subject.rio.daikyu-r-enhanced"}), skill: "R", value: Constants.R.daikyu_damage, multiplier: Constants.R.daikyu_enhance.damage + 100}
        ]
    ]   
})

export default table;