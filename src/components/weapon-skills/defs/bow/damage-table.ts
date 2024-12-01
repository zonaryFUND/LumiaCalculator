import { WeaponSkillDamageTableGenerator } from "components/weapon-skills/type";
import Constants from "./constants.json";

const table: WeaponSkillDamageTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.bow.outer"}), skill: "D", value: Constants.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.bow.center"}), skill: "D", value: Constants.center_damage}
]

export default table;