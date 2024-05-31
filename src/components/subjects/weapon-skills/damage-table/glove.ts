import { SkillValueProps, WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.glove.base"}), skill: "D", value: Constants.glove.damage, type: "basic"},
    {label: props.intl.formatMessage({id: "weapon-skill.glove.base-plus-additional"}), skill: "D", value: Constants.glove.damage, multiplier: [{basic: Constants.glove.additional_damage.map(v => v + 100)}], type: "basic"},
    {label: props.intl.formatMessage({id: "weapon-skill.glove.true"}), skill: "D", value: Constants.glove.true_damage, type: "true"}
]

export default table;