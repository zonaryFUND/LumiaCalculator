import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Decimal from "decimal.js";

const iremq: React.FC<SubjectSkillProps> = props => {
    const maxDamageMultiplier = new Decimal(Constants.IremQ.ratio).times(Constants.IremQ.max_ratio_count).add(1);
    const maxDamageConstants = {
        base: Constants.IremQ.damage.base.map(d => new Decimal(d).times(maxDamageMultiplier)),
        amp: maxDamageMultiplier.times(Constants.IremQ.damage.amp)
    };

    return (
        <>
            イレムが跳ねるたびに強くなるボールを投げて範囲内の敵に
            <Damage skill="Q" constants={Constants.IremQ.damage} {...props} />から最大
            <Damage skill="Q" constants={maxDamageConstants} {...props} />までのスキルダメージを与えます。<br />
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