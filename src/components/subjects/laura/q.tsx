import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ラウラが指定した方向に鞭を一回振り下ろして<Damage skill="Q" constants={Constants.Q.Q1_damage} {...props} />のスキルダメージを与え、
            {Constants.Q.Q1_thril}の<span className={style.emphasis}>スリル</span>を回復します。スキルでダメージを与えた後、{Constants.Q.reuse}秒以内にスキルを再使用すると、強化された攻撃をすることができます。<br />
            <br />
            1回強化：ラウラが指定した方向に鞭を一回振り下ろして、<Damage skill="Q" constants={Constants.Q.Q2_damage} {...props} />のスキルダメージを与え、{Constants.Q.Q2_thril}の<span className={style.emphasis}>スリル</span>を回復します。<br />
            2回強化：ラウラが指定した方向に鞭を2回振り下ろして、それぞれ<Damage skill="Q" constants={Constants.Q.Q3_first_damage} {...props} />、
            <Damage skill="Q" constants={Constants.Q.Q3_second_damage} {...props} />のスキルダメージを与え、{Constants.Q.Q3_thril}の<span className={style.emphasis}>スリル</span>を回復します。
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
