import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Qポーン", skill: "Q", damage: Constants.Q.pawn_damage},
            {label: "Qクイーン", skill: "Q", damage: Constants.Q.queen_damage},
            {label: "Qポーン誘爆", skill: "Q", damage: Constants.Q.pawn_damage, multiplier: Constants.W.pawn_queen.damage},
            {label: "Qクイーン誘爆", skill: "Q", damage: Constants.Q.queen_damage, multiplier: Constants.W.pawn_queen.damage}
        ],
        [
            {label: "W", skill: "W", damage: Constants.W.damage},
            {label: "W(2ヒット)", skill: "W", damage: Constants.W.damage, multiplier: 200},
            {label: "W誘爆", skill: "W", damage: Constants.W.damage, multiplier: Constants.W.pawn_queen.damage },
        ],
        [
            {label: "E", skill: "E", damage: Constants.E.damage},
            {label: "E誘爆", skill: "E", damage: Constants.E.damage, multiplier: Constants.W.pawn_queen.damage},
        ],
        [
            {label: "R", skill: "R", damage: Constants.R.damage},
            {label: "R追加ダメージ(駒1つあたり)", skill: "R", damage: Constants.R.per_piece, type: "true"}
        ]
    ]
}

export default table;