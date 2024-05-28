import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.level}>持続効果</span>：キレイキレイスキルで敵を的中したり、強化された基本攻撃で敵にダメージを与えると、
            {Constants.W.attack_speed.duration}秒間攻撃速度が{Constants.W.attack_speed.one_stack}%増加し、最大{Constants.W.attack_speed.max_stack}回までスタックを獲得できます。<br />
            <br />
            使用効果：ルクが掃除道具を振り回して<Damage skill="W" constants={Constants.W.damage} {...props} />のスキルダメージを与えます。敵に的中させると
            {Constants.W.duration}秒間基本攻撃が強化され、<Damage skill="W" constants={Constants.W.basic_attack_damage} {...props} />のスキルダメージを追加で与えます。<br />
            <br />
            <span className={style.strong}>進化効果</span>：キレイキレイの使用効果が的中した敵対象一人あたり失った体力の{Constants.W.heal}%を回復します。最大
            {Constants.W.max_heal}%まで回復します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "追加スキルダメージ", values: Constants.W.basic_attack_damage.base},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}
