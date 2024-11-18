import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        テオドールが茂みから離れると{Constants.T.hide}秒間隠密状態になり、その間の移動速度が{Constants.T.movement_speed[props.skillLevel]}
        %増加します。また、{Constants.T.shield_duration}秒間最大体力の{Constants.T.shield.maxHP[props.skillLevel]}
        %のダメージを吸収するシールドを獲得します。移動以外の行動をすると隠密状態が解除されます。<br />
        <br />
        テオドールが敵実験体に基本攻撃を的中させると<span className={style.emphasis}>エネルギー砲</span>のクールダウンが
        {Constants.T.q_cooldown_reduction[props.skillLevel]}%減少し、他の基本スキルのクールダウンが
        {Constants.T.cooldown_reduction[props.skillLevel]}%減少します。
    </>
);

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "移動速度増加量(%)", values: Constants.T.movement_speed, percent: true},
        {title: "最大体力比例シールド獲得量(%)", values: Constants.T.shield.maxHP, percent: true},
        {title: "[エネルギー砲]クールダウン減少量(%)", values: Constants.T.q_cooldown_reduction, percent: true},
        {title: "[増幅スクリーン]クールダウン減少量(%)", values: Constants.T.cooldown_reduction, percent: true},
        {title: "[スパーク団]クールダウン減少量(%)", values: Constants.T.cooldown_reduction, percent: true},
        {title: "クールダウン", values: Constants.T.cooldown.constant}
    ]
}