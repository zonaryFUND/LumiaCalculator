import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ラウラが指定した方向に鞭を一回振り下ろして<Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを与えます。<br />
            敵に的中した場合、{Constants.Q.reuse}秒間スキルを再使用できます。<br />
            <br />
            再使用：ラウラが指定した方向に短く突進します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    additionalInfo: <>このスキルは壁を越えられません。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}
