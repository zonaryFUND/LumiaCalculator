import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            エヴァが貫通する光の球体を発射して、経路上の敵に<Damage skill="Q" constants={Constants.Q.first_damage} {...props} />
            のスキルダメージを与えます。球体が射程距離の端まで飛ばされたり、スキルを再使用すると爆発して範囲内の敵に
            <Damage skill="Q" constants={Constants.Q.second_damage} {...props} />のスキルダメージを与えます。<br />
            爆発に敵が的中された場合、クールダウンが{Constants.Q.cooldown_reduction}秒減少します。<br />
            <br />
            スキルを的中させるとバイタルフォース{Constants.Q.vitalforce}を獲得します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "球体ダメージ量", values: Constants.Q.first_damage.base},
        {title: "爆発ダメージ量", values: Constants.Q.second_damage.base},
        {title: "消費", values: Constants.Q.sp_cost},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}
