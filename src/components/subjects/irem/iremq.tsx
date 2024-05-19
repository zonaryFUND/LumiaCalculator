import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const iremq: React.FC<SubjectSkillProps> = props => {
    const maxDamageMultiplier = Constants.IremQ.ratio * Constants.IremQ.max_ratio_count + 1;
    const maxDamageConstants = {
        base: Constants.IremQ.damage.base.map(d => d * maxDamageMultiplier),
        amp: maxDamageMultiplier * Constants.IremQ.damage.amp
    };

    return (
        <>
            イレムが跳ねるたびに強くなるボールを投げて範囲内の敵に
            <Value skill="Q" ratio={Constants.IremQ.damage} />から最大
            <Value skill="Q" ratio={maxDamageConstants} />までのスキルダメージを与えます。<br />
            ボールは敵にダメージを与えた後には跳ねずに＜お魚＞を生成します。
        </>
    );
}

export default iremq;

export const values: ValuesProps = {
    additionalInfo: <>＜お魚＞は{Constants.common.fish}秒間持続され、最大{Constants.common.fish_max}匹まで生成できます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.IremQ.damage.base},
        {title: "消費", values: Constants.IremQ.sp_cost},
        {title: "クールダウン", values: Constants.IremQ.cooldown}
    ]
}