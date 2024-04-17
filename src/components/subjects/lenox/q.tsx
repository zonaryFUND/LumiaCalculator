import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            レノックスが範囲内の敵に<Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを与えます。範囲の端の敵には
            <Damage skill="Q" constants={Constants.Q.additional_damage} {...props} />のスキルダメージを追加で与えます。敵に攻撃を的中させると1スタックを獲得し、スタックごとに蛇の塒のクールダウンが
            {Constants.Q.cooldown_reduction}秒減少します。(最大{Constants.Q.max_stack}スタック)
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "最大体力ダメージ(％)", values: Constants.Q.additional_damage.maxHP, percent: true},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
