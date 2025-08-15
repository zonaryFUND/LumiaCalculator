import Decimal from "decimal.js";
import { ComponentStatusValue, Status } from "./type";
import { CooldownStatusValue, MovementSpeedValue, StatusValue } from "./value-component/type";
import { StatusValueComponent } from "./value-component/component";
import { FasterBaseMoveSpeed, MoveSpeedCalculationConstants } from "./value-component/move-speed";

type GroupedComponents = {
    sum: StatusValueComponent[]
    mul: StatusValueComponent[]
    fix: StatusValueComponent[]
}

function groupComponentsAndAddXConvertedValue(components: StatusValueComponent[], statusWithoutConversion?: Status): GroupedComponents {
    return components.reduce((prev, component) => {
        const addedComponent: StatusValueComponent = statusWithoutConversion && component.value.type == "status-conversion" ? {
            ...component,
            value: {
                ...component.value,
                value: component.value.func(statusWithoutConversion)
            }
        } : component;
        return {
            ...prev, 
            [component.calculationType]: [...prev[component.calculationType], addedComponent]
        };
    }, {sum: [], mul: [], fix: []});
}

/**
 * ステータス構成単位の配列から最終ステータス計算値とその他必要な負荷情報をすべて求める
 * 
 * @param componentValue ステータス構成単位と制限を合わせた構造体
 * @param statusWithoutConversion 変換系ステータスを加算していないステータス値　非undefinedのとき変換系ステータスの算出に用いて、最終ステータス値が得られる
 * @returns 
 */
export function calculateStatusValue(componentValue: ComponentStatusValue, statusWithoutConversion?: Status): StatusValue {
    const {sum, mul, fix} = groupComponentsAndAddXConvertedValue(componentValue.components, statusWithoutConversion);

    const [baseSum, sumResult] = sum.reduce(([baseSum, sumResult], current) => {
        if (current.value.value == undefined) return [baseSum, sumResult];

        switch (current.origin) {
            case "subject-status":
                return [baseSum.add(current.value.value), sumResult.add(current.value.value)];
            case "weapon-base":
                if (current.value.type != "weapon-base") throw new Error("weapon-base status component invalid");
                return [baseSum.add(current.value.value), sumResult.add(current.value.value)];
            default:
                return [baseSum, sumResult.add(current.value.value)]
        }
    }, [new Decimal(0), new Decimal(0)]);

    const multiplier = Decimal.sum(...mul.map(c => c.value.value ?? 0), 0);
    const fixed = fix.reduce((prev, current) => {
        return current.value.value ? new Decimal(current.value.value) : prev;
    }, sumResult.addPercent(multiplier));

    return {
        components: [...sum, ...mul, ...fix],
        additionalValue: fixed.minus(baseSum),
        sum: sumResult,
        multiplier,
        calculatedValue: Decimal.min(fixed, componentValue.max ?? Decimal.maxE).cut(componentValue.digit, "floor"),
        digit: componentValue.digit,
        max: componentValue.max
    }
}

/**
 * ステータス構成単位の配列から最終クールダウン計算値とその他必要な負荷情報をすべて求める
 * 
 * クールダウン減少は100/100+CDRが最終的な割合となる
 * 
 * @param componentValue ステータス構成単位と制限を合わせた構造体
 * @param statusWithoutConversion 変換系ステータスを加算していないステータス値　非undefinedのとき変換系ステータスの算出に用いて、最終ステータス値が得られる
 * @returns 
 */
export function calculateCooldownValue(componentValue: ComponentStatusValue, statusWithoutConversion?: Status): CooldownStatusValue {
    const grouped = groupComponentsAndAddXConvertedValue(componentValue.components, statusWithoutConversion);
    const sum = Decimal.sum(...grouped.sum.map(c => c.value.value ?? 0), 0);
    const multiplier = Decimal.sum(...grouped.mul.map(c => c.value.value ?? 0), 0);

    const rawHasteValue = grouped.fix.reduce((prev, current) => {
        return current.value.value ? new Decimal(current.value.value) : prev;
    }, sum.addPercent(multiplier));
    const calculatedValue = rawHasteValue.dividedBy(rawHasteValue.add(100)).times(100);

    return {
        components: componentValue.components,
        rawHasteValue,
        calculatedValue
    }
}

/**
 * ステータス構成単位の配列から最終移動速度計算値とその他必要な負荷情報をすべて求める
 * 
 * 移動速度は構成単位から求められた数値に補正をかけて最終値とする
 * https://playeternalreturn.com/posts/news/2363
 * 
 * @param componentValue ステータス構成単位と制限を合わせた構造体
 * @param statusWithoutConversion 変換系ステータスを加算していないステータス値　非undefinedのとき変換系ステータスの算出に用いて、最終ステータス値が得られる
 * @returns 
 */
export function calculateMovementSpeedValue(componentValue: ComponentStatusValue, statusWithoutConversion?: Status): MovementSpeedValue {
    const { sum, mul } = groupComponentsAndAddXConvertedValue(componentValue.components, statusWithoutConversion);
    const [mulPlus, mulMinus] = mul.reduce(([plus, minus], current) => {
        if (current.value.value == undefined) return [plus, minus];

        if (new Decimal(current.value.value).greaterThan(0)) {
            return [plus.add(current.value.value), minus];
        } else {
            return [plus, Decimal.min(minus, current.value.value)];
        }
    }, [new Decimal(0), new Decimal(0)]);
    
    const sumResult = Decimal.sum(...sum.map(c => c.value.value ?? 0));
    const rawResult = sumResult.addPercent(mulPlus).subPercent(mulMinus).round2();

    const calculatedValue = (() => {
        if (rawResult.lessThan(0)) 
            // 0を下回った場合、最小保証MS
            return new Decimal(MoveSpeedCalculationConstants.min);
        if (rawResult.lessThanOrEqualTo(MoveSpeedCalculationConstants.heavySlowDefuse.max)) 
            // 重いスロウの閾値を下回った場合、最小保証MS+超過分x重いスロウの軽減率
            return new Decimal(MoveSpeedCalculationConstants.min).add(rawResult.percent(MoveSpeedCalculationConstants.heavySlowDefuse.ratio));
        if (rawResult.lessThanOrEqualTo(MoveSpeedCalculationConstants.rawValueMax)) 
            // 閾値を下回った場合、無加工のMS
            return rawResult;
        if (rawResult.lessThanOrEqualTo(MoveSpeedCalculationConstants.lightFastDefuse.max)) {
            // 最高速閾値を下回った場合、無加工閾値+超過分x高速軽減率
            return new Decimal(MoveSpeedCalculationConstants.rawValueMax).add(rawResult.sub(MoveSpeedCalculationConstants.rawValueMax).percent(MoveSpeedCalculationConstants.lightFastDefuse.ratio));
        } else {
            // 超高速のとき、最高速閾値+超過分x最高速軽減率
            return new Decimal(FasterBaseMoveSpeed).add(rawResult.sub(MoveSpeedCalculationConstants.lightFastDefuse.max).percent(MoveSpeedCalculationConstants.fasterDefuseRatio));
        }
    })().round2();

    return {
        components: componentValue.components,
        rawResult,
        calculatedValue
    }
}