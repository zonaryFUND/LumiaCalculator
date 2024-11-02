import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { RatioKeys, ValueRatio } from "app-types/value-ratio";
import Decimal from "decimal.js";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import table from "components/common/table.styl";

type Props = {
    config: SubjectConfig
    status: Status
    ratio: ValueRatio
    calculated: Decimal
}

type EquationBuildConfigDefinition = {
    label: React.ReactNode
    extract: Decimal.Value
    omitPercent?: boolean
} | {
    expression: (value: number, summonedName?: string) => React.ReactElement
}

const EquationBuildConfig: (config: SubjectConfig, status: Status) => Partial<{[key in RatioKeys]: EquationBuildConfigDefinition}> = (config, status) => ({
    base: {
        expression: (v) => <>{v}</>
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
        expression: () => <> x (<span className={table.small}>基本攻撃増幅</span>{status.basicAttackAmp.calculatedValue.toString()}% + 1)</>
    },
    criticalChance: {
        expression: (v) => <> x (<span className={table.small}>致命打確率</span>{status.criticalChance.toString()}% x {v})</>
    },
    stack: {
        label: "スタック",
        extract: config.stack,
        omitPercent: true
    },
    additionalAttackSpeed: {
        label: "追加攻撃速度(%)",
        extract: status.attackSpeed.additional ?? 0
    },
    summonedAttack: {
        expression: (c, s, v, summonedName) => <><span className={table.small}>{summonedName}攻撃力</span>{s.summonedStatus?.attackPower.toString()} x {v}%</>
    }
})

const staticValueEquation: React.FC<Props> = props => {
    const equation = (Object.entries(props.ratio) as [string, number | number[]][])
        .reduce((prev, [key, value]) => {
            const overridePrev = (() => {
                if (key == "criticalChance") {
                    return [<>({prev})</>];
                }
                if (key == "max") {
                    return [<>({prev}, </>];
                }
                if (prev.length > 0 && key != "basicAttackAmp") {

                }
            })();
            return prev;
        }), [] as React.ReactElement[]);
}

export default staticValueEquation;