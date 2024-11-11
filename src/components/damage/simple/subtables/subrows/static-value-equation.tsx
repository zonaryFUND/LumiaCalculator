import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { RatioKeys, ValueRatio } from "app-types/value-ratio";
import Decimal from "decimal.js";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import table from "components/common/table.module.styl";

type Props = {
    label?: React.ReactElement
    skillLevel?: number
    config: SubjectConfig
    status: Status
    ratio: ValueRatio
    calculated: React.ReactElement
    percent?: boolean
}

type EquationBuildConfigDefinition = {
    label: React.ReactNode
    extract: Decimal.Value
    omitPercent?: boolean
} | {
    reducer: (prev: React.ReactElement[], value: number) => React.ReactElement[]
}

const EquationBuildConfig: (config: SubjectConfig, status: Status) => Partial<{[key in RatioKeys]: EquationBuildConfigDefinition}> = (config, status) => ({
    base: {
        reducer: (p, v) => p.concat(<React.Fragment key="base">{v}</React.Fragment>)
    },
    attack: {
        label: <FormattedMessage id="status.attack-power" />,
        extract: status.attackPower.calculatedValue
    },
    additionalAttack: {
        label: "追加攻撃力",
        extract: status.attackPower.additional ?? 0
    },
    maxHP: {
        label: <FormattedMessage id="status.maxhp" />,
        extract: status.maxHP.calculatedValue
    },
    additionalMaxHP: {
        label: <FormattedMessage id="status.additional-maxhp" />,
        extract: status.maxHP.additional ?? 0
    },
    defense: {
        label: <FormattedMessage id="status.defense" />,
        extract: status.defense.calculatedValue
    },
    amp: {
        label: <FormattedMessage id="status.skill-amp" />,
        extract: status.skillAmp.calculatedValue
    },
    level: {
        label: "レベル",
        extract: config.level,
        omitPercent: true
    },
    basicAttackAmp: {
        reducer: (p, v) => {
            if (status.basicAttackAmp.calculatedValue.greaterThan(0)) {
                return [
                    p.length > 1 ? <React.Fragment key="before-aa-amp">({p})</React.Fragment> : <React.Fragment key="before-aa-amp">{p}</React.Fragment>,
                    <React.Fragment key="aa-amp"> x (<span className={table.small}>基本攻撃増幅</span>{status.basicAttackAmp.calculatedValue.toString()}% + 1)</React.Fragment>
                ]
            } else {
                return p
            }
        }
    },
    criticalChance: {
        reducer: (p, v) => [
            <React.Fragment key="before-critical-chance">({p})</React.Fragment>, 
            <React.Fragment key="critical-chance"> x (<span className={table.small}>致命打確率</span>{status.criticalChance.calculatedValue.toString()}% x {v})</React.Fragment>
        ]
    },
    stack: {
        label: "スタック",
        extract: config.stack,
        omitPercent: true
    },
    gauge: {
        label: "ゲージ",
        extract: config.gauge
    },
    additionalAttackSpeed: {
        label: "追加攻撃速度(%)",
        extract: status.attackSpeed.additional ?? 0
    }
})

const staticValueEquation: React.FC<Props> = props => {
    const equation = (Object.entries(props.ratio) as [RatioKeys, number | number[]][])
        .reduce((prev, [key, value]) => {
            const sanitizedValue = (() => {
                if (Array.isArray(value)) {
                    if (props.skillLevel == undefined) {
                        console.log(props)
                        throw new Error(`level-dependent damage ratio is passed without its skill level. `)
                    }
                    return value[props.skillLevel];
                } else {
                    return value;
                }
            })();

            const buildConfig = EquationBuildConfig(props.config, props.status)[key];
            if (buildConfig == undefined) {
                return prev;
            } else if ("label" in buildConfig) {
                const plus = prev.length > 0 ? "+" : null;
                const added = <>
                    <span className={table.small}>{buildConfig.label}</span>
                    {buildConfig.extract.toString()} x {sanitizedValue}
                    {buildConfig.omitPercent ? null : "%"}
                </>;
                return prev.concat(<React.Fragment key={key}>{plus}{added}</React.Fragment>);
            } else {
                return buildConfig.reducer(prev, sanitizedValue);
            }
        }, [] as React.ReactElement[]);

    return <tr>
        {props.label ? <td>{props.label}</td> : null}
        <td colSpan={props.label ? undefined : 2}>{equation} = {props.calculated}{props.percent ? "%" : null}</td>
    </tr>;
}

export default staticValueEquation;