import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";
import { Status } from "components/subject/status";
import Decimal from "decimal.js";
import { SubjectConfig } from "app-types/subject-dynamic/config";

export function projectileAmount(status: Status): number {
    // NOTE: This multiplier is an estimated value.
    // The number of extra projectiles from additional attack speed peaks when it reaches 100%. 
    // Unlike other calculations in-game, this projectile count calculation truncates any decimal places.
    return status.additionalAttackPower.clamp(0, 100).times(0.07).floor().toNumber();
}

const Projectile: React.FC<SubjectSkillProps> = props => {
    /*
    const base = Constants.MarleneW.projectiles.base[props.config.skillLevels.W];
    const add = projectileAmount(props.status);
    if (props.showEquation) {
        return <>
            <span className={style.emphasis}>{base}</span>
            <span className={style.attackspeed}>(+追加攻撃速度に比例して{add})</span>
        </>
    } else {
        return <span className={style.emphasis}>{base + add}</span>
    }
    */
   return null;
}

const w: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.emphasis}>マーリン</span>：マーリンが素早く回転して周りの敵に
        <Projectile {...props} />個のエネルギーを放出します。的中した敵にはそれぞれ
        <Damage skill="W" constants={Constants.MarleneW.damage} {...props} />のスキルダメージを与え、
        {Constants.MarleneW.t_stack_projectiles}回的中させるたびに<span className={style.emphasis}>Blue & Red</span>の
        <span className={style.emphasis}>Red</span>を刻みます。すでにエネルギーに的中された敵には
        {Constants.MarleneW.multiple_hit}%のダメージを与えます。
    </>
);

export default w;

export const values: ValuesProps = {
    additionalInfo: <>追加攻撃速度に比例して放出するエネルギー数が最大{Constants.MarleneW.max_projectile}個まで増加し、クールダウンが減少します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.MarleneW.damage.base},
        {title: "発射数", values: Constants.MarleneW.projectiles.base}
    ]
}

export function cooldownOverride(config: SubjectConfig, status: Status): (base: Decimal) => Decimal {
    // NOTE: This multiplier is an estimated value.
    // The cooldown reduction of DebiW peaks when her additional attack speed reaches 100%, 
    // at which point it becomes 50% of the original cooldown.
    return _ => new Decimal(Constants.MarleneW.cooldown)
        .subPercent(status.attackSpeed.multiplier.clamp(0, 100).dividedBy(2))
        .subPercent(status.cooldownReduction).round2();
}
