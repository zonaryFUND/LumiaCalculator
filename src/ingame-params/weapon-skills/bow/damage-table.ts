import { WeaponSkillDamageTableGenerator } from "@app/ingame-params/weapon-skills/type";
import Constants from "./constants.json";

const table: WeaponSkillDamageTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.bow.outer"}), value: Constants.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.bow.center"}), value: Constants.center_damage}
]

export default table;