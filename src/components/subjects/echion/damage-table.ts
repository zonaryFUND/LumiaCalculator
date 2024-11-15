import { DamageTableGenerator, SubjectDamageTable, SubjectDamageTableUnit } from "../damage-table";
import Constants from "./constants.json";
import Decimal from "decimal.js";
import { EchionWStrategy } from "./w";
import damageDependentHeal from "components/damage/combat/subtables/subrows/damage-dependent-heal";
import { Target } from "@phosphor-icons/react";

// The ratio of attack of echion's R depends on the level of T, but this application assumes that its always 3.
const table: DamageTableGenerator = props => {
    const sidewinder = {
        label: props.intl.formatMessage({id: "subject.echion.sidewinder-amp"}),
        value: Constants.R1.skill_damage_add[props.config.skillLevels.R] + 100
    };

    const weapon = props.config.equipment.weapon;
    const isMamba = weapon?.includes("black_mamba");
    const rMambaHeal = Constants.R2.skill_lifesteal[props.config.skillLevels.R];
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
        if (isMamba) {
            return [
                {label: props.intl.formatMessage({id: "subject.echion.r"}), skill: "R" as any, value: Constants.R2.damage},
                {label: props.intl.formatMessage({id: "subject.echion.r-heal"}), skill: "R" as any, value: Constants.R2.damage, damageDependentHeal: rMambaHeal, type: {type: "heal", target: "self"}},
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
                isMamba ? {label: props.intl.formatMessage({id: "subject.echion.q-heal"}), skill: "Q", value: Constants.Q.first_damage, multiplier, type: {type: "heal", target: "self"}, damageDependentHeal: rMambaHeal} : null,
                {label: `Q2(${props.intl.formatMessage({id: "app.standard-value"})})`, skill: "Q", value: Constants.Q.second_damage},
                {label: `Q2(${props.intl.formatMessage({id: "subject.echion.amp-calculated"})})`, skill: "Q", value: Constants.Q.second_damage, multiplier},
                isMamba ? {label: props.intl.formatMessage({id: "subject.echion.q2-heal"}), skill: "Q", value: Constants.Q.second_damage, multiplier, type: {type: "heal", target: "self"}, damageDependentHeal: rMambaHeal} : null,
            ]
            .filter(e => e != null),
            [{label: props.intl.formatMessage({id: "subject.echion.w-shield"}), skill: "W", value: EchionWStrategy, type: {type: "shield", target: "self"}}],
            [
                {label: `E(${props.intl.formatMessage({id: "app.standard-value"})})`, skill: "E", value: Constants.E.damage},
                {label: `E(${props.intl.formatMessage({id: "subject.echion.amp-calculated"})})`, skill: "E", value: Constants.E.damage, multiplier},
                {label: props.intl.formatMessage({id: "subject.echion.e-heal"}), skill: "E", value: Constants.E.damage, multiplier, type: {type: "heal", target: "self"}, damageDependentHeal: rMambaHeal}
            ]
            .filter(e => e != null),
            [{label: props.intl.formatMessage({id: "subject.echion.r-true-damage"}, {value: Constants.R.area_damage_tick}), skill: "R" as any, value: Constants.R.area_damage}]
                .concat(r as any)         
        ]   
    } as any
} 

export default table;