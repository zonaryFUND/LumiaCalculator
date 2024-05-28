import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        バニスが{Constants.W.duration[props.skillLevel]}秒間維持される狩り罠を設置し、踏んだ敵に{Constants.W.damage_duration}秒間
        <Value skill="W" ratio={Constants.W.damage} />の持続ダメージを与え、
        {Constants.W.bind}秒間束縛させます。<br />
        狩り罠は最大{Constants.W.charge.max[props.skillLevel]}個まで所持することができ、
        {Constants.W.setup[props.skillLevel]}個まで設置できます。
    </>
)

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "出血ダメージ量", values: Constants.W.damage.base},
        {title: "維持時間", values: Constants.W.duration},
        {title: "最大設置数", values: Constants.W.setup},
        {title: "最大所持数", values: Constants.W.charge.max},
        {title: "チャージ時間", values: Constants.W.charge.time},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}