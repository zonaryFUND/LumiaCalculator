import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";
import { Status } from "components/subject/status";
import Decimal from "decimal.js";
import { SubjectConfig } from "app-types/subject-dynamic/config";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.emphasis}>デビー</span>：デビーが前方に剣を振り下ろして
        <Damage skill="Q" constants={Constants.DebiQ.damage} {...props} />のスキルダメージを与えます。敵に的中した場合、
        {Constants.DebiQ.attack_speed.duration}秒間攻撃速度が{Constants.DebiQ.attack_speed.effect[props.config.skillLevels.Q]}
        ％増加します。(最大{Constants.DebiQ.max_stack}スタック)
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
        {title: "攻撃速度増加量(％)", values: Constants.DebiQ.attack_speed.effect, percent: true}
    ]
}

export function cooldownOverride(config: SubjectConfig, status: Status): (base: Decimal) => Decimal {
    // NOTE: This multiplier is an estimated value.
    // The cooldown reduction of DebiQ peaks when her additional attack speed reaches 120%, 
    // at which point it becomes 30% of the original cooldown.
    return _ => new Decimal(Constants.DebiQ.cooldown)
        .subPercent(status.attackSpeed.multiplier.clamp(0, 120).times(7).dividedBy(12))
        .subPercent(status.cooldownReduction).round2();
}