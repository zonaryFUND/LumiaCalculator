import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.bihyung.q-additional"}), origin: "Q", value: Constants.Q.first_damage},
        {label: props.intl.formatMessage({id: "subject.bihyung.q-additional-area"}), origin: "Q", value: Constants.Q.first_damage, multiplier: Constants.Q.additional_area_damage},
        {label: props.intl.formatMessage({id: "subject.bihyung.q-reuse-chase-basic-attack"}), origin: "Q", value: Constants.Q.reuse_chase_damage.basic_attack_damage, type: {type: "basic"}},
        {label: props.intl.formatMessage({id: "subject.bihyung.q-reuse-chase-basic-attack-2"}), origin: "Q", value: Constants.Q.reuse_chase_damage.basic_attack_damage, type: {type: "basic"}, multiplier: 200},
        {label: props.intl.formatMessage({id: "subject.bihyung.q-reuse-chase-skill"}), origin: "Q", value: Constants.Q.reuse_chase_damage.skill_damage},
        {label: props.intl.formatMessage({id: "subject.bihyung.q-reuse-chase-skill-2"}), origin: "Q", value: Constants.Q.reuse_chase_damage.skill_damage, multiplier: 200},
        {label: props.intl.formatMessage({id: "subject.bihyung.q-reuse-chase-skill-area"}), origin: "Q", value: Constants.Q.reuse_chase_damage.skill_damage, multiplier: Constants.Q.additional_area_damage},
        {label: props.intl.formatMessage({id: "subject.bihyung.q-reuse-chase-skill-area-2"}), origin: "Q", value: Constants.Q.reuse_chase_damage.skill_damage, multiplier: 2 * Constants.Q.additional_area_damage}
    ],
    skill: [
        [
            {label: "W", origin: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.bihyung.w-shield"}), origin: "W", value: Constants.W.shield.effect, type: {type: "shield", target: "self"}}
        ],
        [
            {label: "E", origin: "E", value: Constants.E.damage},
        ],
        [
            {label: "R", origin: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.bihyung.r-center"}), origin: "R", value: Constants.R.damage, multiplier: 100 + Constants.R.center_amp},
        ],
        [
            {label: "T", origin: "T", value: Constants.T.damage}
        ]
    ]   
})

export default table;