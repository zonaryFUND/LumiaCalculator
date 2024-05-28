import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ニッキーは敵実験体から受けたダメージをニッキーの体力の{Constants.T.hp_conversion}
            %まで<span>怒り</span>にして貯めることができます。<span>怒り</span>は非戦闘状態では徐々に減少します。<br />
            <span>怒り</span>が最大値まで到達すると{Constants.T.enraged_duration}秒間<span>短気</span>状態になります。
            <span>短気</span>状態で敵実験体に基本攻擊やスキルを的中させると持続時間が初期化されます。<br />
            <br />
            <span>短気</span>状態では攻撃速度が{Constants.T.attack_speed[props.skillLevel]}%増加し、基本攻撃すると対象と周りの敵に
            <Value skill="T" ratio={Constants.T.damage} />の追加スキルダメージを与えます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "対象ダメージ量", values: Constants.T.damage.base},
        {title: "周辺範囲ダメージ量", values: Constants.T.damage.base},
        {title: "追加攻撃速度(%)", values: Constants.T.attack_speed}
    ]
}
