import { WeaponTypeID } from "app-types/equipment/weapon";
import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => {
    return {
        basicAttack: [
            "standard",
            {label: props.intl.formatMessage({id: "subject.yuki.passive-additional"}), skill: "T", value: Constants.T.damage, type: "true"},
            props.weaponType == "dual_swords" ? 
            {label: props.intl.formatMessage({id: "subject.yuki.q-aa-dual-sword"}), skill: "Q", value: Constants.Q.dual_sword_damage, type: "basic"} :
            {label: props.intl.formatMessage({id: "subject.yuki.q-aa"}), skill: "Q", value: Constants.Q.damage, type: "basic"}
        ],
        skill: [
            [{label: "E", skill: "E", value: Constants.E.damage}],
            [
                {label: props.intl.formatMessage({id: "subject.yuki.r-slash"}), skill: "R", value: Constants.R.damage},
                {label: props.intl.formatMessage({id: "subject.yuki.r-mark"}), skill: "R", value: Constants.R.mark_damage, type: "true"}
            ]
        ]   
    }
}

export default table;