import { SkillValueProps, WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.pistol.movement-speed"}), skill: "D", value: Constants.pistol.movement_speed, type: "ms"}
]

export default table;