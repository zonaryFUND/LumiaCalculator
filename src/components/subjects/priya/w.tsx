import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.level}>基本効果</span>：プリヤは自分が生成したサラスバティの花の上にいると移動速度が{Constants.W.movement_speed.duration}
            秒間{Constants.W.movement_speed.effect[props.config.skillLevels.W]}%増加し、味方も花の上にいる場合には移動速度が
            {Constants.W.movement_speed.ally_effect[props.config.skillLevels.W]}%増加します。<br />
            <br />
            プリヤが貫通する音波を前方に発射し、敵に<Damage skill="W" constants={Constants.W.damage} {...props} />のスキルダメージを与え、移動速度を
            {Constants.W.slow.duration}秒間{Constants.W.slow.effect}%減少させます。スキルを使用した後、{Constants.W.basic_attack_flower}
            秒以内に基本攻撃すると、敵の足元にサラスバティの花を生成します。<br />
            <br />
            <span className={style.emphasis}>満開効果</span>：満開のサラスバティの花をスキルで的中させると、プリヤと範囲内のすべての味方に
            {Constants.W.shield_duration}秒間持続し、<Damage skill="W" constants={Constants.W.shield} {...props} />のダメージを吸収するシールドを生成します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "シールド吸収量", values: Constants.W.shield.base},
        {title: "移動速度増加量(%)", values: Constants.W.movement_speed.effect},
        {title: "味方の移動速度増加量(%)", values: Constants.W.movement_speed.ally_effect},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}
