import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => {
    const stacks = (base: SubjectDamageTableUnit) => {
        return [base].concat(
            [...Array(Constants.T.max_stack)].map((_, i) => (
                {...base, label: `${base.label}${props.intl.formatMessage({id: "subject.charlotte.t-stack"}, {value: i + 1})}`, multiplier: 100 + Constants.T.heal_and_shield_amp[props.config.skillLevels.T] * (i + 1)}
            ))
        )
    }

    return {
        basicAttack: ["standard"],
        skill: [
            [{label: "Q", skill: "Q", value: Constants.Q.damage}],
            stacks({label: props.intl.formatMessage({id: "subject.charlotte.w-heal"}), skill: "W", value: Constants.W.heal, type: {type: "heal", target: "any"}}),
            stacks({label: props.intl.formatMessage({id: "subject.charlotte.e-shield"}), skill: "E", value: Constants.E.shield, type: {type: "shield", target: "any"}})
        ]   
    }
}

export default table;