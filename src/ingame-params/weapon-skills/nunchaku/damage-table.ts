import { WeaponSkillDamageTableGenerator } from "@app/ingame-params/weapon-skills/type";
import Constants from "./constants.json";

const table: WeaponSkillDamageTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.nunchaku.min"}), value: Constants.min_damage},
    {label: props.intl.formatMessage({id: "weapon-skill.nunchaku.max"}), value: Constants.max_damage}
]   

export default table;