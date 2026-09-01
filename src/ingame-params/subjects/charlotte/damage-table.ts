import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => {
    return {
        basicAttack: ["standard"],
        skill: [
            [{label: "Q", origin: "Q", value: Constants.Q.damage}],
            [{label: props.intl.formatMessage({id: "subject.charlotte.w-heal"}), origin: "W", value: Constants.W.heal, type: {type: "heal", target: "any"}}],
            [{label: props.intl.formatMessage({id: "subject.charlotte.e-shield"}), origin: "E", value: Constants.E.shield, type: {type: "shield", target: "any"}}]
        ]   
    }
}

export default table;