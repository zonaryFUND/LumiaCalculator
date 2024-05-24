import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        スアが指定した位置に2冊の本を生成し、その後、中央に本を引き寄せて範囲内の敵に
        <Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを与え、{Constants.Q.bookmark_duration}秒間栞を残します。<br />
        栞が残った対象に新しい栞を残すと<Value skill="Q" ratio={Constants.Q.bookmark_damage} />
        のスキルダメージを与えて{Constants.Q.stun}秒間気絶させます。<br />
        本の衝突地点にいる敵には{Constants.Q.center_multiplier}%増加したダメージを与えて
        {Constants.Q.slow.duration}秒間移動速度を{Constants.Q.slow.effect[props.skillLevel]}%減少させます。
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "栞ダメージ量", values: Constants.Q.bookmark_damage.base},
        {title: "移動速度減少量(%)", values: Constants.Q.slow.effect, percent: true},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost},
    ]
}