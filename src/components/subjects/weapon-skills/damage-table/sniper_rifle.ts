import { SkillDamageProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillDamageProps[] = [
    {label: "D1", skill: "D", damage: Constants.sniper_rifle.cripping.damage},
    {label: "D2最小値", skill: "D", damage: Constants.sniper_rifle.dead_to_rights.damage},
    {label: "D2最大値", skill: "D", damage: Constants.sniper_rifle.dead_to_rights.damage, multiplier: Constants.sniper_rifle.dead_to_rights.max_damage_multiplier * 100}
]

export default table;