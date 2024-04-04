import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        ザヒルが神の力を借りて一定範囲に<Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを与えます。<br />
        <br />
        <span className={style.enhance}>死神の目の効果</span>：<Damage skill="Q" constants={Constants.Q.enhanced_damage} {...props} />の強化されたスキルダメージを与えます。
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "消費", values: Constants.Q.sp_cost},
        {title: "強化されたダメージ量", values: Constants.Q.enhanced_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}