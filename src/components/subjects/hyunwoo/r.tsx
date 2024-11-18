import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ヒョヌが{Constants.R.max_charge}秒間力を溜めた後、強力なパンチを打ち、敵に
            <Value skill="R" ratio={Constants.R.min_damage} /> ~ <Value skill="R" ratio={Constants.R.max_damage} />
            のスキルダメージを与え、{Constants.R.defense_down.duration}秒間防御力を{Constants.R.defense_down.effect[props.skillLevel]}%減少させて少し突き飛ばします。<br />
            <br />
            力を最大に溜めた場合、対象を範囲の外まで押し飛ばして{Constants.R.stun}秒間気絶させます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo:<>
        力を最大に溜めた場合、対象を範囲の外まで押し飛ばして{Constants.R.stun}秒間気絶させます。<br />
        スキルチャージ時間に応じて最大{Constants.R.max_later_delay}秒の後ディレイが適用されます。スキルを使用できなかった場合、クールダウンが{Constants.R.cooldown_payback}%返されます。
    </>,
    parameters: [
        {title: "最小ダメージ量", values: Constants.R.min_damage.base},
        {title: "最大ダメージ量", values: Constants.R.max_damage.base},
        {title: "防御力減少量(%)", values: Constants.R.defense_down.effect},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
