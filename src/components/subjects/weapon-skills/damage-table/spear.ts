import { SkillValueProps, WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: "D", skill: "D", value: Constants.spear.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.spear.near"}), skill: "D", value: Constants.spear.damage, multiplier: [{basic: 200}]}
]

export default table;