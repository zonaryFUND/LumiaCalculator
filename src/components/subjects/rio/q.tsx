import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.level}>持続効果</span>：基本攻撃やスキルでダメージを与えると皆中のスタックが増加し、スタックが{Constants.Q.max_stack}になると次の基本攻撃がダメージを与える時、追加効果が発生します。<br />
            短弓：{Constants.Q.hankyu_duration}秒間移動速度が{Constants.Q.movement_speed[props.skillLevel]}%増加し、攻撃速度が
            {Constants.Q.attack_speed[props.skillLevel]}%増加します。<br />
            和弓：次の基本攻撃の射程距離が{Constants.Q.daikyu_range_extend}増加し、対象の失った体力1%あたり{Constants.Q.daikyu_damage_enhance}%のダメージを増加させます。<br />
            <br />
            使用効果：莉央が武器を短弓と和弓に変更します。<br />
            短弓：基本攻撃をする時、2本の矢を発射し、それぞれ<Value skill="Q" ratio={Constants.Q.hankyu} />、
            <Value skill="Q" ratio={Constants.Q.hankyu} />のダメージを与えます。<br />
            和弓：基本攻撃をする時、1本の強力な矢を発射して<Value skill="Q" ratio={Constants.Q.daikyu} />のダメージを与えます。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "皆中ー移動速度増加量(%)", values: Constants.Q.movement_speed, percent: true},
        {title: "皆中ー攻撃速度増加量(%)", values: Constants.Q.attack_speed, percent: true},
        {title: "和弓基本攻撃射程距離", values: Constants.Q.daikyu_range}
    ]
}
