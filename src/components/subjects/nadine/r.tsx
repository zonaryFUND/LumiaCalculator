import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import { StackName } from "./stack";
import style from "components/tooltip/tooltip.module.styl";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        {Constants.R.duration[props.config.skillLevels.R]}秒間、基本攻撃を{Constants.R.count}回するたびにオオカミを呼び出して敵を攻撃します。オオカミは対象に飛びかかって
        <Damage skill="R" constants={Constants.R.damage} {...props} stackName={StackName} />のスキルダメージを与え、攻撃速度
        {Constants.R.attack_speed}％と移動速度{Constants.R.movement_speed}％を減少させます。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "維持時間", values: Constants.R.duration}
    ]
}