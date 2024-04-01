import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            エマは{Constants.T.cooldown.constant[props.config.skillLevels.T]}秒ごとに基本攻撃する時、攻撃速度が
            {Constants.T.attack_speed}％増加し、<Damage skill="T" constants={Constants.T.damage} {...props} />
            の追加スキルダメージを与え、<Damage skill="T" constants={Constants.T.shield} {...props} />のシールドを獲得します。
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
