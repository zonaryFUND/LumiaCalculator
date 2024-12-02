import { WeaponSkillDamageTableGenerator } from "@app/ingame-params/weapon-skills/type";
import Constants from "./constants.json";

const facing = {
    ...Constants.damage,
    base: Constants.damage.base.map((v, i) => v + Constants.additional_damage[i])
}

const table: WeaponSkillDamageTableGenerator = props => [
    {label: "D", value: Constants.damage},
    {label: props.intl.formatMessage({id: "weapon-skill.camera.facing"}), value: facing},
]   

export default table;