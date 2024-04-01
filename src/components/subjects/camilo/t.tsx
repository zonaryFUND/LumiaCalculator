import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        カミロが敵にダメージを与えると3秒間シールドが生成されて<Damage skill="T" constants={Constants.T.shield} {...props} />
        のダメージを防ぎ、攻撃速度が{Constants.T.attack_speed[props.config.skillLevels.T]}％増加します。<br />
        基本攻撃とスキルで交互にダメージを与えると、オーレとシエレのクールダウンが{Constants.T.wt_cooldown_reduction}秒減少します。
    </>
)

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "シールド吸収量", values: Constants.T.shield.base},
        {title: "攻撃速度増加量(％)", values: Constants.T.attack_speed, percent: true},
        {title: "クールダウン", values: Constants.T.cooldown.constant}
    ]
}
