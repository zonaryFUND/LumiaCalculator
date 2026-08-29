import { useSubjectStateStore } from "@app/features/subject-config/store";
import { ValueRatio } from "core/value-ratio";
import Decimal from "decimal.js";
import * as React from "react";
import { FormattedMessage } from "react-intl";

type Props = {
    /**
     * 対象の状態に依存しない値に追加で表記される要素かどうか
     * 
     * true: 150(+対象の最大体力の5%)のような、カッコと+記号付きの表記
     * false: 対象の最大体力の5%のような、カッコも+もない表記
     */
    beginAsSecondUnit: boolean

    /**
     * スキル威力のうち、対象の状態に依存する部分
     * 
     * caculatedValue関数で計算されたスキル威力の戻り値において、対象の最大体力依存部など、
     * スキル使用者の状態だけでは決定できない部分が別途返却される
     * 
     * その部分を代入し、スキル威力部分の表示を生成する
     * 
     * なお、「自身の失った体力」はスキル使用者の状態から単独で決定可能だが、
     * 威力表示セルにおいて失った体力の5%(100)のような表記をするため、このコンポーネントで取り扱う
     */
    dynamicRatio: {[K in keyof ValueRatio]: Decimal}

    /**
     *  複数回ヒットの表記セル、回復スキルの場合の倍率など、
     *  スキル威力に掛けられる倍率
     */ 
    multipliers: Decimal[]
}

const DynamicRatioExpression: React.FC<Props> = props => {
    const maxHP = useSubjectStateStore(s => s.status.maxHp.calculatedValue);
    const hpRatio = useSubjectStateStore(s => s.hpRatio);
    const lostHP = maxHP.percent(100 - hpRatio).floor();

    return Object.entries(props.dynamicRatio)
        .map(([key, value]) => {
            const intlID = (() => {
                switch (key) {
                    case "targetHP":        return "app.value.target-hp";
                    case "targetLostHP":    return "app.value.target-lost-hp";
                    case "lostHP":          return "app.value.lost-hp";
                    case "targetMaxHP":     return "app.value.target-maxhp";
                    default:                throw new Error(`unknown dynamic ratio key: ${key}`);
                }
            })();

            const ratio = props.multipliers.reduce((prev, current) => prev.percent(current), value);

            return (
                <>
                    <FormattedMessage id={intlID} values={{ratio: ratio.toString()}} />
                    {/* 自身の失った体力に依存する値のみ、特別な表記をする */}
                    {key == "lostHP" ? `(${lostHP.percent(ratio).floor().toString()})` : null}
                </>
            )
        })
        .reduce((prev, current, index) => {
            const encloseValueInBrackets = index > 0 || props.beginAsSecondUnit;

            return (
                <>
                    {prev}
                    {encloseValueInBrackets ? <>(+</> : null}
                    {current}
                    {encloseValueInBrackets ? <>)</> : null}
                </>
            )
        }, null as React.ReactNode)
}

export default DynamicRatioExpression;