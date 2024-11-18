import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        バニスが貫通型弾を発射して<Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを与え、
        {Constants.Q.slow.duration}秒間移動速度を{Constants.Q.slow.effect[props.skillLevel]}%減少させます。<br />
        束縛状態の敵には<Value skill="Q" ratio={Constants.Q.enhanced_damage} />のスキルダメージを与え、
        {Constants.Q.enhanced_slow.duration}秒間移動速度を{Constants.Q.enhanced_slow.effect[props.skillLevel]}%減少させます。
    </>
)

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "攻撃速度減少量(%)", values: Constants.Q.slow.effect, percent: true},
        {title: "強化されたダメージ量", values: Constants.Q.enhanced_damage.base},
        {title: "強化された攻撃速度減少量(%)", values: Constants.Q.enhanced_slow.effect, percent: true},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}