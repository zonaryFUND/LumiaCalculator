import { ValueRatio } from "core/value-ratio";
import Decimal from "decimal.js";

type PotencyDictionaryElement = {
    ratio: number,
    value: Decimal,
    calculated: Decimal
}

type Response = {
    potencyDictionary?: {
        [key in keyof ValueRatio]: {
            ratio: number,
            value: Decimal,
            calculated: Decimal
        }
    },
    potency: Decimal
}

export default function useDynamicValueCalculation(
    basePotency: Partial<{[key in keyof ValueRatio]: Decimal}> | undefined,
    multiplier: number | undefined,
    sender: {
        hp: Decimal.Value
        maxHP: Decimal.Value
    },
    receptor: {
        hp: Decimal.Value
        maxHP: Decimal.Value
    }
): Response {
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
        }, { potencyDictionary: {} as {[key in keyof ValueRatio]: PotencyDictionaryElement}, potency: new Decimal(0) });
}