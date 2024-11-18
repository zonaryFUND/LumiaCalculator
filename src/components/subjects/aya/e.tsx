import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        アヤは指定した方向に素早く移動します。<br />
        <span className={style.emphasis}>二連発</span>と
        <span className={style.emphasis}>固定射撃</span>のクールダウンが
        {Constants.E.cooldown_reduction[props.skillLevel]}%返されます。
    </>
)

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost},
        {title: "二連発・固定射撃クールダウン減少量(%)", values: Constants.E.cooldown_reduction, percent: true}
    ]
}