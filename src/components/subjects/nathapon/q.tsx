import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ナタポンが指定した領域を撮影して<Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを与えます。被写体スタックが
            {Constants.T.max_stack}の敵はしばらくの間移動速度と攻撃速度が減少します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}
