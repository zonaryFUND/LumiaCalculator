import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            シセラは現在の体力が低いだけ体力回復量とスキル増幅が増加します。<br />
            体力回復量(1秒)：{Constants.T.heal.min[props.skillLevel]} ~ {Constants.T.heal.max[props.skillLevel]}<br />
            スキル増幅：{Constants.T.amp.min[props.skillLevel]} ~ {Constants.T.amp.max[props.skillLevel]}<br />
            シセラはウィルソンが戻ってきた後、次の基本攻撃が<Value skill="T" ratio={Constants.T.damage} />の追加スキルダメージを与え、
            {Constants.T.slow.duration}秒間移動速度を{Constants.T.slow.effect[props.skillLevel]}%減少させます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>スキルを使用できなかった場合、クールダウンが{Constants.R.cooldown_return}%返されます。</>,
    parameters: [
        {title: "最大体力回復量", values: Constants.T.heal.max},
        {title: "最大スキル増幅量", values: Constants.T.amp.max},
        {title: "移動速度減少量(%)", values: Constants.T.slow.effect, percent: true}
    ]
}
