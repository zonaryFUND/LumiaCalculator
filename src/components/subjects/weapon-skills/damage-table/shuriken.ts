import { SubjectDamageTableUnit, WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.shuriken.base"}), skill: "D", value: Constants.shuriken.damage}
]

export default table;