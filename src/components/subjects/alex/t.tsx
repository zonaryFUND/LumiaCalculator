import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        アレックスは6レベル以降、敵を倒したりアシストを記録すると{Constants.T.hide_duration}秒間潜入状態になります。<br />
        探知範囲外の敵は潜入状態のアレックスを見つけることができません。<br />
        潜入状態になるとき、{Constants.T.movement_speed.area}m以内に敵がいると
        {Constants.T.movement_speed.duration}秒間移動速度が
        {Constants.T.movement_speed.effect[props.skillLevel]}%増加します。<br />
        <br />
        アレックスは装備できるすべての武器の熟練度が同時に増加します。<br />
        トンファー、両手剣などの近接武器を装備すると防御力が{Constants.T.defense[props.skillLevel]}増加します。
    </>
);

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "移動速度増加量(%)", values: Constants.T.movement_speed.effect, percent: true},
        {title: "防御力", values: Constants.T.defense}
    ]
}