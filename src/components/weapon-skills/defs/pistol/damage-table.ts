import { WeaponSkillDamageTableGenerator } from "components/weapon-skills/type";
import Constants from "./constants.json";

const table: WeaponSkillDamageTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.pistol.movement-speed"}), value: Constants.movement_speed, type: {type: "misc", percentExpression: true}}
]

export default table;