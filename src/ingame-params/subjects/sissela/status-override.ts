import Constants from "./constants.json";
import Decimal from "decimal.js";
import { StatusOverrideFunc } from "../type";
import { AddComponent } from "app-types/subject-dynamic/status/value/type";
import { UniqueValueStrategy } from "../unique-value-strategy";

function Additional(target: "amp" | "heal", currentHPRatio: Decimal, tSkillLevel: number): number {
    const base = Constants.T.amp.min[tSkillLevel];
    const per10 = (Constants.T.amp.max[tSkillLevel] - Constants.T.amp.min[tSkillLevel]) / 8;
    const step = currentHPRatio.div(10).floor();

    if (step.isZero()) return 0;
    return (step.toNumber() - 1) * per10 + base + (target == "amp" ? 0 : per10);
}

export const AdditionalAmpStrategy: UniqueValueStrategy = ({ config, status, hp }) => {
    return {    
        value: new Decimal(Additional("amp", new Decimal(1).sub(new Decimal(hp).div(status.maxHp.calculatedValue)).times(100), config.skillLevels.T)),
        equationExpression: [
            {
                expression: [
                    {intlID: "インゲームの増幅量はツールチップ表記上限値を上回る場合がありますが、本計算機ではツールチップ表記通りに線形に増加すると仮定して実装しています。"}
                ]
            }            
        ]
    }
}

export const AdditionalHealStrategy: UniqueValueStrategy = ({ config, status, hp }) => {
    return {    
        value: new Decimal(Additional("heal", new Decimal(1).sub(new Decimal(hp).div(status.maxHp.calculatedValue)).times(100), config.skillLevels.T)),
        equationExpression: []
    }
}

const f: StatusOverrideFunc = (status, config, hp) => {
    return {
        ...status,
        skillAmp: AddComponent(status.skillAmp, {
            origin: "perpetual_status",
            calculationType: "sum",
            intlID: "T",
            value: {
                type: "constant",
                value: Additional("amp", new Decimal(1).sub(new Decimal(hp).div(status.maxHp.calculatedValue)).times(100), config.skillLevels.T)
            }
        })
    }
};

export default f;
