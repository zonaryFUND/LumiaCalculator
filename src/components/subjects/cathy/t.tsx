import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const t: React.FC<SubjectSkillProps> = props => {
    const { showEquation } = useValueContext();

    const criticalWound = showEquation ?
        <Value skill="T" ratio={Constants.T.critical_wound} /> :
        <Value skill="T" ratio={{amp: Constants.T.critical_wound.amp, targetMaxHP: Constants.T.critical_wound.targetMaxHP}} />;

    return (
        <>
            キャッシーが敵にスキルダメージを与えると{Constants.T.wound_duration}秒間<Value skill="T" ratio={Constants.T.wound} />
            のダメージを与える外傷を付与します。<br />
            外傷が{Constants.T.max_stack}スタックになると、敵は{Constants.T.wound_duration}秒間{criticalWound}
            のダメージを受ける致命的外傷状態になります。致命的外傷状態の敵は治癒効果が{Constants.T.healing_reduction}%減少します。<br />
            キャッシーは敵を致命的外傷状態にさせると{Constants.T.shield_duration}秒間<Value skill="T" ratio={Constants.T.shield} {...props} />
            のダメージを防ぐシールドを獲得し、外傷または致命的外傷状態の敵に向かって移動する時、移動速度が{Constants.T.movement_speed[props.skillLevel]}
            %増加した後徐々に減少します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "シールド吸収量", values: Constants.T.shield.base},
        {title: "移動速度増加量", values: Constants.T.movement_speed, percent: true}
    ]
}