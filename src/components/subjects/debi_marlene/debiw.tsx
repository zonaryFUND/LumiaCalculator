import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";
import { Status } from "components/subject/status";
import Decimal from "decimal.js";
import { SubjectConfig } from "app-types/subject-dynamic/config";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.emphasis}>デビー</span>：デビーが剣を大きく振り回して
        <Damage skill="W" constants={Constants.DebiW.damage} {...props} />のスキルダメージを与え、範囲内の敵の投射体または基本攻撃を防ぎます。
    </>
);

export default w;

export const values: ValuesProps = {
    additionalInfo: <>追加攻撃速度に比例してクールダウンとキャスト時間が減少します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.DebiW.damage.base},
        {title: "最大体力ダメージ(％)", values: Constants.DebiW.damage.targetMaxHP, percent: true}
    ]
}

export function cooldownOverride(config: SubjectConfig, status: Status): (base: Decimal) => Decimal {
    // NOTE: This multiplier is an estimated value.
    // The cooldown reduction of DebiW peaks when her additional attack speed reaches 100%, 
    // at which point it becomes 35% of the original cooldown.
    return _ => new Decimal(Constants.DebiW.cooldown)
        .subPercent(status.attackSpeed.multiplier.clamp(0, 100).times(0.65))
        .subPercent(status.cooldownReduction).round2();
}