import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        指定した地点に素早く移動して周りの<span className={style.emphasis}>ガラス破片</span>を破壊し、破壊された<span className={style.emphasis}>ガラス破片</span>
        の数の分、<span className={style.emphasis}>ガラス刃</span>を回復します。<span className={style.emphasis}>ガラス破片</span>
        を一つでも破壊した場合、タジアは到着位置で{Constants.E.shield_duration}秒間持続する<Value skill="E" ratio={Constants.E.shield} />
        のシールドを獲得し、敵に刃を振り回して<Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与え、
        {Constants.E.slow.duration}秒間移動速度を{Constants.E.slow.effect}%減少させます。その後{Constants.E.reuse}秒間このスキルを再使用できます。<br />
        <span className={style.emphasis}>ガラス破片</span>を2つ以上破壊した場合、ダメージ量とシールド量は追加で破壊した
        <span className={style.emphasis}>ガラス破片</span> 1つあたり{Constants.E.glass_additional_damage}%ずつ増加し、最大
        {Constants.E.glass_additional_max}%まで増加します。
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "シールド吸収量", values: Constants.E.shield.base},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}