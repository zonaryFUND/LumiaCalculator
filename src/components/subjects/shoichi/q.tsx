import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            彰一が突き攻撃をし、敵に<Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを与えます。<br />
            スキルが的中した場合、クールダウンが{Constants.Q.cooldown_reduction}秒減少し、次に使用する表裏のスキルが強化されます。強化されたスキルは攻撃範囲が増加し、彰一の正面に短剣を生成します。<br />
            <br />
            {Constants.Q.enhance_duration}秒後には強化効果が消えます。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
