import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            シルヴィアがバイクに乗り1秒ごとに{Constants.HumanR.fuel_consumption}の燃料を消費します。バイク状態では基本移動速度
            {Constants.HumanR.movement_speed[props.config.skillLevels.R]}と防御力が{Constants.HumanR.defense[props.config.skillLevels.R]}
            増加し、バイクスキルを使用できます。<br />
            バイクに搭乗するとエンジンがかかって、しばらくの間移動速度が変化します。<br />
            {Constants.HumanR.ms_penalty.duration}秒間移動速度変化:{Constants.HumanR.ms_penalty.effect[props.config.skillLevels.R]}％<br />
            燃料が{Constants.HumanR.threshold}以上の場合のみスキルを使用できます。<br />
            <br />
            バイク状態では基本攻撃と武器スキルは使用できません。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "基本移動速度", values: Constants.HumanR.movement_speed},
        {title: "防御力", values: Constants.HumanR.defense},
        {title: "予熱中の移動速度", values: Constants.HumanR.movement_speed, percent: true},
        {title: "クールダウン", values: Constants.HumanR.cooldown},
    ]
}
