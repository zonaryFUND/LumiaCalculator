import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            基本攻撃をすると{Constants.T.cooldown.constant[props.skillLevel]}秒ごとに水溜りを生成します。レオンが水溜りの上にいると移動速度が
            {Constants.T.movement_speed[props.skillLevel]}%、攻撃速度が{Constants.T.attack_speed[props.skillLevel]}%増加します。<br />
            水中強打：レオンが水溜りの上にいると基本攻撃ダメージに<Value skill="T" ratio={Constants.T.damage} />の追加スキルダメージを与えます。
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
