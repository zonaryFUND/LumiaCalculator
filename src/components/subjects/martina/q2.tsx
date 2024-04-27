import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マルティナが指定した方向を撮影し、<Damage skill="Q" constants={Constants.Q2.damage} {...props} />のスキルダメージを与えます。スキルが的中するとクールダウンが
            {Constants.Q2.cooldown_reduction}％減少し、刻印が消耗されるとマルティナの移動速度が
            {Constants.Q2.movement_speed.duration[props.config.skillLevels.Q]}秒間{Constants.Q2.movement_speed.effect[props.config.skillLevels.Q]}％増加し、攻撃速度が
            {Constants.Q2.attack_speed.duration}秒間{Constants.Q2.attack_speed.effect[props.config.skillLevels.Q]}％増加します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q2.damage.base},
        {title: "移動速度増加量(％)", values: Constants.Q2.movement_speed.effect, percent: true},
        {title: "移動速度増加持続時間", values: Constants.Q2.movement_speed.duration},
        {title: "攻撃速度増加量(％)", values: Constants.Q2.attack_speed.effect, percent: true},
        {title: "クールダウン", values: Constants.Q2.cooldown},
        {title: "消費", values: Constants.Q2.sp_cost}
    ]
}
