import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        ヨハンの妨害耐性が{Constants.T.tenacity}%増加します。ヨハンが次のアイテムを使用するたびに追加で増加します。(最大{Constants.T.tenacity_max}%)<br />
        <span className={style.emphasis}>聖水</span>：{Constants.T.holy_water}%<br />
        <span className={style.emphasis}>浄化水</span>：{Constants.T.purified_water}%<br />
        <br />
        ヨハンがキルやアシストに関わると、味方の実験体に<Damage skill="T" constants={Constants.T.shield} {...props} />のシールドを{Constants.T.shield_duration[props.config.skillLevels.T]}秒間付与します。
    </>
);

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "シールド吸収量", values: Constants.T.shield.base},
        {title: "シールド持続時間", values: Constants.T.shield_duration}
    ]
}