import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        つばめが忍び足でより素早く動き、移動速度が{Constants.W.movement_speed[props.skillLevel]}
        %増加しては徐々に{Constants.W.ms_duration}秒間徐々に減少します。<br />
        {Constants.W.as_duration}秒間攻撃速度が
        {Constants.W.attack_speed[props.skillLevel]}%増加します。
    </>
);

export default w;

export const values: ValuesProps = {
    additionalInfo: <>つばめが基本攻撃すると、忍び足のクールダウンが{Constants.W.cooldown_reduction}秒ずつ減少します。</>,
    parameters: [
        {title: "移動速度増加量(%)", values: Constants.W.movement_speed, percent: true},
        {title: "攻撃速度増加量(%)", values: Constants.W.attack_speed, percent: true},
        {title: "消費", values: Constants.W.sp_cost},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}