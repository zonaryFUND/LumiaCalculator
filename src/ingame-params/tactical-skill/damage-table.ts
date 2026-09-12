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
        {label: intl.formatMessage({id: "tactical.quake.first"}), value: Constants.quake.firstDamage, origin: "tactical1"},
        {label: intl.formatMessage({id: "tactical.quake.dot-1tick"}), value: Constants.quake.dotDamage, origin: "tactical2"},
        {label: intl.formatMessage({id: "tactical.quake.dot-all"}, {value: quakeMax}), value: Constants.quake.dotDamage, origin: "tactical2", multiplier: quakeMax * 100}
    ],
    [
        {label: intl.formatMessage({id: "tactical.protocol-violation.damage1"}), value: Constants.protocol_violation.damage, origin: "tactical1", type: {type: "true"}},
        {label: intl.formatMessage({id: "tactical.protocol-violation.damage2"}), value: Constants.protocol_violation.damage, origin: "tactical2", type: {type: "true"}},
        {label: intl.formatMessage({id: "tactical.protocol-violation.hp-increase1"}), value: Constants.protocol_violation.hpIncrease, origin: "tactical1", type: {type: "shield", target: "any"}},
        {label: intl.formatMessage({id: "tactical.protocol-violation.hp-increase2"}), value: Constants.protocol_violation.hpIncrease, origin: "tactical2", type: {type: "shield", target: "any"}}
    ],
    [
        {label: intl.formatMessage({id: "tactical.force-field.level1"}), value: Constants.forceField.shield, origin: "tactical1", type: {type: "shield", target: "self"}},
        {label: intl.formatMessage({id: "tactical.force-field.level2"}), value: Constants.forceField.shield, origin: "tactical2", type: {type: "shield", target: "self"}}
    ],
    [
        {label: intl.formatMessage({id: "tactical.strider.level1"}), value: Constants.theStrider.damage, origin: "tactical1"},
        {label: intl.formatMessage({id: "tactical.strider.level2"}), value: Constants.theStrider.damage, origin: "tactical2"}
    ],
    [
        {label: intl.formatMessage({id: "tactical.blader-of-truth.level1"}), value: Constants.bladerOfTruth.damage, origin: "tactical1"},
        {label: intl.formatMessage({id: "tactical.blader-of-truth.level2"}), value: Constants.bladerOfTruth.secondDamage, origin: "tactical2"}
    ],
    [
        {label: intl.formatMessage({id: "tactical.healing-wind.level1"}), value: Constants.healingWind.heal, origin: "tactical1", type: {type: "heal", target: "any"}},
        {label: intl.formatMessage({id: "tactical.healing-wind.level2"}), value: Constants.healingWind.heal, origin: "tactical2", type: {type: "heal", target: "any"}},
        {label: intl.formatMessage({id: "tactical.healing-wind.hot2"}), value: Constants.healingWind.hot.effect, origin: "tactical2", type: {type: "heal", target: "any"}}
    ],
    [
        {label: intl.formatMessage({id: "tactical.wings-of-light.movement-speed1"}), value: Constants.wingsOfLight.movementSpeed, origin: "tactical1", type: {type: "misc", percentExpression: true}},
        {label: intl.formatMessage({id: "tactical.wings-of-light.movement-speed2"}), value: Constants.wingsOfLight.movementSpeed, origin: "tactical2", type: {type: "misc", percentExpression: true}}
    ],
    [
        {label: intl.formatMessage({id: "tactical.repulsor-missile.single-damage"}), value: Constants.repulsorMissile.damage, origin: "tactical1", type: {type: "true"}},
        {label: intl.formatMessage({id: "tactical.repulsor-missile.all-hit1"}), value: Constants.repulsorMissile.damage, origin: "tactical1", multiplier: Constants.repulsorMissile.ammos[0] * 100, type: {type: "true"}},
        {label: intl.formatMessage({id: "tactical.repulsor-missile.all-hit2"}), value: Constants.repulsorMissile.damage, origin: "tactical2", multiplier: Constants.repulsorMissile.ammos[1] * 100, type: {type: "true"}}
    ],
    [
        {label: intl.formatMessage({id: "tactical.plasma-dash.damage1"}), value: Constants.plasmaDash.damage, origin: "tactical1"},
        {label: intl.formatMessage({id: "tactical.plasma-dash.damage2"}), value: Constants.plasmaDash.damage, origin: "tactical2"}
    ]
]

export default table;
