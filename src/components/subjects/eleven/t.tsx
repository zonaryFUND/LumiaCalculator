import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.level}>固有持続効果</span>
            ：Elevenは<span className={style.rare}>ポテトフライ</span>と<span className={style.uncommon}>コーラ</span>を調合して
            <span className={style.legendary}>Elevenセット</span>を製作することができます。<br />
            <br />
            Elevenの基本スキルが敵に的中するたびに<span>最大体力の{Constants.T.heal[props.config.skillLevels.T]}％</span>
            の体力を回復できるElevenバーガーを地面に{Constants.T.amount}つ生成します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>Elevenバーガーは敵が踏んだ場合、つぶされます。</>,
    parameters: [
        {title: "Elevenバーガー回復量", values: Constants.T.heal, percent: true}
    ]
}