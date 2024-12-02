import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        {label: props.intl.formatMessage({id: "subject.lyanh.human-aa"}), skill: "T", value: Constants.LyAnhT.human_basic_attack, type: {type: "basic"}},
        {label: props.intl.formatMessage({id: "subject.lyanh.possessed-aa"}), skill: "T", value: Constants.LyAnhT.possessed_basic_attack, type: {type: "basic"}},
        {label: props.intl.formatMessage({id: "subject.lyanh.ghost-aa"}), skill: "T", value: Constants.LyAnhT.ghost_basic_attack}
    ],
    skill: [
        [{label: props.intl.formatMessage({id: "subject.lyanh.humanq"}), skill: "Q", value: Constants.LyAnhQ.damage}],
        [{label: props.intl.formatMessage({id: "subject.lyanh.humanw"}), skill: "W", value: Constants.LyAnhW.damage}],
        [{label: props.intl.formatMessage({id: "subject.lyanh.humane"}), skill: "E", value: Constants.LyAnhE.damage}],
        [{label: props.intl.formatMessage({id: "subject.lyanh.ghostq"}), skill: "Q", value: Constants.GhostQ.damage}],
        [{label: props.intl.formatMessage({id: "subject.lyanh.ghostw"}), skill: "W", value: Constants.GhostW.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.lyanh.ghoste-swing"}), skill: "E", value: Constants.GhostE.first_damage},
            {label: props.intl.formatMessage({id: "subject.lyanh.ghoste-pull"}), skill: "E", value: Constants.GhostE.second_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.lyanh.r-jump-out"}), skill: "R", value: Constants.LyAnhR.damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.lyanh.additional-true-damage"}), skill: "T", value: Constants.LyAnhT.additional_damage, type: {type: "true"}},
            {label: props.intl.formatMessage({id: "subject.lyanh.possessed-heal"}), skill: "T", value: Constants.LyAnhT.additional_damage, multiplier: Constants.LyAnhT.possesed_heal, type: {type: "heal", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.lyanh.ghost-heal"}), skill: "T", value: Constants.LyAnhT.additional_damage, multiplier: Constants.LyAnhT.ghost_heal, type: {type: "heal", target: "self"}}
        ]
    ]    
})

export default table;