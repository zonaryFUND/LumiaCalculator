import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.adela.q-pawn"}), skill: "Q", value: Constants.Q.pawn_damage},
            {label: props.intl.formatMessage({id: "subject.adela.q-queen"}), skill: "Q", value: Constants.Q.queen_damage},
            {label: props.intl.formatMessage({id: "subject.adela.q-pawn-reactivation"}), skill: "Q", value: Constants.Q.pawn_damage, multiplier: Constants.W.pawn_queen.damage},
            {label: props.intl.formatMessage({id: "subject.adela.q-queen-reactivation"}), skill: "Q", value: Constants.Q.queen_damage, multiplier: Constants.W.pawn_queen.damage}
        ],
        [
            {label: "W", skill: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.adela.w-2hit"}), skill: "W", value: Constants.W.damage, multiplier: 200},
            {label: props.intl.formatMessage({id: "subject.adela.w-reactivation"}), skill: "W", value: Constants.W.damage, multiplier: Constants.W.pawn_queen.damage},
        ],
        [
            {label: "E", skill: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.adela.e-reactivation"}), skill: "E", value: Constants.E.damage, multiplier: Constants.W.pawn_queen.damage},
        ],
        [
            {label: "R", skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.adela.r-damage-per-piece"}), skill: "R", value: Constants.R.per_piece, type: {type: "true"}}
        ]
    ]
})

export default table;