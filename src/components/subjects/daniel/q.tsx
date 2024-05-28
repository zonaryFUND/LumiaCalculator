import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        ダニエルが指定した位置にシャドーシザースを召喚し、敵に<Value skill="Q" ratio={Constants.Q.damage} />
        のスキルダメージを与え、次の{Constants.Q.basic_attack_enhance.count}回の基本攻撃速度が
        {Constants.Q.basic_attack_enhance.duration}秒間{Constants.Q.basic_attack_enhance.attack_speed[props.skillLevel]}%増加します。ハサミの中央にいる敵には
        <Value skill="Q" ratio={Constants.Q.center_damage} />のスキルダメージを与えて移動速度を
        {Constants.Q.slow.duration}秒間{Constants.Q.slow.effect}%減少させます。
    </>
)

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "攻撃速度", values: Constants.Q.basic_attack_enhance.attack_speed, percent: true},
        {title: "強化されたダメージ量", values: Constants.Q.center_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}