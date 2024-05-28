import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マルシェ：フィオラが指定した方向に突進してぶつかった敵に<Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えます。<br />
            敵に的中した場合、{Constants.E.reuse}秒間ロンペを使用できます。<br />
            <br />
            ロンペ：フィオラが指定した方向に突進します。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    additionalInfo: <>マルシェは壁を越えられません。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base}
    ]
}
