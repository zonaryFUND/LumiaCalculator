import { WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.pistol.movement-speed"}), value: Constants.pistol.movement_speed, type: {type: "misc", percentExpression: true}}
]

export default table;