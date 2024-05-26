import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import Value from "components/tooltip/value";
import { useValueContext } from "components/tooltip/value-context";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            チャージ：Elevenがハンバーガーフォークを前に振り下ろす準備をし、移動速度が{Constants.common.charging_slow_penalty}%減少します。<br />
            <br />
            使用：Elevenがハンバーガーフォークを前方に振り下ろして敵に
            <Value skill="Q" ratio={Constants.Q.min_damage} /> ~ <Value skill="Q" ratio={Constants.Q.max_damage} />
            のスキルダメージを与え、{Constants.Q.slow_duration}秒間敵の移動速度を{Constants.Q.min_slow}% ~ {Constants.Q.max_slow}%減少させます。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    additionalInfo: <>チャージ中にスキルがキャンセルされたり、スキルを使用しなかった場合、クールダウンの{Constants.common.return_cooldown}%が返されます。</>,
    parameters: [
        {title: "最小ダメージ量", values: Constants.Q.min_damage.base},
        {title: "最大ダメージ量", values: Constants.Q.max_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
