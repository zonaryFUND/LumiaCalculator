import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        ザヒルが神の力を借りて一定範囲に<Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを与えます。<br />
        <br />
        <span className={style.enhance}>死神の目の効果</span>：<Value skill="Q" ratio={Constants.Q.enhanced_damage} />の強化されたスキルダメージを与えます。
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