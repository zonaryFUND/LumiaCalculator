import { IntlShape } from "react-intl";
import Havoc from "./havoc.json";
import Chaos from "./chaos.json";
import Fortification from "./fortification.json";
import Support from "./support.json";
import { ValueRatio } from "app-types/value-ratio";
import { DamageTableUnit } from "app-types/damage-table/unit";
import { UniqueValueStrategy } from "@app/ingame-params/subjects/unique-value-strategy";
import { calculateValue } from "app-types/value-ratio/calculation";
import Decimal from "decimal.js";
import ratioKey from "components/damage/simple/subtables/subrows/ratio-key";

const acceleratorStrategy: UniqueValueStrategy = ({ config, status }) => {
    const base = Havoc.accelerator.damage.base[config.level - 1];
    const value = calculateValue(Havoc.accelerator.damage, status, config, config.level - 1).static;
    return {
        value,
        equationExpression: [
            {expression: ["現在、アクセルレートのダメージ基礎値にはレベルに対して規則性が見出せません。"]},
            {
                expression: [
                    {ratioKey: "base"},
                    `${base} + `,
                    {ratioKey: "additionalAttack"},
                    `${status.attackPower.additionalValue?.toString()} x ${Havoc.accelerator.damage.additionalAttack}% + `,
                    {ratioKey: "amp"},
                    `${status.skillAmp.calculatedValue.toString()} x ${Havoc.accelerator.damage.amp}% = ${value.toString()}`
                ]
            }
        ]
    }
}

const redSpriteStrategy: UniqueValueStrategy = ({ config, status }) => {
    const {amp, ...attackBased} = Chaos.red_sprite.damage;
    const {additionalAttack, ...ampBased} = Chaos.red_sprite.damage;

    const attackBasedDamage = calculateValue(attackBased, status, config).static;
    const ampBasedDamage = calculateValue(ampBased, status, config).static;

    const attackIsBigger = attackBasedDamage.greaterThan(ampBasedDamage);
    const value = Decimal.max(attackBasedDamage, ampBasedDamage);

    return {
        value,
        equationExpression: [
            {
                expression: [
                    {ratioKey: "base"},
                    `${Chaos.red_sprite.damage.base} + `,
                    {ratioKey: "level"},
                    `${config.level} x ${Chaos.red_sprite.damage.level} + `,
                    {ratioKey: attackIsBigger ? "additionalAttack" : "amp"},
                    `${(attackIsBigger ? status.attackPower.additionalValue : status.skillAmp.calculatedValue)?.toString()} x ${attackIsBigger ? Chaos.red_sprite.damage.additionalAttack : Chaos.red_sprite.damage.amp}`
                ]
            }
        ]
    }
}

type AugmentDamageTableUnit = Omit<DamageTableUnit, "value"> & {
    value: ValueRatio | {melee: ValueRatio, range: ValueRatio} | UniqueValueStrategy
}

export function AugmentTableValues(intl: IntlShape): AugmentDamageTableUnit[][] {
    return [
        [
            {label: intl.formatMessage({id: "絶対武力ダメージ"}), value: Havoc.frailty_infliction.damage, type: {type: "true"}},
            {label: intl.formatMessage({id: "絶対武力防御減少"}), value: Havoc.frailty_infliction.defense_reduction.effect, type: {type: "misc", percentExpression: true}},
            {label: "アクセルレート3回目追加ダメージ", value: acceleratorStrategy},
        ],
        [
            {label: "ステラチャージ追加ダメージ", value: Chaos.stellar_charge.damage, type: {type: "true"}},
            {label: "鬼火", value: Chaos.ghost_light.damage, type: {type: "true"}},
            {label: "霹靂", value: redSpriteStrategy},
            {label: "霹靂(遠距離強化)", value: redSpriteStrategy, multiplier: Chaos.red_sprite.damage_amp.effect + 100},
            {label: "渦流ダメージ", value: Chaos.syphon_maelstorm.damage},
            {label: "渦流回復(1人ヒット)", value: Chaos.syphon_maelstorm.heal, type: {type: "heal", target: "self"}},
            {label: "渦流回復(3人ヒット)", value: Chaos.syphon_maelstorm.heal, type: {type: "heal", target: "self"}, multiplier: 100 + Chaos.syphon_maelstorm.additional_heal_max},
            {label: "傷の悪化", value: Chaos.open_wounds.damage}
        ],
        [
            {label: "金剛防御力上昇", value: Fortification.diamond_shard.defense.effect, type: {type: "misc"}},
            {label: "金剛ダメージ", value: Fortification.diamond_shard.damage},
            {label: "不壊被ダメージ減少", value: Fortification.ironclad.damage_reduction, type: {type: "misc", percentExpression: true}},
            {label: "不壊妨害耐性上昇", value: Fortification.ironclad.tenacity, type: {type: "misc", percentExpression: true}},
            {label: "光の守護シールド", value: Fortification.heavy_kneepads.shield, type: {type: "shield", target: "self"}},
            {label: "応報ダメージ", value: Fortification.bitter_retribution.damage},
            {label: "大胆防御力上昇", value: Fortification.embolden.defense, type: {type: "misc"}},
            {label: "不屈シールド", value: Fortification.unwavering_mentality.shield, type: {type: "shield", target: "self"}}
        ],
        [
            {label: "超再生適合型能力値上昇", value: Support.healing_factor.adaptive, type: {type: "misc"}},
            {label: "増幅ドローン移動速度上昇", value: Support.amplification_drone.movement_speed, type: {type: "misc", percentExpression: true}},
            {label: "増幅ドローン威力上昇", value: Support.amplification_drone.skill_damage_amp, type: {type: "misc", percentExpression: true}},
            {label: "治癒ドローン", value: Support.healing_drone.heal, type: {type: "heal", target: "any"}},
            {label: "献身シールド1回分", value: Support.sentinel.shield, type: {type: "shield", target: "any"}},
            {label: "狩りの戦慄回復最小値", value: Support.thrill_of_the_hant.heal_min, type: {type: "heal", target: "self"}},
            {label: "狩りの戦慄回復最大値", value: Support.thrill_of_the_hant.heal_min, type: {type: "heal", target: "self"}, multiplier: 100 * Support.thrill_of_the_hant.heal_max_multiplier}
        ]
    ];
}