import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import martina from "./martina.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.emphasis}>[取材中]</span><br />
            マルティナが指定した方向を撮影し、<Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを与えます。スキルが的中するとクールダウンが
            {Constants.Q.cooldown_reduction}%減少し、刻印が消耗されるとマルティナの移動速度が{Constants.Q.movement_speed.duration[props.skillLevel]}秒間
            {Constants.Q.movement_speed.effect[props.skillLevel]}%増加します。<br />
            <span className={martina.broadcast}>[放送中]</span><br />
            スキルの射程距離とダメージ量が増加し、刻印が消耗されると移動速度と攻撃速度が増加します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "移動速度増加量(%)", values: Constants.Q.movement_speed.effect, percent: true},
        {title: "移動速度増加持続時間", values: Constants.Q.movement_speed.duration},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
