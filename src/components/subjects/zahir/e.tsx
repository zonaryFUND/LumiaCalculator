import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        風を飛ばして<Damage skill="E" constants={Constants.E.damage} {...props} />のスキルダメージを与えます。的中した対象は
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