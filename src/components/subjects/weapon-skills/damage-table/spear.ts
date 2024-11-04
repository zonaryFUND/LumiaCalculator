import { WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: "D", value: Constants.spear.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.spear.near"}), value: Constants.spear.damage, multiplier: 200}
]

export default table;