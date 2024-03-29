import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        つばめが忍び足でより素早く動き、移動速度が{Constants.W.movement_speed[props.config.skillLevels.W]}
        ％増加しては徐々に{Constants.W.ms_duration[props.config.skillLevels.W]}秒間徐々に減少します。<br />
        {Constants.W.as_duration}秒間次に行う{Constants.W.attack_speed_count}回の基本攻撃の攻撃速度が
        {Constants.W.attack_speed[props.config.skillLevels.W]}％増加します。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "移動速度増加量(％)", values: Constants.W.movement_speed, percent: true},
        {title: "攻撃速度増加量(％)", values: Constants.W.attack_speed, percent: true},
        {title: "移動速度増加持続時間", values: Constants.W.ms_duration},
        {title: "消費", values: Constants.W.sp_cost},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}