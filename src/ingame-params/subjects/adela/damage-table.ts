import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.adela.q-pawn"}), origin: "Q", value: Constants.Q.pawn_damage},
            {label: props.intl.formatMessage({id: "subject.adela.q-queen"}), origin: "Q", value: Constants.Q.queen_damage},
            {label: props.intl.formatMessage({id: "subject.adela.q-pawn-reactivation"}), origin: "Q", value: Constants.Q.pawn_damage, multiplier: Constants.W.pawn_queen.damage},
            {label: props.intl.formatMessage({id: "subject.adela.q-queen-reactivation"}), origin: "Q", value: Constants.Q.queen_damage, multiplier: Constants.W.pawn_queen.damage}
        ],
        [
            {label: "W", origin: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.adela.w-2hit"}), origin: "W", value: Constants.W.damage, multiplier: 200},
            {label: props.intl.formatMessage({id: "subject.adela.w-reactivation"}), origin: "W", value: Constants.W.damage, multiplier: Constants.W.pawn_queen.damage},
        ],
        [
            {label: "E", origin: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.adela.e-reactivation"}), origin: "E", value: Constants.E.damage, multiplier: Constants.W.pawn_queen.damage},
        ],
        [
            {label: "R", origin: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.adela.r-damage-per-piece"}), origin: "R", value: Constants.R.per_piece, type: {type: "true"}}
        ]
    ]
})

export default table;