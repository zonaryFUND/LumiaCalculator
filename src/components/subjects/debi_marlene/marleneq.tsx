import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import Decimal from "decimal.js";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { CooldownOverride } from "../skills";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.emphasis}>マーリン</span>：マーリンがエネルギーを放出して
        <Value skill="Q" ratio={Constants.DebiQ.damage} />のスキルダメージを与えます。敵に的中した場合、
        {Constants.DebiQ.attack_speed.duration}秒間攻撃速度が{Constants.DebiQ.attack_speed.effect[props.skillLevel]}
        %増加します。(最大{Constants.DebiQ.max_stack}スタック)
    </>
);

export default q;

export const values: ValuesProps = {
    additionalInfo: <>
        このスキルは基本攻撃及びスキル攻撃判定と見なされ、最初に的中した敵に的中した場合に効果が発動します。<br />
        追加攻撃速度に比例してクールダウンとキャスト時間が減少します。
    </>,
    parameters: [
        {title: "ダメージ量", values: Constants.DebiQ.damage.base},
        {title: "攻撃速度増加量(%)", values: Constants.DebiQ.attack_speed.effect, percent: true}
    ]
}

export const cooldownOverride: CooldownOverride = (config, status) => {
    // NOTE: This multiplier is an estimated value.
    // The cooldown reduction of MarleneQ peaks when her additional attack speed reaches 120%, 
    // at which point it becomes 30% of the original cooldown.
    return _ => new Decimal(Constants.MarleneQ.cooldown)
        .subPercent(status.attackSpeed.additional?.clamp(0, 120).times(7).dividedBy(12) ?? 0)
        .subPercent(status.cooldownReduction.calculatedValue).round2();
}