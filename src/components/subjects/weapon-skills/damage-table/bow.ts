import { WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.bow.outer"}), skill: "D", value: Constants.bow.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.bow.center"}), skill: "D", value: Constants.bow.center_damage}
]

export default table;