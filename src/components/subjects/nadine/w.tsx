import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        ナディンが指定した位置にリス罠を設置します。{Constants.W.second_time_bound}秒以内には設置した範囲に罠をもう一度投げることができます。つながった罠にかかった敵は
        <Value skill="W" ratio={Constants.W.damage} />のスキルダメージを受けて攻撃速度{Constants.W.attack_speed}%と移動速度が
        {Constants.W.movement_speed[props.skillLevel]}%減少し、{Constants.W.vision}秒間ナディンに視界を提供します。<br />
        <br />
        自分のリス罠によって攻撃速度と移動速度が減少された対象は罠のダメージ量の{Constants.W.multiple_stepped_multipler}
        %に値するスキルダメージのみ与えられます。<br />
        つながっている罠は{Constants.W.duration}秒間維持され、最大{Constants.W.max_trap}セットの罠を設置することができます。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "トラップダメージ量", values: Constants.W.damage.base},
        {title: "移動速度減少量(%)", values: Constants.W.movement_speed, percent: true},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}