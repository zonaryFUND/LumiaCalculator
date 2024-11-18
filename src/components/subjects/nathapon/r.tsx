import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ナタポンがタイマーを設定し、{Constants.R.cast}秒後に範囲内のすべての敵を撮影します。撮影した対象は
            {Constants.R.statis}秒間無敵状態になる代わりに行動できなくなります。<br />
            撮影した敵にはすぐに被写体スタック{Constants.T.max_stack}を付与します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}
