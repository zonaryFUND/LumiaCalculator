import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            エヴァがキャストしながら、指定した方向にVFを放出して範囲内の敵に{Constants.R.tick}秒ごとに<Value skill="R" ratio={Constants.R.damage} />
            のスキルダメージを与え、スタックを付与します。{Constants.R.max_stack}スタックになった対象は
            <Value skill="R" ratio={Constants.R.stack_damage} />のスキルダメージを受け、スタックが初期化されます。<br />
            <br />
            VF放出を使用するには最小{Constants.R.min_vf}のバイタルフォースが必要であり、スキルを使用する間
            {Constants.R.tick}秒ごとに{Constants.R.vf_consumption}を消費します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo: <>移動速度が増加した場合、衝突を無視します。<br />VFライトを発射する間、地形と関係なく視界を確保します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "追加ダメージ量", values: Constants.R.stack_damage.base}
    ]
}
