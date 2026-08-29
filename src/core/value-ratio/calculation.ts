import { Status } from "core/subject-dynamic/status/type";
import Decimal from "decimal.js";
import { ValueRatio } from "./type";
import { SubjectConfig } from "core/subject-dynamic/config";
import { SkillKey } from "core/skill";
import { extractSkillLevel } from "./extraction";

type Response = { 
    static: Decimal
    dynamic?: {[K in keyof ValueRatio]: Decimal}
}

/**
 * 効果発生源を表す型
 * 
 * - スキルのキー（`QWERD`）
 * - 戦術スキル（レベル1を`tactical1`、レベル2を`tactical2`として渡す）
 * - バニラ仕様の基本攻撃、アイテムや特性（`other`）
 */
export type ValueOrigin = SkillKey | "tactical1" | "tactical2" | "other"

/**
 * スキルなどの威力を表すレシオと実験体の現在のビルド/ステータスから具体的な威力を計算する
 * 
 * 対象体力や現在体力などの動的な値のレシオを持つ威力の場合、当該動的レシオだけをフィルタして別途返す
 * 
 * @param ratio 威力レシオ構造体
 * @param status 発生源である実験体の現在ステータス
 * @param config 発生源である実験体のビルド設定
 * @param skill 発生源であるスキル
 * @returns 以下のフィールドをもつオブジェクト
 * - static　対象体力や自身の現在体力などの動的な値に依存しない計算値
 * - dynamic　対象体力や自身の現在体力などの動的な値に依存する値のレシオ値オブジェクト
 */
export function calculateValue(ratio: ValueRatio, status: Status, config: SubjectConfig, origin: ValueOrigin): Response {
    const values = Object.keys(ratio).reduce((prev: Response, key) => {
        const value = ratio[key as keyof ValueRatio];
        if (value == undefined) return prev;

        const skillLevel = extractSkillLevel(config, origin)

        const selectedValue: Decimal = (() => {
            if (Array.isArray(value)) {
                if (skillLevel == undefined) {

                    throw new Error("level-dependent value ratio is calculated without its level")
                }
                return new Decimal(value[skillLevel]);
            } else if (typeof value == "object") {
                return calculateValue(value as ValueRatio, status, config, origin).static;
            } else {
                return new Decimal(value);
            }
        })();

        const staticValue = (() => {
            switch (key) {
                case "base":
                    return selectedValue; 
                case "level":
                    return prev.static.add(selectedValue.times(config.level));
                case "maxHP":
                    return prev.static.add(status.maxHp.calculatedValue.percent(selectedValue));
                case "additionalMaxHP":
                    return prev.static.add(status.maxHp.additionalValue?.percent(selectedValue) ?? 0);
                case "defense":
                    return prev.static.add(status.defense.calculatedValue.percent(selectedValue));
                case "attack":
                    return prev.static.add(status.attackPower.calculatedValue.percent(selectedValue));
                case "additionalAttack":
                    return prev.static.add(status.attackPower.additionalValue?.percent(selectedValue) ?? 0);
                case "basicAttackAmp":
                    return prev.static.addPercent(status.increaseBasicAttackDamageRatio.calculatedValue);
                case "criticalChance":
                    return prev.static.addPercent(status.criticalStrikeChance.calculatedValue.percent(selectedValue));
                case "additionalAttackSpeed":
                    return prev.static.add(status.attackSpeed.additionalValue?.percent(selectedValue) ?? 0);
                case "amp":
                    return prev.static.add(status.skillAmp.calculatedValue.percent(selectedValue));
                case "stack":
                    return prev.static.add(config.stack);
                case "gauge":
                    return prev.static.add(new Decimal(config.gauge).percent(selectedValue));
                default:
                    return undefined;
            }
        })();



        const dynamicValue = (() => {
            const dynamicValueKeys = ["targetHP", "targetMaxHP", "lostHP", "targetLostHP"];
            if (dynamicValueKeys.includes(key)) {
                return {...(prev.dynamic ?? {}), [key]: selectedValue};
            }
            return prev.dynamic;
        })();        

        return { 
            static: staticValue ?? prev.static,
            dynamic: dynamicValue
        };
    }, {static: new Decimal(0), dynamic: undefined});

    return values
}

type PotencyDictionaryElement = {
    ratio: number
    value: Decimal
    calculated: Decimal
}

export type ResolvedDynamicValue = {
    potencyDictionary?: {[K in keyof ValueRatio]: PotencyDictionaryElement}
    potency: Decimal
}

/**
 * `calculateValue()`が解決せずに返した動的レシオ（`dynamic`。対象HPや自身の現在HPなど、実験体単体の
 * ステータスだけでは決まらない値のレシオ）を、実際の対象HP/自身HPから最終的な数値へ解決する
 *
 * @param basePotency `calculateValue()`が返した`dynamic`
 * @param multiplier 複数ヒットなどの倍率（`extractMultiplier()`の`mergedMultiplier`）
 * @param sender 発生源（自身）の現在HP・最大HP
 * @param receptor 対象（相手）の現在HP・最大HP
 */
export function resolveDynamicValue(
    basePotency: Partial<{[K in keyof ValueRatio]: Decimal}> | undefined,
    multiplier: number | undefined,
    sender: {
        hp: Decimal.Value
        maxHP: Decimal.Value
    },
    receptor: {
        hp: Decimal.Value
        maxHP: Decimal.Value
    }
): ResolvedDynamicValue {
    if (basePotency == undefined) {
        return {
            potency: new Decimal(0)
        }
    }

    return Object.entries(basePotency ?? {})
        .reduce((prev, [ratioKey, ratioValue]) => {
            const targetValue = (() => {
                switch (ratioKey) {
                    case "targetHP":
                        return new Decimal(receptor.hp)
                    case "targetLostHP":
                        return new Decimal(receptor.maxHP).sub(receptor.hp);
                    case "targetMaxHP":
                        return new Decimal(receptor.maxHP);
                    case "lostHP":
                        return new Decimal(sender.maxHP).sub(sender.hp);
                    default:
                        throw new Error(`unexpected dynamic potency key is detected: ${ratioKey}`);
                }
            })();

            const calculatedValue = targetValue.percent(ratioValue).percent(multiplier ?? 100);

            return {
                potencyDictionary: {
                    ...prev.potencyDictionary,
                    [ratioKey]: {
                        ratio: ratioValue,
                        value: targetValue,
                        calculated: calculatedValue
                    }
                },
                potency: prev.potency.add(calculatedValue)
            };
        }, { potencyDictionary: {} as {[K in keyof ValueRatio]: PotencyDictionaryElement}, potency: new Decimal(0) });
}