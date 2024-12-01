import { WeaponSkillDamageTableGenerator } from "components/weapon-skills/type";
import Constants from "./constants.json";

const table: WeaponSkillDamageTableGenerator = props => [
    {label: "D", value: Constants.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.arcana.max-hit"}, {value: Constants.count}), value: Constants.damage, multiplier: Constants.count * 100}
];

export default table;