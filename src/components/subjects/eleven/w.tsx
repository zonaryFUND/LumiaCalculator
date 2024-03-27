import * as React from "react";
import Constants from "./constants.json";
import { Status } from "components/subject/use-status";
import skillDamage from "components/subjects/skill-damage";
import Damage, { FormulaContext } from "../damage";
import style from "components/tooltip/tooltip.module.styl";
import { ValuesProps } from "../values";

const w: React.FC<Status> = status => {
    const formula = React.useContext(FormulaContext)!;
    const damage = skillDamage(status, status.skillLevels.W, Constants.W.damage)
    const taunt = Constants.W.taunt[status.skillLevels.W];
    const enhancedTaunt = Constants.W.enhanced_taunt[status.skillLevels.W];

    return (
        <>
            Elevenがハンバーガーを持ち上げて範囲内の敵を{taunt}秒間挑発し、<Damage skill="W" constants={Constants.W.damage} />のスキルダメージを与えます。
            {Constants.common.charge_max}秒以上チャージした場合、スキルが強化されます。<br />
            <br />
            <span className={style.enhance}>強化</span>：より広い範囲内の敵を{enhancedTaunt}秒間挑発し、
            {
                formula ? 
                <>基本スキルダメージの{Constants.W.additional_damage[status.skillLevels.W]}％</> :
                <span>{damage.times(Constants.W.additional_damage[status.skillLevels.W]).dividedBy(100).toString()}</span>
            }
            のスキルダメージを追加で与えます。また、{Constants.W.damage_reduction_duration}秒間Elevenが受ける最終ダメージが
            {Constants.W.damage_reduction}減少します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    additionalInfo: <>チャージ中にスキルがキャンセルされたり、スキルを使用しなかった場合、クールダウンの{Constants.common.return_cooldown}％が返されます。</>,
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