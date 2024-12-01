import { WeaponSkillDamageTableGenerator } from "components/weapon-skills/type";
import Constants from "./constants.json";

const table: WeaponSkillDamageTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.shuriken.base"}), value: Constants.damage}
]   

export default table;