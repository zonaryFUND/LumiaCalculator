import { WeaponSkillDamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: WeaponSkillDamageTableGenerator = ({ intl }) => [
    { label: intl.formatMessage({id: "weapon-skill.high-angle-fire.center"}), value: Constants.first_damage },
    { label: intl.formatMessage({id: "weapon-skill.high-angle-fire.outer"}), value: Constants.second_damage }
]

export default table;