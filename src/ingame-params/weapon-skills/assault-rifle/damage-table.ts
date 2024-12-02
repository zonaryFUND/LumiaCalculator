import { WeaponSkillDamageTableGenerator } from "@app/ingame-params/weapon-skills/type";
import Constants from "./constants.json";

const table: WeaponSkillDamageTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.assault-rifle.max"}), value: {base: Constants.max_stack.map(v => Constants.per_stack.basic_attack_addition * v)}, type: {type: "true"}}
]

export default table;