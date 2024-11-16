import { WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const table: WeaponSkillTableGenerator = props => [
    {label: props.intl.formatMessage({id: "weapon-skill.dagger.skill-damage"}), value: Constants.onehandsword.dagger.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.dagger.true-damage"}), value: Constants.onehandsword.dagger.true_damage, type: {type: "true"}}
]

export default table;