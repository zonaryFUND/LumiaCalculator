import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ラウラが指定した方向に鞭を一回振り下ろして<Value skill="Q" ratio={Constants.Q.Q1_damage} />のスキルダメージを与え、
            {Constants.Q.Q1_thril}の<span className={style.emphasis}>スリル</span>を回復します。スキルでダメージを与えた後、{Constants.Q.reuse}秒以内にスキルを再使用すると、強化された攻撃をすることができます。<br />
            <br />
            1回強化：ラウラが指定した方向に鞭を一回振り下ろして、<Value skill="Q" ratio={Constants.Q.Q2_damage} />のスキルダメージを与え、{Constants.Q.Q2_thril}の<span className={style.emphasis}>スリル</span>を回復します。<br />
            2回強化：ラウラが指定した方向に鞭を2回振り下ろして、それぞれ<Value skill="Q" ratio={Constants.Q.Q3_first_damage} />、
            <Value skill="Q" ratio={Constants.Q.Q3_second_damage} />のスキルダメージを与え、{Constants.Q.Q3_thril}の<span className={style.emphasis}>スリル</span>を回復します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.Q1_damage.base},
        {title: "1回強化時ダメージ量", values: Constants.Q.Q2_damage.base},
        {title: "2回強化時ダメージ量", values: Constants.Q.Q3_first_damage.base},
        {title: "2回強化時追加ダメージ量", values: Constants.Q.Q3_second_damage.base},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
