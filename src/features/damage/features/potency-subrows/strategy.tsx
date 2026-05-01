import * as React from "react";
import table from "components/common/table.module.styl";
import { SubjectConfig } from "app-types/subject-dynamic/config"
import { Status } from "app-types/subject-dynamic/status/type"
import Decimal from "decimal.js"
import { calculateValue, extractSkillLevel, ValueElement, ValueOrigin, ValueRatio } from "app-types/value-ratio";
import { FormattedMessage } from "react-intl";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import EquationUnit from "../../components/potency-subrows/equation-unit";

type RatioEquationExpressionStrategy = (ratio: React.ReactElement, config: SubjectConfig, status: Status) => {
    previousElementsModifier?: (prev: React.ReactElement[]) => React.ReactElement
    element: React.ReactElement
}

function standardExpressionStrategy(label: React.ReactElement, extract: (config: SubjectConfig, status: Status) => Decimal.Value): RatioEquationExpressionStrategy {
    return (ratio, config, status) => ({
        element: (
            <>
                <span className={table.small}>{label}</span>
                {extract(config, status).toString()} x {ratio}%
            </>
        )
    })
}

function withoutPercentExpressionStrategy(label: React.ReactElement, extract: (config: SubjectConfig, status: Status) => Decimal.Value): RatioEquationExpressionStrategy {
    return (ratio, config, status) => ({
        element: (
            <>
                <span className={table.small}>{label}</span>
                {extract(config, status).toString()} x {ratio}
            </>
        )
    })
}

/**
 * 威力レシオのkeyとなる各パラメータについて、それを計算式の計算単位として表現するための戦略をkeyごとに収めた辞書
 * 
 * ここにない`ValueRatio`の表示戦略は、必ず独自Strategyで定義されている（e.g. デビマリT）か、あるいは動的値（対象最大体力など）である
 */
export const RatioUnitExpressionStrategyDictionary: Partial<Record<keyof ValueRatio, RatioEquationExpressionStrategy>> = {
    base: (ratio) => ({ element: <React.Fragment key="base">{ratio}</React.Fragment> }),
    level: withoutPercentExpressionStrategy(<FormattedMessage id="레벨" />, (config) => config.level),
    maxHP: standardExpressionStrategy(<FormattedMessage id="StatType/MaxHp" />, (_, status) => status.maxHp.calculatedValue),
    additionalMaxHP: standardExpressionStrategy(<FormattedMessage id="StatType/AddedHpAmount" />, (_, status) => status.maxHp.additionalValue),
    defense: standardExpressionStrategy(<FormattedMessage id="StatType/Defense" />, (_, status) => status.defense.calculatedValue),
    attack: standardExpressionStrategy(<FormattedMessage id="StatType/AttackPower" />, (_, status) => status.attackPower.calculatedValue),
    additionalAttack: standardExpressionStrategy(<FormattedMessage id="ToolTipType/AddAttackPower" />, (_, status) => status.attackPower.additionalValue),
    basicAttackAmp: (_, __, status) => {
        if (status.increaseBasicAttackDamageRatio.calculatedValue.greaterThan(0)) {
            return {
                previousElementsModifier: (prev) => prev.length > 1 ? <>({prev})</> : <>{prev}</>,
                element: <> x (<span className={table.small}><FormattedMessage id="StatType/IncreaseBasicAttackDamageRatio" /></span>{status.increaseBasicAttackDamageRatio.calculatedValue.toString()}% + 1)</>
            }
        } else {
            return { element: <></> }
        }
    },
    criticalChance: (ratio, _, status) => ({
        previousElementsModifier: prev => <>({prev})</>,
        element: <> x (<span className={table.small}><FormattedMessage id="StatType/CriticalStrikeChance" /></span>{status.criticalStrikeChance.calculatedValue.toString()}% x {ratio})</>
    }),
    additionalAttackSpeed: standardExpressionStrategy(<FormattedMessage id="ToolTipType/AddAttackSpeedRatio" />, (_, status) => status.attackSpeed.additionalValue),
    amp: standardExpressionStrategy(<FormattedMessage id="StatType/IncreaseSkillDamageRatio" />, (_, status) => status.skillAmp.calculatedValue),
    stack: withoutPercentExpressionStrategy(<FormattedMessage id="app.stack" />, (config) => config.stack),
    gauge: standardExpressionStrategy(<FormattedMessage id="app.gauge" />, (config) => config.gauge)
}

const MultipliedRatioKeys: (keyof ValueRatio)[] = ["basicAttackAmp", "criticalChance"];

const Unit: React.FC<{key: keyof ValueRatio, ratio: React.ReactElement}> = ({key, ratio}) => {
    const config = useSubjectStateStore(state => state.config);
    const status = useSubjectStateStore(state => state.status);

    switch (key) {
        case "base":
            return <>{ratio}</>;
        case "level":
            return <EquationUnit labelIntlID="레벨" ratio={ratio} currentValue={config.level} />;
        case "maxHP":
            return <EquationUnit labelIntlID="StatType/MaxHp" ratio={ratio} currentValue={status.maxHp.calculatedValue} percent  />;
        case "additionalMaxHP":
            return <EquationUnit labelIntlID="StatType/AddedHpAmount" ratio={ratio} currentValue={status.maxHp.additionalValue} percent />;
        case "defense":
            return <EquationUnit labelIntlID="StatType/Defense" ratio={ratio} currentValue={status.defense.calculatedValue} percent />;
        case "attack":
            return <EquationUnit labelIntlID="StatType/AttackPower" ratio={ratio} currentValue={status.attackPower.calculatedValue} percent />;
        case "additionalAttack":
            return <EquationUnit labelIntlID="ToolTipType/AddAttackPower" ratio={ratio} currentValue={status.attackPower.additionalValue} percent />;
        case "additionalAttackSpeed":
            return <EquationUnit labelIntlID="ToolTipType/AddAttackSpeedRatio" ratio={ratio} currentValue={status.attackSpeed.additionalValue} percent />;
        case "amp":
            return <EquationUnit labelIntlID="StatType/IncreaseSkillDamageRatio" ratio={ratio} currentValue={status.skillAmp.calculatedValue} percent />;
        case "stack":
            return <EquationUnit labelIntlID="app.stack" ratio={ratio} currentValue={config.stack} />;
        case "gauge":
            return <EquationUnit labelIntlID="app.gauge" ratio={ratio} currentValue={config.gauge} percent />;
        default:
            return <></>;
    }
}

const Equation: React.FC<ValueRatio> = (ratio) => {
    const [summedRatio, multipliedRatio] = Object.entries(ratio).reduce<[ValueRatio, ValueRatio]>((
        [summed, multiplied], 
        [key, value] 
    ) => {
        if (MultipliedRatioKeys.includes(key as keyof ValueRatio)) {
            return [summed, { ...multiplied, [key]: value }];
        } else {
            return [{ ...summed, [key]: value }, multiplied];
        }
    }, [{}, {}]);

    const hasMultiplied = Object.keys(multipliedRatio).length > 0;

    const summedElements = Object.entries(summedRatio).map(([key, value]) => {
        switch (key) {
            case "base":
                return <React.Fragment key="base">{value}</React.Fragment>;
            case "level":
            case "maxHP":
            case "additionalMaxHP":
            case "defense":
            case "attack":
            case "additionalAttack":
            case "additionalAttackSpeed":
            case "amp":
            case "stack":
            case "gauge":
                return RatioUnitExpressionStrategyDictionary[key as keyof ValueRatio]!(value, config, status).element;
            default:
                return <></>;
        }
    });
}