import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ナタポンが低速撮影をするカメラを設置して、範囲内の敵に毎秒<Value skill="W" ratio={Constants.W.damage} />
            のスキルダメージを与えます。範囲内の敵は移動速度が{Constants.W.slow}%減少します。<br />
            カメラの最後の撮影は<Value skill="W" ratio={Constants.W.finish_damage} />の追加スキルダメージを与えて
            {Constants.W.bind}秒間束縛します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "追加ダメージ量", values: Constants.W.finish_damage.base},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}
