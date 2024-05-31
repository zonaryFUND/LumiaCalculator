import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.enhance}>基本効果：</span>ヨハンの妨害耐性が{Constants.T.tenacity[props.skillLevel]}%増加します。<br />
        <br />
        ヨハンのスキルで体力回復またはシールド効果を受けた味方は{Constants.T.tenacity_ally.duration}秒間妨害耐性が
        {Constants.T.tenacity_ally.effect[props.skillLevel]}%増加します。
    </>
);

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "ヨハン - 妨害耐性(%)", values: Constants.T.tenacity, percent: true},
        {title: "味方 - 妨害耐性(%)", values: Constants.T.tenacity_ally.effect, percent: true}
    ]
}