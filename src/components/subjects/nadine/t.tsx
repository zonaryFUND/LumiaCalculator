import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import { StackName } from "./stack";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        ナディンが野生動物狩りまたは実験体のキルに関与した場合、野性スタックを獲得します。<br />
        <br />
        ニワトリ：{Constants.T.chicken[props.config.skillLevels.T]} / コウモリ、イノシシ：
        {Constants.T.bat_boar[props.config.skillLevels.T]} / ハウンド、オオカミ：
        {Constants.T.hound_wolf[props.config.skillLevels.T]} / クマ：
        {Constants.T.bear[props.config.skillLevels.T]} / 実験体：{Constants.T.subject[props.config.skillLevels.T]}
    </>
);

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "ニワトリ", values: Constants.T.chicken},
        {title: "コウモリ、イノシシ", values: Constants.T.bat_boar},
        {title: "ハウンド、オオカミ", values: Constants.T.hound_wolf},
        {title: "クマ", values: Constants.T.bear},
        {title: "実験体", values: Constants.T.subject}
    ]
}