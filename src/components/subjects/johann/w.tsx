import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        指定した地点に{Constants.W.duration}秒間維持される<span className={style.emphasis}>神聖の香炉</span>を設置します。香炉の煙の中にいる敵は移動速度が
        {Constants.W.slow}%減少し、味方は攻撃速度が{Constants.W.attack_speed[props.config.skillLevels.W]}%増加して与えたダメージの{Constants.W.mastery_conversion}
        %をヨハンの熟練度に反映します。味方強化効果は煙の外でも{Constants.W.effect_remain}秒間維持されます。<br />
        <br />
        神聖の香炉は設置後、1回だけ位置を移動させることができ、持続時間が終わるまで破壊されなかった場合、クールダウンが{Constants.W.cooldown_reduction}%減少します。
    </>
);

export default w;

export const values: ValuesProps = {
    additionalInfo: <>神聖の香炉は敵の基本攻撃で破壊されます。</>,
    parameters: [
        {title: "攻撃速度増加量(%)", values: Constants.W.attack_speed, percent: true},
        {title: "消費", values: Constants.W.sp_cost},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}