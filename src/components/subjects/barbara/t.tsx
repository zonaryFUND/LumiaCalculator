import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：天才エンジニア、バーバラは装備をより早く製作し、装備製作時間が{Constants.T.making_time_reduction}%減少します。<br />
        <br />
        バーバラは{Constants.T.cooldown.constant[props.skillLevel]}秒ごとに攻撃速度が{Constants.T.attack_speed}
        %増加し、次の基本攻撃が対象に的中した場合には <Value skill="T" ratio={Constants.T.damage} />の追加スキルダメージを与えます。
    </>
);


export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base},
        {title: "合計スキル増幅係数", values: Constants.T.damage.amp, percent: true},
        {title: "クールダウン", values: Constants.T.cooldown.constant}
    ]
}