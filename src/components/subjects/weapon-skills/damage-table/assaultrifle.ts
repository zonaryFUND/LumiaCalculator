import { WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.assault-rifle.max"}), value: {base: Constants.assaultrifle.max_stack.map(v => Constants.assaultrifle.per_stack.basic_attack_addition * v)}, type: {type: "true"}}
]

export default table;