import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        シャーロットの周りにいる味方が敵の攻撃によって体力が{Constants.T.ally_losthp_threshold}
        %減少するたびに<span className={style.emphasis}>高潔な心</span>スタックを獲得し、スタックごとに与える回復及びシールド効果が
        <span className={style.emphasis}>{Constants.T.heal_and_shield_amp[props.skillLevel]}%</span>増加します。(最大{Constants.T.max_stack}スタック)
    </>
)

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "与える回復及びシールド増加(%)", values: Constants.T.heal_and_shield_amp, percent: true}
    ]
}
