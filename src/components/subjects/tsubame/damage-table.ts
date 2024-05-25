import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["disable-critical"],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage}
        ],
        /*
        [...Array(Constants.R.max_stack + 1)].map((_, i) => ({
            label: `R${i > 0 ? `(${i}スタック)` : ""}`,
            skill: "R",
            damage: Constants.R.damage,
            multiplier: i > 0 ? (Constants.R.damage_increase_per_stack * i) + 100 : undefined
        }))
        */
    ]
}

export default table;