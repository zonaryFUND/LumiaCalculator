import { SkillValueProps } from "../../damage-table";
import Constants from "../constants.json";

const facing = {
    ...Constants.camera.damage,
    base: Constants.camera.damage.base.map((v, i) => v + Constants.camera.additional_damage[i])
}

const table: SkillValueProps[] = [
    {label: "D", skill: "D", value: Constants.camera.damage},
    {label: "D対面", skill: "D", value: facing},
]

export default table;