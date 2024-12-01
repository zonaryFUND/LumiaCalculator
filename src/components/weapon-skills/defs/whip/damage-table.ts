import { WeaponSkillDamageTableGenerator } from "components/weapon-skills/type";
import Constants from "./constants.json";

const table: WeaponSkillDamageTableGenerator = props => [
    {label: "D", value: Constants.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.whip.2hit"}), value: Constants.damage, multiplier: 200}
]

export default table;