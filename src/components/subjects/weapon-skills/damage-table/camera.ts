import { SkillDamageProps } from "../../damage-table";
import Constants from "../constants.json";

const facing = {
    ...Constants.camera.damage,
    base: Constants.camera.damage.base.map((v, i) => v + Constants.camera.additional_damage[i])
}

const table: SkillDamageProps[] = [
    {label: "D", skill: "D", damage: Constants.camera.damage},
    {label: "D対面", skill: "D", damage: facing},
]

export default table;