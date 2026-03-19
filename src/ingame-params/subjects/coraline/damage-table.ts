import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.coraline.r-additional"}), origin: "R", value: Constants.R.basic_attack_enhancement.additional_damage}
    ],
    skill: [
        [
            {label: "Q", origin: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.coraline.q-white-mirror"}), origin: "Q", value: Constants.Q.white_mirror_damage},
            {label: props.intl.formatMessage({id: "subject.coraline.q-black-mirror"}), origin: "Q", value: Constants.Q.black_mirror_damage}
        ],
        [
            {label: "E", origin: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.coraline.e-white-mirror-damage"}), origin: "E", value: Constants.E.white_mirror_damage},
            {label: props.intl.formatMessage({id: "subject.coraline.e-white-mirror-shield"}), origin: "E", value: Constants.E.white_mirror_damage, type: {type: "shield", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.coraline.e-black-mirror"}), origin: "E", value: Constants.E.black_mirror_damage}
        ],
        [
            {label: "T", origin: "T", value: Constants.T.damage, type: {type: "true"}}
        ]
    ]
})

export default table;