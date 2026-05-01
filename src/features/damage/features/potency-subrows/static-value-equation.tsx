import * as React from "react";
import { extractSkillLevel, extractStaticValueRatio, ValueOrigin, ValueRatio } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio";
import { RatioUnitExpressionStrategyDictionary } from "./strategy";
import { useSubjectStateStore } from "@app/features/subject-config/store";

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
        return Object.entries(ratio).reduce((prev, [key, value]): React.ReactElement[] => {
            const sanitizedValue = (() => {
                if (Array.isArray(value)) {
                    // スキルレベル依存レシオ
                    const skillLevel = extractSkillLevel(config, props.origin);
                    if (skillLevel == undefined) {
                        throw new Error(`level-dependent damage ratio is passed with non-level dependent origin. `)
                    }
                    return <>{value[skillLevel]}</>;
                } else if (typeof value == "object") {
                    // 入れ子レシオ
                    return <>{"{"}{equation(value)} = {calculateValue(value, status, config, props.origin).static.toString()}{"}"}</>;    
                } else {
                    // 固定レシオ
                    return <>{value}</>;
                }
            })();

            const ratioKey = key as keyof ValueRatio;
            

            const expressionStrategy = RatioUnitExpressionStrategyDictionary[key as keyof ValueRatio];
            if (expressionStrategy == undefined) {
                return prev;
            } else {
                const expression = expressionStrategy(sanitizedValue, config, status);
                if (expression.previousElementsModifier) {
                    return [
                        <React.Fragment key={`${key}-before`}>{expression.previousElementsModifier(prev)}</React.Fragment>, 
                        <React.Fragment key={`${key}`}>{expression.element}</React.Fragment>
                    ];
                } else {
                    return prev.concat(
                        <React.Fragment key={key}>
                            {prev.length > 0 ? " + " : null}
                            {expression.element}
                        </React.Fragment>
                    );
                }
            }
        }, [] as React.ReactElement[]);
    }

    return (
        <tr>
            {props.label ? <td>{props.label}</td> : null}
            {
                Object.keys(extractStaticValueRatio(props.ratio)).length == 1 && props.ratio["base"] != undefined ?
                    <td colSpan={props.label ? undefined : 2}>{props.calculated}{props.percent ? "%" : null}</td> :
                    <td colSpan={props.label ? undefined : 2}>{equation(props.ratio)} = {props.calculated}{props.percent ? "%" : null}</td>
            }
        </tr>
    );
}

export default staticValueEquation;