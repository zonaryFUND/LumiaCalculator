import { WeaponSkillDamageTableGenerator } from "@app/ingame-params/weapon-skills/type";
import Constants from "./constants.json";

const table: WeaponSkillDamageTableGenerator = props => [
    {label: "D", value: Constants.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.crossbow.blast"}), value: Constants.blast_damage},
    {label: props.intl.formatMessage({id: "weapon-skill.crossbow.additional"}), value: Constants.additional_damage}
]   

export default table;