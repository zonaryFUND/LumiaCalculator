import { SubjectDamageTableUnit, WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.nunchaku.min"}), skill: "D", value: Constants.nunchaku.min_damage},
    {label: props.intl.formatMessage({id: "weapon-skill.nunchaku.max"}), skill: "D", value: Constants.nunchaku.max_damage}
]

export default table;