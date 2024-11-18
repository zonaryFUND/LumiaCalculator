import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import Decimal from "decimal.js";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { CooldownOverride } from "../skills";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.emphasis}>デビー</span>：デビーが剣を大きく振り回して
        <Value skill="W" ratio={Constants.DebiW.damage} />のスキルダメージを与え、範囲内の敵の投射体または基本攻撃を防ぎます。
    </>
);

export default w;

export const values: ValuesProps = {
    additionalInfo: <>追加攻撃速度に比例してクールダウンとキャスト時間が減少します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.DebiW.damage.base},
        {title: "最大体力ダメージ(%)", values: Constants.DebiW.damage.targetMaxHP, percent: true}
    ]
}

export const cooldownOverride: CooldownOverride = (config, status) => {
    // NOTE: This multiplier is an estimated value.
    // The cooldown reduction of DebiW peaks when her additional attack speed reaches 100%, 
    // at which point it becomes 35% of the original cooldown.
    return _ => new Decimal(Constants.DebiW.cooldown)
        .subPercent(status.attackSpeed.additional?.clamp(0, 100).times(0.65) ?? 0)
        .subPercent(status.cooldownReduction.calculatedValue).round2();
}