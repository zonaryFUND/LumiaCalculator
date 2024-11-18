import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マーカスは次の基本攻撃{Constants.Q.count}回の攻撃速度が{Constants.Q.attack_speed[props.skillLevel]}%増加して基本攻撃で
            <Value skill="Q" ratio={Constants.Q.damage} />の追加スキルダメージを与え、追加スキルダメージ量の{Constants.Q.heal}
            %の体力を回復します。{Constants.Q.duration}秒間基本攻撃をしない場合には効果が消えます。<br />
            <br />
            <span className={style.emphasis}>戦闘教範</span>スキルを使用した後、マーカスは{Constants.Q.movement_speed.duration}秒間敵実験体に向かって移動する時、移動速度が{Constants.Q.movement_speed.effect[props.skillLevel]}%増加します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "攻撃速度増加量(%)", values: Constants.Q.attack_speed, percent: true},
        {title: "移動速度増加量(%)", values: Constants.Q.movement_speed.effect, percent: true},
        {title: "消費", values: Constants.Q.sp_cost},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}
