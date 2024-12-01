import Constants from "./constants.json";
import { WeaponSkillDamageTableGenerator } from "components/weapon-skills/type";

const table: WeaponSkillDamageTableGenerator = props => [
    {label: "D1", value: Constants.cripping.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.sniper-rifle.d2-min"}), value: Constants.dead_to_rights.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.sniper-rifle.d2-max"}), value: Constants.dead_to_rights.damage, multiplier: Constants.dead_to_rights.max_damage_multiplier * 100}
]   

export default table;