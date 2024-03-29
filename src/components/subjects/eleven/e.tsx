import * as React from "react";
import Constants from "./constants.json";
import skillDamage from "components/subjects/skill-damage";
import Damage from "../damage";
import style from "components/tooltip/tooltip.module.styl";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const e: React.FC<SubjectSkillProps> = props => {
    const damage = skillDamage(props.status, props.config.level, props.config.skillLevels.W, Constants.W.damage)

    return (
        <>
            Elevenがハンバーガーフォークに乗って指定した地点にジャンプし、敵に
            <Damage {...props} skill="E" constants={Constants.E.damage} />
            のスキルダメージを与えます。ジャンプする間、Elevenはすべての妨害効果免疫状態になります。チャージ時間に応じてジャンプできる距離が増え、
            {Constants.common.charge_max}秒以上チャージした場合、スキルが強化されます。<br />
            <br />
            <span className={style.enhance}>強化</span>：
            {
                props.showEquation ? 
                <>基本スキルダメージの{Constants.E.additional_damage[props.config.skillLevels.E]}％</> :
                <span>{damage.times(Constants.E.additional_damage[props.config.skillLevels.E]).dividedBy(100).toString()}</span>
            }
            のスキルダメージを追加で与え、着地地点付近の敵を押し出します。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    additionalInfo: <>チャージ中にスキルがキャンセルされたり、スキルを使用しなかった場合、クールダウンの{Constants.common.return_cooldown}％が返されます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "[強化時]ハンマーダメージ比例追加ダメージ量", values: Constants.E.additional_damage, percent: true},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}