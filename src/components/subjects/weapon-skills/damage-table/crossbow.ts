import { WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: "D", value: Constants.crossbow.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.crossbow.hit_and_wall"}), value: Constants.crossbow.damage, multiplier: 200}
]

export default table;