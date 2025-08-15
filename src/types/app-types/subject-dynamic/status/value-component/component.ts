import Decimal from "decimal.js"
import { Status } from "../type"

/**
 * 実験体のステータスの1つを構成する部分要素
 */
export type StatusValueComponent = {
    /**
     * この部分要素が何に起因するか
     * 
     * - `subject-status`: 実験体の現在のレベルにおける基礎ステータス
     * - `weapon-base`: 装備中の武器種ごとに固有のステータス
     * - `equipment`: すべての装備のステータス合計値
     * - `perpetual-status`: 永続的なバフまたはパッシブなどによるステータス変換
     * - `temporary-status`: 一時的なバフによる増加ステータス
     */
    origin: "subject-status" | "weapon-base" | "equipment" | "perpetual_status" | "temporary-status"

    /**
     * この部分要素がどのように演算されるか
     * 
     * - `sum`: 加算　必ず最初に計算される
     * - `mul`: 乗算　同じく乗算であるすべての値を合計したあと、sumであるステータスの合計値に乗算される
     * - `fix`: 固定　それまでの計算をすべて無視して一定の値に固定する
     */
    calculationType: "sum" | "mul" | "fix"

    /**
     * 部分要素をUI上で表示するときの翻訳テキストID
     * 
     * ステータス変換のスキル名やバフ名などを指定する場合に用いる
     */
    intlID?: string

    /**
     * 部分要素の具体的な値　表示時の形式がtypeで決定される
     * 
     * - `type=constant`: 定数値
     * - `type=level-dependent`: レベル比例値
     * - `type=combined`: 定数値+レベル比例値の合計
     * - `type=weapon-base`: 実験体の基礎値と武器の基礎値の合計
     * - `type=status-conversion`: 実験体のパッシブスキルなどによる別ステータスからの変換で得られた値 `value`が`undefined`の場合は未計算を表す
     */
    value: 
        {   
            type: "constant", 
            value: Decimal.Value 
        } |
        { 
            type: "level-dependent", 
            incrementalFactor: { type: "level" | "mastery", oneBased?: boolean, value: Decimal.Value }, 
            multiplier: Decimal.Value,
            value: Decimal.Value
        } |
        { 
            type: "combined", 
            constant: Decimal.Value, 
            incrementalFactor: { type: "level" | "mastery", oneBased?: boolean, value: Decimal.Value }, 
            multiplier: Decimal.Value,
            value: Decimal.Value
        } | 
        {
            type: "weapon-base",
            subject: Decimal.Value,
            weapon?: Decimal.Value,
            value: Decimal.Value
        } |
        {
            type: "status-conversion",
            func: (status: Status) => Decimal.Value,
            value?: Decimal.Value
        }
}

/**
 * 基礎値/レベル比例値を与えて、ステータス部分要素の値部分を適切な型で構成する
 * @param level 現在の実験体のレベル
 * @param oneBased 1始まりかどうか　実験体ステータスは1始まりだが装備ステータスはレベル比例値がLv1から加算される
 * @param values 基礎値およびレベル比例値
 * @returns 
 */
export function createComponentValue(
    level: number,
    oneBased: boolean,
    values: {
        base?: Decimal.Value,
        levelProportional?: Decimal.Value
    }
): StatusValueComponent["value"] | undefined {
    const hasBaseValue = values.base != undefined;
    const hasLevelProportionalValue = values.levelProportional != undefined;

    if (!hasBaseValue && !hasLevelProportionalValue) {
        return undefined;
    }
    else if (hasBaseValue && !hasLevelProportionalValue) {
        return {
            type: "constant",
            value: values.base!
        };
    }
    else if (!hasBaseValue && hasLevelProportionalValue) {
        return {
            type: "level-dependent",
            incrementalFactor: {
                type: "level",
                oneBased,
                value: level
            },
            multiplier: values.levelProportional!,
            value: new Decimal(level).sub(oneBased ? 1 : 0).times(values.levelProportional!)
        };
    }
    else {
        return {
            type: "combined",
            constant: values.base!,
            incrementalFactor: {
                type: "level",
                oneBased: true,
                value: level
            },
            multiplier: values.levelProportional!,
            value: new Decimal(level).sub(oneBased ? 1 : 0).times(values.levelProportional!).add(values.base!)
        };
    }
}
