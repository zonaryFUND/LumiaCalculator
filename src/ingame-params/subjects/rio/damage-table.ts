import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";
import { RioTStrategy } from "./t";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        { label: props.intl.formatMessage({ id: "subject.rio.hankyu-aa" }), origin: "Q", value: RioTStrategy("hankyu"), type: { type: "basic", critical: "none" } },
        { label: props.intl.formatMessage({ id: "subject.rio.hankyu-aa-additional" }), origin: "Q", value: RioTStrategy("hankyu-additional"), type: { type: "basic", critical: "none" } },
        { label: props.intl.formatMessage({ id: "subject.rio.hankyu-aa-3hit" }), origin: "Q", value: RioTStrategy("hankyu-3"), type: { type: "basic", critical: "none", hitCount: 3 } },
        { label: props.intl.formatMessage({ id: "subject.rio.daikyu-aa" }), origin: "Q", value: RioTStrategy("daikyu"), type: { type: "basic", critical: "none" } }
    ],
    skill: [
        [
            { label: props.intl.formatMessage({ id: "subject.rio.hankyu-w" }), origin: "W", value: Constants.W.hankyu_damage },
            { label: props.intl.formatMessage({ id: "subject.rio.hankyu-w-2hit" }), origin: "W", value: Constants.W.hankyu_damage, multiplier: 100 + 4 * Constants.W.multiple_hit },
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.rio.daikyu-w" }), origin: "W", value: Constants.W.daikyu_damage },
            { label: props.intl.formatMessage({ id: "subject.rio.daikyu-w-penetrate" }), origin: "W", value: Constants.W.daikyu_behind_damage }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.rio.hankyu-e" }), origin: "E", value: Constants.E.hankyu_damage },
            { label: props.intl.formatMessage({ id: "subject.rio.hankyu-e-3hit" }), origin: "E", value: Constants.E.hankyu_damage, multiplier: 300 }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.rio.daikyu-e" }), origin: "E", value: Constants.E.daikyu_damage },
            { label: props.intl.formatMessage({ id: "subject.rio.daikyu-e-splash" }), origin: "E", value: Constants.E.daikyu_range_damage }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.rio.hankyu-r1" }), origin: "R", value: Constants.R.hankyu_first_damage },
            { label: props.intl.formatMessage({ id: "subject.rio.hankyu-r1-max-hit" }, { value: 3 }), origin: "R", value: Constants.R.hankyu_first_damage, multiplier: 300 },
            { label: props.intl.formatMessage({ id: "subject.rio.hankyu-r2" }), origin: "R", value: Constants.R.hankyu_second_damage },
            { label: props.intl.formatMessage({ id: "subject.rio.hankyu-r2-wall" }), origin: "R", value: Constants.R.hankyu_wall_damage }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.rio.daikyu-r" }), origin: "R", value: Constants.R.daikyu_damage },
            { label: props.intl.formatMessage({ id: "subject.rio.daikyu-r-enhanced" }), origin: "R", value: Constants.R.daikyu_damage, multiplier: Constants.R.daikyu_enhance.damage + 100 }
        ]
    ]
})

export default table;