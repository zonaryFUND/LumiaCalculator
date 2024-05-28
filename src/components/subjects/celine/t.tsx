import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { additionalAmp } from "./status-override";
import { useValueContext } from "components/tooltip/value-context";

const t: React.FC<SubjectSkillProps> = props => {
    const { status } = useValueContext();
    return (
        <>
            セリーヌがスキルを{Constants.T.count}回使用すると、次の基本攻撃に<Value skill="T" ratio={Constants.T.damage} />
            のスキルダメージが追加されます。<br />
            <br />
            セリーヌはクールダウン減少ステータスに影響されない代わりに、クールダウン減少ステータスを1%あたり{Constants.T.cooldown_conversion}のスキル増幅に置き換えます。<br />
            現在増加したスキル増幅:{additionalAmp(status).toString()}
        </>
    )
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>この基本攻撃はスキル攻撃とも見なされます。</>,
    parameters: [
        {title: "スキル増幅比例ダメージ増加量", values: Constants.T.damage.amp, percent: true}
    ]
}