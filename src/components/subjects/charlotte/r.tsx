import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        シャーロットが奇跡を起こします。{Constants.R.channeling}秒後、周りにいる味方は{Constants.R.duration}秒間無敵状態になります。<br />
        <br />
        *無敵状態では行動が制限されず、すべてのダメージを受けません。
    </>
)

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
