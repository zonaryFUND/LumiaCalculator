import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        風を飛ばして<Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えます。的中した対象は
        {Constants.E.airborne}秒間空中に浮かびます。<br />
        <br />
        <span className={style.enhance}>死神の目の効果</span>：的中した対象を{Constants.E.enhanced_airborne}秒間空中に浮かべます。
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}