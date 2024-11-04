import { WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: "D", value: Constants.whip.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.whip.2hit"}), value: Constants.whip.damage, multiplier: 200}
]

export default table;