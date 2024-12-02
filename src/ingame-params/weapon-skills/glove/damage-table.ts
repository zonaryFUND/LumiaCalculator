import { WeaponSkillDamageTableGenerator } from "@app/ingame-params/weapon-skills/type";
import Constants from "./constants.json";

const table: WeaponSkillDamageTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.glove.base"}), value: Constants.damage, type: {type: "basic", critical: "none"}},
    {label: props.intl.formatMessage({id: "weapon-skill.glove.base-plus-additional"}), value: Constants.damage, multiplier: Constants.additional_damage.map(v => v + 100), type: {type: "basic", critical: "none"}},
    {label: props.intl.formatMessage({id: "weapon-skill.glove.true"}), value: Constants.true_damage, type: {type: "true"}}
]   

export default table;