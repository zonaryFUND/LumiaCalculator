import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import Value from "components/tooltip/value";
import { useValueContext } from "components/tooltip/value-context";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    const { config, showEquation } = useValueContext();

    return (
        <>
            Elevenがハンバーガーフォークを前方に振り下ろして敵に<Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを与えます。<br />
            {Constants.common.charge_max}秒以上チャージした場合、スキルが強化されます。<br />
            <br />
            <span className={style.enhance}>強化</span>：
            {
                showEquation ? 
                <>基本スキルダメージの{Constants.Q.additional_damage[config.skillLevels.Q]}%</> :
                <Value skill="Q" ratio={Constants.Q.damage} multiplier={Constants.Q.additional_damage[props.skillLevel]} />
            }
            のスキルダメージを追加で与え、{Constants.Q.slow_duration}秒間敵の移動速度を{Constants.Q.slow[props.skillLevel]}%減少させます。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    additionalInfo: <>チャージ中にスキルがキャンセルされたり、スキルを使用しなかった場合、クールダウンの{Constants.common.return_cooldown}%が返されます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "[強化時]ハンマーダメージ比例追加ダメージ量", values: Constants.Q.additional_damage, percent: true},
        {title: "移動速度減少量(%)", values: Constants.Q.slow, percent: true},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
