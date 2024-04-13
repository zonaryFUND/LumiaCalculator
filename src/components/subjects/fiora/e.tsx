import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マルシェ：フィオラが指定した方向に突進してぶつかった敵に<Damage skill="E" constants={Constants.E.damage} {...props} />のスキルダメージを与えます。<br />
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
