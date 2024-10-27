import { SkillValueProps, WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.dagger.skill-damage"}), skill: "D", value: Constants.dagger.dagger.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.dagger.true-damage"}), skill: "D", value: Constants.dagger.dagger.true_damage, type: {type: "true"}}
]

export default table;