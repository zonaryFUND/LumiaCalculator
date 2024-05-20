import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        ジャッキーが指定した方向に武器を振り回して<Value skill="Q" ratio={Constants.Q.first_damage} />のスキルダメージを与えます。<br />
        <span className={style.emphasis}>連斬</span>が敵に的中した場合、もう一度使用することができます。<br />
        再使用するとジャッキーが指定した方向へ進みながら武器を振り回し、<Value skill="Q" ratio={Constants.Q.second_damage} />のスキルダメージを与えます。
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "1打ダメージ量", values: Constants.Q.first_damage.base},
        {title: "2打ダメージ量", values: Constants.Q.second_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost},
    ]
}