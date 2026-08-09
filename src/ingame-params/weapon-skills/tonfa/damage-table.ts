import { WeaponSkillDamageTableGenerator } from "@app/ingame-params/weapon-skills/type";
import Constants from "./constants.json";

const table: WeaponSkillDamageTableGenerator = props => [
    {label: "D", value: Constants.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.tonfa.multiple-hit"}), value: Constants.damage, multiplier: 100 - Constants.multiple_hit_decline}
]   

export default table;