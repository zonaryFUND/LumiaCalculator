import { WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: "D1", value: Constants.dualsword.first_damage},
    {label: props.intl.formatMessage({id: "weapon-skill.dual-sword.d1-max-hit"}, {value: Constants.dualsword.first_count}), value: Constants.dualsword.first_damage, multiplier: Constants.dualsword.first_count * 100},
    {label: "D2", value: Constants.dualsword.second_damage},
]

export default table;