import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            基本攻撃をすると{Constants.T.cooldown.constant[props.config.skillLevels.T]}秒ごとに水溜りを生成します。レオンが水溜りの上にいると移動速度が
            {Constants.T.movement_speed[props.config.skillLevels.T]}%、攻撃速度が{Constants.T.attack_speed[props.config.skillLevels.T]}%増加します。<br />
            水中強打：レオンが水溜りの上にいると基本攻撃ダメージに<Damage skill="T" constants={Constants.T.damage} {...props} />の追加スキルダメージを与えます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "移動速度増加量(%)", values: Constants.T.movement_speed, percent: true},
        {title: "追加攻撃速度(%)", values: Constants.T.attack_speed, percent: true},
        {title: "ダメージ量", values: Constants.T.damage.base},
        {title: "クールダウン", values: Constants.T.cooldown.constant}
    ]
}
