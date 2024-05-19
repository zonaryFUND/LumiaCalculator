import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { ValuesProps } from "../values";
import Value from "components/tooltip/value";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const w: React.FC<SubjectSkillProps> = props => {
    const { showEquation } = useValueContext();

    return (
        <>
            Elevenがハンバーガーを持ち上げて範囲内の敵を{Constants.W.taunt[props.skillLevel]}秒間挑発し、
            <Value skill="W" ratio={Constants.W.damage} />のスキルダメージを与えます。
            {Constants.common.charge_max}秒以上チャージした場合、スキルが強化されます。<br />
            <br />
            <span className={style.enhance}>強化</span>：より広い範囲内の敵を{Constants.W.enhanced_taunt[props.skillLevel]}秒間挑発し、
            {
                showEquation ? 
                <>基本スキルダメージの{Constants.W.additional_damage[props.skillLevel]}%</> :
                <Value skill="W" ratio={Constants.W.damage} multiplier={Constants.W.additional_damage[props.skillLevel]} />
            }
            のスキルダメージを追加で与えます。また、{Constants.W.damage_reduction_duration}秒間Elevenが受ける最終ダメージが
            {Constants.W.damage_reduction[props.skillLevel]}%減少します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    additionalInfo: <>チャージ中にスキルがキャンセルされたり、スキルを使用しなかった場合、クールダウンの{Constants.common.return_cooldown}%が返されます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "[強化時]ハンマーダメージ比例追加ダメージ量", values: Constants.W.additional_damage, percent: true},
        {title: "挑発時間", values: Constants.W.taunt},
        {title: "[強化時]挑発時間", values: Constants.W.enhanced_taunt},
        {title: "最終ダメージ減少量", values: Constants.W.damage_reduction, percent: true},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}