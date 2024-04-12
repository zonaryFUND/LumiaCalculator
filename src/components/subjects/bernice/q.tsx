import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        バニスが貫通型弾を発射して<Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを与え、
        {Constants.Q.slow.duration}秒間移動速度を{Constants.Q.slow.effect[props.config.skillLevels.Q]}％減少させます。<br />
        束縛状態の敵には<Damage skill="Q" constants={Constants.Q.enhanced_damage} {...props} />のスキルダメージを与え、
        {Constants.Q.enhanced_slow.duration}秒間移動速度を{Constants.Q.enhanced_slow.effect[props.config.skillLevels.Q]}％減少させます。
    </>
)

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "攻撃速度減少量(％)", values: Constants.Q.slow.effect, percent: true},
        {title: "強化されたダメージ量", values: Constants.Q.enhanced_damage.base},
        {title: "強化された攻撃速度減少量(％)", values: Constants.Q.enhanced_slow.effect, percent: true},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}