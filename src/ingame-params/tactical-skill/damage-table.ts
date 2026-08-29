import Constants from "./constants";
import { IntlShape } from "react-intl";
import { ValueRatio } from "core/value-ratio";
import { DamageTableUnit } from "core/damage-table/unit";

type Unit = Omit<DamageTableUnit, "value"> & {
    value: ValueRatio | {
        melee: ValueRatio
        range: ValueRatio
    }
}

const quakeMax = Constants.quake.duration / Constants.quake.tick;

const table: (intl: IntlShape) => Unit[][] = intl => [
    [
        {label: intl.formatMessage({id: "tactical.quake.first"}), value: Constants.quake.first_damage, origin: "tactical1"},
        {label: intl.formatMessage({id: "tactical.quake.dot-1tick"}), value: Constants.quake.dot_damage, origin: "tactical2"},
        {label: intl.formatMessage({id: "tactical.quake.dot-all"}, {value: quakeMax}), value: Constants.quake.dot_damage, origin: "tactical2", multiplier: quakeMax * 100}
    ],
    [
        {label: intl.formatMessage({id: "tactical.protocol-violation.damage1"}), value: Constants.protocol_violation.damage, origin: "tactical1", type: {type: "true"}},
        {label: intl.formatMessage({id: "tactical.protocol-violation.damage2"}), value: Constants.protocol_violation.damage, origin: "tactical2", type: {type: "true"}},
        {label: intl.formatMessage({id: "tactical.protocol-violation.hp-increase1"}), value: Constants.protocol_violation.hp_increase, origin: "tactical1", type: {type: "shield", target: "any"}},
        {label: intl.formatMessage({id: "tactical.protocol-violation.hp-increase2"}), value: Constants.protocol_violation.hp_increase, origin: "tactical2", type: {type: "shield", target: "any"}}
    ],
    [
        {label: intl.formatMessage({id: "tactical.force-field.level1"}), value: Constants.force_field.shield, origin: "tactical1", type: {type: "shield", target: "self"}},
        {label: intl.formatMessage({id: "tactical.force-field.level2"}), value: Constants.force_field.shield, origin: "tactical2", type: {type: "shield", target: "self"}}
    ],
    [
        {label: intl.formatMessage({id: "tactical.strider.level1"}), value: Constants.the_strider.damage, origin: "tactical1"},
        {label: intl.formatMessage({id: "tactical.strider.level2"}), value: Constants.the_strider.damage, origin: "tactical2"}
    ],
    [
        {label: intl.formatMessage({id: "tactical.blader-of-truth.level1"}), value: Constants.blader_of_truth.damage, origin: "tactical1"},
        {label: intl.formatMessage({id: "tactical.blader-of-truth.level2"}), value: Constants.blader_of_truth.second_damage, origin: "tactical2"}
    ],
    [
        {label: intl.formatMessage({id: "tactical.healing-wind.level1"}), value: Constants.healing_wind.heal, origin: "tactical1", type: {type: "heal", target: "any"}},
        {label: intl.formatMessage({id: "tactical.healing-wind.level2"}), value: Constants.healing_wind.heal, origin: "tactical2", type: {type: "heal", target: "any"}},
        {label: intl.formatMessage({id: "tactical.healing-wind.hot2"}), value: Constants.healing_wind.hot.effect, origin: "tactical2", type: {type: "heal", target: "any"}}
    ],
    [
        {label: intl.formatMessage({id: "tactical.wings-of-light.movement-speed1"}), value: Constants.wings_of_light.movement_speed, origin: "tactical1", type: {type: "misc", percentExpression: true}},
        {label: intl.formatMessage({id: "tactical.wings-of-light.movement-speed2"}), value: Constants.wings_of_light.movement_speed, origin: "tactical2", type: {type: "misc", percentExpression: true}}
    ],
    [
        {label: intl.formatMessage({id: "tactical.repulsor-missile.single-damage"}), value: Constants.repulsor_missile.damage, origin: "tactical1", type: {type: "true"}},
        {label: intl.formatMessage({id: "tactical.repulsor-missile.all-hit1"}), value: Constants.repulsor_missile.damage, origin: "tactical1", multiplier: Constants.repulsor_missile.ammos[0] * 100, type: {type: "true"}},
        {label: intl.formatMessage({id: "tactical.repulsor-missile.all-hit2"}), value: Constants.repulsor_missile.damage, origin: "tactical2", multiplier: Constants.repulsor_missile.ammos[1] * 100, type: {type: "true"}}
    ],
    [
        {label: intl.formatMessage({id: "tactical.plasma-dash.damage1"}), value: Constants.plasma_dash.damage, origin: "tactical1"},
        {label: intl.formatMessage({id: "tactical.plasma-dash.damage2"}), value: Constants.plasma_dash.damage, origin: "tactical2"}
    ]
]

export default table;