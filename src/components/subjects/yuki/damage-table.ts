import { DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";
import extractWeaponTypeID from "app-types/subject-dynamic/config/extract-weapon-type-id";

const table: DamageTableGenerator = props => {
    const weaponType = extractWeaponTypeID(props.config);

    return {
        basicAttack: [
            "standard",
            {label: props.intl.formatMessage({id: "subject.yuki.passive-additional"}), skill: "T", value: Constants.T.damage, type: {type: "true"}},
            weaponType == "DualSword" ? 
            {label: props.intl.formatMessage({id: "subject.yuki.q-aa-dual-sword"}), skill: "Q", value: Constants.Q.dual_sword_damage, type: {type: "basic"}} :
            {label: props.intl.formatMessage({id: "subject.yuki.q-aa"}), skill: "Q", value: Constants.Q.damage, type: {type: "basic"}}
        ],
        skill: [
            [{label: "E", skill: "E", value: Constants.E.damage}],
            [
                {label: props.intl.formatMessage({id: "subject.yuki.r-slash"}), skill: "R", value: Constants.R.damage},
                {label: props.intl.formatMessage({id: "subject.yuki.r-mark"}), skill: "R", value: Constants.R.mark_damage, type: {type: "true"}}
            ]
        ]   
    }
}

export default table;