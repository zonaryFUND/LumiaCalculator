import { WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: "D1", value: Constants.sniperrifle.cripping.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.sniper-rifle.d2-min"}), value: Constants.sniperrifle.dead_to_rights.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.sniper-rifle.d2-max"}), value: Constants.sniperrifle.dead_to_rights.damage, multiplier: Constants.sniperrifle.dead_to_rights.max_damage_multiplier * 100}
]

export default table;