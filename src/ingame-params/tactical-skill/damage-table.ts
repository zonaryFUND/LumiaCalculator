import Constants from "./constants.json";
import { IntlShape } from "react-intl";
import { ValueRatio } from "app-types/value-ratio";
import { DamageTableUnit } from "app-types/damage-table/unit";

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
        {label: intl.formatMessage({id: "tactical.protocol-violation.level1"}), value: Constants.protocol_violation.hp_increase, origin: "tactical1", type: {type: "shield", target: "any"}},
        {label: intl.formatMessage({id: "tactical.protocol-violation.level2"}), value: Constants.protocol_violation.hp_increase, origin: "tactical2", type: {type: "shield", target: "any"}}
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
        {label: intl.formatMessage({id: "tactical.false-oath.level1"}), value: Constants.false_oath.heal_min, origin: "tactical1", type: {type: "heal", target: "self"}},
        {label: intl.formatMessage({id: "tactical.false-oath.level2"}), value: Constants.false_oath.heal_min, origin: "tactical1", type: {type: "heal", target: "self"}, multiplier: Constants.false_oath.heal_max_multiplier * 100}
    ],
    [
        {label: intl.formatMessage({id: "tactical.healing-wind.level1"}), value: Constants.healing_wind.heal, origin: "tactical1", type: {type: "heal", target: "any"}},
        {label: intl.formatMessage({id: "tactical.healing-wind.level2"}), value: Constants.healing_wind.heal, origin: "tactical2", type: {type: "heal", target: "any"}}
    ]
]

export default table;