import * as React from "react";
import Constants from "./constants.json";
import skillDamage from "components/subjects/skill-damage";
import Damage from "../damage";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "../props";

const q: React.FC<SubjectSkillProps> = props => {
    const damage = skillDamage(props.status, props.config.level, props.config.skillLevels.Q, Constants.Q.damage)
    const slow = Constants.Q.slow[props.config.skillLevels.Q]

    return (
        <>
            Elevenがハンバーガーフォークを前方に振り下ろして敵に<Damage {...props} skill="Q" constants={Constants.Q.damage} />のスキルダメージを与えます。<br />
            {Constants.common.charge_max}秒以上チャージした場合、スキルが強化されます。<br />
            <br />
            <span className={style.enhance}>強化</span>：
            {
                props.showEquation ? 
                <>基本スキルダメージの{Constants.Q.additional_damage[props.config.skillLevels.Q]}％</> :
                <span>{damage.times(Constants.Q.additional_damage[props.config.skillLevels.Q]).dividedBy(100).toString()}</span>
            }
            のスキルダメージを追加で与え、{Constants.Q.slow_duration}秒間敵の移動速度を{slow}％減少させます。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    additionalInfo: <>チャージ中にスキルがキャンセルされたり、スキルを使用しなかった場合、クールダウンの{Constants.common.return_cooldown}％が返されます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "[強化時]ハンマーダメージ比例追加ダメージ量", values: Constants.Q.additional_damage, percent: true},
        {title: "移動速度減少量(％)", values: Constants.Q.slow, percent: true},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
