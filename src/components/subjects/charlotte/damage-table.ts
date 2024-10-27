import { DamageTable, DamageTableGenerator, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [{label: props.intl.formatMessage({id: "subject.charlotte.w-heal"}), skill: "W", value: Constants.W.heal, type: {type: "heal", target: "any"}}],
        [{label: props.intl.formatMessage({id: "subject.charlotte.e-shield"}), skill: "E", value: Constants.E.shield, type: {type: "shield", target: "any"}}]
    ]   
})

export default table;