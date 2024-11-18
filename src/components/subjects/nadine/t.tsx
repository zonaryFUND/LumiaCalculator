import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        ナディンが野生動物狩りまたは実験体のキルに関与した場合、野性スタックを獲得します。(最大{Constants.T.max_stack}スタック)<br />
        <br />
        ニワトリ：{Constants.T.chicken[props.skillLevel]} / コウモリ、イノシシ：
        {Constants.T.bat_boar[props.skillLevel]} / ハウンド、オオカミ：
        {Constants.T.hound_wolf[props.skillLevel]} / クマ：
        {Constants.T.bear[props.skillLevel]} / 実験体：{Constants.T.subject[props.skillLevel]}
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