import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        ジャッキーが指定した方向に武器を振り回して<Damage skill="Q" constants={Constants.Q.first_damage} {...props} />のスキルダメージを与えます。<br />
        <span className={style.emphasis}>連斬</span>が敵に的中した場合、もう一度使用することができます。<br />
        再使用するとジャッキーが指定した方向へ進みながら武器を振り回し、<Damage skill="Q" constants={Constants.Q.second_damage} {...props} />のスキルダメージを与えます。
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