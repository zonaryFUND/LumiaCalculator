import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { additionalAmp } from "./status-override";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        セリーヌがスキルを{Constants.T.count}回使用すると、次の基本攻撃に<Damage skill="T" constants={Constants.T.damage} {...props} />
        のスキルダメージが追加されます。<br />
        <br />
        セリーヌはクールダウン減少ステータスに影響されない代わりに、クールダウン減少ステータスを1％あたり{Constants.T.cooldown_conversion}のスキル増幅に置き換えます。<br />
        現在増加したスキル増幅:{additionalAmp(props.status).toString()}
    </>
)

export default t;

export const values: ValuesProps = {
    additionalInfo: <>この基本攻撃はスキル攻撃とも見なされます。</>,
    parameters: [
        {title: "スキル増幅比例ダメージ増加量", values: Constants.T.damage.amp, percent: true}
    ]
}