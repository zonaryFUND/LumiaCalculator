import { SkillValueProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillValueProps[] = [
    {label: "D1", skill: "D", value: Constants.sniper_rifle.cripping.damage},
    {label: "D2最小値", skill: "D", value: Constants.sniper_rifle.dead_to_rights.damage},
    {label: "D2最大値", skill: "D", value: Constants.sniper_rifle.dead_to_rights.damage, multiplier: [{basic: Constants.sniper_rifle.dead_to_rights.max_damage_multiplier * 100}]}
]

export default table;