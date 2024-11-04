import { WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.glove.base"}), value: Constants.glove.damage, type: {type: "basic", critical: "none"}},
    {label: props.intl.formatMessage({id: "weapon-skill.glove.base-plus-additional"}), value: Constants.glove.damage, multiplier: Constants.glove.additional_damage.map(v => v + 100), type: {type: "basic", critical: "none"}},
    {label: props.intl.formatMessage({id: "weapon-skill.glove.true"}), value: Constants.glove.true_damage, type: {type: "true"}}
]

export default table;