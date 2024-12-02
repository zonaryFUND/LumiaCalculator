import { WeaponSkillDamageTableGenerator } from "@app/ingame-params/weapon-skills/type";
import Constants from "./constants.json";

const table: WeaponSkillDamageTableGenerator = props => [
    {label: "D1", value: Constants.first_damage},
    {label: props.intl.formatMessage({id: "weapon-skill.dual-sword.d1-max-hit"}, {value: Constants.first_count}), value: Constants.first_damage, multiplier: Constants.first_count * 100},
    {label: "D2", value: Constants.second_damage},
]   

export default table;