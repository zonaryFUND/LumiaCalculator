import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Qポーン", skill: "Q", value: Constants.Q.pawn_damage},
            {label: "Qクイーン", skill: "Q", value: Constants.Q.queen_damage},
            {label: "Qポーン誘爆", skill: "Q", value: Constants.Q.pawn_damage, multiplier: Constants.W.pawn_queen.damage},
            {label: "Qクイーン誘爆", skill: "Q", value: Constants.Q.queen_damage, multiplier: Constants.W.pawn_queen.damage}
        ],
        [
            {label: "W", skill: "W", value: Constants.W.damage},
            {label: "W(2ヒット)", skill: "W", value: Constants.W.damage, multiplier: 200},
            {label: "W誘爆", skill: "W", value: Constants.W.damage, multiplier: Constants.W.pawn_queen.damage },
        ],
        [
            {label: "E", skill: "E", value: Constants.E.damage},
            {label: "E誘爆", skill: "E", value: Constants.E.damage, multiplier: Constants.W.pawn_queen.damage},
        ],
        [
            {label: "R", skill: "R", value: Constants.R.damage},
            {label: "R追加ダメージ(駒1つあたり)", skill: "R", value: Constants.R.per_piece, type: "true"}
        ]
    ]
}

export default table;