import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const rq: React.FC<SubjectSkillProps> = props => (
    <>
        スアが指定した位置に2冊の本を生成し、その後、中央に本を引き寄せて範囲内の敵に
        <Damage skill="R" constants={Constants.RQ.damage} {...props} />のスキルダメージを与え、{Constants.RQ.bookmark_duration}秒間栞を残します。<br />
        栞が残った対象に新しい栞を残すと<Damage skill="R" constants={Constants.RQ.bookmark_damage} {...props} />
        のスキルダメージを与えて{Constants.RQ.stun}秒間気絶させます。<br />
        本の衝突地点にいる敵には{Constants.RQ.center_multiplier}％増加したダメージを与えて
        {Constants.RQ.slow.duration}秒間移動速度を{Constants.RQ.slow.effect[props.config.skillLevels.R]}％減少させます。
    </>
);

export default rq;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.RQ.damage.base},
        {title: "栞ダメージ量", values: Constants.RQ.bookmark_damage.base},
        {title: "移動速度減少量(％)", values: Constants.RQ.slow.effect},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}