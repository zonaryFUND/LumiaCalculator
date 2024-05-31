import { SkillValueProps, WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.assault-rifle.max"}), skill: "D", value: {base: Constants.assault_rifle.max_stack.map(v => Constants.assault_rifle.per_stack.basic_attack_addition * v)}, type: "true"}
]

export default table;