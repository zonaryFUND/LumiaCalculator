import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ガーネットが武器を振り下ろして範囲内の敵に<Value skill="Q" ratio={Constants.Q.Q1_damage} />のスキルダメージを与え、{Constants.Q.slow.duration}秒間移動速度を
            {Constants.Q.slow.effect}%減少させます。的中した場合、{Constants.Q.reuse}秒間にスキルを再使用することができます。<br />
            <br />
            再使用：衝突によりガーネットが指定した方向に地面が突き出て、範囲内の敵に<Value skill="Q" ratio={Constants.Q.Q2_damage} />のスキルダメージを与えます。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.Q1_damage.base},
        {title: "再使用ダメージ量", values: Constants.Q.Q2_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}
