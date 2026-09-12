import { IntlShape } from "react-intl";
import Havoc from "./havoc";
import Chaos from "./chaos";
import Fortification from "./fortification";
import Support from "./support";
import { ValueRatio } from "core/value-ratio";
import { DamageTableUnit } from "core/damage-table/unit";
import { UniqueValueStrategy } from "@app/ingame-params/subjects/unique-value-strategy";
import { calculateValue } from "core/value-ratio";
import Decimal from "decimal.js";
import { SubjectConfig } from "core/subject-dynamic/config";

const acceleratorStrategy: UniqueValueStrategy = ({ config, status }) => {
    const base = Havoc.accelerator.damage.base[config.level - 1];
    const value = calculateValue({ ...Havoc.accelerator.damage, base }, status, config, "other").static;
    return {
        value: {
            type: "standard",
            value
        },
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
    const {amp, ...attackBased} = Chaos.redSprite.damage;
    const {additionalAttack, ...ampBased} = Chaos.redSprite.damage;

    const attackBasedDamage = calculateValue(attackBased, status, config, "other").static;
    const ampBasedDamage = calculateValue(ampBased, status, config, "other").static;

    const attackIsBigger = attackBasedDamage.greaterThan(ampBasedDamage);
    const value = Decimal.max(attackBasedDamage, ampBasedDamage);

    return {
        value: {
            type: "standard",
            value
        },
        equationExpression: [
            {
                expression: [
                    {ratioKey: "base"},
                    `${Chaos.redSprite.damage.base} + `,
                    {ratioKey: "level"},
                    `${config.level} x ${Chaos.redSprite.damage.level} + `,
                    {ratioKey: attackIsBigger ? "additionalAttack" : "amp"},
                    `${(attackIsBigger ? status.attackPower.additionalValue : status.skillAmp.calculatedValue)?.toString()} x ${attackIsBigger ? Chaos.redSprite.damage.additionalAttack : Chaos.redSprite.damage.amp}`
                ]
            }
        ]
    }
}

type AugmentDamageTableUnit = Omit<DamageTableUnit, "value" | "origin"> & {
    value: ValueRatio | {melee: ValueRatio, range: ValueRatio} | UniqueValueStrategy
}

export function AugmentTableValues(intl: IntlShape, config: SubjectConfig): AugmentDamageTableUnit[][] {
    return [
        [
            {label: intl.formatMessage({id: "絶対武力ダメージ"}), value: Havoc.frailtyInfliction.damage, type: {type: "true"}},
            {label: "アクセルレート3回目追加ダメージ", value: acceleratorStrategy},
        ],
        [
            {label: "ステラチャージ追加ダメージ", value: Chaos.stellarCharge.damage, type: {type: "true"}},
            {label: "鬼火", value: Chaos.ghostLight.damage, type: {type: "true"}},
            {label: "霹靂", value: redSpriteStrategy},
            {label: "霹靂(遠距離強化)", value: redSpriteStrategy, multiplier: Chaos.redSprite.damageAmp.effect + 100},
            {label: "渦流ダメージ", value: Chaos.syphonMaelstorm.damage},
            {label: "渦流回復(1人ヒット)", value: Chaos.syphonMaelstorm.heal, type: {type: "heal", target: "self"}},
            {label: "渦流回復(3人ヒット)", value: Chaos.syphonMaelstorm.heal, type: {type: "heal", target: "self"}, multiplier: 100 + Chaos.syphonMaelstorm.additionalHealMax},
            {label: "傷の悪化", value: Chaos.openWounds.damage},
            {label: "サーキュラーシステム回復", value: Chaos.circularSystem.heal, type: {type: "heal", target: "self"}}
        ],
        [
            {label: "金剛防御力上昇", value: Fortification.diamondShard.status.defense, type: {type: "misc"}},
            {label: "金剛ダメージ", value: Fortification.diamondShard.damage},
            {label: "不壊被ダメージ減少", value: Fortification.ironclad.status.preventDamageRatio, type: {type: "misc", percentExpression: true}},
            {label: "不壊妨害耐性上昇", value: Fortification.ironclad.status.tenacity, type: {type: "misc", percentExpression: true}},
            {label: "光の守護シールド", value: Fortification.heavyKneepads.shield, type: {type: "shield", target: "self"}},
            {label: "応報ダメージ", value: Fortification.bitterRetribution.damage},
            {label: "大胆防御力上昇", value: Fortification.embolden.status.defense, type: {type: "misc"}},
            {label: "不屈シールド", value: Fortification.unwaveringMentality.shield, type: {type: "shield", target: "self"}}
        ],
        [
            {label: "増幅ドローン移動速度上昇", value: Support.amplificationDrone.status.movementSpeed, type: {type: "misc", percentExpression: true}},
            {label: "増幅ドローン威力上昇", value: Support.amplificationDrone.status.skillDamageMultiplierRatio, type: {type: "misc", percentExpression: true}},
            {label: "治癒ドローン", value: Support.healingDrone.heal, type: {type: "heal", target: "any"}},
            {label: "献身シールド1回分", value: Support.sentinel.shield, type: {type: "shield", target: "any"}},
            {label: "狩りの戦慄回復最小値", value: Support.thrillOfTheHant.heal_min, type: {type: "heal", target: "self"}},
            {label: "狩りの戦慄回復最大値", value: Support.thrillOfTheHant.heal_min, type: {type: "heal", target: "self"}, multiplier: 100 * Support.thrillOfTheHant.heal_max_multiplier},
            {label: "サボテン爆弾", value: Support.blastCactus.damage},
            {label: "サボテン爆弾不発", value: Support.blastCactus.damage, multiplier: 100 - Support.blastCactus.unexploded_decline},
        ]
    ];
}