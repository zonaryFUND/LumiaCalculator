import { SubjectDamageTableUnit, WeaponSkillTableGenerator } from "../../damage-table";
import Constants from "../constants.json";

const facing = {
    ...Constants.camera.damage,
    base: Constants.camera.damage.base.map((v, i) => v + Constants.camera.additional_damage[i])
}

const table: WeaponSkillTableGenerator = props => [
    {label: "D", skill: "D", value: Constants.camera.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.camera.facing"}), skill: "D", value: facing},
]

export default table;