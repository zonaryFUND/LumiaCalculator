import { DamageTableGenerator, SubjectDamageTableUnit } from "../damage-table";
import Constants from "./constants.json";
import Decimal from "decimal.js";
import { EchionWStrategy } from "./w";

// The ratio of attack of echion's R depends on the level of T, but this application assumes that its always 3.
const table: DamageTableGenerator = props => {
    const sidewinder = {
        label: props.intl.formatMessage({id: "subject.echion.sidewinder-amp"}),
        value: Constants.R1.skill_damage_add[props.config.skillLevels.R] + 100
    };

    const weapon = props.config.equipment.weapon;
    const multiplier = [
        {
            label: props.intl.formatMessage({id: "subject.echion.gauge-amp"}),
            value: new Decimal(Constants.R.damage_amp_per_vf[props.config.skillLevels.R]).times(props.config.gauge ?? 0).add(100).toNumber()
        }
    ].concat(weapon?.includes("sidewinder") ? [sidewinder] : [])

    const r: SubjectDamageTableUnit[] = (() => {
        if (weapon?.includes("sidewinder")) {
            return [
                {label: `${props.intl.formatMessage({id: "subject.echion.r"})}(${props.intl.formatMessage({id: "app.standard-value"})})`, skill: "R" as any, value: Constants.R1.damage},
                {label: `${props.intl.formatMessage({id: "subject.echion.r"})}(${props.intl.formatMessage({id: "subject.echion.amp-calculated"})})`, skill: "R" as any, value: Constants.R1.damage, multiplier: [sidewinder]}
            ];
        }
        if (weapon?.includes("black_mamba")) {
            return [
                {label: props.intl.formatMessage({id: "subject.echion.r"}), skill: "R" as any, value: Constants.R2.damage},
                {label: props.intl.formatMessage({id: "subject.echion.r-2hit"}), skill: "R" as any, value: Constants.R2.damage, multiplier: 200}
            ];
        } else if (weapon?.includes("deathadder")) {
            return [{label: props.intl.formatMessage({id: "subject.echion.r"}), skill: "R" as any, value: Constants.R3.damage}];
        };

        return [{label: props.intl.formatMessage({id: "subject.echion.r"}), skill: "R" as any, value: Constants.R0_1.damage}];
    })();

    return {
        basicAttack: weapon?.includes("deathadder") ? [
            "standard",
            {label: props.intl.formatMessage({id: "subject.echion.deathadder-aa-additional"}), skill: "T", value: Constants.T3_2.damage, type: {type: "basic"}}
        ] : ["standard"],
        skill: [
            [
                {label: `Q1(${props.intl.formatMessage({id: "app.standard-value"})})`, skill: "Q", value: Constants.Q.first_damage},
                {label: `Q1(${props.intl.formatMessage({id: "subject.echion.amp-calculated"})})`, skill: "Q", value: Constants.Q.first_damage, multiplier},
                {label: `Q2(${props.intl.formatMessage({id: "app.standard-value"})})`, skill: "Q", value: Constants.Q.second_damage},
                {label: `Q2(${props.intl.formatMessage({id: "subject.echion.amp-calculated"})})`, skill: "Q", value: Constants.Q.second_damage, multiplier},
            ],
            [{label: props.intl.formatMessage({id: "subject.echion.w-shield"}), skill: "W", value: EchionWStrategy, type: {type: "shield", target: "self"}}],
            [
                {label: `E(${props.intl.formatMessage({id: "app.standard-value"})})`, skill: "E", value: Constants.E.damage},
                {label: `E(${props.intl.formatMessage({id: "subject.echion.amp-calculated"})})`, skill: "E", value: Constants.E.damage, multiplier}
            ],
            [{label: props.intl.formatMessage({id: "subject.echion.r-true-damage"}, {value: Constants.R.area_damage_tick}), skill: "R" as any, value: Constants.R.area_damage}]
                .concat(r as any)         
        ]   
    }
} 

export default table;