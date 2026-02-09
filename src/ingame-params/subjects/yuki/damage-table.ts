import skill from "components/status/chunks/03_skill";
import { DamageTableGenerator } from "../type";
import Constants from "./constants";
import { weaponTypeIDOf } from "app-types/subject-dynamic/config";

const table: DamageTableGenerator = props => {
    const weaponType = weaponTypeIDOf(props.config);

    return {
        basicAttack: [
            "standard",
            { label: props.intl.formatMessage({ id: "subject.yuki.passive-additional" }), origin: "T", value: Constants.T.damage },
            weaponType == "DualSword" ?
                { label: props.intl.formatMessage({ id: "subject.yuki.q-aa-dual-sword" }), origin: "Q", value: Constants.Q.dual_sword_damage, type: { type: "basic" } } :
                { label: props.intl.formatMessage({ id: "subject.yuki.q-aa" }), origin: "Q", value: Constants.Q.damage, type: { type: "basic" } }
        ],
        skill: [
            [{ label: props.intl.formatMessage({ id: "subject.yuki.w-damage-reduction" }), origin: "W", value: Constants.W.damage_reduction, type: { type: "misc", percentExpression: true } }],
            [{ label: "E", origin: "E", value: Constants.E.damage }],
            [
                { label: props.intl.formatMessage({ id: "subject.yuki.r-slash" }), origin: "R", value: Constants.R.damage },
                { label: props.intl.formatMessage({ id: "subject.yuki.r-mark" }), origin: "R", value: Constants.R.mark_damage, type: { type: "true" } }
            ]
        ]
    }
}

export default table;