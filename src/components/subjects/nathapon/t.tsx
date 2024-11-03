import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { UniqueValueStrategy } from "../unique-value-strategy";
import Decimal from "decimal.js";
import { useValueContext } from "components/tooltip/value-context";

function ratio(tLevel: number): { base: number, amp: number, as: number } {
    return {
        base: Constants.T.damage.base[tLevel],
        amp: Constants.T.damage.amp,
        as: Constants.T.damage.attackSpeed
    }
}

export const NathaponeTStrategy: UniqueValueStrategy = (config, status) => {
    const { base, amp, as } = ratio(config.skillLevels.T);
    const value = new Decimal(base)
        .add(status.skillAmp.calculatedValue.percent(amp))
        .add(status.attackSpeed.additional?.percent(as) ?? 0)

    return {
        value,
        equationExpression: [
            {
                expression :[
                    `${base} + `,
                    { ratioKey: "amp" },
                    `${status.skillAmp.calculatedValue.toString()} x ${amp}% +`,
                    { ratioKey: "additionalAttackSpeed" },
                    `${status.attackSpeed.additional?.toString() ?? 0} x ${as}% = ${value}`
                ]
            }
        ]
    }
}

const t: React.FC<SubjectSkillProps> = props => {
    const { config, status, showEquation } = useValueContext();
    const damage = (() => {
        const { base, amp, as } = ratio(config.skillLevels.T);
        if (showEquation) {
            return <>
                <span className={style.emphasis}>{base}</span>
                <span className={style.amp}>(+スキル増幅の{amp}%)</span>
                <span className={style.attackspeed}>(+攻撃速度の{as}%)</span>
            </>
        } else {
            const value = new Decimal(base)
                .add(status.skillAmp.calculatedValue.percent(amp))
                .add(status.attackSpeed.additional?.percent(as) ?? 0)
                .floor();

            return <span className={style.emphasis}>{value.toString()}</span>;
        }
    })();

    return (
        <>
            ナタポンは慎重にこの瞬間を撮り、カメラに納めます。ナタポンが使用するカメラは攻撃速度が固定され、致命打が発生しません。その代わりに、基本攻撃する時に{damage}の追加スキルダメージを与えます。<br />
            <br />
            <span className={style.level}>被写体</span>：敵にスキルダメージを与えると<span className={style.level}>被写体</span>スタックを付与します。
            <span className={style.level}>被写体</span>スタックは最大{Constants.T.max_stack}スタックまで貯めることができ、1スタックごとにナタポンがスキルで与えるダメージが
            {Constants.T.stack_damage_amp[props.skillLevel]}%増加します。<br />
            <span className={style.level}>被写体</span>スタックはナタポンの視界から離れるとすぐに消えます。<br />
            <br />
            <span className={style.level}>偽装カメラ</span>：<span className={style.common}>監視カメラ</span>と
            <span className={style.common}>枝</span>を組み合わせると、潜入効果を持つ<span style={{color:"rgb(0,128,0)"}}>偽装カメラ</span>を製作できます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base},
        {title: "受けるダメージ増加(%)", values: Constants.T.stack_damage_amp, percent: true}
    ]
}
