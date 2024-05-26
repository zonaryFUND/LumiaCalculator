import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        つばめが手裏剣{Constants.Q.amount}つを指定した位置に投げます。手裏剣は経路の最後まで飛んで行くと回転しながら的中した後に
        <Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを与え、
        {Constants.Q.slow_duration}秒間移動速度を{Constants.Q.slow}%減少させます。<br />
        <br />
        <span className={style.emphasis}>秘技 - 生死の刻印</span>スタックが残された敵対象にはスタックが{Constants.Q.additional_stack}追加されます。
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "消費", values: Constants.Q.sp_cost},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}