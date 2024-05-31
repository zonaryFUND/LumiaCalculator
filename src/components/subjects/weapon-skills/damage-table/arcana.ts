import { SkillValueProps, WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: "D", skill: "D", value: Constants.arcana.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.arcana.max-hit"}, {value: Constants.arcana.count}), skill: "D", value: Constants.arcana.damage, multiplier: [{basic: Constants.arcana.count * 100}]}
]

export default table;