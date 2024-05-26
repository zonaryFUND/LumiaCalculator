import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import Value from "components/tooltip/value";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const w: React.FC<SubjectSkillProps> = props => {
    const { showEquation } = useValueContext();

    return (
        <>
            チャージ：Elevenが敵を長髪する準備をし、移動速度が{Constants.common.charging_slow_penalty}%減少します。<br />
            <br />
            使用：Elevenがハンバーガーを持ち上げて範囲内の敵を
            {Constants.W.min_taunt[props.skillLevel]} ~ {Constants.W.max_taunt[props.skillLevel]}秒間挑発し、
            <Value skill="W" ratio={Constants.W.min_damage} /> ~ <Value skill="W" ratio={Constants.W.max_damage} />
            のスキルダメージを与えます。<br />
            また、{Constants.W.damage_reduction_duration}秒間Elevenが受ける最終ダメージが
            0% ~ {Constants.W.max_damage_reduction[props.skillLevel]}%減少します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    additionalInfo: <>チャージ中にスキルがキャンセルされたり、スキルを使用しなかった場合、クールダウンの{Constants.common.return_cooldown}%が返されます。</>,
    parameters: [
        {title: "最小ダメージ量", values: Constants.W.min_damage.base},
        {title: "最大ダメージ量", values: Constants.W.max_damage.base},
        {title: "最小挑発時間", values: Constants.W.min_taunt},
        {title: "最大挑発時間", values: Constants.W.max_taunt},
        {title: "最終ダメージ減少量 - 最大", values: Constants.W.max_damage_reduction, percent: true},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}