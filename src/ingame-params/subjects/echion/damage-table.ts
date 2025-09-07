import { DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants.json";
import Decimal from "decimal.js";
import { EchionWStrategy } from "./w";
import { weaponType } from "./weapon-type";

// The ratio of attack of echion's R depends on the level of T, but this application assumes that its always 3.
const table: DamageTableGenerator = props => {
    const sidewinder = {
        label: props.intl.formatMessage({id: "subject.echion.sidewinder-amp"}),
        value: Constants.R1.skill_damage_add[props.config.skillLevels.R] + 100
    };

    const armType = weaponType(props.config.equipment.Weapon);
    
    const rMambaHeal = Constants.R2.skill_lifesteal[props.config.skillLevels.R];
    const multiplier = [
        {
            label: props.intl.formatMessage({id: "subject.echion.gauge-amp"}),
            value: new Decimal(Constants.R.damage_amp_per_vf[props.config.skillLevels.R]).times(props.config.gauge ?? 0).add(100).toNumber()
        }
    ].concat(armType == "sidewinder" ? [sidewinder] : [])

    const r: SubjectDamageTableUnit[] = (() => {
        if (armType == "sidewinder") {
            return [
                {label: `${props.intl.formatMessage({id: "subject.echion.r"})}(${props.intl.formatMessage({id: "app.standard-value"})})`, origin: "R" as any, value: Constants.R1.damage},
                {label: `${props.intl.formatMessage({id: "subject.echion.r"})}(${props.intl.formatMessage({id: "subject.echion.amp-calculated"})})`, origin: "R" as any, value: Constants.R1.damage, multiplier: [sidewinder]}
            ];
        }
        if (armType == "blackmamba") {
            return [
                {label: props.intl.formatMessage({id: "subject.echion.r"}), origin: "R" as any, value: Constants.R2.damage},
                {label: props.intl.formatMessage({id: "subject.echion.r-heal"}), origin: "R" as any, value: Constants.R2.damage, damageDependentHeal: rMambaHeal, type: {type: "heal", target: "self"}},
                {label: props.intl.formatMessage({id: "subject.echion.r-2hit"}), origin: "R" as any, value: Constants.R2.damage, multiplier: Constants.R2.second_damage.map(d => d + 100)}
            ];
        } else if (armType == "deathadder") {
            return [{label: props.intl.formatMessage({id: "subject.echion.r"}), origin: "R" as any, value: Constants.R3.damage}];
        };

        return [{label: props.intl.formatMessage({id: "subject.echion.r"}), origin: "R" as any, value: Constants.R0_1.damage}];
    })();

    return {
        basicAttack: armType == "deathadder" ? [
            "standard",
            {label: props.intl.formatMessage({id: "subject.echion.deathadder-aa-additional"}), origin: "T", value: Constants.T3_2.damage, type: {type: "basic"}}
        ] : ["standard"],
        skill: [
            [
                {label: `Q1(${props.intl.formatMessage({id: "app.standard-value"})})`, origin: "Q", value: Constants.Q.first_damage},
                {label: `Q1(${props.intl.formatMessage({id: "subject.echion.amp-calculated"})})`, origin: "Q", value: Constants.Q.first_damage, multiplier},
                armType == "blackmamba" ? {label: props.intl.formatMessage({id: "subject.echion.q-heal"}), origin: "Q", value: Constants.Q.first_damage, multiplier, type: {type: "heal", target: "self"}, damageDependentHeal: rMambaHeal} : null,
                {label: `Q2(${props.intl.formatMessage({id: "app.standard-value"})})`, origin: "Q", value: Constants.Q.second_damage},
                {label: `Q2(${props.intl.formatMessage({id: "subject.echion.amp-calculated"})})`, origin: "Q", value: Constants.Q.second_damage, multiplier},
                armType == "blackmamba" ? {label: props.intl.formatMessage({id: "subject.echion.q2-heal"}), origin: "Q", value: Constants.Q.second_damage, multiplier, type: {type: "heal", target: "self"}, damageDependentHeal: rMambaHeal} : null,
            ]
            .filter(e => e != null),
            [{label: props.intl.formatMessage({id: "subject.echion.w-shield"}), origin: "W", value: EchionWStrategy, type: {type: "shield", target: "self"}}],
            [
                {label: `E(${props.intl.formatMessage({id: "app.standard-value"})})`, origin: "E", value: Constants.E.damage},
                {label: `E(${props.intl.formatMessage({id: "subject.echion.amp-calculated"})})`, origin: "E", value: Constants.E.damage, multiplier},
                {label: props.intl.formatMessage({id: "subject.echion.e-heal"}), origin: "E", value: Constants.E.damage, multiplier, type: {type: "heal", target: "self"}, damageDependentHeal: rMambaHeal}
            ]
            .filter(e => e != null),
            [{label: props.intl.formatMessage({id: "subject.echion.r-true-damage"}, {value: Constants.R.area_damage_tick}), origin: "R" as any, value: Constants.R.area_damage, type: {type: "true"}}]
                .concat(r as any)         
        ]   
    } as any
} 

export default table;