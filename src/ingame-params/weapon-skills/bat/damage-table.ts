import { DamageTableUnit } from "app-types/damage-table/unit";
import Constants from "./constants.json";

const table: DamageTableUnit[] = [
    {label: "D", value: Constants.damage},
    {label: "D壁ドン", value: Constants.wall_damage}
]

export default table;
