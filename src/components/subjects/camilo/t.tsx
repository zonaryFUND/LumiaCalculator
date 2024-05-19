import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        カミロが敵にダメージを与えると3秒間シールドが生成されて<Value skill="T" ratio={Constants.T.shield} />
        のダメージを防ぎ、攻撃速度が{Constants.T.attack_speed[props.skillLevel]}%増加します。<br />
        基本攻撃とスキルで交互にダメージを与えると、オーレとシエレのクールダウンが{Constants.T.wt_cooldown_reduction}秒減少します。
    </>
)

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "シールド吸収量", values: Constants.T.shield.base},
        {title: "攻撃速度増加量(%)", values: Constants.T.attack_speed, percent: true},
        {title: "クールダウン", values: Constants.T.cooldown.constant}
    ]
}
