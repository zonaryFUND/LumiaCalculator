import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ハートはギターを弾くと{Constants.W.duration[props.skillLevel]}秒間攻撃力が
            {Constants.W.attack[props.skillLevel]}増加し、基本攻撃の射程距離が{Constants.W.range}増加します。<br />
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "攻撃力", values: Constants.W.attack},
        {title: "持続時間(秒)", values: Constants.W.duration},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}
