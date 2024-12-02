import { WeaponSkillDamageTableGenerator } from "@app/ingame-params/weapon-skills/type";
import Constants from "./constants.json";

const table: WeaponSkillDamageTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.dagger.skill-damage"}), value: Constants.dagger.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.dagger.true-damage"}), value: Constants.dagger.true_damage, type: {type: "true"}}
]   

export default table;