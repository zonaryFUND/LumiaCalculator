import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import style from "components/tooltip/tooltip.module.styl";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果：</span>スキル増幅が{Constants.R.amp[props.skillLevel]}増加します。<br />
        <br />
        シャーロットが奇跡を起こします。{Constants.R.channeling}秒後、周りにいる味方は{Constants.R.duration}秒間無敵状態になります。<br />
    </>
)

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
