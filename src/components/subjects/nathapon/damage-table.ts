import { DamageTableGenerator, SubjectDamageTableUnit } from "../damage-table";
import Constants from "./constants.json";
import { NathaponeTStrategy } from "./t";

const table: DamageTableGenerator = props => {
    const tLevel = props.config.skillLevels.T;
    function array(raw: SubjectDamageTableUnit): SubjectDamageTableUnit[] {
        const max = Constants.T.max_stack;
        return [...Array(max + 1)].map((_, i) => {
            if (i == 0) return raw;
            return {...raw, label: i == 0 ? raw.label : `${raw.label}${props.intl.formatMessage({id: "subject.nathapon.max-stack-suffix"}, {value: i})}`, multiplier: Constants.T.stack_damage_amp[tLevel] * i + 100}
        });
    }

    return {    
        basicAttack: [
            "disable-critical" as any,
            {label: props.intl.formatMessage({id: "subject.nathapon.passive-additional"}), skill: "T", value: NathaponeTStrategy}
        ].concat(array({label: props.intl.formatMessage({id: "subject.nathapon.e-pull"}), skill: "E", value: Constants.E.second_damage})),
        skill: [
            array({label: "Q", skill: "Q", value: Constants.Q.damage}),
            [
                ...array({label: props.intl.formatMessage({id: "subject.nathapon.w-1tick"}), skill: "W", value: Constants.W.damage}),
                ...array({label: props.intl.formatMessage({id: "subject.nathapon.w-finish"}), skill: "W", value: Constants.W.finish_damage}),
            ],
            array({label: props.intl.formatMessage({id: "subject.nathapon.e-hit"}), skill: "E", value: Constants.E.first_damage})
        ]   
    }
}

export default table;