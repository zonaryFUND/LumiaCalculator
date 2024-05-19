import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：野球ボールをキャッチすると
        {Constants.E.duration}秒間防御力が{Constants.E.defense[props.skillLevel]}
        増加します。ウィリアムが野球ボールの落下地点を対象に指定して素早く移動します。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "防御力", values: Constants.E.defense},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}