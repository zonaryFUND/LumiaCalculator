import * as React from "react";
import { extractSkillLevel, extractStaticValueRatio, ValueOrigin, ValueRatio } from "core/value-ratio";
import { calculateValue } from "core/value-ratio";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import equationExpressionOf, { joinEquationStrategy } from "./equation-expression";

type Props = {
    /**
     * 計算式自体のラベル（e.g.　莉央基本攻撃の威力計算式と致命打変換％はそれぞれ別の行で表示され、個別のラベルが付与される）
     */
    label?: React.ReactElement

    /**
     * 効果の発生源
     */
    origin: ValueOrigin

    /**
     * 威力レシオ
     */
    ratio: ValueRatio

    /**
     * この行における最終的な計算値
     */
    calculated: React.ReactElement

    /**
     * ％表記するかどうか
     */
    percent?: boolean
}

/**
 * 威力レシオとステータスから求められる計算式行
 * 
 * 対象最大体力依存値などの動的値を除く値の計算式が表示される
 */
const staticValueEquation: React.FC<Props> = props => {
    const config = useSubjectStateStore(state => state.config);
    const status = useSubjectStateStore(state => state.status);

    // 「対象の最大体力の（攻撃力のn％）％」のような入れ子計算式は再帰呼び出しで構成される
    function equation(ratio: ValueRatio): React.ReactElement[] {
        return Object.entries(ratio)
            .map(([key, value]) => {
                const sanitizedValue: React.ReactElement = (() => {
                    if (Array.isArray(value)) {
                        // スキルレベル依存レシオ
                        const skillLevel = extractSkillLevel(config, props.origin);
                        if (skillLevel == undefined) {
                            throw new Error(`level-dependent damage ratio is passed with non-level dependent origin. `)
                        }
                        return <>{value[skillLevel]}</>;
                    } else if (typeof value == "object") {
                        // 入れ子レシオ
                        // この関数を再帰的に呼び出す
                        return <>{"{"}{equation(value)} = {calculateValue(value, status, config, props.origin).static.toString()}{"}"}</>;    
                    } else {
                        // 固定レシオ
                        return <>{value}</>;
                    }
                })(); 

                return {
                    key,
                    // レシオキーによっては（例：武器未装備時のbasicAttackAmp）表示すべき内容がなくnullが
                    // 返ることがある。プレーンな関数呼び出しにすることで、その場合を後段のfilterで
                    // 結合式そのものから除外できる（結合演算子だけが浮いてしまうのを防ぐ）
                    equationUnit: equationExpressionOf(config, status, key as keyof ValueRatio, sanitizedValue)
                }
            })
            .filter((entry): entry is { key: string, equationUnit: React.ReactElement } => entry.equationUnit != null)
            .reduce((prev, {key, equationUnit}) => {
                const keyedUnit = <React.Fragment key={key}>{equationUnit}</React.Fragment>;

                if (prev.length == 0) {
                    return [keyedUnit];
                }

                const strategy = joinEquationStrategy(key as keyof ValueRatio);
                switch (strategy) {
                    case "add":
                        return prev.concat(
                            <React.Fragment key={`before-${key}`}> + </React.Fragment>,
                            keyedUnit
                        );
                    case "multiply":
                        if (prev.length < 2) {
                            return prev.concat(
                                <React.Fragment key={`before-${key}`}> x </React.Fragment>,
                                keyedUnit
                            );
                        } else {
                            return [
                                <React.Fragment key={`before-${key}`}>({prev}) x </React.Fragment>,
                                keyedUnit
                            ]
                        }
                }
            }, [] as React.ReactElement[])
    }

    return (
        <tr>
            {props.label ? <td>{props.label}</td> : null}
            {
                Object.keys(extractStaticValueRatio(props.ratio)).length == 1 && props.ratio["base"] != undefined ?
                    // 威力値がbaseのみの場合、固定値なので計算式表記はなく、サブセルには値だけを表示する
                    <td colSpan={props.label ? undefined : 2}>{props.calculated}{props.percent ? "%" : null}</td> :
                    // 威力値にbase以外の要素が存在する場合、その詳細計算式を表示する
                    <td colSpan={props.label ? undefined : 2}>{equation(props.ratio)} = {props.calculated}{props.percent ? "%" : null}</td>
            }
        </tr>
    );
}

export default staticValueEquation;