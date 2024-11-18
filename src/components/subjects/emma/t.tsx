import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            エマは{Constants.T.cooldown.constant[props.skillLevel]}秒ごとに基本攻撃する時、攻撃速度が
            {Constants.T.attack_speed}%増加し、<Value skill="T" ratio={Constants.T.damage} />
            の追加スキルダメージを与え、<Value skill="T" ratio={Constants.T.shield} />のシールドを獲得します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>クールダウン減少の影響を受けません。</>,
    parameters: [
        {title: "ダメージ量スキル増幅係数", values: Constants.T.damage.amp, percent: true},
        {title: "シールド吸収量", values: Constants.T.shield.base},
        {title: "シールドスキル増幅係数", values: Constants.T.shield.amp, percent: true},
        {title: "クールダウン", values: Constants.T.cooldown.constant}
    ]
}
