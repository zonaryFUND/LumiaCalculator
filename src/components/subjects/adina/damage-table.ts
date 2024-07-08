import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q", "skill": "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.adina.q-sun"}), "skill": "Q", value: Constants.Q.sun}
        ],
        [
            {label: "W", "skill": "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.adina.w-sun"}), "skill": "W", value: Constants.W.sun},
            {label: props.intl.formatMessage({id: "subject.adina.w-star"}), "skill": "W", value: Constants.W.star.shield, type: "shield", target: "any"},
        ],
        [
            {label: "E", "skill": "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.adina.e-2hit"}), "skill": "E", value: Constants.E.damage, multiplier: [{basic: 200}]},
            {label: props.intl.formatMessage({id: "subject.adina.e-sun"}), "skill": "E", value: Constants.E.sun},
            {label: props.intl.formatMessage({id: "subject.adina.e-star"}), "skill": "E", value: Constants.E.damage, multiplier: [{basic: Constants.E.star}], type: "heal", target: "any"},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.adina.sun-conjunction"}), skill: "R", value: Constants.R.sun_conjunction},
            {label: props.intl.formatMessage({id: "subject.adina.sun-conjunction-dot-sum"}), skill: "R", value: Constants.Q.conjunction.damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.adina.moon-conjunction"}), skill: "R", value: Constants.R.moon_conjunction},
            {label: props.intl.formatMessage({id: "subject.adina.moon-conjunction-2hit"}), skill: "R", value: Constants.R.moon_conjunction, multiplier: [{basic: 200}]}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.adina.star-conjunction-heal"}), skill: "R", value: Constants.R.star_conjunction.hp, type: "heal", target: "any"},
            {label: props.intl.formatMessage({id: "subject.adina.star-conjunction-heal-sum"}), skill: "R", value: Constants.R.star_conjunction.hp, type: "heal", target: "any", multiplier: [{basic: Constants.E.conjunction * 100}]},
            {label: props.intl.formatMessage({id: "subject.adina.star-conjunction-sp-heal"}), skill: "R", value: Constants.R.star_conjunction.sp, type: "heal", target: "any"},
            {label: props.intl.formatMessage({id: "subject.adina.star-conjunction-sp-heal-sum"}), skill: "R", value: Constants.R.star_conjunction.sp, type: "heal", target: "any", multiplier: [{basic: Constants.E.conjunction * 100}]},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.adina.passive-movement-speed"}), skill: "T", value: Constants.T.movement_speed, type: "ms"}
        ]
    ]
})

export default table;