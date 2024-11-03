import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import Decimal from "decimal.js";
import { Status } from "app-types/subject-dynamic/status/type";
import { CooldownOverride } from "../skills";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";
import { UniqueValueStrategy } from "../unique-value-strategy";

export function projectileAmount(status: Status): number {
    // NOTE: This multiplier is an estimated value.
    // The number of extra projectiles from additional attack speed peaks when it reaches 100%. 
    // Unlike other calculations in-game, this projectile count calculation truncates any decimal places.
    return status.attackPower.additional?.clamp(0, 100).times(0.07).floor().toNumber() ?? 0;
}

export const MarleneWStrategy: UniqueValueStrategy = (config, status) => {
    const base = Constants.MarleneW.projectiles.base[config.skillLevels.W];
    const add = projectileAmount(status);
    const value = new Decimal(base + add);
    return {
        value,
        equationExpression: [
            {
                expression: [
                    `${base} + min(100, `,
                    { ratioKey: "additionalAttackSpeed" },
                    `${status.attackSpeed.additional?.toString()}) x 0.07 = ${value}`
                ]
            }
        ]
    }
}

const Projectile: React.FC<SubjectSkillProps> = props => {
    const { status, showEquation } = useValueContext();
    const base = Constants.MarleneW.projectiles.base[props.skillLevel];
    const add = projectileAmount(status);
    if (showEquation) {
        return <>
            <span className={style.emphasis}>{base}</span>
            <span className={style.attackspeed}>(+追加攻撃速度に比例して{add})</span>
        </>
    } else {
        return <span className={style.emphasis}>{base + add}</span>
    }
}

const w: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.emphasis}>マーリン</span>：マーリンが素早く回転して周りの敵に
        <Projectile {...props} />個のエネルギーを放出します。的中した敵にはそれぞれ
        <Value skill="W" ratio={Constants.MarleneW.damage} />のスキルダメージを与え、
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

export const cooldownOverride: CooldownOverride = (config, status) => {
    // NOTE: This multiplier is an estimated value.
    // The cooldown reduction of DebiW peaks when her additional attack speed reaches 100%, 
    // at which point it becomes 50% of the original cooldown.
    return _ => new Decimal(Constants.MarleneW.cooldown)
        .subPercent(status.attackSpeed.additional?.clamp(0, 100).dividedBy(2) ?? 0)
        .subPercent(status.cooldownReduction.calculatedValue).round2();
}
