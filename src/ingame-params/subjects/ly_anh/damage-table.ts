import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        {label: props.intl.formatMessage({id: "subject.lyanh.human-aa"}), origin: "T", value: Constants.LyAnhT.human_basic_attack, type: {type: "basic"}},
        {label: props.intl.formatMessage({id: "subject.lyanh.possessed-aa"}), origin: "T", value: Constants.LyAnhT.possessed_basic_attack, type: {type: "basic"}},
        {label: props.intl.formatMessage({id: "subject.lyanh.ghost-aa"}), origin: "T", value: Constants.LyAnhT.ghost_basic_attack}
    ],
    skill: [
        [{label: props.intl.formatMessage({id: "subject.lyanh.humanq"}), origin: "Q", value: Constants.LyAnhQ.damage}],
        [{label: props.intl.formatMessage({id: "subject.lyanh.humanw"}), origin: "W", value: Constants.LyAnhW.damage}],
        [{label: props.intl.formatMessage({id: "subject.lyanh.humane"}), origin: "E", value: Constants.LyAnhE.damage}],
        [{label: props.intl.formatMessage({id: "subject.lyanh.ghostq"}), origin: "Q", value: Constants.GhostQ.damage}],
        [{label: props.intl.formatMessage({id: "subject.lyanh.ghostw"}), origin: "W", value: Constants.GhostW.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.lyanh.ghoste-swing"}), origin: "E", value: Constants.GhostE.first_damage},
            {label: props.intl.formatMessage({id: "subject.lyanh.ghoste-pull"}), origin: "E", value: Constants.GhostE.second_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.lyanh.r-jump-out"}), origin: "R", value: Constants.LyAnhR.damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.lyanh.additional-true-damage"}), origin: "T", value: Constants.LyAnhT.additional_damage, type: {type: "true"}},
            {label: props.intl.formatMessage({id: "subject.lyanh.possessed-heal"}), origin: "T", value: Constants.LyAnhT.additional_damage, multiplier: Constants.LyAnhT.possesed_heal, type: {type: "heal", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.lyanh.ghost-heal"}), origin: "T", value: Constants.LyAnhT.additional_damage, multiplier: Constants.LyAnhT.ghost_heal, type: {type: "heal", target: "self"}}
        ]
    ]    
})

export default table;