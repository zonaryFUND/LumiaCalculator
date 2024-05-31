import { SkillValueProps, WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: "D", skill: "D", value: Constants.whip.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.whip.2hit"}), skill: "D", value: Constants.whip.damage, multiplier: [{basic: 200}]}
]

export default table;