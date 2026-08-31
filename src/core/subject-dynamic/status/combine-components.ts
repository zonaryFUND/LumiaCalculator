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
 * ステータス構成単位の配列から最終防御力計算値を求める
 *
 * パッチ1.22（2024/05/23、https://playeternalreturn.com/posts/news/1920）以降の防御力算出順序に対応する
 * 専用ロジック。他のステータス（`calculateStatusValue`）と異なり、単純加算成分を発生源によって2グループに
 * 分けて扱う。
 *
 * 1. 実験体自身・装備由来の単純加算（origin: "subject-status" | "equipment"）をまず合算する（＝「素の防御力」）。
 * 2. 乗算成分（バフ・デバフによる割合増加・割合減少）を、1.に対して**個別に**乗算する（合算してから1回だけ
 *    乗算するのではなく、それぞれの倍率を掛け合わせる。例: +10%・-10%・-20%を同時に受けている場合、
 *    110% x 90% x 80% = 79.2%。合算してから1回だけ適用する一般規則の`calculateStatusValue`とはここが異なる）。
 * 3. バフ・デバフ由来の単純加算（origin: "perpetual_status" | "temporary-status"、固定値増減）を、
 *    2.の結果に対して加算する（1.には含めない。＝「結果A」）。
 *
 * 詳細は[status-model.md](../../../../docs/status-model.md)の`defense`項目を参照。
 *
 * @param componentValue ステータス構成単位と制限を合わせた構造体
 * @param statusWithoutConversion 変換系ステータスを加算していないステータス値　非undefinedのとき変換系ステータスの算出に用いて、最終ステータス値が得られる
 * @returns
 */
export function calculateDefenseValue(componentValue: ComponentStatusValue, statusWithoutConversion?: Status): StatusValue {
    const {sum, mul, fix} = groupComponentsAndAddXConvertedValue(componentValue.components, statusWithoutConversion);

    const [baseComponents, buffFlatComponents] = sum.reduce(([base, buffFlat], current) => {
        return current.origin == "subject-status" || current.origin == "equipment"
            ? [[...base, current], buffFlat]
            : [base, [...buffFlat, current]];
    }, [[] as StatusValueComponent[], [] as StatusValueComponent[]]);

    const [baseSum, sumResult] = baseComponents.reduce(([baseSum, sumResult], current) => {
        if (current.value.value == undefined) return [baseSum, sumResult];

        switch (current.origin) {
            case "subject-status":
                return [baseSum.add(current.value.value), sumResult.add(current.value.value)];
            default:
                return [baseSum, sumResult.add(current.value.value)]
        }
    }, [new Decimal(0), new Decimal(0)]);

    // 100を起点に各バフ・デバフの倍率を順に掛け合わせた、合成後の割合（例: 79.2）を求める
    const combinedMultiplierPercent = mul.reduce((prev, current) => prev.addPercent(current.value.value ?? 0), new Decimal(100));
    const afterMultiplier = sumResult.percent(combinedMultiplierPercent);

    const buffFlatSum = Decimal.sum(...buffFlatComponents.map(c => c.value.value ?? 0), 0);

    const fixed = fix.reduce((prev, current) => {
        return current.value.value ? new Decimal(current.value.value) : prev;
    }, afterMultiplier.add(buffFlatSum));

    return {
        components: [...sum, ...mul, ...fix],
        additionalValue: fixed.minus(baseSum),
        sum: sumResult,
        multiplier: combinedMultiplierPercent.minus(100),
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
    // mulMinusは既に負値（複数のスロウがあっても最も強い1件のみ採用、Decimal.minで求める）なので、
    // 「%を引く」subPercentではなく「負のvalueを足す」addPercentが正しい（subPercentだと負値同士が
    // 打ち消し合って増速になってしまう）
    const rawResult = sumResult.addPercent(mulPlus).addPercent(mulMinus).round2();

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