import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        スキルが的中した場合、対象に与えたダメージの{Constants.R1.skill_damage_add[props.config.skillLevels.R]}％の追加スキルダメージを与えます。竜鱗(W)のクールダウンが永久に
        {Constants.T1_2.w_cooldown_reduction}％減少します。<br />
        <br />
        サイドワインダー系の武器はVF暴走状態で<span className={style.strong}>軽い足取り</span>効果が発動します。
    </>
);

export default t;

export const values: ValuesProps = {
    additionalInfo: <>強化したそれぞれの武器の効果はVF暴走(R)スキルのレベルに応じて増加します。</>,
    parameters: []
}