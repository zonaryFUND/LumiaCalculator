import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            エヴァが指定した地点に{Constants.W.duration}秒間維持できる位相の渦を生成して範囲内の敵に
            <Value skill="W" ratio={Constants.W.first_damage} />
            のスキルダメージを与えます。範囲内の敵は移動速度が{Constants.W.slow}%減少します。<br />
            位相の渦の持続時間が終了すると、範囲内の敵に<Value skill="W" ratio={Constants.W.second_damage} />
            のスキルダメージ を与え、中心部の敵を{Constants.W.airborne}秒間空中に浮かせます。<br />
            <br />
            スキルを的中させるとバイタルフォース{Constants.W.vitalforce}を獲得します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.first_damage.base},
        {title: "追加ダメージ量", values: Constants.W.second_damage.base},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}
